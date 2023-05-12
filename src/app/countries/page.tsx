import { CountryList } from "@/components/country-list";
import { db } from "@/db/client";
import { countries } from "@/db/schema/countries";
import { desc } from "drizzle-orm";

export default async function CountriesPage() {
  const startTime = Date.now();
  const rows = await db.select().from(countries).orderBy(desc(countries.name));
  const endTime = Date.now();

  const queryTime = ((endTime - startTime) / 1000).toFixed(3);

  return (
    <main className="mx-auto my-10 max-w-2xl flex flex-col gap-10">
      <h1 className="text-3xl font-medium text-center">Countries Example</h1>

      <p>
        Query took: <span className="font-bold">{queryTime}s</span>
      </p>

      <hr />

      <CountryList countries={rows} />
    </main>
  );
}
