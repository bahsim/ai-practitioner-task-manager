# Master Workflow Specification

## Objective

Orchestrate the complete workflow from initial prompt to fully implemented NestJS project. The workflow consists of ten sequential steps, with user confirmation required before proceeding to each next step.

## Folder Structure

```
{project-folder}/
├── input/                          # Project-specific requirements
│   ├── prompt.md
│   ├── business-requirements.md
│   └── architectural-requirements.md
├── library/                        # Reusable patterns and templates (STATIC - not generated)
│   ├── spec-generation-spec-template.md
│   ├── nestjs-scaffolding-spec.md
│   ├── nestjs-implementation/     # Universal template specs (STATIC - used as reference in Step 4)
│   │   ├── 01-entity-generation-spec.md
│   │   ├── 02-dto-generation-spec.md
│   │   ├── 03-service-generation-spec.md
│   │   ├── 04-auth-generation-spec.md
│   │   ├── 05-controller-generation-spec.md
│   │   └── 06-app-config-generation-spec.md
│   ├── patterns/                  # Reusable patterns
│   └── entities/                  # Reusable entity patterns
├── output/                         # All generated artifacts
│   ├── documentation-spec.md      # Output of Step 1
│   ├── documentation/             # Output of Step 2
│   ├── scaffolding-script.sh      # Output of Step 3
│   ├── scaffolding-script.ps1      # Output of Step 3
│   ├── scaffold.js                 # Output of Step 3
│   ├── nestjs-implementation/     # Implementation generation specs (output of Step 4)
│   │   ├── 01-entity-generation-spec.md
│   │   ├── 02-dto-generation-spec.md
│   │   ├── 03-service-generation-spec.md
│   │   ├── 04-auth-generation-spec.md
│   │   ├── 05-controller-generation-spec.md
│   │   └── 06-app-config-generation-spec.md
│   └── {project-name}/             # Scaffolded and implemented project (Steps 3-10)
└── workflow.md                     # Detailed workflow documentation
```

## Workflow Overview

```
Initial Prompt → Step 1 → Documentation Spec → Step 2 → Documentation → Step 3 → Scaffolded Project → Step 4 → Implementation Specs → Steps 5-10 → Complete Implementation
```

## Step 1: Generate Documentation Specification

### Input
- `input/prompt.md` - Instructions for generating spec
- `input/business-requirements.md` - Project-specific business logic
- `input/architectural-requirements.md` - Project-specific technical decisions
- `library/spec-generation-spec-template.md` - Template for creating documentation specs
- `library/patterns/` - Reusable patterns (API, security, validation, error, data-model)
- `library/entities/` - Reusable entity patterns

### Process
1. AI receives all inputs as context
2. AI uses `spec-generation-spec-template.md` to understand how to structure the spec
3. AI combines project requirements with reusable patterns
4. AI resolves all ambiguities with explicit specifications
5. AI generates `output/documentation-spec.md`

### Output
- `output/documentation-spec.md` - Complete, unambiguous documentation specification

### Pre-Generation Validation
- Verify `input/` folder exists with required files (`prompt.md`, `business-requirements.md`, `architectural-requirements.md`)
- Verify `library/spec-generation-spec-template.md` exists
- Verify `library/patterns/` and `library/entities/` folders exist (if referenced)

### Verification
- Specification has zero ambiguity
- All required sections are present
- All explicit requirements are resolved
- Specification is self-contained (no external references)

### Post-Generation Verification
- File `output/documentation-spec.md` exists and is readable
- Specification contains all required sections (Objective, Rationale, Documentation Structure, Content Specifications, Explicit Requirements, Verification Criteria)
- No placeholders or "TBD" text in specification
- All business rules have unique identifiers
- All API endpoints fully specified

### User Confirmation
After Step 1 completes, prompt user:
```
"Step 1 complete: Documentation specification generated at output/documentation-spec.md
Review the specification and confirm to proceed to Step 2 (Generate Documentation)? [y/n]"
```

## Step 2: Generate Documentation

### Input
- `output/documentation-spec.md` - Complete documentation specification (from Step 1)

### Process
1. AI receives specification as context
2. AI generates all documentation files according to spec
3. AI follows documentation structure and principles from spec
4. AI creates all files in `output/documentation/` folder

### Output
- `output/documentation/overview.md`
- `output/documentation/architecture.md`
- `output/documentation/domain-models.md`
- `output/documentation/business-rules.md`
- `output/documentation/api-specification.md`
- `output/documentation/README.md`
- `output/documentation/features/{feature}/overview.md`
- `output/documentation/features/{feature}/business-rules.md`
- `output/documentation/features/{feature}/api-flows.md`

### Pre-Generation Validation
- Verify `output/documentation-spec.md` exists and is readable
- Verify specification is complete (no missing sections)

### Verification
- All files from specification are generated
- Documentation matches specification exactly
- All diagrams render correctly (Mermaid syntax valid)
- No placeholders or "TBD" text

### Post-Generation Verification
- All 6 top-level files exist in `output/documentation/`
- All feature folders exist in `output/documentation/features/`
- Each feature folder contains exactly 3 files (overview.md, business-rules.md, api-flows.md)
- Total file count matches specification (15 files: 6 top-level + 9 feature files)
- All Mermaid diagrams syntax-valid (can be verified with mermaid-cli or online validator)

### User Confirmation
After Step 2 completes, prompt user:
```
"Step 2 complete: Documentation generated in output/documentation/ folder
Review the documentation and confirm to proceed to Step 3 (Scaffold NestJS Project)? [y/n]"
```

## Step 3: Scaffold NestJS Project

### Input
- `output/documentation/architecture.md` - Technology stack, modules, dependencies
- `output/documentation/domain-models.md` - Entity definitions
- `library/nestjs-scaffolding-spec.md` - Specification for generating scaffolding script

### Process
1. AI receives documentation and scaffolding spec as context
2. AI extracts modules from `output/documentation/architecture.md`
3. AI extracts entities from `output/documentation/domain-models.md`
4. AI extracts dependencies from `output/documentation/architecture.md`
5. AI generates scaffolding scripts according to `nestjs-scaffolding-spec.md`:
   - `output/scaffolding-script.sh` - Bash script for Unix/Linux/Mac
   - `output/scaffolding-script.ps1` - PowerShell script for Windows
   - `output/scaffold.js` - Node.js wrapper for automatic platform detection
6. Execute the generated script to scaffold the project (using `scaffold.js` for cross-platform support)

### Output
- `output/scaffolding-script.sh` - Generated bash scaffolding script
- `output/scaffolding-script.ps1` - Generated PowerShell scaffolding script
- `output/scaffold.js` - Node.js wrapper for cross-platform execution
- `output/{project-name}/` - Scaffolded NestJS project with:
  - All modules, services, controllers
  - All entities
  - All DTO directories
  - All dependencies installed

### Pre-Generation Validation
- Verify `output/documentation/architecture.md` exists and contains module structure
- Verify `output/documentation/domain-models.md` exists and contains entity definitions
- Verify `library/nestjs-scaffolding-spec.md` exists

### Verification
- Scripts follow platform-specific best practices (bash for Unix, PowerShell for Windows)
- Cross-platform wrapper (`scaffold.js`) automatically detects and executes appropriate script
- All modules from documentation are generated
- All entities from documentation are generated
- All dependencies from documentation are installed (including `@nestjs/swagger`)
- Project structure matches documentation

### Post-Generation Verification
- **Script Verification:**
  - `output/scaffolding-script.sh` exists and is executable
  - `output/scaffolding-script.ps1` exists
  - `output/scaffold.js` exists and has correct platform detection logic
  - All scripts use `src/` prefix for DTO directories (not root)
  
- **Project Structure Verification:**
  - Project folder `output/{project-name}/` exists
  - All modules generated: `output/{project-name}/src/{module}/`
  - All entities generated: `output/{project-name}/src/{module}/entities/`
  - All DTO directories created: `output/{project-name}/src/{module}/dto/` (verify NOT at root)
  - `package.json` exists and contains all required dependencies
  
- **Dependency Verification:**
  - Run: `cd output/{project-name} && npm list @nestjs/swagger` (should show installed)
  - Run: `cd output/{project-name} && npm list @nestjs/typeorm` (should show installed)
  - Run: `cd output/{project-name} && npm list class-validator` (should show installed)
  - All dependencies from documentation are in `package.json`
  
- **Path Validation:**
  - Verify NO directories created at project root (except standard NestJS structure)
  - Verify all DTO directories under `src/{module}/dto/`
  - Verify all entity directories under `src/{module}/entities/`

### User Confirmation
After Step 3 completes, prompt user:
```
"Step 3 complete: NestJS project scaffolded at output/{project-name}/
Review the scaffolded project and confirm to proceed to Step 4 (Generate Implementation Generation Specs)? [y/n]"
```

## Step 4: Generate Implementation Generation Specs

**CRITICAL:** This step generates ONLY in `output/nestjs-implementation/`. It does NOT generate or modify anything in `library/`.

### Input (Read-Only References)
- `output/documentation/` - Complete documentation (from Step 2)
- `library/nestjs-implementation-generation-spec-template.md` - Template for creating implementation generation specs (if available, READ-ONLY)
- `library/nestjs-implementation/` - Universal template specs (READ-ONLY reference patterns, if available)

**Note:** If `library/nestjs-implementation/` doesn't exist, AI should generate specs based on documentation structure and best practices. The library folder is optional reference only.

### Process
1. AI receives documentation as primary input
2. If available, AI uses universal template specs from `library/nestjs-implementation/` as reference patterns (READ-ONLY)
3. AI extracts project-specific information from documentation (domain-models, business-rules, api-specification, architecture)
4. AI generates 6 project-specific implementation generation specs in `output/nestjs-implementation/`:
   - `01-entity-generation-spec.md`
   - `02-dto-generation-spec.md`
   - `03-service-generation-spec.md`
   - `04-auth-generation-spec.md`
   - `05-controller-generation-spec.md`
   - `06-app-config-generation-spec.md`

### Output
- `output/nestjs-implementation/01-entity-generation-spec.md`
- `output/nestjs-implementation/02-dto-generation-spec.md`
- `output/nestjs-implementation/03-service-generation-spec.md`
- `output/nestjs-implementation/04-auth-generation-spec.md`
- `output/nestjs-implementation/05-controller-generation-spec.md`
- `output/nestjs-implementation/06-app-config-generation-spec.md`

### Verification
- All 6 specs are generated
- Each spec extracts information from documentation correctly
- All specs have exact values (no placeholders)
- Specs follow the template structure

### User Confirmation
After Step 4 completes, prompt user:
```
"Step 4 complete: Implementation generation specs generated in output/nestjs-implementation/
Review the specs and confirm to proceed to Step 5 (Generate Entities)? [y/n]"
```

## Step 5: Generate Entities

### Input
- `output/nestjs-implementation/01-entity-generation-spec.md` - Entity generation specification
- `output/documentation/domain-models.md` - Entity definitions
- `output/documentation/architecture.md` - ORM and database configuration
- Scaffolded project structure at `output/{project-name}/`

### Process
1. AI receives entity generation spec and documentation as context
2. AI generates TypeORM entities according to spec
3. AI creates entity files in scaffolded project structure

### Output
- `output/{project-name}/src/{module-name}/entities/{entity-name}.entity/{entity-name}.entity.ts`
  - One entity file per entity defined in domain-models.md
  - Entity files follow NestJS CLI structure (entity-name.entity/entity-name.entity.ts)

### Pre-Generation Validation
- Verify scaffolded project exists at `output/{project-name}/`
- Verify implementation spec exists: `output/nestjs-implementation/01-entity-generation-spec.md`
- Verify documentation exists: `output/documentation/domain-models.md`

### Verification
- All entities compile without TypeScript errors
- Proper TypeORM decorators applied
- Relationships correctly mapped
- Validation decorators match specifications
- Timestamps included on all entities

### Post-Generation Verification
- **Build Verification:**
  - Run: `cd output/{project-name} && npm run build` (must succeed without errors)
  
- **Code Quality:**
  - All entity files exist in correct locations: `src/{module}/entities/{entity}.entity/{entity}.entity.ts`
  - All entities have proper TypeORM decorators (@Entity, @Column, @PrimaryGeneratedColumn)
  - All relationships properly mapped (@OneToMany, @ManyToOne, @JoinColumn)
  - Password field has @Exclude() decorator (if applicable)
  - No unused imports (check linting: `npm run lint`)
  
- **Type Safety:**
  - TypeScript compilation successful
  - No type errors in entity files

### User Confirmation
After Step 5 completes, prompt user:
```
"Step 5 complete: Entities generated
Review the entities and confirm to proceed to Step 6 (Generate DTOs)? [y/n]"
```

## Step 6: Generate DTOs

### Input
- `output/nestjs-implementation/02-dto-generation-spec.md` - DTO generation specification
- `output/documentation/domain-models.md` - Field specifications
- `output/documentation/api-specification.md` - Request/response formats
- Generated entities (from Step 5)

### Process
1. AI receives DTO generation spec and documentation as context
2. AI generates DTOs according to spec
3. AI creates DTO files in scaffolded project structure

### Output
- `output/{project-name}/src/{module-name}/dto/create-{resource-name}.dto.ts`
- `output/{project-name}/src/{module-name}/dto/update-{resource-name}.dto.ts`
- `output/{project-name}/src/auth/dto/signup.dto.ts` (if authentication module exists)
- `output/{project-name}/src/auth/dto/signin.dto.ts` (if authentication module exists)
  - One create DTO and one update DTO per resource entity
  - Authentication DTOs only if authentication feature is required

### Pre-Generation Validation
- Verify entities generated (from Step 5)
- Verify implementation spec exists: `output/nestjs-implementation/02-dto-generation-spec.md`
- Verify `@nestjs/swagger` installed: `cd output/{project-name} && npm list @nestjs/swagger`

### Verification
- All DTOs compile without TypeScript errors
- Validation decorators properly applied
- Swagger documentation includes descriptions
- Create DTOs exclude auto-generated fields
- Update DTOs make all fields optional with proper validation

### Post-Generation Verification
- **Build Verification:**
  - Run: `cd output/{project-name} && npm run build` (must succeed without errors)
  
- **Dependency Check:**
  - If build fails with "Cannot find module '@nestjs/swagger'", install: `npm install @nestjs/swagger`
  
- **Code Quality:**
  - All DTO files exist: `src/{module}/dto/create-*.dto.ts`, `update-*.dto.ts`
  - All DTOs have @ApiProperty decorators with descriptions
  - All DTOs have validation decorators (@IsString, @IsEmail, @MinLength, etc.)
  - No unused imports (check linting: `npm run lint`)
  
- **Validation:**
  - Create DTOs exclude: id, createdAt, updatedAt
  - Update DTOs make all fields optional (@IsOptional)
  - Immutable fields excluded from Update DTOs (username, email, ownerId)

### User Confirmation
After Step 6 completes, prompt user:
```
"Step 6 complete: DTOs generated
Review the DTOs and confirm to proceed to Step 7 (Generate Services)? [y/n]"
```

## Step 7: Generate Services

### Input
- `output/nestjs-implementation/03-service-generation-spec.md` - Service generation specification
- `output/documentation/business-rules.md` - Business rules to enforce
- `output/documentation/api-specification.md` - Endpoint operations
- Generated entities and DTOs (from Steps 5-6)

### Process
1. AI receives service generation spec and documentation as context
2. AI generates services according to spec
3. AI creates service files in scaffolded project structure

### Output
- `output/{project-name}/src/{module-name}/{module-name}.service.ts`
  - One service file per module defined in architecture.md

### Pre-Generation Validation
- Verify DTOs generated (from Step 6)
- Verify entities generated (from Step 5)
- Verify implementation spec exists: `output/nestjs-implementation/03-service-generation-spec.md`
- Verify modules have TypeORM entities registered: `TypeOrmModule.forFeature([Entity])`

### Verification
- All services compile without TypeScript errors
- Business rules properly enforced
- CRUD operations functional with permission checks
- Proper dependency injection implemented
- Error handling returns appropriate HTTP status codes

### Post-Generation Verification
- **Build Verification:**
  - Run: `cd output/{project-name} && npm run build` (must succeed without errors)
  
- **Code Quality:**
  - All service files exist: `src/{module}/{module}.service.ts`
  - Services have @Injectable() decorator
  - Repositories injected with @InjectRepository()
  - No unused imports (check linting: `npm run lint`)
  - HTTP exceptions used (NotFoundException, ForbiddenException, BadRequestException)
  
- **Module Configuration:**
  - Verify modules updated: `TypeOrmModule.forFeature([Entity])` in imports
  - Verify services exported if used by other modules

### User Confirmation
After Step 7 completes, prompt user:
```
"Step 7 complete: Services generated
Review the services and confirm to proceed to Step 8 (Generate Authentication)? [y/n]"
```

## Step 8: Generate Authentication

### Input
- `output/nestjs-implementation/04-auth-generation-spec.md` - Auth generation specification
- `output/documentation/features/{auth-feature-name}/` - Authentication feature documentation (if authentication is required)
- `output/documentation/architecture.md` - JWT configuration
- Generated entities, DTOs, and services (from Steps 5-7)

### Process
1. AI receives auth generation spec and documentation as context
2. AI generates authentication system according to spec
3. AI creates auth files in scaffolded project structure

### Output
- `output/{project-name}/src/auth/auth.service.ts` (if authentication is required)
- `output/{project-name}/src/auth/auth.controller.ts` (if authentication is required)
- `output/{project-name}/src/auth/strategies/local.strategy.ts` (if local auth is required)
- `output/{project-name}/src/auth/strategies/jwt.strategy.ts` (if JWT auth is required)
- `output/{project-name}/src/auth/guards/local-auth.guard.ts` (if local auth is required)
- `output/{project-name}/src/auth/guards/jwt-auth.guard.ts` (if JWT auth is required)
- `output/{project-name}/src/auth/guards/optional-jwt-auth.guard.ts` (if optional JWT auth is required)
  - Authentication components only generated if authentication feature is specified in documentation

### Pre-Generation Validation
- Verify services generated (from Step 7)
- Verify implementation spec exists: `output/nestjs-implementation/04-auth-generation-spec.md`
- Verify authentication feature exists in documentation (if required)

### Verification
- All authentication components compile without errors
- JWT strategy properly validates tokens
- Local strategy validates email/password correctly (not username)
- Authentication flow works end-to-end (signup → login)

### Post-Generation Verification
- **Build Verification:**
  - Run: `cd output/{project-name} && npm run build` (must succeed without errors)
  
- **Code Quality:**
  - AuthService exists: `src/auth/auth.service.ts`
  - Strategies exist: `src/auth/strategies/local.strategy.ts`, `jwt.strategy.ts`
  - Guards exist: `src/auth/guards/local-auth.guard.ts`, `jwt-auth.guard.ts`
  - AuthController exists: `src/auth/auth.controller.ts`
  - No unused imports (check linting: `npm run lint`)
  
- **Module Configuration (CRITICAL):**
  - Verify `JwtAuthGuard` is NOT in `providers` array (guards don't need to be providers)
  - Verify `JwtAuthGuard` is in `exports` array (for use in other modules)
  - Verify AuthModule imports UsersModule (to access UsersService)
  - Verify JwtModule configured with secret and expiration

### User Confirmation
After Step 8 completes, prompt user:
```
"Step 8 complete: Authentication system generated
Review the authentication system and confirm to proceed to Step 9 (Generate Controllers)? [y/n]"
```

## Step 9: Generate Controllers

### Input
- `output/nestjs-implementation/05-controller-generation-spec.md` - Controller generation specification
- `output/documentation/api-specification.md` - All API endpoints
- Generated services, DTOs, and auth (from Steps 5-8)

### Process
1. AI receives controller generation spec and documentation as context
2. AI generates controllers according to spec
3. AI creates controller files in scaffolded project structure

### Output
- `output/{project-name}/src/{module-name}/{module-name}.controller.ts`
  - One controller file per module defined in architecture.md
  - Auth controller updated if authentication module exists

### Pre-Generation Validation
- Verify services generated (from Step 7)
- Verify DTOs generated (from Step 6)
- Verify authentication generated (from Step 8, if required)
- Verify implementation spec exists: `output/nestjs-implementation/05-controller-generation-spec.md`

### Verification
- All controllers compile without TypeScript errors
- All endpoints accessible via Swagger UI
- Guards properly applied to protect operations
- Proper HTTP status codes returned
- Request validation working through DTOs

### Post-Generation Verification
- **Build Verification:**
  - Run: `cd output/{project-name} && npm run build` (must succeed without errors)
  
- **Code Quality:**
  - All controller files exist: `src/{module}/{module}.controller.ts`
  - Controllers have @Controller() decorator
  - All endpoints have Swagger decorators (@ApiTags, @ApiOperation, @ApiResponse)
  - Guards properly applied (@UseGuards(JwtAuthGuard))
  - No unused imports (check linting: `npm run lint`)
  
- **Swagger Verification:**
  - Start application: `npm run start:dev`
  - Verify Swagger accessible at `/api` endpoint
  - Verify all endpoints documented

### User Confirmation
After Step 9 completes, prompt user:
```
"Step 9 complete: Controllers generated
Review the controllers and confirm to proceed to Step 10 (Generate App Config)? [y/n]"
```

## Step 10: Generate App Config

### Input
- `output/nestjs-implementation/06-app-config-generation-spec.md` - App config generation specification
- `output/documentation/architecture.md` - Database and module configuration
- All generated code (from Steps 5-9)

### Process
1. AI receives app config generation spec and documentation as context
2. AI generates/updates application configuration according to spec
3. AI updates module files and main.ts

### Output
- `output/{project-name}/src/app.module.ts` (update)
- `output/{project-name}/src/main.ts` (update)
- `output/{project-name}/src/{module-name}/{module-name}.module.ts` (update for each module)
  - All feature modules updated to register TypeORM entities and export services
  - Auth module updated if authentication is required

### Pre-Generation Validation
- Verify all code generated (Steps 5-9)
- Verify implementation spec exists: `output/nestjs-implementation/06-app-config-generation-spec.md`
- Verify all modules exist and are properly structured

### Verification
- Application starts without compilation errors
- All modules properly integrated
- Database connection established
- Swagger documentation accessible
- Authentication flow functional
- Global validation working

### Post-Generation Verification
- **Build Verification:**
  - Run: `cd output/{project-name} && npm run build` (must succeed without errors)
  
- **Type Safety:**
  - Verify environment variable handling: `parseInt(process.env.VAR || 'default')` (not `parseInt(process.env.VAR)`)
  - No TypeScript errors in app.module.ts or main.ts
  
- **Module Configuration:**
  - AppModule imports all feature modules
  - AppModule configures TypeOrmModule.forRoot() with entities
  - AppModule configures ConfigModule.forRoot({ isGlobal: true })
  - All feature modules have TypeORM entities registered
  - AuthModule exports JwtAuthGuard (if authentication exists)
  
- **Application Startup:**
  - Run: `npm run start:dev` (should start without errors)
  - Verify Swagger accessible at `/api`
  - Verify CORS enabled
  - Verify global ValidationPipe configured
  
- **Integration Test:**
  - Test signup endpoint: `POST /signup`
  - Test signin endpoint: `POST /signin`
  - Test protected endpoint with JWT token

### User Confirmation
After Step 10 completes, prompt user:
```
"Step 10 complete: Application configuration generated
Workflow complete! The NestJS project is fully implemented and ready for testing."
```

## Workflow Execution Rules

### Sequential Execution
- Steps must be executed in order (1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10)
- Each step requires completion and verification before proceeding
- User confirmation required before each next step
- Steps 5-10 have dependencies: each requires previous step's output

### Error Handling
- If any step fails, stop workflow and report error
- User can review and fix issues before retrying
- Workflow can be resumed from any step after fixes

### Input Validation
- Before Step 1: Verify `input/` folder exists with required files (`prompt.md`, `business-requirements.md`, `architectural-requirements.md`)
- Before Step 2: Verify `output/documentation-spec.md` exists
- Before Step 3: Verify `output/documentation/` folder exists with all required files
- Before Step 4: Verify `output/documentation/` folder exists with all required files
- Before Step 5: Verify scaffolded project exists at `output/{project-name}/` and implementation specs are generated in `output/nestjs-implementation/`
- Before Step 6: Verify entities are generated in `output/{project-name}/src/{module}/entities/`
- Before Step 7: Verify DTOs are generated in `output/{project-name}/src/{module}/dto/`
- Before Step 8: Verify services are generated in `output/{project-name}/src/{module}/`
- Before Step 9: Verify authentication is generated in `output/{project-name}/src/auth/`
- Before Step 10: Verify controllers are generated in `output/{project-name}/src/{module}/`

### Output Verification
- After each step, verify outputs meet requirements
- If verification fails, do not proceed to next step
- Report specific verification failures to user

## User Interaction

### Prompts
- Clear step completion messages
- Explicit confirmation requests
- Error messages with actionable guidance
- Progress indicators

### Confirmation Format
```
"Step {N} complete: {Summary}
{Next step description}
Proceed to Step {N+1}? [y/n]"
```

## Workflow Summary

1. **Step 1:** Initial Prompt + Library → Documentation Specification
2. **Step 2:** Documentation Specification → Complete Documentation
3. **Step 3:** Documentation + Scaffolding Spec → Scaffolded NestJS Project
4. **Step 4:** Documentation + Implementation Spec Template → Implementation Generation Specs
5. **Step 5:** Entity Generation Spec → TypeORM Entities
6. **Step 6:** DTO Generation Spec → Data Transfer Objects
7. **Step 7:** Service Generation Spec → Business Logic Services
8. **Step 8:** Auth Generation Spec → Authentication System
9. **Step 9:** Controller Generation Spec → REST API Controllers
10. **Step 10:** App Config Generation Spec → Application Configuration

Each step is independent, verifiable, and requires user confirmation before proceeding. Steps 5-10 must be executed sequentially as each depends on the previous step's output.

