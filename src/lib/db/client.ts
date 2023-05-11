import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ??
  "postgres://admin:password@localhost:5432/postgres";

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool);
