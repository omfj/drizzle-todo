import { db } from "../client";
import { city } from "../schemas/city";
import { country } from "../schemas/country";
import { todo } from "../schemas/todo";

async function main() {
  await db.insert(todo).values([
    {
      title: "Learn Drizzle",
      body: "Learn how to use Drizzle ORM",
    },
    {
      title: "Stop using Prisma",
      body: "Use Drizzle ORM instead",
    },
    {
      title: "Contribute to Drizzle ORM",
      body: "Write some code for Drizzle ORM",
    },
  ]);

  await db.insert(country).values([
    {
      name: "Norway",
    },
    {
      name: "Albania",
    },
    {
      id: 3,
      name: "Sweden",
    },
  ]);

  await db.insert(city).values([
    {
      name: "Oslo",
      countryId: 1,
    },
    {
      name: "Bergen",
      countryId: 1,
    },
    {
      name: "Trondheim",
      countryId: 1,
    },
    {
      name: "Tirana",
      countryId: 2,
    },
  ]);
}

main()
  .then(() => {
    console.log("Seeding complete!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding failed!", err);
    process.exit(1);
  });
