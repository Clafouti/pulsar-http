import { log } from "./logger";
import { error } from "./response";
import { router } from "./router";
import { createQueue } from "./queue";
import type { Middleware, Route, RouteNamespace } from "./types";

const composeMiddleware = (
  middlewares: Middleware[],
  routeHandler: (req: Request) => Promise<Response>,
) => {
  return async (req: Request): Promise<Response> => {
    let i = 0;

    const next = async (): Promise<Response> => {
      if (i < middlewares.length) {
        const response = await middlewares[i++](req, next);
        if (response) {
          return response;
        }
      }

      return routeHandler(req);
    };

    return next();
  };
};

const getRoutes = (elements: (Route | RouteNamespace)[]): Route[] => {
  return elements.flatMap((element) => {
    if ("routes" in element) {
      return element.routes.map((route) => ({
        ...route,
        path: `${element.path}${route.path}`,
      }));
    }

    return element;
  });
};

const requestQueue = createQueue();

const workerLoop = async (middlewares: Middleware[], routes: Route[]) => {
  while (true) {
    if (!requestQueue.isEmpty()) {
      const item = requestQueue.dequeue();

      if (item) {
        const { request, resolve } = item;

        try {
          const routeHandler = await router(routes);
          const composedHandlers = composeMiddleware(middlewares, routeHandler);

          let response = await composedHandlers(request);

          if (!response) {
            response = error(404);
          }

          resolve(response);
        } catch (e) {
          resolve(error(500));
        }
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
};

const startWorkers = (
  amount = 4,
  middlewares: Middleware[],
  routes: Route[],
) => {
  for (let i = 0; i < amount; i++) {
    void workerLoop(middlewares, routes);
  }
};

export const start = (
  routingElements: (Route | RouteNamespace)[],
  middlewares: Middleware[],
  options?: { port?: number; workers?: number },
) => {
  const routes = getRoutes(routingElements);

  startWorkers(options?.workers ?? 4, middlewares, routes);

  Bun.serve({
    port: options?.port ?? 3000,

    async fetch(req) {
      return new Promise<Response>((resolve) => {
        requestQueue.enqueue({ request: req, resolve });
      });
    },
  });

  log(`Server started on http://localhost:${options?.port ?? 3000}`);
};
