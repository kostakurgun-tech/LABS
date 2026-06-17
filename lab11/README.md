# Лабораторна робота №11 — Завантаження файлів

**Варіант:** 12

## Опис

Повностековий застосунок для завантаження файлів: NestJS backend з Multer + React frontend.
Реалізовано завантаження зображень з валідацією типу та розміру, перегляд та список файлів.

## Технології

**Backend:**
- Nest.js + TypeScript
- Multer (завантаження файлів)

**Frontend:**
- React + TypeScript + Vite
- axios (з підтримкою прогресу завантаження)

## Структура

lab11/

backend/   — NestJS + Multer API

frontend/  — Vite + React клієнт

## Ендпоінти

| Метод | URL | Опис |
|-------|-----|------|
| POST | /files | Завантажити файл (JPEG/PNG/WebP, макс. 5MB) |
| GET | /files | Список всіх завантажених файлів |
| GET | /uploads/:name | Отримати файл за іменем |

## Функціонал

- Вибір файлу з клієнтською валідацією (тип + розмір)
- Попередній перегляд зображення через URL.createObjectURL
- Прогрес-бар завантаження через axios onUploadProgress
- Серверна валідація типу та розміру файлу
- Файли зберігаються під UUID іменами в папці uploads/
- Список раніше завантажених файлів

## Запуск

**Backend:**
```bash
cd lab11/backend
npm install
npm run start:dev
```

**Frontend:**
```bash
cd lab11/frontend
cp .env.example .env
npm install
npm run dev
```

Backend: http://localhost:3000
Frontend: http://localhost:5173