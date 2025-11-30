# Task Manager Backend: Architecture

## Framework

NestJS

## Database

PostgreSQL

## ORM

TypeORM

## Authentication

JWT (JSON Web Tokens)

## System Architecture

```mermaid
graph TB
    subgraph "Presentation Layer"
        UC[Users Controller]
        TC[Tasks Controller]
        AC[Auth Controller]
    end
    
    subgraph "Business Logic Layer"
        US[Users Service]
        TS[Tasks Service]
        AS[Auth Service]
    end
    
    subgraph "Data Access Layer"
        UR[TypeORM User Repository]
        TR[TypeORM Task Repository]
    end
    
    subgraph "Database Layer"
        DB[(PostgreSQL)]
    end
    
    UC --> US
    TC --> TS
    AC --> AS
    
    US --> UR
    TS --> TR
    
    UR --> DB
    TR --> DB
```

## Module Structure

- **Users Module:** User profile management (view and update profile)
- **Tasks Module:** Task CRUD operations, filtering, and search
- **Auth Module:** Authentication and authorization (signup, signin, JWT validation)

## Database

- **Type:** PostgreSQL
- **Entities:** User, Task

## Authentication & Authorization

- JWT token-based authentication
- Public endpoints: POST /signup, POST /signin
- Protected endpoints: All other endpoints require JWT authentication
- Ownership verification: Users can only access their own resources

## Global Patterns

- RESTful API design
- Consistent error response format
- Input validation on all endpoints
- Password hashing and exclusion from responses
- Timestamp fields (createdAt, updatedAt) on all entities
- Ownership-based access control

