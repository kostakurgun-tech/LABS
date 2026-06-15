import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todosApi } from "./api/todos";

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
      // Кеш todos застарів — змушуємо useQuery перезавантажити список
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    },
  });

  const handleAdd = () => {
    if (title.trim() === "") return;
    createMutation.mutate(title.trim());
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
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;