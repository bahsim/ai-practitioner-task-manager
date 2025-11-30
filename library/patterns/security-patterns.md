# Security Patterns

Reusable security patterns for authentication, authorization, and data protection.

## Authentication Patterns

- **JWT Authentication:** Protects most endpoints
- **Public Endpoints:** Registration and login endpoints are public (no authentication required)
- **Token Validation:** All protected endpoints validate JWT token

## Authorization Patterns

- **Ownership Verification:** Required for all edit/delete operations
- **Ownership Enforcement:** Users can only view, edit, or delete their own resources
- **Resource Ownership:** Resource ownership is set at creation and cannot be changed
- **Resource Transfer:** Resources cannot be transferred between users
- **Ownership Violations:** Return 403 Forbidden

## Password Security Patterns

- **Password Hashing:** Passwords are hashed and stored securely
- **Password Serialization:** Passwords are excluded from all serialization (never returned in API responses)
- **Password Re-hashing:** Password updates require re-hashing

## Data Visibility Patterns

- **User Isolation:** Users can only see their own resources
- **Resource Filtering:** Resource lists are filtered by authenticated user
- **No Public Resources:** No public or shared resources (unless explicitly required)

## Access Control Patterns

- **Modification Operations:** All modification operations require JWT authentication
- **Viewing Operations:** Viewing operations require JWT authentication (unless public)
- **Self-Update Only:** Users can only update their own profile

