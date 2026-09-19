"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTodoContext } from "../context/TodoContext";
import type { TodoPriority } from "../types/todo.types";

const TodoForm = () => {
  const { dispatch } = useTodoContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("medium");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    dispatch({
      type: "ADD_TODO",
      payload: {
        title: trimmedTitle,
        description: description.trim(),
        priority,
      },
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <section className="rounded-xl border bg-card p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="todo-title">عنوان کار</Label>

          <Input
            id="todo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثلاً: مطالعه TypeScript"
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="todo-description">توضیحات</Label>

          <Textarea
            id="todo-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="توضیحات مربوط به این کار..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>اولویت</Label>

          <Select
            value={priority}
            onValueChange={(value) => setPriority(value as TodoPriority)}
          >
            <SelectTrigger>
              <SelectValue placeholder="انتخاب اولویت" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="low">کم</SelectItem>

              <SelectItem value="medium">متوسط</SelectItem>

              <SelectItem value="high">زیاد</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          <Plus />
          افزودن کار
        </Button>
      </form>
    </section>
  );
};

export default TodoForm;
