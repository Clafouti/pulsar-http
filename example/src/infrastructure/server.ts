import { start, get, post, type Middleware, file } from "pulsar-http";
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
  async (_: Request, next) => {
    console.log("Hello from middleware");
    return next();
  },
];

start(routes, middlewares, {
  port: 3000,
  workers: 4,
});
