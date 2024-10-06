# Pulsar
## Asynchronous HTTP server engine

Pulsar is a lightweight, high-performance, non-blocking HTTP server engine written with Bun. 

It is designed to accelerate the development of web applications and web services.

### Features (1.0.1)
- Asynchronous request handling
- Routing with groups and parameters
- Middleware composition
- Static file serving

### Installation
```bash
$ bun add pulsar-http
```

### Usage
Create a file: index.ts
```typescript
import { get, json, type Middleware, start } from "pulsar-http";

const routes = [
    get("/", async () => json({ pulsar: 'Hello world!' })),
    {
        path: "/api/v1",
        routes: [
            get("/users", async () =>
                json([
                    { id: 1, name: "John Doe" },
                    { id: 2, name: "Jane  Doe" },
                ])
            ),
        ],
    },
];

const middlewares: Middleware[] = [
    async (req, next) => {
        console.log("Middleware 1", req.url);
        return next();
    },
];

start(routes, middlewares, {
    port: 3000, // Port to listen on
    workers: 4, // Maximum amount of workers
});
```

Run the server
```bash
$ bun --watch index.ts
```