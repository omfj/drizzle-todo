import { InferModel } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { country } from "./country";

export const city = pgTable("city", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  countryId: integer("country_id").references(() => country.id),
});

export type City = InferModel<typeof city>;
export const insertCitySchema = createInsertSchema(city);
export const selectCitySchema = createSelectSchema(city);
