"use client";

import { Country } from "@/db/schema/country";

export function CountryBox({ country }: { country: Country }) {
  return (
    <div className="rounded-lg bg-white/10 p-5 flex flex-col gap-5">
      <h2 className="text-xl font-semibold mb-1">{country.name}</h2>
    </div>
  );
}
