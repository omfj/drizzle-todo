"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { insertCountrySchema } from "@/lib/db/schemas/country";

type FormValues = z.infer<typeof insertCountrySchema>;

export function CreateCountry() {
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(insertCountrySchema),
  });

  const onSubmit = methods.handleSubmit(
    async (data) => {
      if (data.name === "") {
        return alert("Name is required");
      }

      console.log(data);

      const response = await fetch("/api/country", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        methods.reset();
      } else {
        console.error(await response.text());
      }

      router.refresh();
    },
    (error) => console.error(error)
  );

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="font-medium" htmlFor="title">
          Title:
        </label>
        <input
          id="title"
          type="text"
          className="p-2 bg-transparent rounded-lg"
          autoComplete="off"
          {...methods.register("name")}
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-900 hover:bg-indigo-800 px-3 py-2 rounded-lg active:scale-95 transition-all"
      >
        Create country
      </button>
    </form>
  );
}
