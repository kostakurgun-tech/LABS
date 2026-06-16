import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import type { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
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
      description: '',
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

  // GET /tasks — повертає весь масив задач
  @Get()
  findAll(): Task[] {
    return this.tasks;
  }

  // GET /tasks/search?status=pending
  // Важливо: оголошений ДО @Get(':id'), щоб 'search' не сприймалось як :id
  @Get('search')
  findByStatus(@Query('status') status?: string): Task[] {
    if (!status) {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.status === status);
  }

  // GET /tasks/:id
  @Get(':id')
  findOne(@Param('id') id: string): Task | { message: string } {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      return { message: `Задачу з id=${id} не знайдено` };
    }

    return task;
  }

  // POST /tasks — створює нову задачу зі статусом 'pending'
  @Post()
  create(@Body() dto: CreateTaskDto): Task {
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

  // DELETE /tasks/:id
  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return { message: `Задачу з id=${id} не знайдено` };
    }

    this.tasks.splice(index, 1);
    return { message: `Задачу з id=${id} успішно видалено` };
  }
}
