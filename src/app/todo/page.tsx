import { CreateTodo } from "@/components/create-todo";
import { TodoList } from "@/components/todo-list";
import { db } from "@/db/client";
import { todo } from "@/db/schema/todo";
import { desc } from "drizzle-orm";

export default async function TodoPage() {
  const startTime = Date.now();
  const todos = await db.select().from(todo).orderBy(desc(todo.createdAt));
  const endTime = Date.now();

  const queryTime = ((endTime - startTime) / 1000).toFixed(3);

  return (
    <main className="mx-auto my-10 max-w-2xl flex flex-col gap-10">
      <h1 className="text-3xl font-medium text-center">TODO Example</h1>

      <p>
        Query took: <span className="font-bold">{queryTime}s</span>
      </p>

      <CreateTodo />

      <hr />

      <TodoList todos={todos} />
    </main>
  );
}
