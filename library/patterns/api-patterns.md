# API Patterns

Reusable API design patterns and conventions for RESTful endpoints.

## Endpoint Naming Conventions

- **Authentication:** POST /signup, POST /signin (not /auth/register, /auth/login)
- **User Profile:** GET /users/me, PATCH /users/me (not /users/profile)
- **Resource Operations:** POST /resources, GET /resources, GET /resources/:id, PATCH /resources/:id, DELETE /resources/:id

## Authentication Endpoints

- **Registration:** POST /signup with username, email, password → User object (password excluded)
- **Login:** POST /signin with username, password → { access_token: "JWT token" }

## User Endpoints

- **Get Profile:** GET /users/me → User object (password excluded)
- **Update Profile:** PATCH /users/me with optional fields (including password) → Updated user object

## RESTful Resource Patterns

- **Create:** POST /resources with required/optional fields → Created resource object
- **List:** GET /resources with optional query params → Array of resource objects
- **Get:** GET /resources/:id → Resource object
- **Update:** PATCH /resources/:id with optional fields → Updated resource object
- **Delete:** DELETE /resources/:id → Success message

## Query Parameter Patterns

- **Filtering:** GET /resources?field=value (filter by field values)
- **Search:** GET /resources?search=query (full-text search)
- **Pagination:** GET /resources?page=1&limit=10 (pagination support)

## Response Patterns

- **Success:** Return resource object(s) with all fields (except sensitive fields like password)
- **Error:** Consistent error format with statusCode, message, error
- **Password Exclusion:** Passwords never included in any response

## Authentication Requirements

- **Public Endpoints:** Registration and login endpoints are public (no authentication required)
- **Protected Endpoints:** All other endpoints require JWT authentication
- **Auth Header:** Bearer token in Authorization header
