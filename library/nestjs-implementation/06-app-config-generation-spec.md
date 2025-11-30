# Application Configuration Generation Specification

**Objective:** Generate app module setup, database configuration, and application bootstrap based on architecture documentation.

**Input Sources:** 
- `output/documentation/architecture.md` - Technology stack, ORM type, database configuration, module structure
- `output/documentation/domain-models.md` - Entity definitions for ORM registration
- `output/documentation/api-specification.md` - API title, description, version for Swagger

## Instructions

You are a senior NestJS developer. Generate the final application configuration to integrate all modules and services.

### Requirements

1. **Configure AppModule** with all feature modules and dependencies
2. **Extract ORM type from architecture.md** and setup database connection with appropriate ORM configuration
3. **Configure main.ts** with Swagger, CORS, and global pipes
4. **Update individual modules** to properly export/import dependencies
5. **Enable global validation** and error handling
6. **Configure environment variables** for different deployment stages

### Configuration Extraction Process

1. **Extract ORM type** from `output/documentation/architecture.md`:
   - ORM being used (TypeORM, Prisma, Sequelize, etc.)
2. **Extract database configuration** from `output/documentation/architecture.md`:
   - Database type (PostgreSQL, MySQL, SQLite, etc.)
   - Connection settings (host, port, database, username, password)
   - Synchronization settings (synchronize: true/false for TypeORM, or equivalent for other ORMs)
3. **Extract module list** from `output/documentation/architecture.md`:
   - Feature modules (Users, Tasks, Auth, etc.)
   - Module dependencies
4. **Extract API metadata** from `output/documentation/api-specification.md`:
   - API title
   - API description
   - API version
5. **Extract entities** from `output/documentation/domain-models.md` for ORM registration

### Components to Generate/Update

**AppModule** (`src/app.module.ts`):
- Import all feature modules extracted from architecture.md
- Extract ORM type from architecture.md and configure database connection:
  - **TypeORM:** Use TypeOrmModule.forRoot()
  - **Prisma:** Configure PrismaModule or PrismaService
  - **Sequelize:** Use SequelizeModule.forRoot()
  - **Other ORMs:** Use appropriate module configuration
- Setup JWT and Passport modules (if authentication is used)
- Configure global settings (ConfigModule, etc.)

**Main Bootstrap** (`src/main.ts`):
- Application startup configuration
- Swagger documentation setup (extract title, description, version from API specification)
- CORS enablement (extract CORS settings from architecture.md if specified)
- Global validation pipe configuration
- Port and prefix setup (extract from architecture.md or use defaults)

**Individual Feature Modules:**
- Update imports/exports for proper dependency injection
- Extract ORM type from architecture.md and ensure ORM entities/repositories are properly configured:
  - **TypeORM:** Use TypeOrmModule.forFeature([Entity])
  - **Prisma:** Configure PrismaService access
  - **Sequelize:** Use SequelizeModule.forFeature([Model])
  - **Other ORMs:** Use appropriate entity/model registration
- Export services that other modules depend on

### Module Dependencies

Extract module dependencies from `output/documentation/architecture.md`:

**For each module:**
- **Imports:** Extract ORM type and import appropriate ORM module:
  - **TypeORM:** TypeOrmModule.forFeature([Entity])
  - **Prisma:** PrismaModule or access to PrismaService
  - **Sequelize:** SequelizeModule.forFeature([Model])
  - **Other ORMs:** Appropriate entity/model registration
- **Exports:** Services needed by other modules
- **Dependencies:** Other modules that provide required services

**Common patterns:**
- **UsersModule:** Exports UsersService (needed by AuthModule)
- **AuthModule:** Imports UsersModule, Exports AuthService, JwtAuthGuard
- **EntityModules:** Import ORM module for their entities/models

### Database Configuration

**ORM Setup (extract ORM type from architecture.md):**

**If TypeORM:**
```typescript
TypeOrmModule.forRoot({
  type: '{database-type}', // Extract from architecture.md
  host: process.env.DATABASE_HOST || '{default-host}',
  port: parseInt(process.env.DATABASE_PORT || '{default-port}'),
  database: process.env.DATABASE_NAME || '{default-database}',
  username: process.env.DATABASE_USER || '{default-username}',
  password: process.env.DATABASE_PASSWORD || '{default-password}',
  entities: [Entity1, Entity2, ...], // Extract from domain-models.md
  synchronize: process.env.NODE_ENV !== 'production', // Development only
  logging: false // Or extract from architecture.md
})
```

**If Prisma:**
- Configure PrismaModule or PrismaService
- Extract connection string from architecture.md
- Use Prisma schema for entity definitions

**If Sequelize:**
```typescript
SequelizeModule.forRoot({
  dialect: '{database-type}', // Extract from architecture.md
  host: process.env.DATABASE_HOST || '{default-host}',
  port: parseInt(process.env.DATABASE_PORT || '{default-port}'),
  database: process.env.DATABASE_NAME || '{default-database}',
  username: process.env.DATABASE_USER || '{default-username}',
  password: process.env.DATABASE_PASSWORD || '{default-password}',
  // ... other Sequelize options
})
```

**If Other ORM:**
- Use appropriate configuration pattern for the specified ORM
- Extract all configuration values from architecture.md

Extract all values from `output/documentation/architecture.md`.

**Entity/Model Registration:**
Each module should register its entities/models based on ORM type:
- **TypeORM:** Use `TypeOrmModule.forFeature([Entity])`
- **Prisma:** Entities defined in Prisma schema, access via PrismaService
- **Sequelize:** Use `SequelizeModule.forFeature([Model])`
- **Other ORMs:** Use appropriate registration pattern
- Extract entity/model names from domain-models.md
- Register in appropriate module

### Application Bootstrap Configuration

**Global Pipes:**
```typescript
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true
}));
```

**CORS Setup:**
```typescript
app.enableCors(); // Or extract CORS configuration from architecture.md
```

**Swagger Configuration:**
```typescript
const config = new DocumentBuilder()
  .setTitle('{API Title}') // Extract from api-specification.md
  .setDescription('{API Description}') // Extract from api-specification.md
  .setVersion('{API Version}') // Extract from api-specification.md
  .addBearerAuth() // If authentication is used
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document); // Or extract path from architecture.md
```

**Port Configuration:**
```typescript
const port = process.env.PORT || {default-port}; // Extract from architecture.md or use 3000
await app.listen(port);
```

### Environment Configuration

**Required Environment Variables:**
Extract from `output/documentation/architecture.md`:
- `DATABASE_HOST`: Database host (with default)
- `DATABASE_PORT`: Database port (with default)
- `DATABASE_NAME`: Database name (with default)
- `DATABASE_USER`: Database user (with default)
- `DATABASE_PASSWORD`: Database password (with default)
- `JWT_SECRET`: JWT signing secret (with default, if authentication used)
- `PORT`: Application port (with default)
- `NODE_ENV`: Environment (development, production)

**Configuration Module:**
Use @nestjs/config for environment variable management:
```typescript
ConfigModule.forRoot({
  isGlobal: true
})
```

### File Structure Updates

```
src/
├── app.module.ts (update)
├── main.ts (update)
├── {module-name}/{module-name}.module.ts (update for each module)
```

Extract module names from documentation.

### Module Update Details

For each module extracted from architecture.md:

**Entity Modules:**
- Extract ORM type and import appropriate ORM module:
  - **TypeORM:** Import TypeOrmModule.forFeature([Entity])
  - **Prisma:** Import PrismaModule or configure PrismaService access
  - **Sequelize:** Import SequelizeModule.forFeature([Model])
  - **Other ORMs:** Import appropriate ORM module
- Import Controller, Service
- Export Service (if needed by other modules)

**AuthModule:**
- Import UsersModule (or appropriate user module)
- Import PassportModule, JwtModule
- Import Strategies
- Import Controller, Service
- Export AuthService, JwtAuthGuard

**AppModule:**
- Import ConfigModule.forRoot({ isGlobal: true })
- Extract ORM type and import appropriate ORM root module:
  - **TypeORM:** Import TypeOrmModule.forRoot({ ... })
  - **Prisma:** Import PrismaModule or configure PrismaService
  - **Sequelize:** Import SequelizeModule.forRoot({ ... })
  - **Other ORMs:** Import appropriate ORM root module
- Import all feature modules

### Validation Commands

After generation, verify complete system integration:
```bash
# Build and start
npm run build
npm run start:dev

# Verify all endpoints accessible
curl http://localhost:{port}/api  # Swagger documentation

# Test basic functionality
curl http://localhost:{port}/{endpoint}  # Should return appropriate response

# Test authentication flow (if applicable)
# Based on API specification endpoints
```

### Success Criteria

- Application starts without compilation errors
- All modules properly integrated and dependencies resolved
- Database connection established and entities synchronized
- Swagger documentation accessible at configured path with all endpoints
- Authentication flow functional (if applicable)
- Global validation working on all endpoints
- CORS enabled (if configured)
- All business rules enforced through the complete request flow
- Environment variables properly configured with defaults
- ORM entities/models properly registered in modules according to ORM type from architecture.md
- All endpoints from API specification are accessible

### Final Integration Test

The system should support the complete user journey as defined in API specification:
1. User registration (if applicable)
2. User authentication (if applicable)
3. CRUD operations for all entities
4. All business rules enforced
5. All error handling working correctly

All with proper authentication, authorization, and business rule enforcement as specified in documentation.
