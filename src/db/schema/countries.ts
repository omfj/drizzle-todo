import { InferModel } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const countries = mysqlTable("countries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }),
});

export type Country = InferModel<typeof countries>;
export const insertTodoSchema = createInsertSchema(countries);
export const selectTodoSchema = createSelectSchema(countries);
