# Лабораторна робота №7 — CRUD API на Nest.js

**Варіант:** 12

## Опис

Task Manager API — серверний застосунок на Nest.js з повним CRUD для управління задачами.
Реалізовано розподіл відповідальностей: сервіс працює з даними, контролер обробляє HTTP.

## Технології

- Nest.js + TypeScript
- @nestjs/config
- class-validator + class-transformer
- ValidationPipe (whitelist, transform)

## Ендпоінти

| Метод  | URL                      | Статус          | Опис                   |
| ------ | ------------------------ | --------------- | ---------------------- |
| GET    | /tasks                   | 200             | Отримати всі задачі    |
| GET    | /tasks/search?status=... | 200             | Фільтрація за статусом |
| GET    | /tasks/:id               | 200 / 404       | Отримати задачу за id  |
| POST   | /tasks                   | 201 / 400       | Створити нову задачу   |
| PATCH  | /tasks/:id               | 200 / 400 / 404 | Оновити задачу         |
| DELETE | /tasks/:id               | 204 / 404       | Видалити задачу        |

## Запуск

1. Скопіюйте `.env.example` у `.env`
2. `npm install`
3. `npm run start:dev`