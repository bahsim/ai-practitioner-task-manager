# Application Configuration Generation Specification: Task Manager Backend

**Objective:** Generate app module setup, database configuration, and application bootstrap based on architecture documentation.

**Input Sources:** 
- `output/documentation/architecture.md` - Technology stack, ORM type (TypeORM), database (PostgreSQL), module structure
- `output/documentation/domain-models.md` - Entity definitions for TypeORM registration
- `output/documentation/api-specification.md` - API title, description, version for Swagger

## Configuration Specifications

### AppModule

**File Location:** `src/app.module.ts`

**Imports:**
- ConfigModule.forRoot({ isGlobal: true })
- TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'task_manager',
    entities: [User, Task],
    synchronize: process.env.NODE_ENV !== 'production', // true for dev, false for prod
  })
- UsersModule
- TasksModule
- AuthModule

**CRITICAL:** Environment variables must have default values using `||` operator (e.g., `process.env.DB_PORT || '5432'`, not `parseInt(process.env.DB_PORT)`)

### Main Bootstrap

**File Location:** `src/main.ts`

**Configuration:**
- Port: process.env.PORT || 3000
- Global prefix: None (root routes)
- Swagger setup:
  - Title: "Task Manager Backend API"
  - Description: "A backend service for personal task management. Users can register, authenticate, and manage their personal tasks with status and priority tracking."
  - Version: "1.0"
  - Path: "/api"
- CORS: Enabled (cors: true)
- Global ValidationPipe:
  - whitelist: true
  - forbidNonWhitelisted: true
  - transform: true

### Feature Modules Configuration

#### UsersModule

**File Location:** `src/users/users.module.ts`

**Imports:**
- TypeOrmModule.forFeature([User])

**Providers:**
- UsersService

**Controllers:**
- UsersController

**Exports:**
- UsersService (for use in AuthModule)

#### TasksModule

**File Location:** `src/tasks/tasks.module.ts`

**Imports:**
- TypeOrmModule.forFeature([Task])

**Providers:**
- TasksService

**Controllers:**
- TasksController

**Exports:**
- None

#### AuthModule

**File Location:** `src/auth/auth.module.ts`

**Imports:**
- TypeOrmModule.forFeature([User])
- JwtModule.register({
    secret: process.env.JWT_SECRET || 'your-secret-key',
    signOptions: { expiresIn: '1d' }
  })
- PassportModule
- UsersModule (to access UsersService)

**Providers:**
- AuthService
- LocalStrategy
- JwtStrategy

**Controllers:**
- AuthController

**Exports:**
- AuthService
- JwtAuthGuard (for use in other modules)
- JwtModule (for use in other modules)

**CRITICAL:** JwtAuthGuard should NOT be in providers array, only in exports array.

## Required Imports

**For AppModule:**
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity/user.entity';
import { Task } from './tasks/entities/task.entity/task.entity';
```

**For main.ts:**
```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
```

## Main.ts Implementation

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS
  app.enableCors();
  
  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Task Manager Backend API')
    .setDescription('A backend service for personal task management. Users can register, authenticate, and manage their personal tasks with status and priority tracking.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
```

## Environment Variables

**Required (with defaults):**
- DB_HOST (default: 'localhost')
- DB_PORT (default: '5432')
- DB_USERNAME (default: 'postgres')
- DB_PASSWORD (default: 'postgres')
- DB_NAME (default: 'task_manager')
- JWT_SECRET (default: 'your-secret-key')
- PORT (default: '3000')
- NODE_ENV (for synchronize setting)

**CRITICAL:** All environment variable access must use `||` operator for defaults (e.g., `process.env.DB_PORT || '5432'`)

## Validation Commands

After generation, verify:
```bash
cd output/task-manager
npm run build  # Must compile without errors
npm run start:dev  # Should start without errors
# Verify Swagger accessible at http://localhost:3000/api
# Verify CORS enabled
# Verify global ValidationPipe configured
```

## Success Criteria

- Application starts without compilation errors
- All modules properly integrated
- Database connection configured (TypeORM with PostgreSQL)
- Swagger documentation accessible at /api
- Authentication flow functional
- Global validation working
- CORS enabled
- Environment variables have default values
- TypeORM entities registered in AppModule
- AuthModule exports JwtAuthGuard for use in other modules
- JwtAuthGuard NOT in providers array (only in exports)

