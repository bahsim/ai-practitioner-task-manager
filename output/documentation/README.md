# Task Manager Backend: Documentation

Welcome to the Task Manager Backend documentation. This documentation provides a complete specification for building a personal task management system using NestJS, PostgreSQL, and TypeORM.

## System Description

The Task Manager Backend is a RESTful API service that enables users to register, authenticate, and manage their personal tasks. Users can create tasks with titles, descriptions, status, and priority levels. The system supports filtering tasks by status and priority, as well as searching tasks by title and description. All operations are secured with JWT authentication, and users can only access their own tasks.

## Architectural Slicing

This documentation is organized using Architectural Slicing principles, which optimize AI context management and enable incremental implementation.

### Horizontal Slices (System-Wide)

The top-level documentation files provide system-wide context:

- **Overview:** Project overview, core capabilities, and key architectural decisions
- **Architecture:** Technology stack, system architecture diagram, module structure, and global patterns
- **Domain Models:** Entity definitions, relationships, and field specifications
- **Business Rules:** All business rules organized by category with unique identifiers
- **API Specification:** Complete API endpoint documentation with request/response formats

These horizontal slices give you a comprehensive understanding of the entire system before diving into specific features.

### Vertical Slices (Feature-Specific)

Each feature has its own folder containing three files:

- **Overview:** Feature purpose, responsibilities, and key capabilities
- **Business Rules:** Feature-specific business rules extracted from the consolidated rules
- **API Flows:** Sequence diagrams showing feature API flows including success and error paths

These vertical slices enable you to implement features incrementally, one at a time, with all the context needed for that specific feature.

## Incremental Implementation Approach

You can implement this system feature by feature:

1. **Start with Authentication:** Implement user registration and login to establish the foundation
2. **Add User Management:** Implement profile viewing and updating
3. **Implement Task Management:** Add task CRUD operations, filtering, and search

Each feature folder contains everything you need to implement that feature independently.

## Documentation Completeness

This documentation is complete and self-contained:

- **6 top-level files** covering system-wide concerns
- **3 feature folders** (user-management, task-management, authentication)
- **9 feature-specific files** (3 files per feature)
- **Total: 15 files** providing complete system specification
- **2 entities** (User, Task) with full field definitions
- **8 API endpoints** with complete request/response formats
- **7 business rule categories** (USER, TASK, AUTH, SEC, VAL, ERR, DT)
- **35 business rules** with unique identifiers

## Design Decisions

Several key design decisions were made to ensure consistency and clarity:

- **Field Naming:** camelCase convention used throughout (e.g., `accessToken`, `ownerId`, `createdAt`)
- **HTTP Methods:** PATCH used for updates (not PUT) to allow partial updates
- **Response Format:** Plain array format for list endpoints (not wrapped object)
- **Feature Folder Naming:** kebab-case convention (user-management, task-management, authentication)
- **Login Identifier:** Email used for login (not username) for better security and user experience
- **Token Field Name:** `accessToken` in camelCase (consistent with other fields)
- **HTTP Status Codes:** Standard REST conventions (204 for DELETE, 201 for POST, 200 for GET/PATCH)
- **Default Values:** Fields with defaults (status, priority) are optional in API requests
- **Immutable Fields:** username, email, and ownerId cannot be updated after creation/registration

## Purpose

This documentation serves as a complete, unambiguous specification for generating a NestJS backend application. Every entity field, business rule, and API endpoint is fully specified with exact values. There are no placeholders, no "TBD" text, and no external references. All information needed for code generation is present in the documentation itself.

The documentation follows pure documentation principles: it defines what the system does, not how it's implemented. It contains no implementation details like connection strings, credentials, or framework-specific exceptions. It's a contract-driven specification that can be used to generate code reliably and consistently.

All documentation is self-contained with no external references. All patterns, rules, and formats are included directly in the documentation. The documentation is usable independently without external dependencies.

