# Error Patterns

Reusable error handling patterns and HTTP status code conventions.

## HTTP Status Codes

- **400 Bad Request:** Validation errors, duplicate usernames/emails, malformed requests
- **401 Unauthorized:** Invalid credentials, missing/invalid token
- **403 Forbidden:** Ownership violations, insufficient permissions
- **404 Not Found:** Missing resources, invalid resource IDs
- **500 Internal Server Error:** Server errors, unexpected exceptions

## Error Response Format

All endpoints return consistent error format:

```json
{
  "statusCode": number,
  "message": "string",
  "error": "string"
}
```

## Error Mapping Rules

- **Ownership Violations:** → 403 Forbidden
- **Missing Resources:** → 404 Not Found
- **Duplicate Usernames/Emails:** → 400 Bad Request
- **Invalid Credentials:** → 401 Unauthorized
- **Validation Errors:** → 400 Bad Request

## Error Handling Principles

- **Consistent Format:** All errors use the same response structure
- **Descriptive Messages:** Error messages should be clear and actionable
- **No Sensitive Data:** Error messages should not expose sensitive information
- **Status Code Accuracy:** Use appropriate HTTP status codes for each error type

