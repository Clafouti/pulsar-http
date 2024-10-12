[<<< Back to home](../README.md)

### Middleware

Pulsar provides a middleware system that allows you to compose functions that can modify the request and response objects.

Here is the signature of a middleware function:

```typescript
export type Middleware = (
    req: Request,
    next: () => Promise<Response>,
) => Promise<Response>;
```

You can add middleware functions to the server by passing them as the second argument to the `start` function.

```typescript
import { start, get, json, log } from "pulsar-http";

const routes = [
    get('/', async () => json({ message: "Hello, World!" })),
];

// Define the middleware functions
// Note: They will be executed in the order they are defined
const middlewares = [
    async (req, next) => {
        // Logging the request method and URL and the response status code
        const response = await next();
        log(`${req.method} ${req.url} ${response.status}`);
        return response;
    },
];

start(routes, middlewares, {
    port: 3000,
});
```