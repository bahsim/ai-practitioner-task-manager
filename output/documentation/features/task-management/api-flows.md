# Task Manager Backend: Task Management API Flows

## Create Task Flow (Success)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Submit create task form
    Frontend->>Backend: POST /tasks (JWT token, title, description, status, priority)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Validate input
    Backend->>Backend: Set ownerId from token
    Backend->>Backend: Apply defaults (status: "todo", priority: "medium" if not provided)
    Backend->>Database: Create task
    Database-->>Backend: Task created
    Backend-->>Frontend: 201 Created (task object)
    Frontend-->>User: Task created successfully
```

## Create Task Flow (Validation Error)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    
    User->>Frontend: Submit create task form (invalid data)
    Frontend->>Backend: POST /tasks (JWT token, invalid input)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Validate input (fails)
    Backend-->>Frontend: 400 Bad Request (validation errors)
    Frontend-->>User: Display validation errors
```

## List Tasks Flow (Success)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Request task list
    Frontend->>Backend: GET /tasks (JWT token)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Extract user ID from token
    Backend->>Database: Get tasks by ownerId
    Database-->>Backend: Tasks found
    Backend-->>Frontend: 200 OK (array of tasks)
    Frontend-->>User: Display task list
```

## List Tasks Flow (With Filters)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Request filtered task list
    Frontend->>Backend: GET /tasks?status=in-progress&priority=high&search=project (JWT token)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Extract user ID from token
    Backend->>Backend: Apply filters (status, priority, search)
    Backend->>Backend: Convert search query to lowercase
    Backend->>Database: Get filtered tasks by ownerId
    Database-->>Backend: Filtered tasks found
    Backend-->>Frontend: 200 OK (array of filtered tasks)
    Frontend-->>User: Display filtered task list
```

## Get Task Flow (Success)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Request task details
    Frontend->>Backend: GET /tasks/:id (JWT token)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Extract user ID from token
    Backend->>Database: Get task by ID
    Database-->>Backend: Task found
    Backend->>Backend: Verify ownership (task.ownerId === user.id)
    Backend-->>Frontend: 200 OK (task object)
    Frontend-->>User: Display task details
```

## Get Task Flow (Ownership Violation)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Request task details
    Frontend->>Backend: GET /tasks/:id (JWT token)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Extract user ID from token
    Backend->>Database: Get task by ID
    Database-->>Backend: Task found
    Backend->>Backend: Verify ownership (task.ownerId !== user.id)
    Backend-->>Frontend: 403 Forbidden ("Access denied")
    Frontend-->>User: Display error message
```

## Get Task Flow (Not Found)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Request task details
    Frontend->>Backend: GET /tasks/:id (JWT token)
    Backend->>Backend: Validate JWT token
    Backend->>Database: Get task by ID
    Database-->>Backend: Task not found
    Backend-->>Frontend: 404 Not Found ("Resource not found")
    Frontend-->>User: Display error message
```

## Update Task Flow (Success)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Submit task update form
    Frontend->>Backend: PATCH /tasks/:id (JWT token, title/description/status/priority)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Extract user ID from token
    Backend->>Database: Get task by ID
    Database-->>Backend: Task found
    Backend->>Backend: Verify ownership (task.ownerId === user.id)
    Backend->>Backend: Validate input
    Backend->>Database: Update task
    Database-->>Backend: Task updated
    Backend-->>Frontend: 200 OK (updated task object)
    Frontend-->>User: Task updated successfully
```

## Update Task Flow (Validation Error)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Submit task update form (invalid data)
    Frontend->>Backend: PATCH /tasks/:id (JWT token, invalid input)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Extract user ID from token
    Backend->>Database: Get task by ID
    Database-->>Backend: Task found
    Backend->>Backend: Verify ownership
    Backend->>Backend: Validate input (fails)
    Backend-->>Frontend: 400 Bad Request (validation errors)
    Frontend-->>User: Display validation errors
```

## Delete Task Flow (Success)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Request task deletion
    Frontend->>Backend: DELETE /tasks/:id (JWT token)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Extract user ID from token
    Backend->>Database: Get task by ID
    Database-->>Backend: Task found
    Backend->>Backend: Verify ownership (task.ownerId === user.id)
    Backend->>Database: Delete task
    Database-->>Backend: Task deleted
    Backend-->>Frontend: 204 No Content
    Frontend-->>User: Task deleted successfully
```

## Delete Task Flow (Ownership Violation)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Request task deletion
    Frontend->>Backend: DELETE /tasks/:id (JWT token)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Extract user ID from token
    Backend->>Database: Get task by ID
    Database-->>Backend: Task found
    Backend->>Backend: Verify ownership (task.ownerId !== user.id)
    Backend-->>Frontend: 403 Forbidden ("Access denied")
    Frontend-->>User: Display error message
```

