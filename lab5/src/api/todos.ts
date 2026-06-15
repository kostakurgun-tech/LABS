import type { Todo, CreateTodoDto, UpdateTodoDto } from "../types/todo";

const BASE_URL = "http://localhost:3001";

export const todosApi = {
  // GET /todos — отримати всі задачі
  async getAll(): Promise<Todo[]> {
    const response = await fetch(`${BASE_URL}/todos`);

    if (!response.ok) {
      throw new Error(`Помилка завантаження: ${response.status}`);
    }

    return response.json();
  },

  // POST /todos — створити нову задачу
  async create(dto: CreateTodoDto): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error(`Помилка створення: ${response.status}`);
    }

    return response.json();
  },

  // PATCH /todos/:id — частково оновити задачу (наприклад, лише completed)
  async update(id: number, dto: UpdateTodoDto): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      throw new Error(`Помилка оновлення: ${response.status}`);
    }

    return response.json();
  },

  // DELETE /todos/:id — видалити задачу
  async remove(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Помилка видалення: ${response.status}`);
    }
  },
};