import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  // Dependency Injection — Nest.js сам створює екземпляр TasksService і передає сюди
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks — 200
  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  // GET /tasks/search?status=pending — 200
  // Важливо: оголошений ДО @Get(':id')
  @Get('search')
  findByStatus(@Query('status') status?: string): Task[] {
    return this.tasksService.findByStatus(status);
  }

  // GET /tasks/:id — 200 або 404
  @Get(':id')
  findOne(@Param('id') id: string): Task {
    const task = this.tasksService.findOne(id);
    if (!task) throw new NotFoundException(`Завдання #${id} не знайдено`);
    return task;
  }

  // POST /tasks — 201 або 400 (якщо не пройшла валідація)
  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.create(dto);
  }

  // PATCH /tasks/:id — 200 або 400 або 404
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Task {
    const updated = this.tasksService.update(id, dto);
    if (!updated) throw new NotFoundException(`Завдання #${id} не знайдено`);
    return updated;
  }

  // DELETE /tasks/:id — 204 або 404
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    const removed = this.tasksService.remove(id);
    if (!removed) throw new NotFoundException(`Завдання #${id} не знайдено`);
  }
}
