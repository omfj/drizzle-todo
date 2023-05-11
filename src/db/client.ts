import { drizzle } from "drizzle-orm/mysql2";

import mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  host: "localhost",
  user: "admin",
  database: "db",
  password: "password",
});

export const db = drizzle(poolConnection, {
  logger: true,
});
