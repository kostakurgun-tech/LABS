export {};

// 1.1: Допустимі статуси задачі (union type — лише одне з перелічених значень)
type Status = "todo" | "in_progress" | "done" | "cancelled";

// 1.2: Допустимі рівні пріоритету
type Priority = "low" | "medium" | "high" | "critical";

// 1.3: Структура однієї задачі
interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null; // null, якщо задача не призначена
  createdAt: Date;
  dueDate: Date | null;
}

// 1.4: Базовий інтерфейс з id, який Project успадковує через extends
interface HasId {
  id: number;
}

interface Project extends HasId {
  name: string;
  description: string;
  tasks: Task[];
  ownerId: number;
}

// 1.5: Рахуємо статистику: загальна кількість, розподіл по статусах, кількість просрочених
function getTaskStats(tasks: Task[]): {
  total: number;
  byStatus: Record<Status, number>;
  overdue: number;
} {
  const now = new Date();

  return tasks.reduce(
    (stats, task) => {
      stats.total += 1;
      stats.byStatus[task.status] += 1;

      // Задача просрочена, якщо є dueDate, він вже минув, і задача ще не завершена/скасована
      const isOverdue =
        task.dueDate !== null &&
        task.dueDate < now &&
        task.status !== "done" &&
        task.status !== "cancelled";

      if (isOverdue) {
        stats.overdue += 1;
      }

      return stats;
    },
    {
      total: 0,
      byStatus: { todo: 0, in_progress: 0, done: 0, cancelled: 0 },
      overdue: 0,
    },
  );
}

// 1.6: Форматуємо задачу у короткий рядок для відображення
function formatTask(task: Task): string {
  return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}

console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");

const tasks: Task[] = [
  {
    id: 1,
    title: "Налаштувати CI/CD",
    description: "Автоматизувати збірку та деплой",
    status: "in_progress",
    priority: "high",
    assignee: "Іван Петренко",
    createdAt: new Date("2025-01-10"),
    dueDate: new Date("2025-02-01"),
  },
  {
    id: 2,
    title: "Написати тести",
    description: "Покрити unit-тестами основну логіку",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2025-01-12"),
    dueDate: new Date("2025-02-15"),
  },
  {
    id: 3,
    title: "Налаштувати БД",
    description: "Підключити PostgreSQL, виконати міграції",
    status: "done",
    priority: "critical",
    assignee: "Олена Коваль",
    createdAt: new Date("2025-01-05"),
    dueDate: new Date("2025-01-20"),
  },
  {
    id: 4,
    title: "Оновити документацію",
    description: "Описати API у Swagger",
    status: "todo",
    priority: "low",
    assignee: null,
    createdAt: new Date("2025-01-15"),
    dueDate: null,
  },
  {
    id: 5,
    title: "Code review",
    description: "Перевірити pull request від команди",
    status: "cancelled",
    priority: "medium",
    assignee: "Андрій Лисенко",
    createdAt: new Date("2025-01-18"),
    dueDate: new Date("2025-01-25"),
  },
];

console.log("Статистика:", getTaskStats(tasks));

tasks.forEach((task) => console.log(formatTask(task)));