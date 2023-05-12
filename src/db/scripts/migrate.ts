import { migrate } from "drizzle-orm/mysql2/migrator";
import { db } from "../client";

migrate(db, { migrationsFolder: "./src/db/migrations" })
  .then(() => {
    console.log("✅ Migrations complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Migrations failed...", err);
    process.exit(1);
  });
