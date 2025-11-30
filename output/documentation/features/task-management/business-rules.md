# Task Manager Backend: Task Management Business Rules

## Task Management Rules

- **TASK-1:** Tasks must have a title (required field)
- **TASK-2:** Tasks have a status with enum values: "todo", "in-progress", "done"
- **TASK-3:** Tasks have a priority with enum values: "low", "medium", "high"
- **TASK-4:** Tasks can be filtered by status (query parameter: `status`)
- **TASK-5:** Tasks can be filtered by priority (query parameter: `priority`)
- **TASK-6:** Tasks can be searched by title and description (query parameter: `search`)
- **TASK-7:** Search is case-insensitive and performs partial matching on title and description
- **TASK-8:** Users can only create tasks for themselves (ownerId set to authenticated user's ID)
- **TASK-9:** Users can only view their own tasks
- **TASK-10:** Users can only update their own tasks
- **TASK-11:** Users can only delete their own tasks

## Security and Authorization Rules

- **SEC-1:** Ownership verification occurs before any read, update, or delete operation on tasks
- **SEC-2:** Ownership violations return HTTP 403 Forbidden
- **SEC-3:** Resource lists are automatically filtered by authenticated user's ID

## Validation Rules

- **VAL-4:** Task title must be 1-250 characters
- **VAL-5:** Task description must be 1-1024 characters (if provided)
- **VAL-6:** Task status must be one of: "todo", "in-progress", "done" (case-sensitive)
- **VAL-7:** Task priority must be one of: "low", "medium", "high" (case-sensitive)
- **VAL-10:** Required fields cannot be empty strings (empty strings treated as missing)

## Error Handling Rules

- **ERR-1:** Validation errors return HTTP 400 Bad Request
- **ERR-6:** Ownership violations return HTTP 403 Forbidden with message "Access denied"
- **ERR-7:** Resource not found returns HTTP 404 Not Found with message "Resource not found"
- **ERR-8:** Invalid enum values return HTTP 400 Bad Request with message "Invalid {field} value"

## Data Transformation Rules

- **DT-1:** Enum values are case-sensitive (must match exact values: "todo", "in-progress", "done", "low", "medium", "high")
- **DT-2:** Empty strings for optional fields are treated as null
- **DT-4:** Timestamps are returned in ISO 8601 format
- **DT-5:** Search queries are converted to lowercase for case-insensitive matching

