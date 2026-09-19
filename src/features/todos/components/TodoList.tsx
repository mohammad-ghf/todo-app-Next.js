"use client";
import { Todo } from "../types/todo.types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <section className="rounded-xl border bg-card">
        <div className="flex min-h-48 items-center justify-center px-6 text-center">
          <div>
            <h2 className="font-semibold">هنوز کاری اضافه نکرده‌ای</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              اولین کار خودت را اضافه کن تا اینجا نمایش داده شود.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-xl border bg-card">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

export default TodoList;
