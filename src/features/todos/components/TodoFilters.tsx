"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type TodoFilter = "all" | "active" | "completed";

interface TodoFiltersProps {
  search: string;
  filter: TodoFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: TodoFilter) => void;
}

const TodoFilters = ({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}: TodoFiltersProps) => {
  return (
    <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="جستجوی کارها..."
          className="pr-9"
          aria-label="جستجوی کارها"
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => onFilterChange("all")}
        >
          همه
        </Button>

        <Button
          type="button"
          variant={filter === "active" ? "default" : "outline"}
          onClick={() => onFilterChange("active")}
        >
          فعال
        </Button>

        <Button
          type="button"
          variant={
            filter === "completed" ? "default" : "outline"
          }
          onClick={() => onFilterChange("completed")}
        >
          انجام‌شده
        </Button>
      </div>
    </section>
  );
}


export default TodoFilters;