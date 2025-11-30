# Data Model Patterns

Reusable data model patterns that can be applied to any backend system.

## Common Entity Fields

### Standard Fields
- **id:** number (Primary key, auto-generated)
- **createdAt:** Date (auto-generated)
- **updatedAt:** Date (auto-generated)

## Relationship Patterns

- **One-to-Many:** User owns many Resources (User ||--o{ Resource : owns)
- **Many-to-One:** Resource belongs to User (Resource }o--|| User : owner)
- **Ownership:** Resources have owner field referencing User

## Immutability Patterns

- **Username:** Cannot be changed after registration
- **Email:** Cannot be changed after registration
- **Resource Ownership:** Set at creation, cannot be changed

## Default Value Pattern

- **Specific Defaults:** Use specific default values (URLs, messages), not null or empty strings

