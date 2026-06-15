import { VARIANT } from "./config";

// Оголошуємо типи та інтерфейс Task так само, як у завданні 1
// (файл уже є модулем завдяки import, тому export {} не потрібен)
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

const tasks: Task[] = [
  {
    id: 1 + VARIANT,
    title: "Розробити API",
    description: "Реалізувати REST API для управління задачами",
    status: "in_progress",
    priority: "high",
    assignee: "Іван Петренко",
    createdAt: new Date("2025-01-10"),
    dueDate: new Date("2025-02-01"),
  },
  {
    id: 2 + VARIANT,
    title: "Написати тести",
    description: "Покрити unit-тестами основну логіку",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2025-01-12"),
    dueDate: new Date("2025-02-15"),
  },
  {
    id: 3 + VARIANT,
    title: "Налаштувати БД",
    description: "Підключити PostgreSQL, виконати міграції",
    status: "done",
    priority: "critical",
    assignee: "Олена Коваль",
    createdAt: new Date("2025-01-05"),
    dueDate: new Date("2025-01-20"),
  },
  {
    id: 4 + VARIANT,
    title: "Оновити документацію",
    description: "Описати API у Swagger",
    status: "todo",
    priority: "low",
    assignee: null,
    createdAt: new Date("2025-01-15"),
    dueDate: null,
  },
  {
    id: 5 + VARIANT,
    title: "Code review",
    description: "Перевірити pull request від команди",
    status: "cancelled",
    priority: "medium",
    assignee: "Андрій Лисенко",
    createdAt: new Date("2025-01-18"),
    dueDate: new Date("2025-01-25"),
  },
];

// 2.1: Узагальнений "конверт" для відповіді API — T може бути будь-яким типом даних
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Створює успішну відповідь з переданими даними
function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    status: 200,
    message: "Success",
    timestamp: new Date(),
  };
}

// Створює відповідь-помилку: даних немає (null), є лише повідомлення
function createErrorResponse<T>(message: string): ApiResponse<T | null> {
  return {
    data: null,
    status: 500,
    message,
    timestamp: new Date(),
  };
}

// 2.2: DTO для створення задачі — всі поля Task, крім id та createdAt (генеруються автоматично)
type CreateTaskDto = Omit<Task, "id" | "createdAt">;

// DTO для оновлення — те саме, але всі поля необов'язкові (можна передати лише те, що змінюється)
type UpdateTaskDto = Partial<Omit<Task, "id" | "createdAt">>;

// 2.3: Фільтруємо задачі за будь-яким полем Task з типобезпекою:
// K — назва поля (з набору ключів Task), value — значення САМЕ ТОГО ТИПУ, що й це поле
function filterTasks<K extends keyof Task>(
  tasks: Task[],
  key: K,
  value: Task[K],
): Task[] {
  return tasks.filter((task) => task[key] === value);
}

console.log("=== Завдання 2: Generics та Utility Types ===");
console.log("Варіант:", VARIANT);

console.log("createSuccessResponse:", createSuccessResponse(tasks));
console.log(
  "createErrorResponse:",
  createErrorResponse<Task[]>("Не вдалося завантажити задачі"),
);

const newTaskDto: CreateTaskDto = {
  title: "Деплой на продакшн",
  description: "Розгорнути нову версію на сервері",
  status: "todo",
  priority: "high",
  assignee: null,
  dueDate: new Date("2025-03-01"),
};
console.log("CreateTaskDto:", newTaskDto);

const updateDto: UpdateTaskDto = {
  status: "done",
};
console.log("UpdateTaskDto:", updateDto);

console.log(
  "Задачі зі статусом 'todo':",
  filterTasks(tasks, "status", "todo"),
);
console.log(
  "Задачі з пріоритетом 'high':",
  filterTasks(tasks, "priority", "high"),
);
console.log(
  "Задачі без виконавця:",
  filterTasks(tasks, "assignee", null),
);