# Validation Rules

Reusable validation patterns and field constraint rules.

## Validation Patterns

- **Input Validation:** All input validated before processing
- **Required Fields:** Required fields must be provided
- **Optional Fields:** Optional fields can be omitted or set to null
- **Enum Values:** Enum fields must match exact values (case-sensitive)

## Field Type Validation

- **String Fields:** Validate length constraints (min/max)
- **Email Fields:** Validate email format
- **URL Fields:** Validate URL format
- **Enum Fields:** Validate against allowed values (case-sensitive)

## Constraint Validation

- **Unique Constraints:** Username and email must be unique
- **Length Constraints:** Enforce min/max length for text fields
- **Format Validation:** Validate email format, URL format
- **Required Validation:** Ensure required fields are present

## Specific Validation Constraints

### Password
- **Minimum Length:** 6 characters

### Username
- **Length:** 2-30 characters
- **Uniqueness:** Must be unique across all users

### Email
- **Format:** Valid email format required
- **Uniqueness:** Must be unique across all users

### Text Fields
- **Short Text (username, title):** 1-250 characters
- **Medium Text (about):** 2-200 characters
- **Medium Text (description):** 1-1024 characters
- **Long Text:** Max 1024 characters

### URL Fields
- **Avatar/Image URLs:** Valid URL format required

## Validation Error Handling

- **Validation Errors:** Return 400 Bad Request with validation details
- **Error Messages:** Provide clear validation error messages
- **Field-Level Errors:** Include field-specific error information when possible

