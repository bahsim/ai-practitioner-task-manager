# Task Manager Backend: User Management API Flows

## User Registration Flow (Success)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Submit registration form
    Frontend->>Backend: POST /signup (username, email, password, about, avatar)
    Backend->>Backend: Validate input
    Backend->>Database: Check username/email uniqueness
    Database-->>Backend: Username/email available
    Backend->>Backend: Hash password
    Backend->>Database: Create user
    Database-->>Backend: User created
    Backend-->>Frontend: 201 Created (user object, password excluded)
    Frontend-->>User: Registration successful
```

## User Registration Flow (Validation Error)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    
    User->>Frontend: Submit registration form (invalid data)
    Frontend->>Backend: POST /signup (invalid input)
    Backend->>Backend: Validate input
    Backend-->>Frontend: 400 Bad Request (validation errors)
    Frontend-->>User: Display validation errors
```

## User Registration Flow (Duplicate Username/Email)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Submit registration form
    Frontend->>Backend: POST /signup (username, email, password)
    Backend->>Backend: Validate input
    Backend->>Database: Check username/email uniqueness
    Database-->>Backend: Username/email already exists
    Backend-->>Frontend: 400 Bad Request ("Username already exists" or "Email already exists")
    Frontend-->>User: Display error message
```

## User Login Flow (Success)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Submit login form
    Frontend->>Backend: POST /signin (email, password)
    Backend->>Backend: Validate input
    Backend->>Database: Find user by email
    Database-->>Backend: User found
    Backend->>Backend: Verify password
    Backend->>Backend: Generate JWT token
    Backend-->>Frontend: 200 OK (accessToken)
    Frontend-->>User: Login successful, store token
```

## User Login Flow (Invalid Credentials)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Submit login form (wrong credentials)
    Frontend->>Backend: POST /signin (email, password)
    Backend->>Backend: Validate input
    Backend->>Database: Find user by email
    Database-->>Backend: User found or not found
    Backend->>Backend: Verify password (fails)
    Backend-->>Frontend: 401 Unauthorized ("Invalid credentials")
    Frontend-->>User: Display error message
```

## Get Profile Flow (Success)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Request profile
    Frontend->>Backend: GET /users/me (JWT token in header)
    Backend->>Backend: Validate JWT token
    Backend->>Database: Get user by ID from token
    Database-->>Backend: User found
    Backend-->>Frontend: 200 OK (user object, password excluded)
    Frontend-->>User: Display profile
```

## Get Profile Flow (Invalid Token)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    
    User->>Frontend: Request profile
    Frontend->>Backend: GET /users/me (invalid/missing JWT token)
    Backend->>Backend: Validate JWT token (fails)
    Backend-->>Frontend: 401 Unauthorized
    Frontend-->>User: Display error, redirect to login
```

## Update Profile Flow (Success)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Submit profile update form
    Frontend->>Backend: PATCH /users/me (JWT token, password/about/avatar)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Validate input
    Backend->>Backend: Hash password if provided
    Backend->>Database: Update user
    Database-->>Backend: User updated
    Backend-->>Frontend: 200 OK (updated user object, password excluded)
    Frontend-->>User: Profile updated successfully
```

## Update Profile Flow (Validation Error)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    
    User->>Frontend: Submit profile update form (invalid data)
    Frontend->>Backend: PATCH /users/me (JWT token, invalid input)
    Backend->>Backend: Validate JWT token
    Backend->>Backend: Validate input (fails)
    Backend-->>Frontend: 400 Bad Request (validation errors)
    Frontend-->>User: Display validation errors
```

