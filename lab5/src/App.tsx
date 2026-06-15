import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todosApi } from "./api/todos";
import type { Todo } from "./types/todo";

function App() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getAll,
  });

  // Створення нової задачі
  const createMutation = useMutation({
    mutationFn: (title: string) =>
      todosApi.create({ title, completed: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    },
  });

  // Оновлення completed через чекбокс (PATCH — змінює лише одне поле)
  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosApi.update(id, { completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Видалення задачі
  const deleteMutation = useMutation({
    mutationFn: (id: number) => todosApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAdd = () => {
    if (title.trim() === "") return;
    createMutation.mutate(title.trim());
  };

  const handleToggle = (todo: Todo) => {
    updateMutation.mutate({ id: todo.id, completed: !todo.completed });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Список задач</h1>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Нова задача"
          style={{ flex: 1, padding: "0.4rem" }}
        />
        <button onClick={handleAdd} disabled={createMutation.isPending}>
          {createMutation.isPending ? "Додавання..." : "Додати"}
        </button>
      </div>

      {/* Стан 1: завантаження */}
      {isLoading && <p>Завантаження...</p>}

      {/* Стан 2: помилка */}
      {isError && <p style={{ color: "red" }}>Помилка: {error.message}</p>}

      {/* Стан 3: успіх — дані готові */}
      {todos && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
              <button onClick={() => handleDelete(todo.id)}>Видалити</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;