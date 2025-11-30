# Documentation Specification: Task Manager Backend

## Objective

This specification defines the complete documentation structure and content requirements for the Task Manager Backend system. The documentation will be generated in Step 2 using this specification as the blueprint. All documentation must be self-contained with zero ambiguity and complete specifications for all entities, business rules, and API endpoints.

## Rationale

Well-structured documentation optimizes AI context management. Horizontal slices provide system-wide context, vertical slices enable incremental feature implementation. Complete documentation eliminates ambiguity and enables reliable code generation.

## Documentation Structure

### Horizontal Slices (System-Wide)

**Location:** Top-level `documentation/` folder

**Files Required (6 files):**
1. `overview.md` - Project overview, core capabilities, documentation structure index, key architectural decisions
2. `architecture.md` - Framework, system architecture diagram (Mermaid), module structure, database, authentication patterns, global patterns
3. `domain-models.md` - Entity-Relationship diagram (Mermaid), entity definitions with fields (types, constraints), relationships
4. `business-rules.md` - All business rules organized by category, each rule numbered with unique identifier (prefix-number format)
5. `api-specification.md` - All API endpoints with request/response formats, authentication requirements, error responses
6. `README.md` - Presentation script explaining documentation structure and purpose

### Vertical Slices (Feature-Specific)

**Location:** `documentation/features/{feature-name}/` folders

**Feature Folders (3 features):**
- `user-management/` - User registration, authentication, and profile management
- `task-management/` - Task CRUD operations, filtering, and search
- `authentication/` - Authentication and authorization flows

**Files Per Feature (3 files each):**
1. `overview.md` - Feature purpose, responsibilities, key capabilities
2. `business-rules.md` - Feature-specific business rules (subset of consolidated rules)
3. `api-flows.md` - Sequence diagrams (Mermaid) showing feature API flows

**Total File Count:** 15 files (6 top-level + 9 feature files: 3 features × 3 files)

## Content Specifications

### overview.md (Top-Level)

**Title:** "Task Manager Backend: Overview"

**Content Requirements:**

1. **Project Overview:**
   - Exact text: "A backend service for personal task management. Users can register, authenticate, and manage their personal tasks with status and priority tracking."

2. **Core Capabilities:**
   - User registration and authentication
   - User profile management
   - Task creation, viewing, updating, and deletion
   - Task filtering by status and priority
   - Task search by title and description

3. **Documentation Structure:**
   - Links to all 6 top-level files with brief descriptions:
     - `architecture.md` - System architecture, technology stack, and module structure
     - `domain-models.md` - Entity definitions and relationships
     - `business-rules.md` - All business rules organized by category
     - `api-specification.md` - Complete API endpoint documentation
     - `README.md` - Documentation structure and purpose
   - Links to all 3 feature folders with brief descriptions:
     - `features/user-management/` - User registration, authentication, and profile management
     - `features/task-management/` - Task CRUD operations, filtering, and search
     - `features/authentication/` - Authentication and authorization flows

4. **Key Architectural Decisions:**
   - NestJS framework for backend development
   - PostgreSQL database with TypeORM ORM
   - JWT-based authentication
   - RESTful API design
   - User ownership model (users can only access their own tasks)
   - Modular architecture (Users, Tasks, Auth modules)

### architecture.md

**Title:** "Task Manager Backend: Architecture"

**Content Requirements:**

1. **Framework:**
   - Exact text: "NestJS"

2. **Database:**
   - Exact text: "PostgreSQL"

3. **ORM:**
   - Exact text: "TypeORM"

4. **Authentication:**
   - Exact text: "JWT (JSON Web Tokens)"

5. **System Architecture Diagram:**
   - Mermaid diagram showing 4 layers:
     - Presentation Layer (Controllers)
     - Business Logic Layer (Services)
     - Data Access Layer (TypeORM Repositories)
     - Database Layer (PostgreSQL)
   - Include module boundaries: Users Module, Tasks Module, Auth Module

6. **Module Structure:**
   - **Users Module:** User profile management (view and update profile)
   - **Tasks Module:** Task CRUD operations, filtering, and search
   - **Auth Module:** Authentication and authorization (signup, signin, JWT validation)

7. **Database:**
   - Type: PostgreSQL
   - Entities: User, Task

8. **Authentication & Authorization:**
   - JWT token-based authentication
   - Public endpoints: POST /signup, POST /signin
   - Protected endpoints: All other endpoints require JWT authentication
   - Ownership verification: Users can only access their own resources

9. **Global Patterns:**
   - RESTful API design
   - Consistent error response format
   - Input validation on all endpoints
   - Password hashing and exclusion from responses
   - Timestamp fields (createdAt, updatedAt) on all entities
   - Ownership-based access control

### domain-models.md

**Title:** "Task Manager Backend: Domain Models"

**Content Requirements:**

1. **Entity-Relationship Diagram:**
   - Mermaid ER diagram showing:
     - User entity with fields: id, username, email, password, about, avatar, createdAt, updatedAt
     - Task entity with fields: id, title, description, status, priority, ownerId, createdAt, updatedAt
     - Relationship: User ||--o{ Task : owns (One-to-Many)

2. **User Entity:**
   - **Entity Name:** User
   - **Fields:**
     - **id:** number, Primary key, auto-generated, required
     - **username:** string, required, unique, 2-30 characters, alphanumeric and underscores only
     - **email:** string, required, unique, valid email format
     - **password:** string, required, minimum 6 characters, hashed in storage
     - **about:** string, optional, nullable, 2-200 characters
     - **avatar:** string, optional, nullable, valid URL format
     - **createdAt:** Date, auto-generated, required
     - **updatedAt:** Date, auto-generated, required
   - **Relationships:**
     - One-to-Many with Task (User owns many Tasks)
   - **Immutability:**
     - Username cannot be changed after registration
     - Email cannot be changed after registration

3. **Task Entity:**
   - **Entity Name:** Task
   - **Fields:**
     - **id:** number, Primary key, auto-generated, required
     - **title:** string, required, 1-250 characters
     - **description:** string, optional, nullable, 1-1024 characters
     - **status:** enum, required, values: "todo" | "in-progress" | "done", default: "todo"
     - **priority:** enum, required, values: "low" | "medium" | "high", default: "medium"
     - **ownerId:** number, required, foreign key to User.id
     - **createdAt:** Date, auto-generated, required
     - **updatedAt:** Date, auto-generated, required
   - **Relationships:**
     - Many-to-One with User (Task belongs to User via ownerId)
   - **Immutability:**
     - ownerId cannot be changed after creation

### business-rules.md (Top-Level)

**Title:** "Task Manager Backend: Business Rules"

**Content Requirements:**

1. **Category Prefixes:**
   - **USER-** for user management rules
   - **TASK-** for task management rules
   - **AUTH-** for authentication rules
   - **SEC-** for security and authorization rules
   - **VAL-** for validation rules
   - **ERR-** for error handling rules
   - **DT-** for data transformation rules

2. **Numbering Format:**
   - Format: `{Category Prefix}-{Number}` (e.g., USER-1, TASK-1, AUTH-1)

3. **User Management Rules:**
   - **USER-1:** Username must be unique across all users
   - **USER-2:** Email must be unique across all users
   - **USER-3:** Username cannot be changed after registration
   - **USER-4:** Email cannot be changed after registration
   - **USER-5:** Password can be updated by the user
   - **USER-6:** Users can only view their own profile
   - **USER-7:** Users can only update their own profile

4. **Task Management Rules:**
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

5. **Authentication Rules:**
   - **AUTH-1:** User registration requires username, email, and password
   - **AUTH-2:** User login requires email and password (not username)
   - **AUTH-3:** Passwords are hashed before storage
   - **AUTH-4:** JWT tokens are required for all protected endpoints
   - **AUTH-5:** JWT tokens are validated on every protected request

6. **Security and Authorization Rules:**
   - **SEC-1:** Ownership verification occurs before any read, update, or delete operation on tasks
   - **SEC-2:** Ownership violations return HTTP 403 Forbidden
   - **SEC-3:** Resource lists are automatically filtered by authenticated user's ID
   - **SEC-4:** Passwords are excluded from all API responses
   - **SEC-5:** Passwords are hashed using secure hashing algorithm

7. **Validation Rules:**
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

8. **Default Values:**
   - **TASK-2 Default:** Task status defaults to "todo" if not provided
   - **TASK-3 Default:** Task priority defaults to "medium" if not provided
   - **USER-8 Default:** User about field defaults to null if not provided
   - **USER-9 Default:** User avatar field defaults to null if not provided

9. **Error Handling Rules:**
   - **ERR-1:** Validation errors return HTTP 400 Bad Request
   - **ERR-2:** Duplicate username returns HTTP 400 Bad Request with message "Username already exists"
   - **ERR-3:** Duplicate email returns HTTP 400 Bad Request with message "Email already exists"
   - **ERR-4:** Invalid credentials return HTTP 401 Unauthorized with message "Invalid credentials"
   - **ERR-5:** Missing or invalid JWT token returns HTTP 401 Unauthorized
   - **ERR-6:** Ownership violations return HTTP 403 Forbidden with message "Access denied"
   - **ERR-7:** Resource not found returns HTTP 404 Not Found with message "Resource not found"
   - **ERR-8:** Invalid enum values return HTTP 400 Bad Request with message "Invalid {field} value"

10. **Data Transformation Rules:**
    - **DT-1:** Enum values are case-sensitive (must match exact values: "todo", "in-progress", "done", "low", "medium", "high")
    - **DT-2:** Empty strings for optional fields are treated as null
    - **DT-3:** Password fields are excluded from all API responses
    - **DT-4:** Timestamps are returned in ISO 8601 format
    - **DT-5:** Search queries are converted to lowercase for case-insensitive matching

### api-specification.md

**Title:** "Task Manager Backend: API Specification"

**Content Requirements:**

1. **Naming Convention:**
   - All JSON fields use camelCase (e.g., `accessToken`, `ownerId`, `createdAt`)

2. **Error Response Format:**
   - Consistent error format for all endpoints:
   ```json
   {
     "statusCode": number,
     "message": "string",
     "error": "string"
   }
   ```

3. **Authentication Endpoints:**

   **POST /signup**
   - **Description:** Register a new user
   - **Authentication:** No (public endpoint)
   - **Request Body:**
     ```json
     {
       "username": "string (required, 2-30 chars, alphanumeric and underscores only)",
       "email": "string (required, valid email format)",
       "password": "string (required, min 6 chars)",
       "about": "string (optional, 2-200 chars)",
       "avatar": "string (optional, valid URL format)"
     }
     ```
   - **Response:** HTTP 201 Created
     ```json
     {
       "id": "number",
       "username": "string",
       "email": "string",
       "about": "string | null",
       "avatar": "string | null",
       "createdAt": "string (ISO 8601)",
       "updatedAt": "string (ISO 8601)"
     }
     ```
   - **Error Scenarios:**
     - 400 Bad Request: Validation errors, duplicate username, duplicate email

   **POST /signin**
   - **Description:** Authenticate user and receive JWT token
   - **Authentication:** No (public endpoint)
   - **Request Body:**
     ```json
     {
       "email": "string (required, valid email format)",
       "password": "string (required, min 6 chars)"
     }
     ```
   - **Response:** HTTP 200 OK
     ```json
     {
       "accessToken": "string (JWT token)"
     }
     ```
   - **Error Scenarios:**
     - 400 Bad Request: Validation errors
     - 401 Unauthorized: Invalid credentials

4. **User Management Endpoints:**

   **GET /users/me**
   - **Description:** Get current user's profile
   - **Authentication:** Yes (JWT required)
   - **Request Body:** None
   - **Response:** HTTP 200 OK
     ```json
     {
       "id": "number",
       "username": "string",
       "email": "string",
       "about": "string | null",
       "avatar": "string | null",
       "createdAt": "string (ISO 8601)",
       "updatedAt": "string (ISO 8601)"
     }
     ```
   - **Error Scenarios:**
     - 401 Unauthorized: Missing or invalid token

   **PATCH /users/me**
   - **Description:** Update current user's profile
   - **Authentication:** Yes (JWT required)
   - **Request Body:**
     ```json
     {
       "password": "string (optional, min 6 chars)",
       "about": "string (optional, 2-200 chars)",
       "avatar": "string (optional, valid URL format)"
     }
     ```
     - Note: username and email cannot be updated (immutable fields)
   - **Response:** HTTP 200 OK
     ```json
     {
       "id": "number",
       "username": "string",
       "email": "string",
       "about": "string | null",
       "avatar": "string | null",
       "createdAt": "string (ISO 8601)",
       "updatedAt": "string (ISO 8601)"
     }
     ```
   - **Error Scenarios:**
     - 400 Bad Request: Validation errors
     - 401 Unauthorized: Missing or invalid token

5. **Task Management Endpoints:**

   **POST /tasks**
   - **Description:** Create a new task
   - **Authentication:** Yes (JWT required)
   - **Request Body:**
     ```json
     {
       "title": "string (required, 1-250 chars)",
       "description": "string (optional, 1-1024 chars)",
       "status": "string (optional, enum: 'todo' | 'in-progress' | 'done', default: 'todo')",
       "priority": "string (optional, enum: 'low' | 'medium' | 'high', default: 'medium')"
     }
     ```
   - **Response:** HTTP 201 Created
     ```json
     {
       "id": "number",
       "title": "string",
       "description": "string | null",
       "status": "string",
       "priority": "string",
       "ownerId": "number",
       "createdAt": "string (ISO 8601)",
       "updatedAt": "string (ISO 8601)"
     }
     ```
   - **Error Scenarios:**
     - 400 Bad Request: Validation errors, invalid enum values
     - 401 Unauthorized: Missing or invalid token

   **GET /tasks**
   - **Description:** List all tasks for the authenticated user with optional filtering and search
   - **Authentication:** Yes (JWT required)
   - **Query Parameters:**
     - `status` (optional): Filter by status ("todo" | "in-progress" | "done")
     - `priority` (optional): Filter by priority ("low" | "medium" | "high")
     - `search` (optional): Search in title and description (case-insensitive partial match)
   - **Request Body:** None
   - **Response:** HTTP 200 OK
     ```json
     [
       {
         "id": "number",
         "title": "string",
         "description": "string | null",
         "status": "string",
         "priority": "string",
         "ownerId": "number",
         "createdAt": "string (ISO 8601)",
         "updatedAt": "string (ISO 8601)"
       }
     ]
     ```
     - Note: Plain array format (not wrapped object)
   - **Error Scenarios:**
     - 400 Bad Request: Invalid query parameter values
     - 401 Unauthorized: Missing or invalid token

   **GET /tasks/:id**
   - **Description:** Get a single task by ID
   - **Authentication:** Yes (JWT required)
   - **Request Body:** None
   - **Response:** HTTP 200 OK
     ```json
     {
       "id": "number",
       "title": "string",
       "description": "string | null",
       "status": "string",
       "priority": "string",
       "ownerId": "number",
       "createdAt": "string (ISO 8601)",
       "updatedAt": "string (ISO 8601)"
     }
     ```
   - **Error Scenarios:**
     - 401 Unauthorized: Missing or invalid token
     - 403 Forbidden: Task does not belong to authenticated user
     - 404 Not Found: Task not found

   **PATCH /tasks/:id**
   - **Description:** Update a task by ID
   - **Authentication:** Yes (JWT required)
   - **Request Body:**
     ```json
     {
       "title": "string (optional, 1-250 chars)",
       "description": "string (optional, 1-1024 chars)",
       "status": "string (optional, enum: 'todo' | 'in-progress' | 'done')",
       "priority": "string (optional, enum: 'low' | 'medium' | 'high')"
     }
     ```
     - Note: ownerId cannot be updated (immutable field)
   - **Response:** HTTP 200 OK
     ```json
     {
       "id": "number",
       "title": "string",
       "description": "string | null",
       "status": "string",
       "priority": "string",
       "ownerId": "number",
       "createdAt": "string (ISO 8601)",
       "updatedAt": "string (ISO 8601)"
     }
     ```
   - **Error Scenarios:**
     - 400 Bad Request: Validation errors, invalid enum values
     - 401 Unauthorized: Missing or invalid token
     - 403 Forbidden: Task does not belong to authenticated user
     - 404 Not Found: Task not found

   **DELETE /tasks/:id**
   - **Description:** Delete a task by ID
   - **Authentication:** Yes (JWT required)
   - **Request Body:** None
   - **Response:** HTTP 204 No Content (no response body)
   - **Error Scenarios:**
     - 401 Unauthorized: Missing or invalid token
     - 403 Forbidden: Task does not belong to authenticated user
     - 404 Not Found: Task not found

6. **Common Status Codes:**
   - **200 OK:** Successful GET, PATCH requests with response body
   - **201 Created:** Successful POST requests with response body
   - **204 No Content:** Successful DELETE requests (no response body)
   - **400 Bad Request:** Validation errors, duplicate values, invalid enum values
   - **401 Unauthorized:** Missing or invalid JWT token, invalid credentials
   - **403 Forbidden:** Ownership violations, insufficient permissions
   - **404 Not Found:** Resource not found

### Feature Files

#### user-management/overview.md

**Title:** "Task Manager Backend: User Management Overview"

**Content Requirements:**
- **Purpose:** One sentence: "Manages user registration, authentication, and profile operations."
- **Responsibilities:**
  - User registration with username, email, and password
  - User authentication (login)
  - User profile viewing and updating
- **Key Capabilities:**
  - Register new users
  - Authenticate users and issue JWT tokens
  - View user profile
  - Update user profile (password, about, avatar)

#### user-management/business-rules.md

**Title:** "Task Manager Backend: User Management Business Rules"

**Content Requirements:**
- Include all rules relevant to user management:
  - USER-1 through USER-7 (user management rules)
  - AUTH-1, AUTH-2, AUTH-3, AUTH-4, AUTH-5 (authentication rules)
  - SEC-4, SEC-5 (security rules for passwords)
  - VAL-1, VAL-2, VAL-3, VAL-8, VAL-9, VAL-10 (validation rules for user fields)
  - ERR-1, ERR-2, ERR-3, ERR-4, ERR-5 (error handling rules)
  - DT-2, DT-3, DT-4 (data transformation rules)

#### user-management/api-flows.md

**Title:** "Task Manager Backend: User Management API Flows"

**Content Requirements:**
- Mermaid sequence diagrams showing:
  - **User Registration Flow (Success):** User → Frontend → Backend → Database → Backend → Frontend → User
  - **User Registration Flow (Validation Error):** User → Frontend → Backend → Frontend → User (with error)
  - **User Registration Flow (Duplicate Username/Email):** User → Frontend → Backend → Database → Backend → Frontend → User (with error)
  - **User Login Flow (Success):** User → Frontend → Backend → Database → Backend → Frontend → User (with token)
  - **User Login Flow (Invalid Credentials):** User → Frontend → Backend → Database → Backend → Frontend → User (with error)
  - **Get Profile Flow (Success):** User → Frontend → Backend (JWT validation) → Database → Backend → Frontend → User
  - **Get Profile Flow (Invalid Token):** User → Frontend → Backend → Frontend → User (with error)
  - **Update Profile Flow (Success):** User → Frontend → Backend (JWT validation) → Database → Backend → Frontend → User
  - **Update Profile Flow (Validation Error):** User → Frontend → Backend → Frontend → User (with error)

#### task-management/overview.md

**Title:** "Task Manager Backend: Task Management Overview"

**Content Requirements:**
- **Purpose:** One sentence: "Manages task CRUD operations, filtering, and search for authenticated users."
- **Responsibilities:**
  - Task creation, viewing, updating, and deletion
  - Task filtering by status and priority
  - Task search by title and description
- **Key Capabilities:**
  - Create tasks with title, description, status, and priority
  - List tasks with optional filtering and search
  - View individual tasks
  - Update task details
  - Delete tasks

#### task-management/business-rules.md

**Title:** "Task Manager Backend: Task Management Business Rules"

**Content Requirements:**
- Include all rules relevant to task management:
  - TASK-1 through TASK-11 (task management rules)
  - SEC-1, SEC-2, SEC-3 (security and authorization rules for tasks)
  - VAL-4, VAL-5, VAL-6, VAL-7, VAL-10 (validation rules for task fields)
  - ERR-1, ERR-6, ERR-7, ERR-8 (error handling rules)
  - DT-1, DT-2, DT-4, DT-5 (data transformation rules)

#### task-management/api-flows.md

**Title:** "Task Manager Backend: Task Management API Flows"

**Content Requirements:**
- Mermaid sequence diagrams showing:
  - **Create Task Flow (Success):** User → Frontend → Backend (JWT validation) → Database → Backend → Frontend → User
  - **Create Task Flow (Validation Error):** User → Frontend → Backend → Frontend → User (with error)
  - **List Tasks Flow (Success):** User → Frontend → Backend (JWT validation) → Database → Backend → Frontend → User
  - **List Tasks Flow (With Filters):** User → Frontend → Backend (JWT validation, apply filters) → Database → Backend → Frontend → User
  - **Get Task Flow (Success):** User → Frontend → Backend (JWT validation, ownership check) → Database → Backend → Frontend → User
  - **Get Task Flow (Ownership Violation):** User → Frontend → Backend (JWT validation, ownership check) → Frontend → User (403 error)
  - **Get Task Flow (Not Found):** User → Frontend → Backend (JWT validation) → Database → Backend → Frontend → User (404 error)
  - **Update Task Flow (Success):** User → Frontend → Backend (JWT validation, ownership check) → Database → Backend → Frontend → User
  - **Update Task Flow (Validation Error):** User → Frontend → Backend → Frontend → User (with error)
  - **Delete Task Flow (Success):** User → Frontend → Backend (JWT validation, ownership check) → Database → Backend → Frontend → User (204)
  - **Delete Task Flow (Ownership Violation):** User → Frontend → Backend (JWT validation, ownership check) → Frontend → User (403 error)

#### authentication/overview.md

**Title:** "Task Manager Backend: Authentication Overview"

**Content Requirements:**
- **Purpose:** One sentence: "Handles user authentication and authorization using JWT tokens."
- **Responsibilities:**
  - User registration
  - User login and JWT token issuance
  - JWT token validation for protected endpoints
- **Key Capabilities:**
  - Register new users
  - Authenticate users and issue JWT tokens
  - Validate JWT tokens on protected endpoints

#### authentication/business-rules.md

**Title:** "Task Manager Backend: Authentication Business Rules"

**Content Requirements:**
- Include all rules relevant to authentication:
  - AUTH-1 through AUTH-5 (authentication rules)
  - SEC-4, SEC-5 (security rules for passwords)
  - VAL-1, VAL-2, VAL-3 (validation rules for authentication fields)
  - ERR-4, ERR-5 (error handling rules for authentication)
  - DT-3 (data transformation rules for passwords)

#### authentication/api-flows.md

**Title:** "Task Manager Backend: Authentication API Flows"

**Content Requirements:**
- Mermaid sequence diagrams showing:
  - **Registration Flow (Success):** User → Frontend → Backend → Database (password hashing) → Backend → Frontend → User
  - **Registration Flow (Validation Error):** User → Frontend → Backend → Frontend → User (with error)
  - **Registration Flow (Duplicate Username/Email):** User → Frontend → Backend → Database → Backend → Frontend → User (with error)
  - **Login Flow (Success):** User → Frontend → Backend → Database (password verification) → Backend (JWT generation) → Frontend → User (with token)
  - **Login Flow (Invalid Credentials):** User → Frontend → Backend → Database → Backend → Frontend → User (with error)
  - **Protected Endpoint Flow (Valid Token):** User → Frontend → Backend (JWT validation) → Database → Backend → Frontend → User
  - **Protected Endpoint Flow (Invalid Token):** User → Frontend → Backend → Frontend → User (401 error)
  - **Protected Endpoint Flow (Missing Token):** User → Frontend → Backend → Frontend → User (401 error)

### README.md

**Title:** "Task Manager Backend: Documentation"

**Content Requirements:**

1. **Presentation Script Format:**
   - Conversational tone, suitable for reading aloud
   - Brief system description
   - Architectural Slicing explanation
   - Incremental implementation approach
   - Documentation completeness indicators (concrete numbers)
   - Purpose statement

2. **Concrete Numbers:**
   - **Top-level files:** 6 files
   - **Feature folders:** 3 features (user-management, task-management, authentication)
   - **Feature-specific files:** 9 files (3 features × 3 files)
   - **Total files:** 15 files (6 top-level + 9 feature files)
   - **Entities:** 2 entities (User, Task)
   - **API endpoints:** 8 endpoints (2 authentication + 2 user management + 4 task management)
   - **Business rule categories:** 7 categories (USER, TASK, AUTH, SEC, VAL, ERR, DT)
   - **Total business rules:** 35 rules (7 USER + 11 TASK + 5 AUTH + 5 SEC + 10 VAL + 8 ERR + 5 DT)

3. **Design Decisions:**
   - **Field Naming:** camelCase convention used throughout (e.g., `accessToken`, `ownerId`, `createdAt`)
   - **HTTP Methods:** PATCH used for updates (not PUT) to allow partial updates
   - **Response Format:** Plain array format for list endpoints (not wrapped object)
   - **Feature Folder Naming:** kebab-case convention (user-management, task-management, authentication)
   - **Login Identifier:** Email used for login (not username) for better security and user experience
   - **Token Field Name:** `accessToken` in camelCase (consistent with other fields)
   - **HTTP Status Codes:** Standard REST conventions (204 for DELETE, 201 for POST, 200 for GET/PATCH)
   - **Default Values:** Fields with defaults (status, priority) are optional in API requests
   - **Immutable Fields:** username, email, and ownerId cannot be updated after creation/registration

4. **Self-Contained Note:**
   - All documentation is self-contained with no external references
   - All patterns, rules, and formats are included directly in the documentation
   - Documentation is usable independently without external dependencies

## Explicit Requirements

This section documents all resolved ambiguities with exact values:

1. **Task Status Enum:** Exact values: `"todo" | "in-progress" | "done"` (default: `"todo"`)

2. **Task Priority Enum:** Exact values: `"low" | "medium" | "high"` (default: `"medium"`)

3. **Password Requirement:** Exact minimum length: 6 characters

4. **Login Identifier:** Exact type: email (not username)

5. **Endpoint Paths:**
   - POST /signup (not /auth/register)
   - POST /signin (not /auth/login)
   - GET /users/me (not /users/profile)
   - PATCH /users/me (not PUT /users/me)
   - POST /tasks (not /tasks/create)
   - GET /tasks (not /tasks/list)
   - GET /tasks/:id (not /tasks/get/:id)
   - PATCH /tasks/:id (not PUT /tasks/:id)
   - DELETE /tasks/:id

6. **User Entity Fields:** Exact field list: id, username, email, password, about, avatar, createdAt, updatedAt (no firstName/lastName)

7. **Field Constraints:**
   - Username: 2-30 characters, alphanumeric and underscores only
   - Email: valid email format
   - Password: minimum 6 characters
   - Task title: 1-250 characters
   - Task description: 1-1024 characters (optional)
   - About: 2-200 characters (optional)
   - Avatar: valid URL format (optional)

8. **Task Filtering:** Exact query parameters: `status`, `priority`, `search`

9. **User Profile Updates:** Exact allowed fields: password, about, avatar (username and email are immutable)

10. **Default Values Format:** Exact format: specific enum values for status/priority ("todo", "medium"), null for optional fields (about, avatar)

11. **Title Formats:** Exact titles for each documentation file (as specified in Content Specifications section)

12. **HTTP Methods:** Exact methods: PATCH for updates (not PUT)

13. **Feature Names:** Exact feature folder names: user-management, task-management, authentication

14. **Naming Convention:** Exact convention: camelCase for JSON fields (e.g., `accessToken`, `ownerId`, `createdAt`)

15. **Token Field Name:** Exact name: `accessToken` (camelCase, consistent with other fields)

16. **List Response Format:** Exact format: plain array `[{...}, {...}]` (not wrapped object)

17. **Field Required/Optional Consistency:** Fields with defaults (status, priority) are optional in API requests

18. **HTTP Status Codes:** Exact status codes:
    - 200 OK: GET, PATCH
    - 201 Created: POST
    - 204 No Content: DELETE
    - 400 Bad Request: Validation errors
    - 401 Unauthorized: Authentication failures
    - 403 Forbidden: Authorization failures
    - 404 Not Found: Resource not found

19. **Business Rule Prefixes:** Exact prefix scheme: USER-, TASK-, AUTH-, SEC-, VAL-, ERR-, DT-

20. **Architecture Layers:** Exact number and names: 4 layers (Presentation, Business Logic, Data Access, Database)

21. **Module Names:** Exact module names: Users, Tasks, Auth

22. **Search Functionality:** Exact behavior: case-insensitive partial matching on title and description fields

23. **Field Update Capabilities:** Exact allowed updates:
    - User: password, about, avatar (username and email immutable)
    - Task: title, description, status, priority (ownerId immutable)

24. **Data Transformation Rules:** Exact rules:
    - Enum values are case-sensitive
    - Empty strings for optional fields treated as null
    - Password fields excluded from all responses
    - Timestamps in ISO 8601 format
    - Search queries converted to lowercase for case-insensitive matching

## Verification Criteria

1. **Structure:**
   - All 6 top-level files exist in `documentation/` folder
   - All 3 feature folders exist in `documentation/features/`
   - Each feature folder contains exactly 3 files (overview.md, business-rules.md, api-flows.md)
   - Total file count: 15 files (6 top-level + 9 feature files)

2. **Content:**
   - All business rules numbered with unique identifiers (USER-1 through DT-5)
   - All API endpoints documented with complete request/response formats
   - All entity fields include types and constraints
   - All relationships defined
   - All required specifications explicitly included with exact values
   - All ambiguities resolved in "Explicit Requirements" section

3. **Completeness:**
   - No "TBD" or placeholder text
   - All diagrams render correctly (Mermaid syntax valid)
   - All ambiguities resolved with explicit values
   - No "specify X" language - only exact values

4. **Consistency:**
   - Naming conventions consistent throughout (camelCase for JSON fields)
   - Domain model field definitions match API request/response field definitions
   - Required/Optional status consistent between domain model and API spec
   - Fields with default values are optional in API requests
   - List endpoints use consistent response format (plain array)
   - HTTP status codes follow REST conventions
   - Field types consistent across domain model and API spec
   - Enum values consistent across domain model and API spec

5. **Organization:**
   - Horizontal slices contain only system-wide concerns
   - Vertical slices contain only feature-specific concerns
   - Business rules properly categorized
   - API endpoints properly grouped

6. **Self-Contained:**
   - No external file references
   - All patterns and rules included inline
   - All error formats included directly
   - All validation rules stated explicitly
   - All security patterns described directly
   - Documentation is usable independently

7. **Principles:**
   - No implementation details present
   - Architectural slicing applied correctly
   - No redundancy between files
   - Complete specification (no interpretation needed)
   - Self-contained (all information present, no external dependencies)

