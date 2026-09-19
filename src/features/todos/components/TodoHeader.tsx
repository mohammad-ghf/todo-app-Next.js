import ThemeToggle from "./ThemeToggle";

const TodoHeader = () => {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">مدیریت کارها</h1>

        <p className="mt-2 text-muted-foreground">
          کارهای روزانه‌ات را ساده و مرتب مدیریت کن.
        </p>
      </div>

      <ThemeToggle />
    </header>
  );
};

export default TodoHeader;
