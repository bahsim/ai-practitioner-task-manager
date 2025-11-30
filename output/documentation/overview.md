# Task Manager Backend: Overview

## Project Overview

A backend service for personal task management. Users can register, authenticate, and manage their personal tasks with status and priority tracking.

## Core Capabilities

- User registration and authentication
- User profile management
- Task creation, viewing, updating, and deletion
- Task filtering by status and priority
- Task search by title and description

## Documentation Structure

### System-Wide Documentation

- [`architecture.md`](./architecture.md) - System architecture, technology stack, and module structure
- [`domain-models.md`](./domain-models.md) - Entity definitions and relationships
- [`business-rules.md`](./business-rules.md) - All business rules organized by category
- [`api-specification.md`](./api-specification.md) - Complete API endpoint documentation
- [`README.md`](./README.md) - Documentation structure and purpose

### Feature-Specific Documentation

- [`features/user-management/`](./features/user-management/) - User registration, authentication, and profile management
- [`features/task-management/`](./features/task-management/) - Task CRUD operations, filtering, and search
- [`features/authentication/`](./features/authentication/) - Authentication and authorization flows

## Key Architectural Decisions

- NestJS framework for backend development
- PostgreSQL database with TypeORM ORM
- JWT-based authentication
- RESTful API design
- User ownership model (users can only access their own tasks)
- Modular architecture (Users, Tasks, Auth modules)

