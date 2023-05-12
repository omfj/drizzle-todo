import { Todo } from "@/db/schema/todos";
import { TodoBox } from "./todo-box";

export function TodoList({ todos }: { todos: Array<Todo> }) {
  if (todos.length === 0) {
    return <p className="text-center text-2xl font-bold">No todos found</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoBox todo={todo} />
        </li>
      ))}
    </ul>
  );
}
