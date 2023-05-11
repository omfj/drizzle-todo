import { InferModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  mysqlTable,
  serial,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

export const todo = mysqlTable("todo", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  body: varchar("body", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isDone: boolean("is_done").notNull().default(false),
});

export type Todo = InferModel<typeof todo>;
export const insertTodoSchema = createInsertSchema(todo);
export const selectTodoSchema = createSelectSchema(todo);
