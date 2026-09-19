"use client";
import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import type { Todo, TodoPriority } from "../types/todo.types";
import { useTodoContext } from "../context/TodoContext";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
}

const priorityConfig: Record<
  TodoPriority,
  {
    label: string;
  }
> = {
  low: {
    label: "کم",
  },
  medium: {
    label: "متوسط",
  },
  high: {
    label: "زیاد",
  },
};
const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { dispatch } = useTodoContext();
  const priority = priorityConfig[todo.priority];

  const handleToggle = () => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: todo.id,
    });
  };

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TODO",
      payload: todo.id,
    });
  };

  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editPriority, setEditPriority] = useState<TodoPriority>(todo.priority);

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = editTitle.trim();

    if (!title) {
      return;
    }

    dispatch({
      type: "UPDATE_TODO",
      payload: {
        ...todo,
        title,
        description: editDescription.trim(),
        priority: editPriority,
        updatedAt: new Date().toISOString(),
      },
    });

    setIsEditOpen(false);
  };

  return (
    <Accordion>
      <AccordionItem value={todo.id} className="border-b last:border-b-0">
        <div className="flex items-center gap-3 px-4">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggle}
            aria-label={`تغییر وضعیت ${todo.title}`}
          />

          <AccordionTrigger className="flex-1 py-4 hover:no-underline">
            <div className="flex min-w-0 flex-1 items-center gap-3 text-right">
              <span
                className={
                  todo.completed
                    ? "truncate text-muted-foreground line-through"
                    : "truncate font-medium"
                }
              >
                {todo.title}
              </span>

              <Badge variant="secondary">{priority.label}</Badge>
            </div>
          </AccordionTrigger>

          <div className="flex items-center gap-1">
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger>
                <Button variant="ghost" size="icon" aria-label="ویرایش کار">
                  <Pencil />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>ویرایش کار</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleEdit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor={`edit-title-${todo.id}`}>عنوان کار</Label>

                    <Input
                      id={`edit-title-${todo.id}`}
                      value={editTitle}
                      onChange={(event) => setEditTitle(event.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`edit-description-${todo.id}`}>
                      توضیحات
                    </Label>

                    <Textarea
                      id={`edit-description-${todo.id}`}
                      value={editDescription}
                      onChange={(event) =>
                        setEditDescription(event.target.value)
                      }
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>اولویت</Label>

                    <Select
                      value={editPriority}
                      onValueChange={(value) =>
                        setEditPriority(value as TodoPriority)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="low">کم</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="high">زیاد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditOpen(false)}
                    >
                      انصراف
                    </Button>

                    <Button type="submit">ذخیره تغییرات</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              onClick={handleDelete}
              variant="ghost"
              size="icon"
              aria-label="حذف کار"
            >
              <Trash2 />
            </Button>
          </div>
        </div>

        <AccordionContent className="px-4 pb-4">
          <div className="mr-10 space-y-3 rounded-lg bg-muted/50 p-4">
            <p className="text-sm leading-7 text-muted-foreground">
              {todo.description || "توضیحی برای این کار ثبت نشده است."}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span>ایجاد شده: {todo.createdAt}</span>

              <span>آخرین تغییر: {todo.updatedAt}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TodoItem;
