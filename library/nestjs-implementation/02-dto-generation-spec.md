# DTO Generation Specification

**Objective:** Generate Data Transfer Objects for all API endpoints with complete validation based on API specification and domain models.

**Input Sources:** 
- `output/documentation/domain-models.md` - Entity field definitions
- `output/documentation/api-specification.md` - Endpoint definitions, request/response structures
- `output/documentation/business-rules.md` - Validation rules, immutability constraints

## Instructions

You are a senior NestJS developer. Generate DTOs for all API endpoints using the specifications provided in the documentation.

### Requirements

1. **Extract endpoints from API specification:** Read `output/documentation/api-specification.md` to identify all endpoints
2. **Create CreateDto and UpdateDto** for each entity that has create/update endpoints
3. **Use class-validator decorators** for validation as specified in domain models and business rules
4. **Add Swagger/OpenAPI decorators** (@ApiProperty) with descriptions and examples from API specification
5. **Exclude auto-generated fields** from Create DTOs (id, createdAt, updatedAt)
6. **Make all fields optional** in Update DTOs except where validation requires otherwise
7. **Use proper TypeScript types** matching entity specifications
8. **Add meaningful validation messages** for better API usability

### DTO Extraction Process

For each endpoint in `output/documentation/api-specification.md`:

1. **Identify endpoint type:** POST (create), PATCH/PUT (update), GET (read)
2. **Extract request body structure** from API specification
3. **Extract validation rules** from domain models and business rules
4. **Identify immutable fields** from business rules (exclude from Update DTOs)
5. **Extract enum values** if any (status, priority, type, etc.)

### DTO Generation Patterns

**Create DTOs (for POST endpoints):**
- Include all required fields from entity (except auto-generated)
- Exclude: `id`, `createdAt`, `updatedAt`
- Exclude: fields set automatically (e.g., `ownerId` from authenticated user)
- Include: optional fields that can be set at creation
- Apply validation decorators: @IsString(), @IsEmail(), @MinLength(), @MaxLength(), @IsEnum(), @IsOptional()

**Update DTOs (for PATCH/PUT endpoints):**
- Make all fields optional: @IsOptional()
- Exclude immutable fields (per business rules)
- Exclude: `id`, auto-generated timestamps
- Apply same validation rules as Create DTOs when field is provided

**Authentication DTOs:**
- Extract from authentication endpoints in API specification
- Common patterns: SignupDto, SigninDto, LoginDto
- Include fields specified in authentication endpoints

### Validation Decorator Mapping

Map domain model constraints to class-validator decorators:

- **String length:** @MinLength(N), @MaxLength(N)
- **Email format:** @IsEmail()
- **URL format:** @IsUrl()
- **Enum values:** @IsEnum([...values])
- **Optional fields:** @IsOptional()
- **Required fields:** No @IsOptional() decorator
- **Type validation:** @IsString(), @IsNumber(), @IsBoolean(), @IsDate()

### Swagger Documentation

For each DTO field:
- Add `@ApiProperty()` with description from API specification
- Add `example` if provided in API specification
- Add `required: true/false` based on validation rules
- Add `enum` if field is enum type

### File Structure

Create DTO files based on module structure from `output/documentation/architecture.md`:

```
src/{module-name}/dto/create-{entity-name}.dto.ts
src/{module-name}/dto/update-{entity-name}.dto.ts
src/{auth-module}/dto/{auth-dto-name}.dto.ts
```

Extract module names, entity names, and auth DTO names from documentation.

### Validation Commands

After generation, verify:
```bash
cd output/{project-name}
npm run build  # Must compile without errors
npm run lint   # Should pass validation
```

### Success Criteria

- All DTOs compile without TypeScript errors
- Validation decorators properly applied with exact constraints from domain models
- Swagger documentation includes descriptions and examples from API specification
- Create DTOs exclude auto-generated fields (id, createdAt, updatedAt)
- Update DTOs make all fields optional with proper validation
- Immutable fields excluded from Update DTOs (per business rules)
- Enum values match exact case-sensitive values from domain models
- Validation messages provide clear error feedback
- All endpoints from API specification have corresponding DTOs
