# Entity Generation Specification: Task Manager Backend

**Objective:** Generate complete TypeORM entities with decorators, relationships, and validation based on domain models documentation.

**Input Sources:** 
- `output/documentation/domain-models.md` - Entity definitions, fields, relationships
- `output/documentation/architecture.md` - ORM type (TypeORM) and database (PostgreSQL)

## Entity Specifications

### User Entity

**File Location:** `src/users/entities/user.entity/user.entity.ts`

**Module:** users

**Entity Name:** User

**Fields:**
- **id:** number, Primary key, auto-generated
  - Decorator: `@PrimaryGeneratedColumn()`
  - Type: `number`
  
- **username:** string, required, unique, 2-30 characters, alphanumeric and underscores only
  - Decorator: `@Column({ unique: true, length: 30 })`
  - Validation: `@IsString()`, `@MinLength(2)`, `@MaxLength(30)`, `@Matches(/^[a-zA-Z0-9_]+$/)`
  - Type: `string`
  
- **email:** string, required, unique, valid email format
  - Decorator: `@Column({ unique: true })`
  - Validation: `@IsEmail()`
  - Type: `string`
  
- **password:** string, required, minimum 6 characters, hashed in storage
  - Decorator: `@Column()`
  - Validation: `@IsString()`, `@MinLength(6)`
  - Type: `string`
  - Note: Will be hashed before storage (not in entity)
  
- **about:** string, optional, nullable, 2-200 characters
  - Decorator: `@Column({ nullable: true, length: 200 })`
  - Validation: `@IsOptional()`, `@IsString()`, `@MinLength(2)`, `@MaxLength(200)`
  - Type: `string | null`
  
- **avatar:** string, optional, nullable, valid URL format
  - Decorator: `@Column({ nullable: true })`
  - Validation: `@IsOptional()`, `@IsUrl()`
  - Type: `string | null`
  
- **createdAt:** Date, auto-generated, required
  - Decorator: `@CreateDateColumn()`
  - Type: `Date`
  
- **updatedAt:** Date, auto-generated, required
  - Decorator: `@UpdateDateColumn()`
  - Type: `Date`

**Relationships:**
- **One-to-Many with Task:**
  - Decorator: `@OneToMany(() => Task, (task) => task.owner)`
  - Property name: `tasks`
  - Type: `Task[]`

**Immutability:**
- Username cannot be changed after registration (enforced in service layer)
- Email cannot be changed after registration (enforced in service layer)

### Task Entity

**File Location:** `src/tasks/entities/task.entity/task.entity.ts`

**Module:** tasks

**Entity Name:** Task

**Enums:**
- **TaskStatus:** "todo" | "in-progress" | "done"
- **TaskPriority:** "low" | "medium" | "high"

**Fields:**
- **id:** number, Primary key, auto-generated
  - Decorator: `@PrimaryGeneratedColumn()`
  - Type: `number`
  
- **title:** string, required, 1-250 characters
  - Decorator: `@Column({ length: 250 })`
  - Validation: `@IsString()`, `@MinLength(1)`, `@MaxLength(250)`
  - Type: `string`
  
- **description:** string, optional, nullable, 1-1024 characters
  - Decorator: `@Column({ nullable: true, length: 1024 })`
  - Validation: `@IsOptional()`, `@IsString()`, `@MinLength(1)`, `@MaxLength(1024)`
  - Type: `string | null`
  
- **status:** enum, required, values: "todo" | "in-progress" | "done", default: "todo"
  - Decorator: `@Column({ type: 'enum', enum: ['todo', 'in-progress', 'done'], default: 'todo' })`
  - Validation: `@IsEnum(['todo', 'in-progress', 'done'])`
  - Type: `'todo' | 'in-progress' | 'done'`
  
- **priority:** enum, required, values: "low" | "medium" | "high", default: "medium"
  - Decorator: `@Column({ type: 'enum', enum: ['low', 'medium', 'high'], default: 'medium' })`
  - Validation: `@IsEnum(['low', 'medium', 'high'])`
  - Type: `'low' | 'medium' | 'high'`
  
- **ownerId:** number, required, foreign key to User.id
  - Decorator: `@Column()`
  - Validation: `@IsNumber()`
  - Type: `number`
  
- **createdAt:** Date, auto-generated, required
  - Decorator: `@CreateDateColumn()`
  - Type: `Date`
  
- **updatedAt:** Date, auto-generated, required
  - Decorator: `@UpdateDateColumn()`
  - Type: `Date`

**Relationships:**
- **Many-to-One with User:**
  - Decorator: `@ManyToOne(() => User, (user) => user.tasks)`
  - Decorator: `@JoinColumn({ name: 'ownerId' })`
  - Property name: `owner`
  - Type: `User`

**Immutability:**
- ownerId cannot be changed after creation (enforced in service layer)

## Required Imports

**For User Entity:**
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional, IsUrl } from 'class-validator';
import { Task } from '../../tasks/entities/task.entity/task.entity';
```

**For Task Entity:**
```typescript
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsString, MinLength, MaxLength, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { User } from '../../users/entities/user.entity/user.entity';
```

## Validation Commands

After generation, verify:
```bash
cd output/task-manager
npm run build  # Must compile without errors
```

## Success Criteria

- All entities compile without TypeScript errors
- Proper TypeORM decorators applied
- Relationships correctly mapped (User OneToMany Task, Task ManyToOne User)
- Validation decorators match specifications
- Timestamps included on all entities
- Enum values correctly defined with exact case-sensitive values
- Default values applied (status: "todo", priority: "medium")
- Password field has no @Exclude() decorator (exclusion handled in serialization)

