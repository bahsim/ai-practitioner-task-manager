# Task Manager Backend: User Management Business Rules

## User Management Rules

- **USER-1:** Username must be unique across all users
- **USER-2:** Email must be unique across all users
- **USER-3:** Username cannot be changed after registration
- **USER-4:** Email cannot be changed after registration
- **USER-5:** Password can be updated by the user
- **USER-6:** Users can only view their own profile
- **USER-7:** Users can only update their own profile

## Authentication Rules

- **AUTH-1:** User registration requires username, email, and password
- **AUTH-2:** User login requires email and password (not username)
- **AUTH-3:** Passwords are hashed before storage
- **AUTH-4:** JWT tokens are required for all protected endpoints
- **AUTH-5:** JWT tokens are validated on every protected request

## Security Rules

- **SEC-4:** Passwords are excluded from all API responses
- **SEC-5:** Passwords are hashed using secure hashing algorithm

## Validation Rules

- **VAL-1:** Username must be 2-30 characters, alphanumeric and underscores only
- **VAL-2:** Email must be valid email format
- **VAL-3:** Password must be minimum 6 characters
- **VAL-8:** About field must be 2-200 characters (if provided)
- **VAL-9:** Avatar field must be valid URL format (if provided)
- **VAL-10:** Required fields cannot be empty strings (empty strings treated as missing)

## Error Handling Rules

- **ERR-1:** Validation errors return HTTP 400 Bad Request
- **ERR-2:** Duplicate username returns HTTP 400 Bad Request with message "Username already exists"
- **ERR-3:** Duplicate email returns HTTP 400 Bad Request with message "Email already exists"
- **ERR-4:** Invalid credentials return HTTP 401 Unauthorized with message "Invalid credentials"
- **ERR-5:** Missing or invalid JWT token returns HTTP 401 Unauthorized

## Data Transformation Rules

- **DT-2:** Empty strings for optional fields are treated as null
- **DT-3:** Password fields are excluded from all API responses
- **DT-4:** Timestamps are returned in ISO 8601 format

