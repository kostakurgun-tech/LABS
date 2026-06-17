# Лабораторна робота №10 — Повностековий застосунок з автентифікацією

**Варіант:** 12

## Опис

Повностековий застосунок з JWT-автентифікацією: NestJS backend + React frontend.
Реалізовано реєстрацію, вхід, захищені маршрути та автоматичне оновлення токену.

## Технології

**Backend:**
- Nest.js + TypeScript
- TypeORM + PostgreSQL
- JWT автентифікація
- CORS налаштування

**Frontend:**
- React + TypeScript + Vite
- TanStack Query
- React Hook Form + Zod
- axios (з interceptors для автоматичного додавання токену)

## Структура

lab10/

backend/   — NestJS JWT auth API

frontend/  — React + Vite клієнт

## Функціонал

- Реєстрація з email та паролем
- Вхід з отриманням JWT токену
- Захищений маршрут /profile (редирект на /login якщо не автентифікований)
- Гостьові маршрути /login, /register (редирект на /profile якщо вже увійшов)
- Збереження стану автентифікації в localStorage між перезавантаженнями

## Запуск

**Backend:**
```bash
cd lab10/backend
cp .env.example .env
npm install
npm run migration:run
npm run start:dev
```

**Frontend:**
```bash
cd lab10/frontend
cp .env.example .env
npm install
npm run dev
```

Backend: http://localhost:3000
Frontend: http://localhost:5173