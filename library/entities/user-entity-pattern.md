# User Entity Pattern

Common user entity structure for authentication systems.

## User Entity Fields

- **id:** number (Primary key, auto-generated)
- **createdAt:** Date (auto-generated)
- **updatedAt:** Date (auto-generated)
- **username:** string (unique, required, 2-30 chars)
- **email:** string (unique, required, valid email format)
- **password:** string (required, min 6 characters)
- **about:** string (optional, 2-200 chars)
- **avatar:** string (optional, valid URL)

## Relationships

- **One-to-Many:** User owns many Resources (User ||--o{ Resource : owns)

## Immutability

- **Username:** Cannot be changed after registration
- **Email:** Cannot be changed after registration

