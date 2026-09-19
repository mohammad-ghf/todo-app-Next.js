"use client";
import { useMemo, useState } from "react";

import TodoFilters, { TodoFilter } from "./TodoFilters";
import TodoForm from "./TodoForm";
import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";
import { useTodoContext } from "../context/TodoContext";

export function TodoApp() {
  const {
    state: { todos },
  } = useTodoContext();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TodoFilter>("all");

  const filteredTodos = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(normalizedSearch) ||
        todo.description.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed);

      return matchesSearch && matchesFilter;
    });
  }, [todos, search, filter]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <TodoHeader />

        <div className="mt-8 space-y-6">
          <TodoForm />
          <TodoFilters
            search={search}
            filter={filter}
            onFilterChange={setFilter}
            onSearchChange={setSearch}
          />
          <TodoList todos={filteredTodos} />
        </div>
      </div>
    </main>
  );
}
