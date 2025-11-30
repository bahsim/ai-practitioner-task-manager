# Task Manager Backend: Authentication API Flows

## Registration Flow (Success)

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
    Backend->>Database: Create user (with hashed password)
    Database-->>Backend: User created
    Backend-->>Frontend: 201 Created (user object, password excluded)
    Frontend-->>User: Registration successful
```

## Registration Flow (Validation Error)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    
    User->>Frontend: Submit registration form (invalid data)
    Frontend->>Backend: POST /signup (invalid input)
    Backend->>Backend: Validate input (fails)
    Backend-->>Frontend: 400 Bad Request (validation errors)
    Frontend-->>User: Display validation errors
```

## Registration Flow (Duplicate Username/Email)

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

## Login Flow (Success)

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
    Database-->>Backend: User found (with hashed password)
    Backend->>Backend: Verify password (compare with hash)
    Backend->>Backend: Generate JWT token (with user ID)
    Backend-->>Frontend: 200 OK (accessToken)
    Frontend-->>User: Login successful, store token
```

## Login Flow (Invalid Credentials)

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
    Backend->>Backend: Verify password (fails - wrong password or user not found)
    Backend-->>Frontend: 401 Unauthorized ("Invalid credentials")
    Frontend-->>User: Display error message
```

## Protected Endpoint Flow (Valid Token)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Request protected resource
    Frontend->>Backend: GET /tasks (JWT token in Authorization header)
    Backend->>Backend: Extract JWT token from header
    Backend->>Backend: Validate JWT token (verify signature, check expiration)
    Backend->>Backend: Extract user ID from token payload
    Backend->>Database: Get resources for user
    Database-->>Backend: Resources found
    Backend-->>Frontend: 200 OK (resources)
    Frontend-->>User: Display resources
```

## Protected Endpoint Flow (Invalid Token)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    
    User->>Frontend: Request protected resource
    Frontend->>Backend: GET /tasks (invalid JWT token in header)
    Backend->>Backend: Extract JWT token from header
    Backend->>Backend: Validate JWT token (fails - invalid signature or expired)
    Backend-->>Frontend: 401 Unauthorized
    Frontend-->>User: Display error, redirect to login
```

## Protected Endpoint Flow (Missing Token)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    
    User->>Frontend: Request protected resource
    Frontend->>Backend: GET /tasks (no JWT token in header)
    Backend->>Backend: Extract JWT token from header (not found)
    Backend->>Backend: Validate JWT token (fails - token missing)
    Backend-->>Frontend: 401 Unauthorized
    Frontend-->>User: Display error, redirect to login
```

