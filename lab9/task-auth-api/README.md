# Лабораторна робота №9 — Автентифікація у Nest.js

**Варіант:** 12

## Опис

Task Auth API — серверний застосунок на Nest.js з JWT-автентифікацією.
Реалізовано реєстрацію, вхід та захищені маршрути через JwtAuthGuard.

## Технології

- Nest.js + TypeScript
- TypeORM + PostgreSQL
- JWT (JSON Web Tokens)
- @nestjs/config
- class-validator + class-transformer
- Migrations

## Змінні середовища

Скопіюй `.env.example` у `.env` та заповни значення.

## Ендпоінти

| Метод | URL | Опис |
|-------|-----|------|
| POST | /auth/register | Реєстрація нового користувача |
| POST | /auth/login | Вхід, повертає JWT токен |
| GET | /users/me | Профіль поточного користувача (захищений) |

## Запуск

1. Скопіюйте `.env.example` у `.env` та заповніть змінні
2. `npm install`
3. `npm run migration:run`
4. `npm run start:dev`