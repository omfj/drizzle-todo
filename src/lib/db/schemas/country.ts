import { InferModel } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const country = pgTable("country", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export type Country = InferModel<typeof country>;
export const insertCountrySchema = createInsertSchema(country);
export const selectCountrySchema = createSelectSchema(country);
