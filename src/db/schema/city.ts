import {
  mysqlTable,
  serial,
  varchar,
  mysqlEnum,
  int,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const countries = mysqlTable("countries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const cities = mysqlTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  countryId: int("country_id").references(() => countries.id),
  popularity: mysqlEnum("popularity", ["unknown", "known", "popular"]),
});
