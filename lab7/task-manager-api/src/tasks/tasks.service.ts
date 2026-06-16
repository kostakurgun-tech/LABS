import { Injectable } from '@nestjs/common';
import type { Task } from './entities/task.entity';
import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Розробити дизайн-систему',
      description: 'Визначити кольорову палітру та базові компоненти',
      status: 'done',
      priority: 'high',
      createdAt: '2025-01-10T10:00:00.000Z',
    },
    {
      id: '2',
      title: 'Створити wireframes',
      description: 'Низькодетальні макети структури сторінки',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2025-01-15T10:00:00.000Z',
    },
    {
      id: '3',
      title: 'Провести юзабіліті-тестування',
      description: 'Тестування користувацької зручності',
      status: 'pending',
      priority: 'high',
      createdAt: '2025-01-20T10:00:00.000Z',
    },
    {
      id: '4',
      title: 'Підготувати UI-кіт у Figma',
      description: 'Зібрати компоненти у бібліотеку для команди',
      status: 'pending',
      priority: 'low',
      createdAt: '2025-01-25T10:00:00.000Z',
    },
  ];

  // Повертає весь масив — контролер вирішить що робити з результатом
  findAll(): Task[] {
    return this.tasks;
  }

  // Якщо status не передано — всі задачі; якщо передано — фільтруємо
  findByStatus(status?: string): Task[] {
    if (!status) return this.tasks;
    return this.tasks.filter((task) => task.status === status);
  }

  // Повертає Task або null — НЕ кидає NotFoundException (це робота контролера)
  findOne(id: string): Task | null {
    return this.tasks.find((task) => task.id === id) ?? null;
  }

  // Створює нову задачу зі статусом 'pending' та поточним часом
  create(dto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description ?? '',
      status: 'pending',
      priority: dto.priority,
      createdAt: new Date().toISOString(),
    };

    this.tasks.push(newTask);
    return newTask;
  }

  // Оновлює лише передані поля через spread — повертає null якщо задачу не знайдено
  update(id: string, dto: UpdateTaskDto): Task | null {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) return null;

    // Spread: беремо старий об'єкт і перекриваємо лише передані поля
    const updatedTask: Task = { ...this.tasks[index], ...dto };
    this.tasks[index] = updatedTask;

    return updatedTask;
  }

  // Повертає true якщо видалено, false якщо не знайдено
  remove(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }
}
