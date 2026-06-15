# Лабораторна робота №4 — Багатосторінковий React-застосунок

**Варіант:** 12

## Опис

Task Manager — багатосторінковий SPA для управління задачами з маршрутизацією через React Router.

## Технології

- React 18 + TypeScript
- Vite
- React Router v7
- useState (підняття стану в App.tsx — варіант А)

## Структура

- `src/types/` — типи домену
- `src/data/` — початкові дані задач
- `src/components/Layout/` — загальний layout з навігацією
- `src/components/TaskCard/` — картка задачі
- `src/pages/TasksPage/` — список задач (`/tasks`)
- `src/pages/TaskDetailPage/` — деталі задачі (`/tasks/:id`)
- `src/pages/NewTaskPage/` — форма створення задачі (`/tasks/new`)

## Запуск

npm install
npm run dev