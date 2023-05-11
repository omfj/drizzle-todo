import { InferModel } from "drizzle-orm";
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  title: text("full_name").notNull(),
  body: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isDone: boolean("is_done").notNull().default(false),
});

export type Todo = InferModel<typeof todo>;
export const insertTodoSchema = createInsertSchema(todo);
export const selectTodoSchema = createSelectSchema(todo);
