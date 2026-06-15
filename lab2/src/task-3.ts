export {};

// Оголошуємо типи та інтерфейс Task так само, як у завданні 1
type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}

// 3.1: Базовий менеджер задач з приватними полями
class TaskManager {
  // Приватні поля — доступні лише всередині цього класу
  #tasks: Task[];
  #nextId: number = 1;

  constructor(initialTasks: Task[] = []) {
    this.#tasks = initialTasks;
  }

  // Створює задачу з dto (без id та createdAt — генеруємо їх тут), додає та повертає
  addTask(dto: Omit<Task, "id" | "createdAt">): Task {
    const task: Task = {
      ...dto,
      id: this.#nextId,
      createdAt: new Date(),
    };

    this.#tasks.push(task);
    this.#nextId += 1;

    return task;
  }

  // Оновлює задачу за id. Якщо не знайдено — повертає null
  updateTask(
    id: number,
    updates: Partial<Omit<Task, "id" | "createdAt">>,
  ): Task | null {
    const index = this.#tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return null;
    }

    const updatedTask: Task = { ...this.#tasks[index], ...updates };
    this.#tasks[index] = updatedTask;

    return updatedTask;
  }

  // Видаляє задачу за id, повертає true якщо щось видалили
  deleteTask(id: number): boolean {
    const lengthBefore = this.#tasks.length;
    this.#tasks = this.#tasks.filter((task) => task.id !== id);

    return this.#tasks.length < lengthBefore;
  }

  // Повертаємо КОПІЮ масиву — ззовні не можна змінити внутрішній стан напряму
  get tasks(): Task[] {
    return [...this.#tasks];
  }

  get count(): number {
    return this.#tasks.length;
  }

  getById(id: number): Task | undefined {
    return this.#tasks.find((task) => task.id === id);
  }
}

// 3.2: Розширений менеджер з методами фільтрації
class FilteredTaskManager extends TaskManager {
  getByStatus(status: Status): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  getByPriority(priority: Priority): Task[] {
    return this.tasks.filter((task) => task.priority === priority);
  }

  getByAssignee(assignee: string): Task[] {
    return this.tasks.filter((task) => task.assignee === assignee);
  }

  // Аналогічно overdue з завдання 1: dueDate минув і задача ще не завершена/скасована
  getOverdue(): Task[] {
    const now = new Date();

    return this.tasks.filter(
      (task) =>
        task.dueDate !== null &&
        task.dueDate < now &&
        task.status !== "done" &&
        task.status !== "cancelled",
    );
  }
}

console.log("=== Завдання 3: Класи та модифікатори доступу ===");

const manager = new FilteredTaskManager();

const task1 = manager.addTask({
  title: "Розробити API",
  description: "REST API для задач",
  status: "in_progress",
  priority: "high",
  assignee: "Іван",
  dueDate: new Date("2025-02-01"),
});

const task2 = manager.addTask({
  title: "Написати тести",
  description: "Покрити unit-тестами основну логіку",
  status: "todo",
  priority: "medium",
  assignee: null,
  dueDate: new Date("2025-02-15"),
});

const task3 = manager.addTask({
  title: "Налаштувати БД",
  description: "Підключити PostgreSQL",
  status: "done",
  priority: "critical",
  assignee: "Іван",
  dueDate: new Date("2025-01-20"),
});

const task4 = manager.addTask({
  title: "Code review",
  description: "Перевірити pull request",
  status: "todo",
  priority: "low",
  assignee: "Олена",
  dueDate: new Date("2025-01-10"),
});

console.log("Додано:", task1);
console.log("Кількість задач:", manager.count);

console.log("Задачі зі статусом 'todo':", manager.getByStatus("todo"));
console.log("Задачі з пріоритетом 'high':", manager.getByPriority("high"));
console.log("Задачі виконавця 'Іван':", manager.getByAssignee("Іван"));
console.log("Просрочені задачі:", manager.getOverdue());

console.log("getById(2):", manager.getById(task2.id));

const updated = manager.updateTask(task4.id, { status: "done" });
console.log("Оновлена задача:", updated);

const deleted = manager.deleteTask(task3.id);
console.log("Видалення задачі:", deleted);
console.log("Кількість задач після видалення:", manager.count);

console.log("Усі задачі:", manager.tasks);