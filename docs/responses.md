[<<< Back to home](../README.md)

### Responses

Pulsar provides helper functions to create responses with different content types.

Here are the available helper functions:
```typescript
// Retrieve the file at the specified path and return it as a response
// with the appropriate content type
export const file = async (pathToFile: string) => Response;

// Return a JSON response
export const json = async (data: unknown) => Response;

// Return a JSON response with the corresponding error
// Example: error(404) will be translated to: 
// new Response("Not Found", { status: 404 });
export const error = (status: number, message?: string) => Response;
```