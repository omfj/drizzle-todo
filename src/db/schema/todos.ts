import { InferModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
  mysqlTable,
  serial,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

export const todos = mysqlTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  body: varchar("body", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isDone: boolean("is_done").notNull().default(false),
});

export type SelectTodo = InferModel<typeof todos, "select">;
export type InsertTodo = InferModel<typeof todos, "insert">;
export const insertTodoSchema = createInsertSchema(todos);
export const selectTodoSchema = createSelectSchema(todos);
