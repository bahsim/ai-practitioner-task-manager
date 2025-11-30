import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Task, TaskStatus, TaskPriority } from './entities/task.entity/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async findAll(
    userId: number,
    filters?: { status?: string; priority?: string; search?: string },
  ): Promise<Task[]> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    // Always filter by ownerId (SEC-3, TASK-9)
    queryBuilder.where('task.ownerId = :userId', { userId });

    // Apply status filter if provided (TASK-4)
    if (filters?.status) {
      if (!Object.values(TaskStatus).includes(filters.status as TaskStatus)) {
        throw new BadRequestException('Invalid status value');
      }
      queryBuilder.andWhere('task.status = :status', { status: filters.status });
    }

    // Apply priority filter if provided (TASK-5)
    if (filters?.priority) {
      if (!Object.values(TaskPriority).includes(filters.priority as TaskPriority)) {
        throw new BadRequestException('Invalid priority value');
      }
      queryBuilder.andWhere('task.priority = :priority', {
        priority: filters.priority,
      });
    }

    // Apply search filter if provided (TASK-6, TASK-7, DT-5)
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      queryBuilder.andWhere(
        '(LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search)',
        { search: `%${searchTerm}%` },
      );
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException('Resource not found');
    }

    // Verify ownership (SEC-1, TASK-9)
    if (task.ownerId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    // Apply defaults (TASK-2 Default, TASK-3 Default)
    const task = this.taskRepository.create({
      ...createTaskDto,
      ownerId: userId, // TASK-8
      status: createTaskDto.status || TaskStatus.TODO,
      priority: createTaskDto.priority || TaskPriority.MEDIUM,
    });

    return await this.taskRepository.save(task);
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ): Promise<Task> {
    const task = await this.findOne(id, userId); // This will verify ownership

    // Update provided fields
    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }

    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description || null;
    }

    if (updateTaskDto.status !== undefined) {
      if (!Object.values(TaskStatus).includes(updateTaskDto.status)) {
        throw new BadRequestException('Invalid status value');
      }
      task.status = updateTaskDto.status;
    }

    if (updateTaskDto.priority !== undefined) {
      if (!Object.values(TaskPriority).includes(updateTaskDto.priority)) {
        throw new BadRequestException('Invalid priority value');
      }
      task.priority = updateTaskDto.priority;
    }

    // ownerId is immutable - do NOT update

    return await this.taskRepository.save(task);
  }

  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findOne(id, userId); // This will verify ownership
    await this.taskRepository.remove(task);
  }
}
