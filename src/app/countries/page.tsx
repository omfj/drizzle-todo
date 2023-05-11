import { CountryBox } from "@/components/country-box";
import { CreateCountry } from "@/components/create-country";
import { db } from "@/lib/db/client";
import { City, city } from "@/lib/db/schemas/city";
import { Country, country } from "@/lib/db/schemas/country";
import { asc, eq } from "drizzle-orm";

export default async function CountriesPage() {
  const startTime = Date.now();

  const rows = await db
    .select({
      id: country.id,
      name: country.name,
      city: {
        id: city.id,
        name: city.name,
      },
    })
    .from(country)
    .leftJoin(city, eq(city.countryId, country.id))
    .orderBy(asc(country.name));

  const countries = rows.reduce<
    Record<
      number,
      { id: number; name: string; cities: Array<{ id: number; name: string }> }
    >
  >((acc, row) => {
    const { id, name, city } = row;

    if (!acc[id]) {
      acc[id] = { id, name, cities: [] };
    }

    if (city) {
      acc[id].cities.push(city);
    }

    return acc;
  }, {});

  const endTime = Date.now();

  const queryTime = ((endTime - startTime) / 1000).toFixed(3);

  return (
    <main className="mx-auto my-10 max-w-2xl flex flex-col gap-10">
      <h1 className="text-3xl font-medium text-center">Country Example</h1>

      <p>
        Query took: <span className="font-bold">{queryTime}s</span>
      </p>

      <CreateCountry />

      <hr />

      {Object.values(countries).length === 0 && (
        <p className="text-center text-2xl font-bold">No todos found</p>
      )}

      {Object.values(countries).length > 0 && (
        <ul className="flex flex-col gap-3">
          {Object.values(countries).map((country) => (
            <li key={country.id}>
              <CountryBox country={country} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
