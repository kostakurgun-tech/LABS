import clsx from "clsx";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

// Перетворюємо дату на формат дд.мм.рррр (padStart додає 0 спереду, якщо число одноцифрове)
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() рахує з 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

// Відповідність пріоритету та CSS-класу для кольорової рамки картки
const priorityClassMap: Record<TaskPriority, string> = {
  low: styles.cardLow,
  medium: styles.cardMedium,
  high: styles.cardHigh,
};

function TaskCard({ task, onDelete, onStatusChange }: TaskCardProps) {
  return (
    <div className={clsx(styles.card, priorityClassMap[task.priority])}>
      <h3 className={styles.title}>{task.title}</h3>

      {/* Опис показуємо лише якщо рядок непорожній */}
      {task.description && <p>{task.description}</p>}

      <div className={styles.meta}>
        <span>Пріоритет: {task.priority}</span>
        <span>Створено: {formatDate(task.createdAt)}</span>
      </div>

      <div className={styles.actions}>
        <button onClick={() => onDelete(task.id)}>Видалити</button>

        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
        >
          <option value="todo">Нові</option>
          <option value="in-progress">В роботі</option>
          <option value="done">Виконані</option>
        </select>
      </div>
    </div>
  );
}

export default TaskCard;