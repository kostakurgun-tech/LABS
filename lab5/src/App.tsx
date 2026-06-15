import { useQuery } from "@tanstack/react-query";
import { todosApi } from "./api/todos";

function App() {
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getAll,
  });

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Список задач</h1>

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