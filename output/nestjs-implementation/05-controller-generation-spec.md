# Controller Generation Specification: Task Manager Backend

**Objective:** Generate REST API controllers with proper guards, validation, and Swagger documentation based on API specification.

**Input Sources:** 
- `output/documentation/api-specification.md` - All endpoint definitions
- `output/documentation/architecture.md` - Route structure, module organization
- `output/documentation/business-rules.md` - Permission requirements, ownership rules

## Controller Specifications

### AuthController

**File Location:** `src/auth/auth.controller.ts`

**Route Prefix:** (no prefix, root routes)

**Endpoints:**

#### POST /signup
- **Method:** `signup(@Body() signupDto: SignupDto): Promise<User>`
- **DTO:** SignupDto
- **Guards:** None (public endpoint)
- **Service:** AuthService.signup()
- **Response:** 201 Created with User object
- **Swagger:**
  - @ApiTags('Authentication')
  - @ApiOperation({ summary: 'Register a new user' })
  - @ApiResponse({ status: 201, description: 'User successfully registered' })
  - @ApiResponse({ status: 400, description: 'Validation errors, duplicate username, duplicate email' })

#### POST /signin
- **Method:** `signin(@Body() signinDto: SigninDto, @Request() req): { accessToken: string }`
- **DTO:** SigninDto
- **Guards:** @UseGuards(LocalAuthGuard)
- **Service:** AuthService.login(req.user)
- **Response:** 200 OK with { accessToken: string }
- **Swagger:**
  - @ApiTags('Authentication')
  - @ApiOperation({ summary: 'Authenticate user and receive JWT token' })
  - @ApiResponse({ status: 200, description: 'Login successful', schema: { properties: { accessToken: { type: 'string' } } } })
  - @ApiResponse({ status: 401, description: 'Invalid credentials' })

### UsersController

**File Location:** `src/users/users.controller.ts`

**Route Prefix:** `/users`

**Endpoints:**

#### GET /users/me
- **Method:** `getProfile(@Request() req): Promise<User>`
- **DTO:** None
- **Guards:** @UseGuards(JwtAuthGuard)
- **Service:** UsersService.findOne(req.user.id)
- **Response:** 200 OK with User object
- **Swagger:**
  - @ApiTags('Users')
  - @ApiOperation({ summary: 'Get current user\'s profile' })
  - @ApiResponse({ status: 200, description: 'User profile', type: User })
  - @ApiResponse({ status: 401, description: 'Missing or invalid token' })
  - @ApiBearerAuth()

#### PATCH /users/me
- **Method:** `updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<User>`
- **DTO:** UpdateUserDto
- **Guards:** @UseGuards(JwtAuthGuard)
- **Service:** UsersService.update(req.user.id, updateUserDto)
- **Response:** 200 OK with updated User object
- **Swagger:**
  - @ApiTags('Users')
  - @ApiOperation({ summary: 'Update current user\'s profile' })
  - @ApiResponse({ status: 200, description: 'Profile updated successfully', type: User })
  - @ApiResponse({ status: 400, description: 'Validation errors' })
  - @ApiResponse({ status: 401, description: 'Missing or invalid token' })
  - @ApiBearerAuth()

### TasksController

**File Location:** `src/tasks/tasks.controller.ts`

**Route Prefix:** `/tasks`

**Endpoints:**

#### POST /tasks
- **Method:** `create(@Request() req, @Body() createTaskDto: CreateTaskDto): Promise<Task>`
- **DTO:** CreateTaskDto
- **Guards:** @UseGuards(JwtAuthGuard)
- **Service:** TasksService.create(createTaskDto, req.user.id)
- **Response:** 201 Created with Task object
- **Swagger:**
  - @ApiTags('Tasks')
  - @ApiOperation({ summary: 'Create a new task' })
  - @ApiResponse({ status: 201, description: 'Task created successfully', type: Task })
  - @ApiResponse({ status: 400, description: 'Validation errors, invalid enum values' })
  - @ApiResponse({ status: 401, description: 'Missing or invalid token' })
  - @ApiBearerAuth()

#### GET /tasks
- **Method:** `findAll(@Request() req, @Query('status') status?: string, @Query('priority') priority?: string, @Query('search') search?: string): Promise<Task[]>`
- **DTO:** None
- **Query Parameters:** status (optional), priority (optional), search (optional)
- **Guards:** @UseGuards(JwtAuthGuard)
- **Service:** TasksService.findAll(req.user.id, { status, priority, search })
- **Response:** 200 OK with array of Task objects
- **Swagger:**
  - @ApiTags('Tasks')
  - @ApiOperation({ summary: 'List all tasks for the authenticated user with optional filtering and search' })
  - @ApiQuery({ name: 'status', required: false, enum: ['todo', 'in-progress', 'done'] })
  - @ApiQuery({ name: 'priority', required: false, enum: ['low', 'medium', 'high'] })
  - @ApiQuery({ name: 'search', required: false, type: String })
  - @ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
  - @ApiResponse({ status: 400, description: 'Invalid query parameter values' })
  - @ApiResponse({ status: 401, description: 'Missing or invalid token' })
  - @ApiBearerAuth()

#### GET /tasks/:id
- **Method:** `findOne(@Request() req, @Param('id') id: string): Promise<Task>`
- **DTO:** None
- **Path Parameters:** id (string, convert to number)
- **Guards:** @UseGuards(JwtAuthGuard)
- **Service:** TasksService.findOne(+id, req.user.id)
- **Response:** 200 OK with Task object
- **Swagger:**
  - @ApiTags('Tasks')
  - @ApiOperation({ summary: 'Get a single task by ID' })
  - @ApiParam({ name: 'id', type: Number })
  - @ApiResponse({ status: 200, description: 'Task found', type: Task })
  - @ApiResponse({ status: 401, description: 'Missing or invalid token' })
  - @ApiResponse({ status: 403, description: 'Task does not belong to authenticated user' })
  - @ApiResponse({ status: 404, description: 'Task not found' })
  - @ApiBearerAuth()

#### PATCH /tasks/:id
- **Method:** `update(@Request() req, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task>`
- **DTO:** UpdateTaskDto
- **Path Parameters:** id (string, convert to number)
- **Guards:** @UseGuards(JwtAuthGuard)
- **Service:** TasksService.update(+id, updateTaskDto, req.user.id)
- **Response:** 200 OK with updated Task object
- **Swagger:**
  - @ApiTags('Tasks')
  - @ApiOperation({ summary: 'Update a task by ID' })
  - @ApiParam({ name: 'id', type: Number })
  - @ApiResponse({ status: 200, description: 'Task updated successfully', type: Task })
  - @ApiResponse({ status: 400, description: 'Validation errors, invalid enum values' })
  - @ApiResponse({ status: 401, description: 'Missing or invalid token' })
  - @ApiResponse({ status: 403, description: 'Task does not belong to authenticated user' })
  - @ApiResponse({ status: 404, description: 'Task not found' })
  - @ApiBearerAuth()

#### DELETE /tasks/:id
- **Method:** `remove(@Request() req, @Param('id') id: string): Promise<void>`
- **DTO:** None
- **Path Parameters:** id (string, convert to number)
- **Guards:** @UseGuards(JwtAuthGuard)
- **Service:** TasksService.remove(+id, req.user.id)
- **Response:** 204 No Content (no response body)
- **Swagger:**
  - @ApiTags('Tasks')
  - @ApiOperation({ summary: 'Delete a task by ID' })
  - @ApiParam({ name: 'id', type: Number })
  - @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  - @ApiResponse({ status: 401, description: 'Missing or invalid token' })
  - @ApiResponse({ status: 403, description: 'Task does not belong to authenticated user' })
  - @ApiResponse({ status: 404, description: 'Task not found' })
  - @ApiBearerAuth()

## Required Imports

**For AuthController:**
```typescript
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '../users/entities/user.entity/user.entity';
```

**For UsersController:**
```typescript
import { Controller, Get, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity/user.entity';
```

**For TasksController:**
```typescript
import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Task } from './entities/task.entity/task.entity';
```

## Validation Commands

After generation, verify:
```bash
cd output/task-manager
npm run build  # Must compile without errors
npm run lint   # Should pass validation
npm run start:dev  # Start application and verify Swagger accessible at /api
```

## Success Criteria

- All controllers compile without TypeScript errors
- All endpoints accessible via Swagger UI
- Guards properly applied to protect operations
- Proper HTTP status codes returned (201 for POST, 200 for GET/PATCH, 204 for DELETE)
- Request validation working through DTOs
- Swagger documentation complete with all endpoints documented
- User extracted from req.user for authenticated endpoints
- Query parameters properly extracted and passed to services
- Path parameters converted to numbers where needed

