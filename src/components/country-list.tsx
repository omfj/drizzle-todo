import { Country } from "@/db/schema/country";
import { CountryBox } from "./country-box";

export function CountryList({ countries }: { countries: Array<Country> }) {
  if (countries.length === 0) {
    return <p className="text-center text-2xl font-bold">No countries found</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {countries.map((country) => (
        <li key={country.id}>
          <CountryBox country={country} />
        </li>
      ))}
    </ul>
  );
}
