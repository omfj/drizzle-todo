"use client";

import { Todo } from "@/lib/db/schemas/todo";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export function TodoBox({ todo }: { todo: Todo }) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch(`/api/todo/${todo.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
    }
  };

  const handleDone = async () => {
    const response = await fetch(`/api/todo/${todo.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isDone: !todo.isDone,
      }),
    });

    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <div className="rounded-lg bg-white/10 p-5 flex flex-col gap-5">
      <h2 className="text-xl font-semibold mb-1">{todo.title}</h2>
      <p>{todo.body}</p>

      <div className="flex gap-2">
        <button
          onClick={handleDone}
          className={clsx(
            "px-3 py-2 rounded-lg active:scale-95 transition-all",
            {
              "bg-green-500 hover:bg-green-400": todo.isDone,
              "bg-orange-500 hover:bg-orange-400": !todo.isDone,
            }
          )}
        >
          {todo.isDone ? "Mark as undone" : "Mark as done"}
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-2 rounded-lg bg-red-800 hover:bg-red-700 active:scale-95 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
