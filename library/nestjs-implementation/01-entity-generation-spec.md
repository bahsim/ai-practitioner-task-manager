# Entity Generation Specification

**Objective:** Generate complete ORM entities with decorators, relationships, and validation based on domain models documentation.

**Input Sources:** 
- `output/documentation/domain-models.md` - Entity definitions, fields, relationships
- `output/documentation/architecture.md` - ORM type and configuration, database type

## Instructions

You are a senior NestJS developer. Generate ORM entities using the specifications provided in the documentation.

### Requirements

1. **Extract ORM type from architecture.md:** Read `output/documentation/architecture.md` to identify the ORM being used (TypeORM, Prisma, Sequelize, etc.)
2. **Extract entities from documentation:** Read `output/documentation/domain-models.md` to identify all entities
3. **Use proper ORM decorators:** Based on the ORM type extracted:
   - **TypeORM:** @Entity, @Column, @PrimaryGeneratedColumn, @OneToMany, @ManyToOne, @ManyToMany, @OneToOne, etc.
   - **Prisma:** Use Prisma schema syntax
   - **Sequelize:** Use Sequelize decorators or model definitions
   - **Other ORMs:** Use appropriate decorators/syntax for the specified ORM
3. **Implement all relationships:** Extract relationship definitions from domain models (OneToMany, ManyToOne, ManyToMany, OneToOne) with proper mappings
4. **Add validation decorators:** Use class-validator decorators as specified in domain models
5. **Include timestamps:** Add CreateDateColumn, UpdateDateColumn for all entities (unless explicitly excluded)
6. **Follow exact field specifications:** Use provided constraints, defaults, and types from domain models

### Entity Extraction Process

For each entity defined in `output/documentation/domain-models.md`:

1. **Extract entity name** (e.g., User, Task, Product, Order)
2. **Extract all fields** with their types, constraints, and validation rules
3. **Extract relationships** with cardinality and ownership
4. **Extract business rules** related to immutability, defaults, and constraints
5. **Extract enum definitions** if any (status, priority, type, etc.)

### Entity Generation Pattern

For each entity:

**Primary Key:**
- Use `@PrimaryGeneratedColumn()` for auto-incrementing IDs
- Type: `number` (unless documentation specifies otherwise)

**Fields:**
- Extract field name, type, constraints from domain models
- Apply `@Column()` decorator with appropriate options:
  - `unique: true` if field is unique
  - `nullable: true` if field is optional
  - `length: N` if string length is specified
  - `type: 'enum'` with enum values if field is enum
  - `default: value` if default is specified

**Relationships:**
- Extract relationship type from domain models (OneToMany, ManyToOne, ManyToMany, OneToOne)
- Use appropriate decorators:
  - `@OneToMany(() => Entity, entity => entity.foreignKey)`
  - `@ManyToOne(() => Entity, entity => entity.collection)`
  - `@ManyToMany(() => Entity, entity => entity.collection)`
  - `@OneToOne(() => Entity, entity => entity.foreignKey)`
- Add `@JoinColumn()` for owning side of relationships

**Timestamps:**
- Add `@CreateDateColumn()` for `createdAt` field
- Add `@UpdateDateColumn()` for `updatedAt` field
- Unless explicitly excluded in documentation

**Validation:**
- Apply class-validator decorators as specified in domain models
- Common decorators: @IsString(), @IsEmail(), @MinLength(), @MaxLength(), @IsEnum(), @IsOptional()

### File Structure

Create entity files based on module structure from `output/documentation/architecture.md`:

```
src/{module-name}/entities/{entity-name}.entity.ts
```

Extract module names and entity names from documentation.

### Validation Commands

After generation, verify:
```bash
cd output/{project-name}
npm run build  # Must compile without errors
```

### Success Criteria

- All entities compile without TypeScript errors
- Proper ORM decorators/syntax applied according to domain models and ORM type from architecture.md
- Relationships correctly mapped as specified in documentation
- Validation decorators match specifications from domain models
- Timestamps included on all entities (unless excluded)
- Enum values correctly defined with exact case-sensitive values from domain models
- Default values applied as specified in domain models
- Immutability rules enforced (readonly fields, no setters for immutable fields)
