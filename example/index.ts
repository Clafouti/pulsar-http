import { get, post } from "router";
import { start } from "server";

import type { Middleware } from "types";

import {
  handleHome,
  handleGetUser,
  handleGetUsers,
  handleCreateUser,
} from "./handlers";

const routePaths = {
  home: "/",
  users: "/users",
  user: "/users/:id",
};

const routes = [
  get(routePaths.home, handleHome),
  {
    path: "/api/v1",
    routes: [
      get(routePaths.users, handleGetUsers),
      get(routePaths.user, handleGetUser),
      post(routePaths.users, handleCreateUser),
    ],
  },
];

const middlewares: Middleware[] = [
  async (request, next) => {
    const headers = new Headers(request.headers);
    const url = new URL(request.url);

    if (!headers.has("Authorization") && url.pathname.startsWith("/api")) {
      return new Response(`Unauthorized`, { status: 401 });
    }

    return next();
  },
];

start(routes, middlewares, {
  port: 3000,
  workers: 4,
});
