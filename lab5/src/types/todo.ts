export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Для створення: усі поля, окрім id (його генерує сервер)
export type CreateTodoDto = Omit<Todo, "id">;

// Для оновлення: будь-яке підмножина полів (id передається окремо, в URL)
export type UpdateTodoDto = Partial<Omit<Todo, "id">>;