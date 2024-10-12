[<<< Back to home](../README.md)

### Routing

Pulsar provides a simple and flexible routing system that allows you to define routes with groups and parameters.

Here is the signature
```typescript
export const method = <QueryParams = { [key: string]: string }>(
    path: string,
    handler: RouterHandler<QueryParams>,
): Route<QueryParams> => {
    return route("METHOD", path, handler);
};
```

Route handler is a function that takes two arguments: the request object and the query parameters object.

#### Simple route with a parameter

```typescript
import {start, get, json} from "pulsar-http";

const routes = [
    get('/:name', async (request, queryParams) => 
        json({message: `Hello, ${queryParams.name}`})
    ),
];

start(routes, [], {
    port: 3000,
});
```

#### Route groups

You can group routes by using the `path` property. It takes a second argument, which is an array of routes that will be prefixed with the path.

```typescript
import {start, get, file} from "pulsar-http";
 
// ... handlers declaration ...

const routes = [
    get('/', async () => file("/public/hello-world.html")),
    {
        path: "/api/v1",
        routes: [
            get('/users', handleGetUsers),
            post('/users', handleCreateUser),
            get('/users/:id', handleGetUser),
        ],
    },
];
```