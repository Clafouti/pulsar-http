import { Pool } from "pg";

export const db = new Pool({
  host: "127.0.0.1",
  database: "test",
  user: "admin",
  password: "admin",
  port: 5432,
});
