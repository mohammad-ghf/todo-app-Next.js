"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";
import { TODO_STORAGE_KEY } from "../constants/todo.constants";

import type { Todo, TodoPriority } from "../types/todo.types";

interface TodoState {
  todos: Todo[];
}

type TodoAction =
  | {
      type: "ADD_TODO";
      payload: {
        title: string;
        description: string;
        priority: TodoPriority;
      };
    }
  | {
      type: "UPDATE_TODO";
      payload: Todo;
    }
  | {
      type: "DELETE_TODO";
      payload: string;
    }
  | {
      type: "TOGGLE_TODO";
      payload: string;
    }
  | {
      type: "HYDRATE_TODOS";
      payload: Todo[];
    };

interface TodoContextValue {
  state: TodoState;
  dispatch: Dispatch<TodoAction>;
}

const initialState: TodoState = {
  todos: [],
};

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "HYDRATE_TODOS": {
      return {
        ...state,
        todos: action.payload,
      };
    }

    case "ADD_TODO": {
      const now = new Date().toISOString();

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        priority: action.payload.priority,
        createdAt: now,
        updatedAt: now,
      };

      return {
        ...state,
        todos: [newTodo, ...state.todos],
      };
    }

    case "UPDATE_TODO": {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };
    }

    case "DELETE_TODO": {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    }

    case "TOGGLE_TODO": {
      const now = new Date().toISOString();

      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed,
                updatedAt: now,
              }
            : todo,
        ),
      };
    }

    default:
      return state;
  }
}

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);

      if (storedTodos) {
        const todos = JSON.parse(storedTodos) as Todo[];

        dispatch({
          type: "HYDRATE_TODOS",
          payload: todos,
        });
      }
    } catch (error) {
      console.error("Failed to load todos from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(state.todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [state.todos, isHydrated]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodoContext must be used within TodoProvider");
  }

  return context;
}
