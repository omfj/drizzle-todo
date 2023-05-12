import { CreateTodo } from "@/components/create-todo";
import { TodoList } from "@/components/todo-list";
import { db } from "@/db/client";
import { todos } from "@/db/schema/todos";
import { desc } from "drizzle-orm";

export default async function TodoPage() {
  const startTime = Date.now();
  const rows = await db.select().from(todos).orderBy(desc(todos.id));
  const endTime = Date.now();

  const queryTime = (endTime - startTime) / 1000;

  return (
    <main className="mx-auto my-10 max-w-2xl flex flex-col gap-10">
      <h1 className="text-3xl font-medium text-center">TODO Example</h1>

      <p>
        Fetched {rows.length} TODOs in{" "}
        <span className="font-bold">{queryTime}s</span>
      </p>

      <CreateTodo />

      <hr />

      <TodoList todos={rows} />
    </main>
  );
}
