import { file } from "./response";
import type { HTTPMethod, Route, RouterHandler } from "./types";

const matchRoute = async (routes: Route[], request: Request) => {
  const url = new URL(request.url);

  const { path, handler } =
    routes.find((route) => {
      const routePath = route.path.split("/").filter((part) => part !== "");
      const requestPath = url.pathname.split("/").filter((part) => part !== "");

      if (route.method !== request.method) {
        return false;
      }

      if (routePath.length !== requestPath.length) {
        return false;
      }

      for (let i = 0; i < routePath.length; i++) {
        if (routePath[i].startsWith(":")) {
          continue;
        }

        if (routePath[i] !== requestPath[i]) {
          return false;
        }
      }

      return true;
    }) ?? {};

  if (handler) {
    return handler(request, getParams(request, path ?? ""));
  }

  if (url.pathname.startsWith("/public")) {
    return file(url.pathname);
  }

  return new Response("Not Found", { status: 404 });
};

export const getParams = <T = { [key: string]: string }>(
  request: Request,
  routePath: string,
): T => {
  const url = new URL(request.url);
  const routePathParts = routePath.split("/").filter((part) => part !== "");
  const requestPathParts = url.pathname
    .split("/")
    .filter((part) => part !== "");

  return routePathParts.reduce((acc, part, index) => {
    if (part.startsWith(":")) {
      const key = part.slice(1);
      const value = requestPathParts[index];
      return { ...acc, [key]: value };
    }

    return acc;
  }, {} as T);
};

export const route = <QueryParams = { [key: string]: string }>(
  method: HTTPMethod,
  path: string,
  handler: RouterHandler<QueryParams>,
): Route<QueryParams> => {
  return {
    method,
    path,
    handler,
  };
};

export const get = <QueryParams = { [key: string]: string }>(
  path: string,
  handler: RouterHandler<QueryParams>,
): Route<QueryParams> => {
  return route("GET", path, handler);
};

export const post = <QueryParams = { [key: string]: string }>(
  path: string,
  handler: RouterHandler<QueryParams>,
): Route<QueryParams> => {
  return route("POST", path, handler);
};

export const put = <QueryParams = { [key: string]: string }>(
  path: string,
  handler: RouterHandler<QueryParams>,
): Route<QueryParams> => {
  return route("PUT", path, handler);
};

export const del = <QueryParams = { [key: string]: string }>(
  path: string,
  handler: RouterHandler<QueryParams>,
): Route<QueryParams> => {
  return route("DELETE", path, handler);
};

export const patch = <QueryParams = { [key: string]: string }>(
  path: string,
  handler: RouterHandler<QueryParams>,
): Route<QueryParams> => {
  return route("PATCH", path, handler);
};

export const router = async (routes: Route[]) => {
  return async (request: Request) => {
    return matchRoute(routes, request);
  };
};
