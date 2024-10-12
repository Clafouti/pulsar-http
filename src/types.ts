export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type RouterHandler<QueryParams = { [key: string]: string }> = (
  request: Request,
  queryParams: QueryParams,
) => Promise<Response>;

export type Route<QueryParams = { [key: string]: string }> = {
  method: HTTPMethod;
  path: string;
  handler: RouterHandler<QueryParams>;
};

export type RouteNamespace = {
  path: string;
  routes: Route[];
};

export type Middleware = (
  req: Request,
  next: () => Promise<Response>,
) => Promise<Response>;

export type RequestQueueItem = {
  request: Request;
  resolve: (response: Response) => void;
};

export type ServerOptions = {
  port?: number;
  workers?: number;
};
