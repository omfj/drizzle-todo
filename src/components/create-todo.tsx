"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { insertTodoSchema } from "@/db/schema/todo";
import { z } from "zod";

type FormValues = z.infer<typeof insertTodoSchema>;

export function CreateTodo() {
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: zodResolver(insertTodoSchema),
  });

  const onSubmit = methods.handleSubmit(
    async (data) => {
      if (data.title === "" || data.body === "") {
        return alert("Title and body are required");
      }

      const response = await fetch("/api/todo", {
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
          {...methods.register("title")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium" htmlFor="body">
          Description:
        </label>
        <textarea
          id="body"
          className="p-2 bg-transparent rounded-lg"
          {...methods.register("body")}
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-900 hover:bg-indigo-800 px-3 py-2 rounded-lg active:scale-95 transition-all"
      >
        Create todo
      </button>
    </form>
  );
}
