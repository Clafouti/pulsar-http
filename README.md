# Pulsar
## Asynchronous HTTP server engine

Pulsar is a lightweight, high-performance, non-blocking HTTP server engine written with Bun. 

It is designed to accelerate the development of web applications and web services.

### Features (1.0.10)
- Asynchronous request handling
- Routing with groups and parameters
- Middleware composition
- Static file serving

### Installation
```bash
$ bun add pulsar-http
```

### Usage
Create a new file named `index.ts` and add the following code.
```typescript
import { start, get, json } from "pulsar-http";

const routes = [
    get('/', async () => json({ message: "Hello, World!" })),
];

start(routes, [], {
    port: 3000,
    workers: 4,
});
```

Run the following command to start the server.
```bash
$ bun --watch index.ts
```

### Try it out
Fetch the example directory from the repository and run the following commands.

```bash
$ docker build -t pulsar_pg .
$ docker run -d -p 5432:5432 --name pulsar_pg_container pulsar_pg
$ bun start
```


