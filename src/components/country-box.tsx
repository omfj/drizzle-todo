"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CountryBox({
  country,
}: {
  country: {
    id: number;
    name: string;
    cities: Array<{
      id: number;
      name: string;
    }>;
  };
}) {
  const [city, setCity] = useState("");

  const router = useRouter();

  const handleAddCity = async () => {
    if (city === "") {
      return alert("City name is required");
    }

    const response = await fetch("/api/city", {
      method: "POST",
      body: JSON.stringify({
        name: city,
        countryId: country.id,
      }),
    });

    if (response.ok) {
      setCity("");
    } else {
      console.error(await response.text());
    }

    router.refresh();
  };

  return (
    <div className="rounded-lg bg-white/10 p-5 flex flex-col gap-5">
      <h2 className="text-xl font-semibold mb-1">{country.name}</h2>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">Cities</h3>
        {country.cities.length > 0 && (
          <p>{country.cities.map((city) => city.name).join(", ")}</p>
        )}
        {country.cities.length === 0 && <p>Ingen byer lagt til.</p>}
      </div>

      <div className="grid grid-cols-5 gap-2">
        <input
          className="p-2 col-span-4 border bg-transparent rounded-lg"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleAddCity}
          className="bg-indigo-900 hover:bg-indigo-800 px-3 py-2 rounded-lg active:scale-95 transition-all"
        >
          Add city
        </button>
      </div>
    </div>
  );
}
