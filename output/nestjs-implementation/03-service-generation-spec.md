# Service Generation Specification: Task Manager Backend

**Objective:** Generate service classes with CRUD operations and business rule enforcement based on domain models, business rules, and API specification.

**Input Sources:** 
- `output/documentation/domain-models.md` - Entity definitions
- `output/documentation/business-rules.md` - Business logic rules, validation rules
- `output/documentation/api-specification.md` - Endpoint requirements, query parameters

## Service Specifications

### UsersService

**File Location:** `src/users/users.service.ts`

**Module:** users

**Dependencies:**
- `@InjectRepository(User)` - TypeORM User repository

**Methods:**

#### findOne(id: number): Promise<User>
- **Business Rules:** USER-6 (Users can only view their own profile)
- **Implementation:** Find user by ID, return user without password
- **Error Handling:** Throw NotFoundException if user not found
- **Return:** User entity (password excluded via serialization)

#### update(id: number, updateUserDto: UpdateUserDto): Promise<User>
- **Business Rules:** USER-5 (Password can be updated), USER-7 (Users can only update their own profile), USER-3 (Username immutable), USER-4 (Email immutable)
- **Implementation:** 
  - Verify user exists
  - Hash password if provided in updateDto
  - Update allowed fields (password, about, avatar)
  - Do NOT update username or email (immutable)
- **Error Handling:** Throw NotFoundException if user not found
- **Return:** Updated user entity (password excluded)

### TasksService

**File Location:** `src/tasks/tasks.service.ts`

**Module:** tasks

**Dependencies:**
- `@InjectRepository(Task)` - TypeORM Task repository

**Methods:**

#### findAll(userId: number, filters?: { status?: string, priority?: string, search?: string }): Promise<Task[]>
- **Business Rules:** TASK-9 (Users can only view their own tasks), SEC-3 (Resource lists filtered by authenticated user's ID), TASK-4 (Filter by status), TASK-5 (Filter by priority), TASK-6 (Search by title and description), TASK-7 (Case-insensitive partial match)
- **Implementation:**
  - Filter by ownerId (userId) - always apply
  - Apply status filter if provided (query parameter)
  - Apply priority filter if provided (query parameter)
  - Apply search filter if provided (case-insensitive partial match on title and description)
  - Convert search query to lowercase for case-insensitive matching (DT-5)
- **Error Handling:** None (returns empty array if no tasks)
- **Return:** Array of Task entities

#### findOne(id: number, userId: number): Promise<Task>
- **Business Rules:** TASK-9 (Users can only view their own tasks), SEC-1 (Ownership verification before read)
- **Implementation:**
  - Find task by ID
  - Verify ownership (task.ownerId === userId)
  - Throw ForbiddenException if not owner (SEC-2)
- **Error Handling:** 
  - Throw NotFoundException if task not found (ERR-7)
  - Throw ForbiddenException if not owner (ERR-6)
- **Return:** Task entity

#### create(createTaskDto: CreateTaskDto, userId: number): Promise<Task>
- **Business Rules:** TASK-1 (Tasks must have title), TASK-8 (Users can only create tasks for themselves), TASK-2 Default (status defaults to "todo"), TASK-3 Default (priority defaults to "medium")
- **Implementation:**
  - Set ownerId to userId (authenticated user)
  - Apply defaults: status = "todo" if not provided, priority = "medium" if not provided
  - Create task with provided fields
- **Error Handling:** Throw BadRequestException for validation errors (ERR-1)
- **Return:** Created Task entity

#### update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task>
- **Business Rules:** TASK-10 (Users can only update their own tasks), SEC-1 (Ownership verification before update), ownerId immutable
- **Implementation:**
  - Find task by ID
  - Verify ownership (task.ownerId === userId)
  - Throw ForbiddenException if not owner
  - Update provided fields (title, description, status, priority)
  - Do NOT update ownerId (immutable)
- **Error Handling:**
  - Throw NotFoundException if task not found (ERR-7)
  - Throw ForbiddenException if not owner (ERR-6)
  - Throw BadRequestException for validation errors (ERR-1, ERR-8)
- **Return:** Updated Task entity

#### remove(id: number, userId: number): Promise<void>
- **Business Rules:** TASK-11 (Users can only delete their own tasks), SEC-1 (Ownership verification before delete)
- **Implementation:**
  - Find task by ID
  - Verify ownership (task.ownerId === userId)
  - Throw ForbiddenException if not owner
  - Delete task
- **Error Handling:**
  - Throw NotFoundException if task not found (ERR-7)
  - Throw ForbiddenException if not owner (ERR-6)
- **Return:** void

## Required Imports

**For UsersService:**
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
```

**For TasksService:**
```typescript
import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
```

## Validation Commands

After generation, verify:
```bash
cd output/task-manager
npm run build  # Must compile without errors
npm run lint   # Should pass validation
```

## Success Criteria

- All services compile without TypeScript errors
- Business rules properly enforced (ownership, immutability, defaults)
- CRUD operations functional with permission checks
- Proper dependency injection implemented (@InjectRepository)
- Error handling returns appropriate HTTP status codes (NotFoundException, ForbiddenException, BadRequestException)
- Filtering and search implemented correctly
- Default values applied (status: "todo", priority: "medium")
- Password hashing implemented in UsersService.update() if password provided

