import type { Task } from "../types/task";

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-12-1",
    title: "Розробити дизайн-систему для проєкту",
    description: "Визначити кольорову палітру, типографіку та базові компоненти",
    status: "done",
    priority: "high",
    createdAt: new Date("2025-01-10"),
  },
  {
    id: "task-12-2",
    title: "Створити wireframes головної сторінки",
    description: "Низькодетальні макети структури сторінки перед розробкою дизайну",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "task-12-3",
    title: "Провести юзабіліті-тестування прототипу",
    description: "",
    status: "todo",
    priority: "high",
    createdAt: new Date("2025-01-20"),
  },
  {
    id: "task-12-4",
    title: "Підготувати UI-кіт у Figma",
    description: "Зібрати компоненти у бібліотеку для команди розробки",
    status: "todo",
    priority: "low",
    createdAt: new Date("2025-01-25"),
  },
  {
    id: "task-12-5",
    title: "Оновити брендбук компанії",
    description: "Узгодити нові гайдлайни логотипу та фірмових кольорів",
    status: "done",
    priority: "medium",
    createdAt: new Date("2025-02-01"),
  },
];