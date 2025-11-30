# Documentation Specification Generation Template

## Objective

Create a specification file (`documentation-spec.md`) that defines how to generate documentation. This specification will be used in Step 2 to generate the actual documentation files. The specification must be organized using Architectural Slicing principles and contain all information needed to generate documentation without interpretation.

## Rationale

Well-structured documentation optimizes AI context management. Horizontal slices provide system-wide context, vertical slices enable incremental feature implementation. Complete documentation eliminates ambiguity and enables reliable code generation.

## Output Specification Structure

The generated specification (`documentation-spec.md`) must define the following documentation structure:

### Horizontal Slices (System-Wide)

**Location:** Top-level `documentation/` folder

**Files Required:**
1. `overview.md` - Project overview, core capabilities, documentation structure index, key architectural decisions
2. `architecture.md` - Framework, system architecture diagram (Mermaid), module structure, database, authentication patterns, global patterns
3. `domain-models.md` - Entity-Relationship diagram (Mermaid), entity definitions with fields (types, constraints), relationships
4. `business-rules.md` - All business rules organized by category, each rule numbered with unique identifier (prefix-number format)
5. `api-specification.md` - All API endpoints with request/response formats, authentication requirements, error responses
6. `README.md` - Presentation script explaining documentation structure and purpose

### Vertical Slices (Feature-Specific)

**Location:** `documentation/features/{feature-name}/` folders

**Files Per Feature:**
1. `overview.md` - Feature purpose, responsibilities, key capabilities
2. `business-rules.md` - Feature-specific business rules (subset of consolidated rules)
3. `api-flows.md` - Sequence diagrams (Mermaid) showing feature API flows

## Specification Content Requirements

The generated specification must define content requirements for each documentation file with EXACT values. No "specify X" - provide the exact specification.

### overview.md (Top-Level)

**Must Include:**
- Project overview: One sentence describing the system
- Core capabilities: Bulleted list of main features
- Documentation structure: Links to all documentation files with brief descriptions
- Key architectural decisions: Bulleted list of architectural choices

**Required Specifications (The output spec must include exact values, not "specify X"):**
- **Title format:** The specification must state the exact title string (e.g., it should say "Title: Task Manager Backend: Overview" not "Title: specify project name")
- **Project overview sentence:** The specification must include exact text or a template
- **Core capabilities count:** The specification must state exact number of features
- **Documentation structure:** The specification must define exact format for links and descriptions

### architecture.md

**Must Include:**
- Framework: Technology stack
- System Architecture Diagram: Mermaid diagram showing architectural layers
- Module Structure: List of modules with brief purpose
- Database: Type and entities list
- Authentication & Authorization: Patterns used
- Global Patterns: System-wide patterns

**Required Specifications (The output spec must include exact values):**
- **Title format:** The specification must state the exact title string
- **Framework:** The specification must state exact framework name (from architectural requirements)
- **Database:** The specification must state exact database type (from architectural requirements)
- **ORM/ODM:** The specification must state exact ORM/ODM name if applicable (from architectural requirements)
- **Authentication method:** The specification must state exact method (from architectural requirements)
- **Architecture layers:** The specification must define exact number and names of layers in diagram (resolve any ambiguity in requirements)
- **Module structure:** The specification must list exact module names and purposes (from architectural requirements)
- **Global patterns:** The specification must list exact patterns (reference library patterns, specify project-specific ones)

### domain-models.md

**Must Include:**
- Entity-Relationship Diagram: Mermaid ER diagram showing relationships
- For each entity:
  - **Fields:** All fields with types, constraints (required/optional, min/max length, enum values, unique, etc.)
  - **Relationships:** Relationship type and description

**Required Specifications (The output spec must include exact values for each entity):**
- **Title format:** The specification must state the exact title string
- **For each entity, the specification must define EXACTLY:**
  - **Entity name:** Exact name
  - **All fields:** Complete list with exact specifications:
    - Field name
    - Type (string, number, boolean, Date, enum, etc.)
    - Required/Optional
    - Min/Max length (exact numbers, resolve any ranges in requirements)
    - Enum values (exact values, resolve any ambiguity in requirements)
    - Unique constraint (yes/no)
    - Format constraints (exact format requirements, e.g., "alphanumeric and underscores only", "valid email format", "valid URL format")
    - Default value (exact value or null, resolve any ambiguity)
    - **CRITICAL:** All constraints must be explicit (e.g., "hashed in storage" for password, "nullable" for optional fields)
  - **Standard fields:** The specification must explicitly state if id, createdAt, updatedAt are included (must be explicitly listed, not referenced)
  - **Relationships:** The specification must define exact relationship type and target entity
  - **Field semantics:** The specification should use clear semantic names (e.g., `ownerId` instead of `userId` if it's clearer)
- **Entity pattern application:** The specification should apply library entity patterns but include all details inline (not as references)

### business-rules.md (Top-Level)

**Must Include:**
- Rules organized by category
- Each rule with unique identifier: `{Category Prefix}-{Number}` format
- Default values for entities
- Validation constraints
- Ownership rules
- Error response mappings (status codes)

**Required Specifications (The output spec must include exact values):**
- **Title format:** The specification must state the exact title string
- **Category prefixes:** The specification must define exact prefix scheme (resolve any ambiguity, choose one format consistently)
- **Numbering format:** The specification must define exact format (resolve any ambiguity)
- **Default values:** The specification must specify exact default value for each entity field with defaults:
  - Exact string values (resolve enum defaults from requirements)
  - Exact URL patterns (if applicable, resolve format ambiguity)
  - Exact messages (if applicable, resolve format ambiguity)
  - Or explicitly state "null" or "empty string" (resolve format ambiguity)
  - **CRITICAL:** Must specify defaults for ALL fields that have defaults (including user avatar, about, etc.)
- **Validation constraints:** The specification must include validation rules inline (not as references):
  - Exact field constraints (min/max length, formats, allowed characters)
  - Exact validation rules for each field type
  - Exact error messages for validation failures
  - All validation rules must be explicitly stated in the specification
- **Ownership rules:** The specification must define exact ownership verification requirements inline:
  - How ownership is determined (e.g., "ownerId matching authenticated user's ID")
  - When ownership verification occurs (e.g., "before any read, update, or delete operation")
  - What happens on ownership violations (exact status code and message)
  - How resource lists are filtered (e.g., "automatically filter by authenticated user's ID")
- **Error mappings:** The specification must define exact HTTP status codes for each error type inline:
  - All error scenarios with exact status codes
  - Exact error response format (include JSON structure directly)
  - Edge cases (duplicate emails, invalid enums, empty strings for required fields)
- **Data Transformation rules:** The specification must include explicit data transformation rules:
  - Case-sensitivity requirements for enum values
  - Empty string handling (treated as null/undefined)
  - Field exclusions from responses (e.g., password fields)
  - Timestamp format requirements (e.g., ISO 8601)

### api-specification.md

**Must Include:**
- All endpoints grouped by feature
- For each endpoint:
  - HTTP method and path
  - Brief description
  - Request body format (JSON with field descriptions and constraints)
  - Response format
  - Authentication requirement (Yes/No, JWT)
- Error response format (consistent structure)
- Common status codes with descriptions

**Required Specifications (The output spec must include exact values for each endpoint):**
- **Title format:** The specification must state the exact title string
- **For each endpoint, the specification must define EXACTLY:**
  - **HTTP method:** Exact method (resolve any ambiguity, choose GET/POST/PUT/PATCH/DELETE consistently)
  - **Path:** Exact path (resolve any ambiguity in requirements, apply RESTful conventions consistently)
  - **Description:** Exact description text
  - **Request body:** Complete JSON schema with:
    - All fields with exact names (consistent naming convention throughout)
    - Exact types (must match domain model types)
    - Exact constraints (required/optional, min/max length, enum values - resolve all ambiguities)
    - **CRITICAL:** If a field has a default value in domain model, it must be optional in API request (unless explicitly required)
    - **CRITICAL:** All updatable fields must be explicitly listed (e.g., if email can be updated, it must be in the request body)
    - Exact examples if needed
  - **Response format:** Complete JSON schema with:
    - All fields with exact names (consistent naming convention, must match domain model)
    - Exact types (must match domain model types)
    - Fields excluded from response (e.g., password - must be explicitly stated, not referenced)
    - **CRITICAL for list endpoints:** The specification must explicitly choose and consistently apply:
      - Plain array: `[{...}, {...}]`
      - Wrapped object: `{ items: [{...}, {...}], total: number }` or similar
    - Exact examples
  - **HTTP status code:** Exact status code for success response:
    - GET: 200 OK (with body)
    - POST: 201 Created (with body)
    - PUT/PATCH: 200 OK (with body)
    - DELETE: 204 No Content (no body) - standard REST convention
  - **Authentication:** Exact requirement (must be explicitly stated, not referenced)
  - **Error scenarios:** All possible error cases with exact status codes and messages (must be inline, not referenced)
- **Login identifier:** The specification must state exact identifier type (resolve ambiguity: username or email)
- **Token field naming:** The specification must use consistent naming for token fields (e.g., `accessToken` in camelCase or `access_token` in snake_case - choose one and use consistently)
- **Error response format:** The specification must define exact JSON structure inline (include the complete error format, not a reference)
- **Status codes:** The specification must define exact mapping for all error cases inline (all error scenarios must be explicitly listed)
- **Query parameters:** The specification must define exact query parameters for list/search endpoints:
  - Exact parameter names
  - Exact parameter types and constraints
  - Exact behavior (e.g., "case-insensitive partial match" for search)
- **Field update capabilities:** The specification must explicitly state which fields can be updated (e.g., email updates allowed/not allowed, password updates allowed/not allowed)

### Feature Files

**Required Specifications (The output spec must include exact values):**
- **Feature folder names:** The specification must define exact folder names (resolve any ambiguity in requirements, choose naming convention consistently)
- **Feature naming convention:** The specification must explicitly state the chosen convention (simple names vs descriptive names)

**overview.md:**
- **Title format:** Exact title format (e.g., "{Project Name} Backend: {Feature Name} Overview" or "{Feature Name} Feature")
- Purpose: One sentence
- Responsibilities: Bulleted list
- Key Capabilities: Bulleted list

**business-rules.md:**
- **Title format:** Exact title format
- Feature-specific rules extracted from consolidated business-rules.md
- Same numbering format maintained
- Exact rule identifiers for each feature
- **CRITICAL:** Must include all rules relevant to the feature:
  - Feature-specific rules (e.g., TASK-* for task-management)
  - Security rules applicable to the feature (e.g., SEC-* for ownership)
  - Validation rules applicable to the feature (e.g., VAL-* for field constraints)
  - Error handling rules applicable to the feature (e.g., ERR-* for error scenarios)
  - Data transformation rules applicable to the feature (e.g., DT-* for transformations)

**api-flows.md:**
- **Title format:** Exact title format
- Sequence diagrams (Mermaid) showing user interactions with the feature
- Include: User, Frontend, Backend, Database actors
- Show request/response flows
- **CRITICAL:** Must include:
  - Success flows (happy path)
  - Error handling paths (validation errors, authentication errors, authorization errors)
  - Validation steps (when validation occurs)
  - Ownership checks (when ownership verification occurs)
- Exact flow descriptions required for all paths

### README.md

**Must Include:**
- Presentation script format (conversational, for reading aloud)
- Brief system description
- Architectural Slicing explanation
- Incremental implementation approach
- Documentation completeness indicators (concrete numbers)
- Purpose statement

**Required Specifications (The output spec must include exact values):**
- **Title format:** The specification must state the exact title string
- **Concrete numbers:** The specification must include exact counts:
  - Exact number of top-level files
  - Exact number of feature folders
  - Exact number of feature-specific files
  - Exact number of total files
  - Exact number of entities
  - Exact number of API endpoints
  - Exact number of business rule categories
  - Exact number of business rules (calculate from requirements)
- **Design decisions:** The specification should include a "Design Decisions" section explaining key choices:
  - Field naming choices (e.g., `ownerId` vs `userId`, `accessToken` vs `access_token`)
  - HTTP method choices (PATCH vs PUT)
  - Response format choices (plain array vs wrapped object)
  - Feature folder naming convention
  - Any other significant design decisions
- **Self-contained note:** The specification should explicitly state that all documentation is self-contained with no external references

## Documentation Principles

### Pure Documentation
- Contract-driven: defines what, not how
- No implementation details (connection strings, credentials, port numbers, file names, framework-specific exceptions, hashing algorithms, serialization details)
- No developer guides or explanatory text beyond specification

### Completeness
- Every entity field defined with type and constraints
- Every business rule numbered and explicit
- Every API endpoint with exact request/response formats
- Nothing left to interpretation

### Architectural Slicing
- Horizontal slices: System-wide concerns for comprehensive understanding
- Vertical slices: Feature-specific concerns for incremental implementation
- Each feature is self-contained

### No Redundancy
- Business rules appear once in consolidated file, referenced in feature files
- Default values in business-rules.md, not domain-models.md
- No duplicate information across files
- Library patterns referenced, not duplicated

## Self-Contained Documentation Requirement

**CRITICAL:** The generated specification must be completely self-contained. All information needed for code generation must be present in the specification itself.

**DO NOT:**
- Reference external pattern files (e.g., "Reference `patterns/error-patterns.md`")
- Include "Reference:" lines pointing to library files
- Assume readers will look up patterns elsewhere

**DO:**
- Include error response format directly in the specification
- List validation constraints inline
- Describe security patterns directly
- Include all necessary patterns and rules within the specification
- Make the specification usable independently without external dependencies

**Rationale:** Documentation must be self-contained. External references create dependencies and ambiguity. All information needed for code generation must be present in the documentation itself.

**Note:** The AI should use library patterns as guidance when creating the spec, but the output spec must include all necessary information directly, not as references.

## Explicit Requirements Section

The generated specification MUST include an "Explicit Requirements" or "Required Specifications" section that lists ALL resolved ambiguities with exact values:

- **Task status enum:** Exact values (e.g., `"todo" | "in-progress" | "done"` NOT `"pending" | "completed"`)
- **Password requirement:** Exact minimum length (e.g., "6 characters" or "8 characters")
- **Login identifier:** Exact type (username or email)
- **Endpoint paths:** Exact paths (e.g., `/signup` NOT `/auth/register`)
- **User entity fields:** Exact field list (e.g., "username, email, password, about, avatar" - no firstName/lastName)
- **Field constraints:** Exact constraints for all fields (e.g., "username: 2-30 chars, title: 1-250 chars")
- **Task filtering:** Exact query parameters (e.g., "status, priority, search")
- **User profile updates:** Exact allowed fields (e.g., "password updates allowed" or "password updates not allowed")
- **Default values format:** Exact format (specific URLs/messages vs null/empty)
- **Title formats:** Exact title for each documentation file
- **HTTP methods:** Exact methods for updates (PATCH vs PUT)
- **Feature names:** Exact feature folder names
- **Naming convention:** Exact convention chosen (camelCase, snake_case, kebab-case) and applied consistently
- **Token field name:** Exact name (e.g., `accessToken` or `access_token`) - must be consistent throughout
- **List response format:** Exact format chosen (plain array vs wrapped object) and applied consistently to all list endpoints
- **Field required/optional consistency:** Explicit statement that fields with defaults are optional in API (unless explicitly required)
- **HTTP status codes:** Exact status codes for all endpoints (204 for DELETE, 201 for POST, 200 for GET/PUT/PATCH)

## Cross-Validation Requirements

The generated specification MUST ensure consistency between sections. Before finalizing, verify:

1. **Domain Model ↔ API Spec:**
   - All entity fields in domain model appear in API requests/responses (or are explicitly excluded)
   - Field types match exactly (string, number, boolean, enum values)
   - Required/Optional status matches (if domain model says "required", API must require it; if domain model has default, API should make it optional)
   - Field constraints match (min/max length, enum values, formats)
   - Default values in domain model align with API behavior

2. **API Request ↔ API Response:**
   - Field names use consistent naming convention
   - Field types are consistent
   - Enum values are identical

3. **Business Rules ↔ API Behavior:**
   - Business rules about ownership align with API authorization requirements
   - Business rules about validation align with API validation constraints
   - Business rules about defaults align with API default values

4. **Naming Consistency:**
   - All JSON fields use the same naming convention throughout
   - Token field names are consistent (accessToken vs access_token)
   - All endpoints follow the same path naming convention

5. **Response Format Consistency:**
   - All list endpoints use the same response format (all plain arrays OR all wrapped objects)
   - All error responses use the same error format
   - All success responses follow consistent patterns

## Verification Criteria

1. **Structure:**
   - All required files exist in correct locations
   - Feature folders match system features (exact names verified)

2. **Content:**
   - All business rules numbered with unique identifiers (exact format verified)
   - All API endpoints documented with complete request/response formats (exact JSON schemas)
   - All entity fields include types and constraints (exact values verified)
   - All relationships defined (exact relationship types)
   - All required specifications explicitly included with exact values
   - All ambiguities resolved in "Explicit Requirements" section

3. **Completeness:**
   - No "TBD" or placeholder text
   - All diagrams render correctly (Mermaid syntax valid)
   - All ambiguities resolved with explicit values (verified against Explicit Requirements section)
   - No "specify X" language - only exact values

4. **Consistency (CRITICAL):**
   - Naming conventions consistent throughout (camelCase, snake_case, or kebab-case - one chosen and used everywhere)
   - Domain model field definitions match API request/response field definitions
   - Required/Optional status consistent between domain model and API spec
   - Fields with default values are optional in API requests (unless explicitly required)
   - List endpoints use consistent response format (all plain arrays OR all wrapped objects)
   - HTTP status codes follow REST conventions (204 for DELETE, 201 for POST, etc.)
   - Field types consistent across domain model and API spec
   - Enum values consistent across domain model and API spec

5. **Organization:**
   - Horizontal slices contain only system-wide concerns
   - Vertical slices contain only feature-specific concerns
   - Business rules properly categorized (exact categories verified)
   - API endpoints properly grouped (exact grouping verified)

6. **Self-Contained:**
   - No external file references (no "Reference: patterns/..." lines)
   - All patterns and rules included inline
   - All error formats included directly
   - All validation rules stated explicitly
   - All security patterns described directly
   - Documentation is usable independently

7. **Principles:**
   - No implementation details present
   - Architectural slicing applied correctly
   - No redundancy between files
   - Complete specification (no interpretation needed - all values explicit)
   - Self-contained (all information present, no external dependencies)

## Expected Output

The specification (`documentation-spec.md`) must define the expected documentation artifacts with EXACT counts:

**Top-Level Files:** Exact number (typically 6):
- overview.md
- architecture.md
- domain-models.md
- business-rules.md
- api-specification.md
- README.md

**Feature Folders:** Exact number and names:
- One folder per feature with exact folder name
- Each containing exactly 3 files:
  - overview.md
  - business-rules.md
  - api-flows.md

**Total:** Exact total file count (e.g., "15 files: 6 top-level + 9 feature files (3 features × 3 files)")

## Critical Requirement: Zero Ambiguity and Consistency in Output Spec

The generated specification (`documentation-spec.md`) must have ZERO ambiguity and ZERO inconsistencies. Every decision point must have an explicit value:

- No "specify X" language in the output spec
- No "as appropriate" or "as needed" in the output spec
- No ranges without exact values in the output spec
- No "or" options without selection in the output spec
- All enums with exact values in the output spec
- All constraints with exact numbers in the output spec
- All paths with exact strings in the output spec
- All titles with exact formats in the output spec

### Consistency Requirements

The output spec must maintain consistency across all sections:

1. **Naming Conventions:**
   - The specification must use consistent naming (camelCase, snake_case, or kebab-case) throughout
   - JSON field names must be consistent (e.g., if using camelCase, use `accessToken` not `access_token`)
   - The specification must explicitly state the naming convention chosen

2. **Field Definitions:**
   - Domain model field definitions must match API request/response field definitions
   - If a field has a default value, it must be optional in API requests (unless explicitly required)
   - Required/Optional status must be consistent between domain model and API spec
   - Field types must be consistent (string, number, boolean, enum values)

3. **Response Formats:**
   - List endpoints must have consistent response format (plain array vs wrapped object)
   - The specification must explicitly define the format choice and apply it consistently
   - If using wrapped format, specify exact structure (e.g., `{ items: [...], total: number }`)

4. **HTTP Status Codes:**
   - The specification must use standard REST conventions:
     - 200 OK: Successful GET, PUT, PATCH with response body
     - 201 Created: Successful POST with response body
     - 204 No Content: Successful DELETE (no response body)
     - 400 Bad Request: Validation errors
     - 401 Unauthorized: Authentication failures
     - 403 Forbidden: Authorization failures
     - 404 Not Found: Resource not found
   - The specification must explicitly state status codes for each endpoint

5. **Cross-Section Consistency:**
   - Domain model entity fields must match API request/response fields
   - Business rules must align with API endpoint behaviors
   - Default values in business rules must match domain model defaults
   - Validation constraints must be consistent across domain model and API spec

**The template (this file) guides the AI to create such a spec, but does not prescribe the exact values.** The AI must:
1. Read business and architectural requirements
2. Reference library patterns
3. Resolve all ambiguities with explicit choices
4. Ensure consistency across all sections
5. Document those choices in the "Explicit Requirements" section of the output spec

The output spec should be project-specific with exact values; this template is generic and flexible.

## Common Ambiguity Areas (Must Be Resolved in Output Spec)

The generated specification MUST explicitly resolve these common ambiguity areas. The template does not prescribe solutions, but requires the output spec to make explicit choices:

1. **Entity Status/Priority Enums:** The spec must define exact enum values (resolve any ambiguity in requirements)
2. **Password Requirements:** The spec must state exact minimum length (resolve from requirements or library)
3. **Login Identifier:** The spec must state exact type (resolve ambiguity: username or email)
4. **Endpoint Paths:** The spec must define exact paths (resolve ambiguity, reference api-patterns.md for conventions)
5. **User Entity Fields:** The spec must define exact field list (resolve from requirements and library patterns)
6. **Field Constraints:** The spec must define exact constraints for all fields (resolve ranges, reference validation-rules.md)
7. **Task Filtering:** The spec must define exact query parameters supported (resolve from requirements)
8. **User Profile Updates:** The spec must define exact allowed fields (resolve from requirements)
9. **Default Values Format:** The spec must define exact format (resolve ambiguity: specific values vs null/empty)
10. **Title Formats:** The spec must define exact title for each documentation file
11. **HTTP Methods:** The spec must define exact methods for updates (resolve PATCH vs PUT, reference api-patterns.md)
12. **Feature Names:** The spec must define exact feature folder names (resolve naming convention)
13. **Business Rule Prefixes:** The spec must define exact prefix scheme (resolve format choice)
14. **Architecture Layers:** The spec must define exact number and names of layers (resolve from requirements)
15. **Module Names:** The spec must define exact module names (resolve technical vs descriptive)
16. **Naming Conventions:** The spec must define exact naming convention (camelCase, snake_case, kebab-case) and apply consistently
17. **List Response Format:** The spec must define exact format for list endpoints (plain array vs wrapped object) and apply consistently
18. **Field Required/Optional Consistency:** The spec must ensure fields with defaults are optional in API (unless explicitly required), and maintain consistency between domain model and API spec
19. **HTTP Status Codes:** The spec must define exact status codes for all endpoints, following REST conventions (204 for DELETE, 201 for POST, etc.)
20. **Self-Contained Documentation:** The spec must be completely self-contained with no external file references
21. **Data Transformation Rules:** The spec must include explicit data transformation rules (case-sensitivity, empty string handling, field exclusions, timestamp formats)
22. **Edge Case Handling:** The spec must explicitly handle edge cases (duplicate emails during update, invalid enum values, empty strings for required fields)
23. **Search Functionality:** The spec must explicitly document search behavior (case-sensitivity, partial matching, which fields are searched)
24. **Field Update Capabilities:** The spec must explicitly state which fields can be updated (email, password, etc.) and any constraints on updates

All of these MUST be explicitly specified in the "Explicit Requirements" section of the output spec with exact values chosen by the AI based on requirements and library patterns.

## Important Note

This template is for creating a SPECIFICATION, not documentation itself. The output should be `documentation-spec.md` which will then be used to generate the actual documentation files in Step 2.

