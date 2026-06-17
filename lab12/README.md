# Лабораторна робота №12 — Контейнеризація застосунку

**Варіант:** 12

## Опис

Повностековий застосунок з JWT-автентифікацією, розгорнутий через Docker Compose.
Backend на Nest.js, frontend на React + Nginx, база даних PostgreSQL — всі сервіси в контейнерах.

## Технології

**Backend:**
- Nest.js + TypeScript
- TypeORM + PostgreSQL
- JWT автентифікація

**Frontend:**
- React + TypeScript + Vite
- Nginx (production збірка)

**Інфраструктура:**
- Docker + Docker Compose

## Структура

lab12/

backend/      — Nest.js API з Dockerfile

frontend/     — React клієнт з Dockerfile + Nginx

compose.yaml  — Docker Compose конфігурація

.env.example  — змінні середовища

## Ендпоінти

| Метод | URL | Опис |
|-------|-----|------|
| POST | /api/auth/register | Реєстрація користувача |
| POST | /api/auth/login | Вхід, повертає JWT |
| GET | /api/auth/me | Профіль користувача (захищений) |

## Запуск

```bash
cp .env.example .env
docker compose up --build
```

Застосунок доступний на http://localhost:8080