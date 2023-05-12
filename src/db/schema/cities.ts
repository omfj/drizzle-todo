import {
  mysqlTable,
  serial,
  varchar,
  mysqlEnum,
  int,
} from "drizzle-orm/mysql-core";
import { countries } from "./countries";
import { InferModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const cities = mysqlTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  countryId: int("country_id").references(() => countries.id),
  popularity: mysqlEnum("popularity", ["unknown", "known", "popular"]),
});

export type City = InferModel<typeof cities>;
export const insertTodoSchema = createInsertSchema(cities);
export const selectTodoSchema = createSelectSchema(cities);
