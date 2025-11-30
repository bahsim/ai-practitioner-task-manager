# Task Manager Backend: Authentication Business Rules

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

## Error Handling Rules

- **ERR-4:** Invalid credentials return HTTP 401 Unauthorized with message "Invalid credentials"
- **ERR-5:** Missing or invalid JWT token returns HTTP 401 Unauthorized

## Data Transformation Rules

- **DT-3:** Password fields are excluded from all API responses

