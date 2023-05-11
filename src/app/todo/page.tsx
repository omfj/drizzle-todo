import { CreateTodo } from "@/components/create-todo";
import { TodoBox } from "@/components/todo-box";
import { db } from "@/lib/db/client";
import { todo } from "@/lib/db/schemas/todo";
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

      {todos.length === 0 && (
        <p className="text-center text-2xl font-bold">No todos found</p>
      )}

      {todos.length > 0 && (
        <ul className="flex flex-col gap-3">
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoBox todo={todo} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
