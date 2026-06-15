export {};

// Оголошуємо типи та інтерфейс Task так само, як у попередніх завданнях
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

// 5.1: Розмічене об'єднання — кожен варіант має своє унікальне значення поля status
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T; loadedAt: Date };
type ErrorState = { status: "error"; message: string; code: number };

type FetchState<T> = LoadingState | SuccessState<T> | ErrorState;

// 5.2: Type guard функції — предикат "state is X" дозволяє TS звужувати тип після перевірки
function isLoadingState(state: FetchState<unknown>): state is LoadingState {
  return state.status === "loading";
}

function isSuccessState<T>(state: FetchState<T>): state is SuccessState<T> {
  return state.status === "success";
}

function isErrorState(state: FetchState<unknown>): state is ErrorState {
  return state.status === "error";
}

// 5.3: Залежно від стану повертаємо різний рядок.
// Після кожної перевірки TS звужує тип state до конкретного варіанту
function renderState<T>(
  state: FetchState<T>,
  renderData: (data: T) => string,
): string {
  if (isLoadingState(state)) {
    return "⏳ Завантаження...";
  }

  if (isSuccessState(state)) {
    return `✅ Завантажено о ${state.loadedAt.toLocaleTimeString()}: ${renderData(state.data)}`;
  }

  // тут залишається лише ErrorState
  return `❌ Помилка ${state.code}: ${state.message}`;
}

// 5.4: typeof — вбудований type guard для примітивів.
// null/undefined перевіряємо ПЕРШИМИ окремо, бо typeof null === "object"
function processValue(
  value: string | number | boolean | null | undefined,
): string {
  if (value === null || value === undefined) {
    return "(порожнє значення)";
  }

  if (typeof value === "string") {
    return `Рядок: '${value}' (${value.length} символів)`;
  }

  if (typeof value === "number") {
    const parity = value % 2 === 0 ? "парне" : "непарне";
    return `Число: ${value} (${parity})`;
  }

  // тут value: boolean
  return `Булеве: ${value ? "так" : "ні"}`;
}

// 5.5: Exhaustive check — default через never гарантує,
// що всі варіанти Status оброблені (компілятор підкаже, якщо додати новий статус)
function getStatusLabel(status: Status): string {
  switch (status) {
    case "todo":
      return "До виконання";
    case "in_progress":
      return "У роботі";
    case "done":
      return "Виконано";
    case "cancelled":
      return "Скасовано";
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

console.log("=== Завдання 5: Type Guards та звуження типів ===");

const states: FetchState<Task[]>[] = [
  { status: "loading" },
  { status: "success", data: [], loadedAt: new Date() },
  { status: "error", message: "Not found", code: 404 },
];

states.forEach((state) => {
  console.log(renderState(state, (tasks) => `${tasks.length} задач`));
});

// Демонстрація processValue
const values: (string | number | boolean | null | undefined)[] = [
  "TypeScript",
  42,
  true,
  null,
  undefined,
  0,
  "",
];
values.forEach((v) => console.log(processValue(v)));

// Демонстрація getStatusLabel
const statuses: Status[] = ["todo", "in_progress", "done", "cancelled"];
statuses.forEach((s) => console.log(`${s} -> ${getStatusLabel(s)}`));