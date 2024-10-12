[<<< Back to home](../README.md)

### Hello world example

This example demonstrates how to create a simple HTTP server that responds with a JSON message.

Create a new file named `index.ts` and add the following code.

```typescript
import { start, get, json } from "pulsar-http";

// Define the routes
// The first argument is the path, the second is the handler function
const routes = [
    get('/', async () => json({ message: "Hello, World!" })),
];

// Start the server
start(routes, [], {
    port: 3000,
});
```

Run the following command to start the server.
```bash
bun --watch index.ts
```
