import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { TaskStatus, TaskPriority } from '../entities/task.entity/task.entity';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title (1-250 characters)',
    example: 'Complete project',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  title: string;

  @ApiProperty({
    description: 'Task description (1-1024 characters)',
    example: 'Finish the task manager backend',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1024)
  description?: string;

  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.TODO,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    description: 'Task priority',
    enum: TaskPriority,
    example: TaskPriority.MEDIUM,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;
}

