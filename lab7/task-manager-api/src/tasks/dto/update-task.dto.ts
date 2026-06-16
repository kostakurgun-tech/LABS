import { IsString, IsIn, IsOptional, MaxLength } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsIn(['pending', 'in-progress', 'done'], {
    message: 'Статус має бути: pending, in-progress або done',
  })
  status?: 'pending' | 'in-progress' | 'done';

  @IsOptional()
  @IsIn(['low', 'medium', 'high'], {
    message: 'Пріоритет має бути: low, medium або high',
  })
  priority?: 'low' | 'medium' | 'high';
}
