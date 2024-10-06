import { router } from "./router";
import { createQueue } from "./queue";
import { getResponseLog, log } from "./logger";
import type { Middleware, Route, RouteNamespace } from "./types";

const composeMiddleware = (middlewares: Middleware[]) => {
  return async (req: Request): Promise<Response | void> => {
    let i = 0;

    const next = async (): Promise<Response | void> => {
      if (i >= middlewares.length) {
        return;
      }

      return middlewares[i++](req, next);
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

const workerLoop = async (
  identity: number,
  middlewares: Middleware[],
  routes: Route[],
) => {
  while (true) {
    if (!requestQueue.isEmpty()) {
      const item = requestQueue.dequeue();

      if (item) {
        const { request, resolve } = item;
        const url = new URL(request.url);

        try {
          const middlewareHandlers = composeMiddleware(middlewares);
          const routeHandler = await router(routes);

          const middlewareResponse = await middlewareHandlers(request);

          const logResponse = (response: Response) => {
            log(
              `${request.method} ${url.pathname} ${getResponseLog(response)}`,
            );
          };

          if (middlewareResponse) {
            logResponse(middlewareResponse);
            resolve(middlewareResponse);
          } else {
            const response = await routeHandler(request);
            logResponse(response);
            resolve(response);
          }
        } catch (error) {
          log(`Worker ${identity} failed with error: ${error}`);
          resolve(new Response(`Internal Server Error`, { status: 500 }));
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
    void workerLoop(i + 1, middlewares, routes);
  }
};

export const start = (
  routingElements: (Route | RouteNamespace)[],
  middlewares: Middleware[],
  options?: { port?: number; workers?: number },
) => {
  const routes = getRoutes(routingElements);

  startWorkers(options?.workers, middlewares, routes);

  Bun.serve({
    port: options?.port ?? 3000,
    async fetch(req) {
      const responsePromise = new Promise<Response>((resolve) => {
        requestQueue.enqueue({ request: req, resolve });
      });

      // @ts-ignore
      return new Response(async function* () {
        const response = await responsePromise;

        if (response.body) {
          const reader = response.body.getReader();
          let readResult = await reader.read();

          while (!readResult.done) {
            yield readResult.value;
            readResult = await reader.read();
          }
        } else {
          yield response.statusText;
        }
      });
    },
  });

  log(`Server started on http://localhost:${options?.port ?? 3000}`);
};
