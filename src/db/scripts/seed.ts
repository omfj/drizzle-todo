import { z } from "zod";
import { db } from "../client";
import { insertTodoSchema, todos } from "../schema/todos";

const ROWS = 50_000;

async function main() {
  await db.delete(todos);

  let seedTodos: Array<z.infer<typeof insertTodoSchema>> = [];

  for (let i = 0; i < ROWS; i++) {
    seedTodos.push({
      title: `Todo ${i}`,
      body: "Lorem ipsum",
    });
  }

  const startTime = new Date().getTime();
  await db.insert(todos).values(seedTodos);
  const endTime = new Date().getTime();

  return (endTime - startTime) / 1000;
}

main()
  .then((time) => {
    console.log(`✅ Seeding compelete! Took ${time}ms.`);
    process.exit(0);
  })
  .catch((error) => {
    console.log("❌ Seeding failed...");
    console.log(error);
    process.exit(1);
  });
