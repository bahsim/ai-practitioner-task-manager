# Task Manager Backend: Business Rules

## Category Prefixes

- **USER-** for user management rules
- **TASK-** for task management rules
- **AUTH-** for authentication rules
- **SEC-** for security and authorization rules
- **VAL-** for validation rules
- **ERR-** for error handling rules
- **DT-** for data transformation rules

## User Management Rules

- **USER-1:** Username must be unique across all users
- **USER-2:** Email must be unique across all users
- **USER-3:** Username cannot be changed after registration
- **USER-4:** Email cannot be changed after registration
- **USER-5:** Password can be updated by the user
- **USER-6:** Users can only view their own profile
- **USER-7:** Users can only update their own profile

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

## Authentication Rules

- **AUTH-1:** User registration requires username, email, and password
- **AUTH-2:** User login requires email and password (not username)
- **AUTH-3:** Passwords are hashed before storage
- **AUTH-4:** JWT tokens are required for all protected endpoints
- **AUTH-5:** JWT tokens are validated on every protected request

## Security and Authorization Rules

- **SEC-1:** Ownership verification occurs before any read, update, or delete operation on tasks
- **SEC-2:** Ownership violations return HTTP 403 Forbidden
- **SEC-3:** Resource lists are automatically filtered by authenticated user's ID
- **SEC-4:** Passwords are excluded from all API responses
- **SEC-5:** Passwords are hashed using secure hashing algorithm

## Validation Rules

- **VAL-1:** Username must be 2-30 characters, alphanumeric and underscores only
- **VAL-2:** Email must be valid email format
- **VAL-3:** Password must be minimum 6 characters
- **VAL-4:** Task title must be 1-250 characters
- **VAL-5:** Task description must be 1-1024 characters (if provided)
- **VAL-6:** Task status must be one of: "todo", "in-progress", "done" (case-sensitive)
- **VAL-7:** Task priority must be one of: "low", "medium", "high" (case-sensitive)
- **VAL-8:** About field must be 2-200 characters (if provided)
- **VAL-9:** Avatar field must be valid URL format (if provided)
- **VAL-10:** Required fields cannot be empty strings (empty strings treated as missing)

## Default Values

- **TASK-2 Default:** Task status defaults to "todo" if not provided
- **TASK-3 Default:** Task priority defaults to "medium" if not provided
- **USER-8 Default:** User about field defaults to null if not provided
- **USER-9 Default:** User avatar field defaults to null if not provided

## Error Handling Rules

- **ERR-1:** Validation errors return HTTP 400 Bad Request
- **ERR-2:** Duplicate username returns HTTP 400 Bad Request with message "Username already exists"
- **ERR-3:** Duplicate email returns HTTP 400 Bad Request with message "Email already exists"
- **ERR-4:** Invalid credentials return HTTP 401 Unauthorized with message "Invalid credentials"
- **ERR-5:** Missing or invalid JWT token returns HTTP 401 Unauthorized
- **ERR-6:** Ownership violations return HTTP 403 Forbidden with message "Access denied"
- **ERR-7:** Resource not found returns HTTP 404 Not Found with message "Resource not found"
- **ERR-8:** Invalid enum values return HTTP 400 Bad Request with message "Invalid {field} value"

## Data Transformation Rules

- **DT-1:** Enum values are case-sensitive (must match exact values: "todo", "in-progress", "done", "low", "medium", "high")
- **DT-2:** Empty strings for optional fields are treated as null
- **DT-3:** Password fields are excluded from all API responses
- **DT-4:** Timestamps are returned in ISO 8601 format
- **DT-5:** Search queries are converted to lowercase for case-insensitive matching

