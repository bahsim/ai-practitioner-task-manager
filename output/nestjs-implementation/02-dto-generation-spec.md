# DTO Generation Specification: Task Manager Backend

**Objective:** Generate Data Transfer Objects for all API endpoints with complete validation based on API specification and domain models.

**Input Sources:** 
- `output/documentation/domain-models.md` - Entity field definitions
- `output/documentation/api-specification.md` - Endpoint definitions, request/response structures
- `output/documentation/business-rules.md` - Validation rules, immutability constraints

## DTO Specifications

### User DTOs

#### CreateUserDto (for POST /signup)

**File Location:** `src/auth/dto/signup.dto.ts`

**Fields:**
- **username:** string, required, 2-30 characters, alphanumeric and underscores only
  - Validation: `@IsString()`, `@MinLength(2)`, `@MaxLength(30)`, `@Matches(/^[a-zA-Z0-9_]+$/)`
  - Swagger: `@ApiProperty({ description: 'Username (2-30 chars, alphanumeric and underscores only)', example: 'johndoe' })`
  - Type: `string`
  
- **email:** string, required, valid email format
  - Validation: `@IsEmail()`
  - Swagger: `@ApiProperty({ description: 'Email address', example: 'john@example.com' })`
  - Type: `string`
  
- **password:** string, required, minimum 6 characters
  - Validation: `@IsString()`, `@MinLength(6)`
  - Swagger: `@ApiProperty({ description: 'Password (minimum 6 characters)', example: 'password123', minLength: 6 })`
  - Type: `string`
  
- **about:** string, optional, 2-200 characters
  - Validation: `@IsOptional()`, `@IsString()`, `@MinLength(2)`, `@MaxLength(200)`
  - Swagger: `@ApiProperty({ description: 'About text (2-200 characters)', example: 'Software developer', required: false })`
  - Type: `string | undefined`
  
- **avatar:** string, optional, valid URL format
  - Validation: `@IsOptional()`, `@IsUrl()`
  - Swagger: `@ApiProperty({ description: 'Avatar URL', example: 'https://example.com/avatar.jpg', required: false })`
  - Type: `string | undefined`

#### UpdateUserDto (for PATCH /users/me)

**File Location:** `src/users/dto/update-user.dto.ts`

**Fields:**
- **password:** string, optional, minimum 6 characters
  - Validation: `@IsOptional()`, `@IsString()`, `@MinLength(6)`
  - Swagger: `@ApiProperty({ description: 'Password (minimum 6 characters)', example: 'newpassword123', required: false, minLength: 6 })`
  - Type: `string | undefined`
  
- **about:** string, optional, 2-200 characters
  - Validation: `@IsOptional()`, `@IsString()`, `@MinLength(2)`, `@MaxLength(200)`
  - Swagger: `@ApiProperty({ description: 'About text (2-200 characters)', example: 'Updated bio', required: false })`
  - Type: `string | undefined`
  
- **avatar:** string, optional, valid URL format
  - Validation: `@IsOptional()`, `@IsUrl()`
  - Swagger: `@ApiProperty({ description: 'Avatar URL', example: 'https://example.com/new-avatar.jpg', required: false })`
  - Type: `string | undefined`

**Note:** username and email are immutable (excluded from Update DTO)

### Authentication DTOs

#### SigninDto (for POST /signin)

**File Location:** `src/auth/dto/signin.dto.ts`

**Fields:**
- **email:** string, required, valid email format
  - Validation: `@IsEmail()`
  - Swagger: `@ApiProperty({ description: 'Email address', example: 'john@example.com' })`
  - Type: `string`
  
- **password:** string, required, minimum 6 characters
  - Validation: `@IsString()`, `@MinLength(6)`
  - Swagger: `@ApiProperty({ description: 'Password (minimum 6 characters)', example: 'password123', minLength: 6 })`
  - Type: `string`

### Task DTOs

#### CreateTaskDto (for POST /tasks)

**File Location:** `src/tasks/dto/create-task.dto.ts`

**Fields:**
- **title:** string, required, 1-250 characters
  - Validation: `@IsString()`, `@MinLength(1)`, `@MaxLength(250)`
  - Swagger: `@ApiProperty({ description: 'Task title (1-250 characters)', example: 'Complete project' })`
  - Type: `string`
  
- **description:** string, optional, 1-1024 characters
  - Validation: `@IsOptional()`, `@IsString()`, `@MinLength(1)`, `@MaxLength(1024)`
  - Swagger: `@ApiProperty({ description: 'Task description (1-1024 characters)', example: 'Finish the task manager backend', required: false })`
  - Type: `string | undefined`
  
- **status:** enum, optional, values: "todo" | "in-progress" | "done", default: "todo"
  - Validation: `@IsOptional()`, `@IsEnum(['todo', 'in-progress', 'done'])`
  - Swagger: `@ApiProperty({ description: 'Task status', enum: ['todo', 'in-progress', 'done'], example: 'todo', required: false })`
  - Type: `'todo' | 'in-progress' | 'done' | undefined`
  
- **priority:** enum, optional, values: "low" | "medium" | "high", default: "medium"
  - Validation: `@IsOptional()`, `@IsEnum(['low', 'medium', 'high'])`
  - Swagger: `@ApiProperty({ description: 'Task priority', enum: ['low', 'medium', 'high'], example: 'medium', required: false })`
  - Type: `'low' | 'medium' | 'high' | undefined`

**Note:** ownerId is set automatically from authenticated user (excluded from DTO)

#### UpdateTaskDto (for PATCH /tasks/:id)

**File Location:** `src/tasks/dto/update-task.dto.ts`

**Fields:**
- **title:** string, optional, 1-250 characters
  - Validation: `@IsOptional()`, `@IsString()`, `@MinLength(1)`, `@MaxLength(250)`
  - Swagger: `@ApiProperty({ description: 'Task title (1-250 characters)', example: 'Updated title', required: false })`
  - Type: `string | undefined`
  
- **description:** string, optional, 1-1024 characters
  - Validation: `@IsOptional()`, `@IsString()`, `@MinLength(1)`, `@MaxLength(1024)`
  - Swagger: `@ApiProperty({ description: 'Task description (1-1024 characters)', example: 'Updated description', required: false })`
  - Type: `string | undefined`
  
- **status:** enum, optional, values: "todo" | "in-progress" | "done"
  - Validation: `@IsOptional()`, `@IsEnum(['todo', 'in-progress', 'done'])`
  - Swagger: `@ApiProperty({ description: 'Task status', enum: ['todo', 'in-progress', 'done'], example: 'done', required: false })`
  - Type: `'todo' | 'in-progress' | 'done' | undefined`
  
- **priority:** enum, optional, values: "low" | "medium" | "high"
  - Validation: `@IsOptional()`, `@IsEnum(['low', 'medium', 'high'])`
  - Swagger: `@ApiProperty({ description: 'Task priority', enum: ['low', 'medium', 'high'], example: 'low', required: false })`
  - Type: `'low' | 'medium' | 'high' | undefined`

**Note:** ownerId is immutable (excluded from Update DTO)

## Required Imports

**For all DTOs:**
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional, IsUrl, IsEnum } from 'class-validator';
```

## Validation Commands

After generation, verify:
```bash
cd output/task-manager
npm run build  # Must compile without errors
npm run lint   # Should pass validation
```

## Success Criteria

- All DTOs compile without TypeScript errors
- Validation decorators properly applied with exact constraints from domain models
- Swagger documentation includes descriptions and examples from API specification
- Create DTOs exclude: id, createdAt, updatedAt, ownerId (for tasks)
- Update DTOs make all fields optional with @IsOptional()
- Immutable fields excluded from Update DTOs (username, email, ownerId)
- Enum values match exact case-sensitive values from domain models
- All required fields have proper validation decorators
- All optional fields have @IsOptional() decorator

