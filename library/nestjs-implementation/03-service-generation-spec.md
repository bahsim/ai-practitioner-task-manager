# Service Generation Specification

**Objective:** Generate service classes with CRUD operations and business rule enforcement based on domain models, business rules, and API specification.

**Input Sources:** 
- `output/documentation/domain-models.md` - Entity definitions
- `output/documentation/business-rules.md` - Business logic rules, validation rules
- `output/documentation/api-specification.md` - Endpoint requirements, query parameters

## Instructions

You are a senior NestJS developer. Generate business logic services using the specifications provided in the documentation.

### Requirements

1. **Create service classes** with @Injectable decorator
2. **Implement CRUD operations** (findAll, findOne, create, update, remove) based on API endpoints
3. **Enforce all business rules** specified in `output/documentation/business-rules.md`
4. **Use proper error handling** (NotFoundException, ForbiddenException, BadRequestException, UnauthorizedException)
5. **Implement permission checks** for ownership validation (if applicable)
6. **Use ORM repositories/data access:** Extract ORM type from architecture.md and use appropriate pattern:
   - **TypeORM:** @InjectRepository(Entity) with Repository<Entity>
   - **Prisma:** Inject PrismaService and use Prisma client
   - **Sequelize:** Use Sequelize repositories or model classes
   - **Other ORMs:** Use appropriate data access pattern
7. **Add proper TypeScript typing** for all methods
8. **Implement filtering and search** based on query parameters in API specification

### Service Extraction Process

For each entity in `output/documentation/domain-models.md`:

1. **Identify service name:** {EntityName}Service (e.g., UserService, TaskService)
2. **Extract CRUD operations** from API specification endpoints
3. **Extract business rules** from business-rules.md (filter by entity or rule prefix)
4. **Extract query parameters** from API specification (filtering, search, pagination)
5. **Extract permission requirements** from business rules (ownership, roles, etc.)

### Service Method Patterns

**findAll(userId?: number, filters?: FilterOptions): Promise<Entity[]>**
- Extract from GET /{entities} endpoint
- Apply filtering based on query parameters from API specification
- Apply ownership filtering if applicable (filter by userId)
- Return array of entities

**findOne(id: number, userId?: number): Promise<Entity>**
- Extract from GET /{entities}/:id endpoint
- Apply ownership check if applicable (throw ForbiddenException if not owner)
- Throw NotFoundException if entity not found
- Return single entity

**create(createDto: CreateEntityDto, userId?: number): Promise<Entity>**
- Extract from POST /{entities} endpoint
- Set ownership fields automatically (e.g., ownerId from authenticated user)
- Apply default values from domain models
- Handle unique constraint violations (BadRequestException)
- Return created entity

**update(id: number, updateDto: UpdateEntityDto, userId?: number): Promise<Entity>**
- Extract from PATCH/PUT /{entities}/:id endpoint
- Apply ownership check if applicable (throw ForbiddenException if not owner)
- Throw NotFoundException if entity not found
- Apply business rule validations
- Return updated entity

**remove(id: number, userId?: number): Promise<void>**
- Extract from DELETE /{entities}/:id endpoint
- Apply ownership check if applicable (throw ForbiddenException if not owner)
- Throw NotFoundException if entity not found
- Delete entity

### Business Rules Implementation

Extract business rules from `output/documentation/business-rules.md`:

1. **Identify rule identifiers** (e.g., USER-001, TASK-001, SEC-001)
2. **Map rules to service methods** where they apply
3. **Implement validation logic** for each rule
4. **Throw appropriate exceptions** when rules are violated:
   - **BadRequestException (400):** Validation errors, duplicate values, invalid enum values
   - **ForbiddenException (403):** Ownership violations, permission denied
   - **NotFoundException (404):** Entity not found
   - **UnauthorizedException (401):** Authentication required

### Error Handling Requirements

- **NotFoundException**: When entity not found by ID (404)
- **ForbiddenException**: When user lacks permission for operation (403) - Ownership violations
- **BadRequestException**: When business rules violated or data invalid (400) - Validation errors, duplicate values, invalid enum values
- **UnauthorizedException**: When authentication required (401)

### Dependencies

**Service Dependencies:**
- Extract ORM type from architecture.md and use appropriate dependency injection:
  - **TypeORM:** Repository<Entity> via @InjectRepository(Entity)
  - **Prisma:** PrismaService via dependency injection
  - **Sequelize:** Model classes or repositories
  - **Other ORMs:** Appropriate data access pattern
- Additional services if needed (e.g., UsersService for AuthService)
- External libraries (bcrypt for password hashing, etc.)

**Query Building:**
- Extract ORM type from architecture.md and use appropriate query building:
  - **TypeORM:** Use TypeORM QueryBuilder for filtering and search operations
  - **Prisma:** Use Prisma query methods (where, include, etc.)
  - **Sequelize:** Use Sequelize query methods
  - **Other ORMs:** Use appropriate query building syntax
- Extract filter parameters from API specification query parameters

### File Structure

Create service files based on module structure from `output/documentation/architecture.md`:

```
src/{module-name}/{module-name}.service.ts
```

Extract module names from documentation.

### Validation Commands

After generation, verify:
```bash
cd output/{project-name}
npm run build  # Must compile without errors
npm run lint   # Should pass validation
npm run start:dev  # Should start without errors
```

### Success Criteria

- All services compile without TypeScript errors
- Business rules properly enforced with appropriate error types
- CRUD operations functional with permission checks (if applicable)
- Proper dependency injection implemented
- Error handling returns appropriate HTTP status codes
- Ownership validation implemented for all operations (if applicable)
- Filtering and search functionality implemented based on API specification
- Sensitive fields excluded from responses (e.g., passwords)
- Default values applied as specified in domain models
