# Task Manager Backend: API Specification

## Naming Convention

All JSON fields use camelCase (e.g., `accessToken`, `ownerId`, `createdAt`).

## Error Response Format

All endpoints return consistent error format:

```json
{
  "statusCode": number,
  "message": "string",
  "error": "string"
}
```

## Authentication Endpoints

### POST /signup

**Description:** Register a new user

**Authentication:** No (public endpoint)

**Request Body:**
```json
{
  "username": "string (required, 2-30 chars, alphanumeric and underscores only)",
  "email": "string (required, valid email format)",
  "password": "string (required, min 6 chars)",
  "about": "string (optional, 2-200 chars)",
  "avatar": "string (optional, valid URL format)"
}
```

**Response:** HTTP 201 Created
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "about": "Software developer",
  "avatar": "https://example.com/avatar.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Scenarios:**
- 400 Bad Request: Validation errors, duplicate username, duplicate email

### POST /signin

**Description:** Authenticate user and receive JWT token

**Authentication:** No (public endpoint)

**Request Body:**
```json
{
  "email": "string (required, valid email format)",
  "password": "string (required, min 6 chars)"
}
```

**Response:** HTTP 200 OK
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Scenarios:**
- 400 Bad Request: Validation errors
- 401 Unauthorized: Invalid credentials

## User Management Endpoints

### GET /users/me

**Description:** Get current user's profile

**Authentication:** Yes (JWT required)

**Request Body:** None

**Response:** HTTP 200 OK
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "about": "Software developer",
  "avatar": "https://example.com/avatar.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Scenarios:**
- 401 Unauthorized: Missing or invalid token

### PATCH /users/me

**Description:** Update current user's profile

**Authentication:** Yes (JWT required)

**Request Body:**
```json
{
  "password": "string (optional, min 6 chars)",
  "about": "string (optional, 2-200 chars)",
  "avatar": "string (optional, valid URL format)"
}
```

Note: username and email cannot be updated (immutable fields)

**Response:** HTTP 200 OK
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "about": "Updated bio",
  "avatar": "https://example.com/new-avatar.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-02T00:00:00.000Z"
}
```

**Error Scenarios:**
- 400 Bad Request: Validation errors
- 401 Unauthorized: Missing or invalid token

## Task Management Endpoints

### POST /tasks

**Description:** Create a new task

**Authentication:** Yes (JWT required)

**Request Body:**
```json
{
  "title": "string (required, 1-250 chars)",
  "description": "string (optional, 1-1024 chars)",
  "status": "string (optional, enum: 'todo' | 'in-progress' | 'done', default: 'todo')",
  "priority": "string (optional, enum: 'low' | 'medium' | 'high', default: 'medium')"
}
```

**Response:** HTTP 201 Created
```json
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the task manager backend",
  "status": "in-progress",
  "priority": "high",
  "ownerId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Scenarios:**
- 400 Bad Request: Validation errors, invalid enum values
- 401 Unauthorized: Missing or invalid token

### GET /tasks

**Description:** List all tasks for the authenticated user with optional filtering and search

**Authentication:** Yes (JWT required)

**Query Parameters:**
- `status` (optional): Filter by status ("todo" | "in-progress" | "done")
- `priority` (optional): Filter by priority ("low" | "medium" | "high")
- `search` (optional): Search in title and description (case-insensitive partial match)

**Request Body:** None

**Response:** HTTP 200 OK
```json
[
  {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the task manager backend",
    "status": "in-progress",
    "priority": "high",
    "ownerId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Write tests",
    "description": "Add unit tests for services",
    "status": "todo",
    "priority": "medium",
    "ownerId": 1,
    "createdAt": "2024-01-02T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
]
```

Note: Plain array format (not wrapped object)

**Error Scenarios:**
- 400 Bad Request: Invalid query parameter values
- 401 Unauthorized: Missing or invalid token

### GET /tasks/:id

**Description:** Get a single task by ID

**Authentication:** Yes (JWT required)

**Request Body:** None

**Response:** HTTP 200 OK
```json
{
  "id": 1,
  "title": "Complete project",
  "description": "Finish the task manager backend",
  "status": "in-progress",
  "priority": "high",
  "ownerId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Scenarios:**
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: Task does not belong to authenticated user
- 404 Not Found: Task not found

### PATCH /tasks/:id

**Description:** Update a task by ID

**Authentication:** Yes (JWT required)

**Request Body:**
```json
{
  "title": "string (optional, 1-250 chars)",
  "description": "string (optional, 1-1024 chars)",
  "status": "string (optional, enum: 'todo' | 'in-progress' | 'done')",
  "priority": "string (optional, enum: 'low' | 'medium' | 'high')"
}
```

Note: ownerId cannot be updated (immutable field)

**Response:** HTTP 200 OK
```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Updated description",
  "status": "done",
  "priority": "low",
  "ownerId": 1,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-03T00:00:00.000Z"
}
```

**Error Scenarios:**
- 400 Bad Request: Validation errors, invalid enum values
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: Task does not belong to authenticated user
- 404 Not Found: Task not found

### DELETE /tasks/:id

**Description:** Delete a task by ID

**Authentication:** Yes (JWT required)

**Request Body:** None

**Response:** HTTP 204 No Content (no response body)

**Error Scenarios:**
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: Task does not belong to authenticated user
- 404 Not Found: Task not found

## Common Status Codes

- **200 OK:** Successful GET, PATCH requests with response body
- **201 Created:** Successful POST requests with response body
- **204 No Content:** Successful DELETE requests (no response body)
- **400 Bad Request:** Validation errors, duplicate values, invalid enum values
- **401 Unauthorized:** Missing or invalid JWT token, invalid credentials
- **403 Forbidden:** Ownership violations, insufficient permissions
- **404 Not Found:** Resource not found

