import { TodoProvider } from "@/features/todos/context/TodoContext";
import { ThemeProvider } from "./ThemeProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TodoProvider>{children}</TodoProvider>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
