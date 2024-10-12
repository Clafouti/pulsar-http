import { start, get, post, type Middleware, file, log } from "pulsar-http";
import {
  handleGetUser,
  handleGetUsers,
  handleCreateUser,
} from "../adapters/handlers/user.handlers";

const routePaths = {
  home: "/",
  users: "/users",
  user: "/users/:id",
};

const routes = [
  get(routePaths.home, async () => file("/public/hello-world.html")),
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
  async (_, next) => {
    // Example of modifying the response headers
    const response = await next();
    response.headers.set("X-Hello", "World");
    return response;
  },
  async (req, next) => {
    // Logging the request method and URL and the response status code
    const response = await next();
    const responseStatus = response.status;
    let message = `${req.method} ${req.url} `;

    // Colorize the response status code
    if (responseStatus >= 200 && responseStatus < 300) {
      message += `\x1b[32m${responseStatus}\x1b[0m`;
    } else if (responseStatus >= 300 && responseStatus < 400) {
      message += `\x1b[33m${responseStatus}\x1b[0m`;
    } else if (responseStatus >= 400 && responseStatus < 500) {
      message += `\x1b[31m${responseStatus}\x1b[0m`;
    } else if (responseStatus >= 500) {
      message += `\x1b[35m${responseStatus}\x1b[0m`;
    }

    log(message);
    return response;
  },
];

start(routes, middlewares, {
  port: 3000,
  workers: 4,
});
