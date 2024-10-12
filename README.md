## Asynchronous HTTP server engine

[Link to the repository](https://github.com/jvnm-dev/pulsar-http) - [Link to the documentation](https://jvnm-dev.github.io/pulsar-http/)

Pulsar is a lightweight, high-performance, non-blocking HTTP server engine written with Bun. 

It is designed to accelerate the development of web applications and web services.

### Features
- Asynchronous request handling
- Routing with groups and parameters
- Middleware composition
- Static file serving

### Installation from scratch
```bash
bun init
bun add pulsar-http
```

### Documentation
- [Routing](docs/routing.md)
- [Middleware](docs/middleware.md)
- [Responses](docs/responses.md)
- [Hello world example](docs/hello-world.md)

### Try it out
Fetch the example directory from the repository and run the following commands.

```bash
docker build -t pulsar_pg .
docker run -d -p 5432:5432 --name pulsar_pg_container pulsar_pg
bun start
```


