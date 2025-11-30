# AI Practitioner Task Manager - NestJS Project Generator

A complete workflow system for generating fully-functional NestJS backend applications from business and architectural requirements. This project implements a 10-step workflow that transforms requirements into a production-ready NestJS application.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Workflow Overview](#workflow-overview)
- [Quick Start](#quick-start)
- [Generated Application](#generated-application)
- [Workflow Steps](#workflow-steps)
- [Project Structure Details](#project-structure-details)
- [Usage Guide](#usage-guide)
- [Requirements](#requirements)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project implements an automated workflow that generates a complete NestJS backend application from:
- Business requirements
- Architectural requirements
- Reusable patterns and templates

The workflow produces a fully-functional Task Manager Backend with:
- User authentication (JWT)
- User profile management
- Task CRUD operations
- Task filtering and search
- Complete API documentation (Swagger)
- TypeORM entities and relationships
- Comprehensive validation

## 📁 Project Structure

```
ai-practitioner-task-manager/
├── input/                          # Project-specific requirements
│   ├── prompt.md                   # Workflow execution instructions
│   ├── business-requirements.md     # Business logic and features
│   └── architectural-requirements.md  # Technology stack and architecture
│
├── library/                        # Reusable patterns and templates (STATIC)
│   ├── spec-generation-spec-template.md
│   ├── nestjs-scaffolding-spec.md
│   ├── nestjs-implementation/     # Universal template specs
│   │   ├── 01-entity-generation-spec.md
│   │   ├── 02-dto-generation-spec.md
│   │   ├── 03-service-generation-spec.md
│   │   ├── 04-auth-generation-spec.md
│   │   ├── 05-controller-generation-spec.md
│   │   └── 06-app-config-generation-spec.md
│   ├── patterns/                   # Reusable patterns
│   │   ├── api-patterns.md
│   │   ├── security-patterns.md
│   │   ├── validation-rules.md
│   │   ├── error-patterns.md
│   │   └── data-model-patterns.md
│   └── entities/                   # Reusable entity patterns
│       └── user-entity-pattern.md
│
├── output/                         # All generated artifacts
│   ├── documentation-spec.md       # Step 1 output
│   ├── documentation/              # Step 2 output
│   │   ├── overview.md
│   │   ├── architecture.md
│   │   ├── domain-models.md
│   │   ├── business-rules.md
│   │   ├── api-specification.md
│   │   └── features/               # Feature-specific docs
│   ├── scaffolding-script.sh       # Step 3 output (Bash)
│   ├── scaffolding-script.ps1      # Step 3 output (PowerShell)
│   ├── scaffold.js                 # Step 3 output (Cross-platform)
│   ├── nestjs-implementation/      # Step 4 output
│   │   ├── 01-entity-generation-spec.md
│   │   ├── 02-dto-generation-spec.md
│   │   ├── 03-service-generation-spec.md
│   │   ├── 04-auth-generation-spec.md
│   │   ├── 05-controller-generation-spec.md
│   │   └── 06-app-config-generation-spec.md
│   └── task-manager/               # Generated NestJS application (Steps 3-10)
│       ├── src/
│       ├── package.json
│       └── README.md
│
└── README.md                        # This file
```

## 🔄 Workflow Overview

The workflow consists of 10 sequential steps:

```
Step 1: Generate Documentation Specification
  ↓
Step 2: Generate Documentation
  ↓
Step 3: Scaffold NestJS Project
  ↓
Step 4: Generate Implementation Generation Specs
  ↓
Step 5: Generate Entities
  ↓
Step 6: Generate DTOs
  ↓
Step 7: Generate Services
  ↓
Step 8: Generate Authentication
  ↓
Step 9: Generate Controllers
  ↓
Step 10: Generate App Config
  ↓
Complete NestJS Application
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (for the generated application)
- Git (optional)

### Running the Workflow

The workflow has been executed and the complete NestJS application is available at:

```
output/task-manager/
```

To use the generated application:

1. **Navigate to the generated project:**
   ```bash
   cd output/task-manager
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in `output/task-manager/`:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=task_manager
   JWT_SECRET=your-secret-key-change-in-production
   PORT=3000
   NODE_ENV=development
   ```

4. **Set up PostgreSQL database:**
   ```sql
   CREATE DATABASE task_manager;
   ```

5. **Run the application:**
   ```bash
   npm run start:dev
   ```

6. **Access the API:**
   - API Base URL: `http://localhost:3000`
   - Swagger Documentation: `http://localhost:3000/api`

## 📱 Generated Application

### Task Manager Backend

A complete RESTful API for personal task management with the following features:

#### Features

- **User Management**
  - User registration (POST /signup)
  - User authentication (POST /signin)
  - Get user profile (GET /users/me)
  - Update user profile (PATCH /users/me)

- **Task Management**
  - Create task (POST /tasks)
  - List tasks with filtering (GET /tasks?status=todo&priority=high&search=project)
  - Get single task (GET /tasks/:id)
  - Update task (PATCH /tasks/:id)
  - Delete task (DELETE /tasks/:id)

- **Security**
  - JWT-based authentication
  - Password hashing with bcrypt
  - Ownership-based access control
  - Input validation on all endpoints

#### Technology Stack

- **Framework:** NestJS 11
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** class-validator, class-transformer
- **API Documentation:** Swagger/OpenAPI
- **Password Hashing:** bcrypt

#### API Endpoints

**Authentication (Public)**
- `POST /signup` - Register a new user
- `POST /signin` - Authenticate and receive JWT token

**User Management (Protected)**
- `GET /users/me` - Get current user's profile
- `PATCH /users/me` - Update current user's profile

**Task Management (Protected)**
- `POST /tasks` - Create a new task
- `GET /tasks` - List all tasks (with optional filters: status, priority, search)
- `GET /tasks/:id` - Get a single task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

#### API Documentation

Once the application is running, access the interactive Swagger documentation at:

```
http://localhost:3000/api
```

The Swagger UI provides:
- Complete API endpoint documentation
- Request/response schemas
- Try-it-out functionality
- Authentication testing with Bearer tokens

## 📝 Workflow Steps

### Step 1: Generate Documentation Specification
**Input:** Business requirements, architectural requirements, library templates  
**Output:** `output/documentation-spec.md`  
**Purpose:** Creates a complete, unambiguous specification for documentation generation

### Step 2: Generate Documentation
**Input:** Documentation specification  
**Output:** `output/documentation/` folder with all documentation files  
**Purpose:** Generates comprehensive documentation following Architectural Slicing principles

### Step 3: Scaffold NestJS Project
**Input:** Documentation (architecture, domain models)  
**Output:** Scaffolded NestJS project at `output/task-manager/`  
**Purpose:** Creates project structure, installs dependencies, generates modules

### Step 4: Generate Implementation Generation Specs
**Input:** Documentation  
**Output:** `output/nestjs-implementation/` with 6 implementation specs  
**Purpose:** Creates project-specific specs for code generation

### Step 5: Generate Entities
**Input:** Entity generation spec, domain models  
**Output:** TypeORM entities (User, Task)  
**Purpose:** Generates database entities with relationships and validation

### Step 6: Generate DTOs
**Input:** DTO generation spec, API specification  
**Output:** Data Transfer Objects for all endpoints  
**Purpose:** Creates DTOs with validation and Swagger documentation

### Step 7: Generate Services
**Input:** Service generation spec, business rules  
**Output:** Business logic services (UsersService, TasksService)  
**Purpose:** Implements CRUD operations and business rule enforcement

### Step 8: Generate Authentication
**Input:** Auth generation spec, authentication requirements  
**Output:** Complete authentication system (AuthService, strategies, guards)  
**Purpose:** Implements JWT authentication with Passport

### Step 9: Generate Controllers
**Input:** Controller generation spec, API specification  
**Output:** REST API controllers with Swagger documentation  
**Purpose:** Creates HTTP endpoints with proper guards and validation

### Step 10: Generate App Config
**Input:** App config generation spec, architecture  
**Output:** Application configuration (AppModule, main.ts)  
**Purpose:** Configures database, Swagger, CORS, and global validation

## 📂 Project Structure Details

### Input Folder
Contains project-specific requirements that drive the generation process:
- **prompt.md:** Instructions for executing the workflow
- **business-requirements.md:** Features, business rules, and domain logic
- **architectural-requirements.md:** Technology stack and architectural decisions

### Library Folder
Contains reusable patterns and templates (STATIC - not modified during generation):
- **Patterns:** API design, security, validation, error handling, data modeling
- **Entity Patterns:** Reusable entity structures
- **Implementation Specs:** Universal templates for code generation
- **Workflow Specs:** Specifications for scaffolding and workflow execution

### Output Folder
Contains all generated artifacts:
- **Documentation:** Complete system documentation
- **Implementation Specs:** Project-specific code generation specifications
- **Scaffolding Scripts:** Cross-platform scripts for project scaffolding
- **Generated Application:** Complete NestJS application ready to run

## 🛠️ Usage Guide

### For End Users (Using the Generated Application)

1. **Navigate to the generated application:**
   ```bash
   cd output/task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Create `.env` file with database and JWT configuration

4. **Set up database:**
   Create PostgreSQL database and run migrations (TypeORM will auto-sync in development)

5. **Start the application:**
   ```bash
   npm run start:dev
   ```

6. **Access Swagger UI:**
   Open `http://localhost:3000/api` in your browser

### For Developers (Modifying the Workflow)

To modify the workflow or generate a new project:

1. **Update requirements:**
   - Edit `input/business-requirements.md`
   - Edit `input/architectural-requirements.md`

2. **Execute the workflow:**
   - Follow the 10-step workflow process
   - Each step requires user confirmation before proceeding

3. **Review generated artifacts:**
   - Check `output/documentation/` for documentation
   - Check `output/nestjs-implementation/` for implementation specs
   - Check `output/task-manager/` for the generated application

## 📋 Requirements

### For the Workflow System
- Node.js (v18+)
- npm or yarn
- Git (optional)

### For the Generated Application
- Node.js (v18+)
- PostgreSQL (v12+)
- npm or yarn

## 🔧 Environment Variables

The generated application uses the following environment variables (all have defaults):

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=task_manager

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production

# Application Configuration
PORT=3000
NODE_ENV=development
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

## 🧪 Testing

### Run Tests
```bash
cd output/task-manager
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Test coverage
```

### Manual Testing with Swagger

1. Start the application: `npm run start:dev`
2. Open Swagger UI: `http://localhost:3000/api`
3. Test endpoints:
   - Register a user (POST /signup)
   - Login (POST /signin) - copy the `accessToken`
   - Click "Authorize" button in Swagger UI
   - Enter: `Bearer <your-access-token>`
   - Test protected endpoints

## 🐛 Troubleshooting

### Application Won't Start

**Database Connection Error:**
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Create the database: `CREATE DATABASE task_manager;`

**Port Already in Use:**
- Change `PORT` in `.env` to a different port
- Or stop the process using port 3000

### Build Errors

**TypeScript Compilation Errors:**
```bash
cd output/task-manager
npm run build
```
Check error messages and fix any type issues.

**Missing Dependencies:**
```bash
cd output/task-manager
npm install
```

### Authentication Issues

**JWT Token Invalid:**
- Ensure `JWT_SECRET` matches between token generation and validation
- Check token expiration (default: 1 day)
- Verify token is sent in `Authorization: Bearer <token>` header

**401 Unauthorized:**
- Verify token is included in request headers
- Check token hasn't expired
- Ensure `JwtAuthGuard` is applied to protected endpoints

### Database Issues

**Synchronization Errors:**
- In development, TypeORM auto-syncs schema
- In production, set `NODE_ENV=production` and use migrations
- Check entity relationships are correctly defined

## 📚 Additional Resources

### Generated Application Documentation

- **API Documentation:** `output/task-manager/README.md`
- **System Documentation:** `output/documentation/`
- **API Specification:** `output/documentation/api-specification.md`
- **Architecture:** `output/documentation/architecture.md`

### Workflow Documentation

- **Master Workflow Spec:** `library/nestjs-master-workflow-spec.md`
- **Scaffolding Spec:** `library/nestjs-scaffolding-spec.md`
- **Implementation Specs:** `library/nestjs-implementation/`

## 🎯 Key Features of Generated Application

### Security
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Ownership-based access control
- ✅ Input validation on all endpoints
- ✅ CORS enabled for cross-origin requests

### API Design
- ✅ RESTful API conventions
- ✅ Consistent error response format
- ✅ Comprehensive Swagger documentation
- ✅ Request/response validation
- ✅ Proper HTTP status codes

### Code Quality
- ✅ TypeScript for type safety
- ✅ Modular architecture (Users, Tasks, Auth modules)
- ✅ Dependency injection
- ✅ Separation of concerns (Controllers, Services, Entities)
- ✅ Clean code principles

### Database
- ✅ TypeORM for database operations
- ✅ Entity relationships (User OneToMany Task)
- ✅ Automatic timestamp management
- ✅ Enum support for status and priority
- ✅ Database migrations support

## 📝 License

This project is private and unlicensed.

## 🤝 Contributing

This is a workflow system for generating NestJS applications. To modify the workflow:

1. Update requirements in `input/` folder
2. Follow the 10-step workflow process
3. Review generated artifacts
4. Test the generated application

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the generated documentation in `output/documentation/`
3. Check the Swagger API documentation at `/api` endpoint
4. Review the workflow specifications in `library/`

---

**Generated Application Location:** `output/task-manager/`  
**Documentation Location:** `output/documentation/`  
**Swagger UI:** `http://localhost:3000/api` (when application is running)

