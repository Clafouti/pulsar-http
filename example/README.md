### Try it out
Fetch the example directory from the repository and run the following commands.

```bash
docker build -t pulsar_pg .
docker run -d -p 5432:5432 --name pulsar_pg_container pulsar_pg
bun start
```