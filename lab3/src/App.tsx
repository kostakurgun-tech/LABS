import TaskForm from "./components/TaskForm/TaskForm";
import type { TaskFormData } from "./components/TaskForm/TaskForm";

function App() {
  const handleSubmit = (data: TaskFormData) => {
    console.log("Нова задача:", data);
  };

  return <TaskForm onSubmit={handleSubmit} />;
}

export default App;