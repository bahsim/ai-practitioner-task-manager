# Controller Generation Specification

**Objective:** Generate REST API controllers with proper guards, validation, and Swagger documentation based on API specification.

**Input Sources:** 
- `output/documentation/api-specification.md` - All endpoint definitions
- `output/documentation/architecture.md` - Route structure, module organization
- `output/documentation/business-rules.md` - Permission requirements, ownership rules

## Instructions

You are a senior NestJS developer. Generate API controllers using the specifications provided in the documentation.

### Requirements

1. **Extract all endpoints** from `output/documentation/api-specification.md`
2. **Create controller classes** with @Controller decorator
3. **Implement REST endpoints** (GET, POST, PATCH, PUT, DELETE) as specified
4. **Use appropriate guards** (JwtAuthGuard, OptionalJwtAuthGuard) based on endpoint requirements
5. **Add Swagger documentation** (@ApiTags, @ApiOperation, @ApiResponse) from API specification
6. **Implement proper HTTP status codes** for all responses as specified
7. **Extract user from request object** for authenticated endpoints
8. **Use proper DTOs** for request/response validation

### Controller Extraction Process

For each endpoint in `output/documentation/api-specification.md`:

1. **Group endpoints by entity/module** (e.g., all /users endpoints, all /tasks endpoints)
2. **Identify controller route prefix** (e.g., /users, /tasks, /auth)
3. **Extract HTTP method** (GET, POST, PATCH, PUT, DELETE)
4. **Extract route path** (e.g., /, /:id, /me)
5. **Extract authentication requirement** (public, authenticated)
6. **Extract request/response DTOs** from endpoint specification
7. **Extract query parameters** (filtering, search, pagination)
8. **Extract path parameters** (id, etc.)

### Controller Generation Patterns

**Controller Structure:**
```typescript
@ApiTags('entity-name')
@Controller('route-prefix')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}
  
  // Endpoint methods
}
```

**Endpoint Patterns:**

**GET / (List all):**
- Extract from GET /{entities} endpoint
- Use @UseGuards(JwtAuthGuard) if authenticated
- Extract user from req.user if needed
- Support query parameters (status, priority, search, etc.)
- Return 200 OK with array

**GET /:id (Get one):**
- Extract from GET /{entities}/:id endpoint
- Use @UseGuards(JwtAuthGuard) if authenticated
- Extract user from req.user for ownership check
- Return 200 OK with entity
- Throw 403 Forbidden if not owner (if applicable)
- Throw 404 Not Found if not found

**POST / (Create):**
- Extract from POST /{entities} endpoint
- Use @UseGuards(JwtAuthGuard) if authenticated
- Use CreateEntityDto
- Extract user from req.user
- Return 201 Created with created entity

**PATCH /:id (Update):**
- Extract from PATCH /{entities}/:id endpoint
- Use @UseGuards(JwtAuthGuard) if authenticated
- Use UpdateEntityDto
- Extract user from req.user for ownership check
- Return 200 OK with updated entity
- Throw 403 Forbidden if not owner (if applicable)
- Throw 404 Not Found if not found

**DELETE /:id (Delete):**
- Extract from DELETE /{entities}/:id endpoint
- Use @UseGuards(JwtAuthGuard) if authenticated
- Extract user from req.user for ownership check
- Return 204 No Content
- Throw 403 Forbidden if not owner (if applicable)
- Throw 404 Not Found if not found

### Guard Usage Patterns

**No Guards (Public endpoints):**
- Extract from API specification (typically signup, signin, public endpoints)

**JwtAuthGuard:**
- All authenticated endpoints
- Extract from API specification authentication requirements

### Request Parameter Extraction

**Path Parameters:**
```typescript
@Param('id', ParseIntPipe) id: number
```

**Query Parameters:**
```typescript
@Query('status') status?: string
@Query('priority') priority?: string
@Query('search') search?: string
```

Extract query parameter names from API specification.

**User from Request:**
```typescript
@Req() req: Request
const currentUser = req.user as User;
```

**Request Body:**
```typescript
@Body() createDto: CreateEntityDto
@Body(ValidationPipe) updateDto: UpdateEntityDto
```

### Swagger Documentation Requirements

**Controller Level:**
```typescript
@ApiTags('entity-name')
@Controller('route-path')
```

**Endpoint Level:**
```typescript
@ApiOperation({ summary: 'Operation description' })
@ApiResponse({ status: 200, description: 'Success description' })
@ApiResponse({ status: 400, description: 'Validation error' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
@ApiResponse({ status: 404, description: 'Not found' })
@ApiBearerAuth() // For authenticated endpoints
```

Extract descriptions and status codes from API specification.

### Error Handling

Controllers should let service layer handle business logic and errors:
- **NotFoundException**: When entity not found by ID (404)
- **ForbiddenException**: When user lacks permission (403) - Ownership violations
- **BadRequestException**: When business rules violated (400) - Validation errors, invalid enum values
- **UnauthorizedException**: When authentication required (401) - Missing/invalid token

### HTTP Status Codes

Extract status codes from API specification:
- **200 OK**: Successful GET, PATCH operations
- **201 Created**: Successful POST operations
- **204 No Content**: Successful DELETE operations
- **400 Bad Request**: Validation errors, duplicate values, invalid enum values
- **401 Unauthorized**: Missing/invalid token, invalid credentials
- **403 Forbidden**: Ownership violations, permission denied
- **404 Not Found**: Entity not found, invalid resource IDs

### File Structure

Create controller files based on module structure from `output/documentation/architecture.md`:

```
src/{module-name}/{module-name}.controller.ts
src/auth/auth.controller.ts
```

Extract module names from documentation.

### Validation Commands

After generation, verify:
```bash
cd output/{project-name}
npm run build  # Must compile without errors
npm run start:dev  # Should start without errors

# Check Swagger documentation
curl http://localhost:3000/api  # Should show all endpoints

# Test endpoints based on API specification
```

### Success Criteria

- All controllers compile without TypeScript errors
- All endpoints accessible via Swagger UI with proper documentation
- Guards properly applied to protect sensitive operations
- Proper HTTP status codes returned for all scenarios
- Request validation working through DTOs
- User extraction from JWT tokens functional
- Ownership validation enforced (403 Forbidden when not owner, if applicable)
- Query parameters properly handled for filtering and search
- Error responses match specification format
- All endpoints from API specification are implemented
