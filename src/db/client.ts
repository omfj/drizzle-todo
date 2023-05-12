import { drizzle } from "drizzle-orm/mysql2";

import mysql from "mysql2/promise";

// const poolConnection = mysql.createPool({
//   host: "localhost",
//   user: "admin",
//   database: "db",
//   password: "password",
//   multipleStatements: true,
// });

const connectionUri =
  process.env.DATABASE_URL ?? "mysql://admin:password@localhost:3306/db";
const poolConnection = mysql.createPool(connectionUri);

export const db = drizzle(poolConnection);
