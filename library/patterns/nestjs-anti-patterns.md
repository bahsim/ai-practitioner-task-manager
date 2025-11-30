# NestJS Anti-Patterns and Common Mistakes

## Purpose

This document lists common mistakes and anti-patterns to avoid when generating NestJS code. Use this as a reference to prevent issues during code generation.

## Module Configuration

### ❌ Anti-Pattern: Guards in Providers Array

**Wrong:**
```typescript
@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard], // ❌ Guard should NOT be here
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
```

**Correct:**
```typescript
@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy], // ✅ Only services and strategies
  exports: [AuthService, JwtModule, JwtAuthGuard], // ✅ Guards exported, not provided
})
export class AuthModule {}
```

**Reason:** Guards are classes that extend `AuthGuard` and should be exported for use in other modules, but they don't need to be in the `providers` array. Only injectable services and strategies should be providers.

## Environment Variables

### ❌ Anti-Pattern: Unsafe parseInt with Environment Variables

**Wrong:**
```typescript
port: parseInt(process.env.DATABASE_PORT), // ❌ Can return NaN if undefined
```

**Correct:**
```typescript
port: parseInt(process.env.DATABASE_PORT || '5432'), // ✅ Always has default
```

**Reason:** `parseInt(undefined)` returns `NaN`, which can cause runtime errors. Always provide a default value.

### ✅ Best Practice: Type-Safe Environment Variable Handling

```typescript
// Use ConfigModule with validation
ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: Joi.object({
    DATABASE_PORT: Joi.number().default(5432),
    DATABASE_HOST: Joi.string().default('localhost'),
  }),
})
```

## Imports

### ❌ Anti-Pattern: Unused Imports

**Wrong:**
```typescript
import { Repository, ILike } from 'typeorm'; // ❌ ILike imported but not used

// Later in code:
queryBuilder.andWhere('task.title ILIKE :search', { search: `%${filters.search}%` });
```

**Correct:**
```typescript
import { Repository } from 'typeorm'; // ✅ Only import what's used

// Use ILIKE directly in query builder (PostgreSQL-specific)
queryBuilder.andWhere('task.title ILIKE :search', { search: `%${filters.search}%` });
```

**Reason:** Unused imports cause linting warnings and add unnecessary dependencies. Use TypeORM query builder methods directly instead of importing unused operators.

## Path Handling

### ❌ Anti-Pattern: Relative Paths Without src/ Prefix

**Wrong:**
```bash
mkdir -p users/dto  # ❌ Creates at project root
```

**Correct:**
```bash
mkdir -p src/users/dto  # ✅ Creates in src/ directory
```

**Reason:** NestJS projects have all source code under `src/`. Creating directories at the root breaks the project structure.

## Dependency Injection

### ❌ Anti-Pattern: Missing Repository Injection

**Wrong:**
```typescript
@Injectable()
export class UsersService {
  constructor() {} // ❌ No repository injection
}
```

**Correct:**
```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {} // ✅ Repository properly injected
}
```

**Reason:** TypeORM repositories must be injected using `@InjectRepository()` decorator and the entity must be registered in the module with `TypeOrmModule.forFeature([Entity])`.

## Module Exports

### ❌ Anti-Pattern: Not Exporting Services Used by Other Modules

**Wrong:**
```typescript
@Module({
  providers: [UsersService],
  // ❌ UsersService not exported, but needed by AuthModule
})
export class UsersModule {}
```

**Correct:**
```typescript
@Module({
  providers: [UsersService],
  exports: [UsersService], // ✅ Export for use in other modules
})
export class UsersModule {}
```

**Reason:** If a service is used by another module, it must be exported. Otherwise, NestJS dependency injection will fail.

## TypeORM Entity Registration

### ❌ Anti-Pattern: Entities Not Registered in Modules

**Wrong:**
```typescript
@Module({
  providers: [UsersService],
  // ❌ User entity not registered
})
export class UsersModule {}
```

**Correct:**
```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ Entity registered
  providers: [UsersService],
})
export class UsersModule {}
```

**Reason:** TypeORM entities must be registered in the module using `TypeOrmModule.forFeature([Entity])` to enable repository injection.

## Error Handling

### ❌ Anti-Pattern: Generic Error Messages

**Wrong:**
```typescript
throw new Error('Something went wrong'); // ❌ Generic, not HTTP-aware
```

**Correct:**
```typescript
throw new NotFoundException('Resource not found'); // ✅ Specific HTTP exception
throw new ForbiddenException('Forbidden resource'); // ✅ Proper status code
throw new BadRequestException('Invalid enum value'); // ✅ Clear error message
```

**Reason:** NestJS provides HTTP exception classes that automatically set proper status codes and error formats. Use them instead of generic `Error`.

## DTO Validation

### ❌ Anti-Pattern: Missing Validation Decorators

**Wrong:**
```typescript
export class CreateUserDto {
  username: string; // ❌ No validation
  email: string; // ❌ No validation
}
```

**Correct:**
```typescript
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_]+$/)
  username: string; // ✅ Proper validation

  @IsEmail()
  email: string; // ✅ Proper validation
}
```

**Reason:** DTOs without validation decorators won't validate input, leading to potential security and data integrity issues.

## Swagger Documentation

### ❌ Anti-Pattern: Missing Swagger Decorators

**Wrong:**
```typescript
export class CreateUserDto {
  @IsString()
  username: string; // ❌ No Swagger documentation
}
```

**Correct:**
```typescript
export class CreateUserDto {
  @ApiProperty({
    description: 'Username (2-30 characters)',
    example: 'johndoe',
  })
  @IsString()
  username: string; // ✅ Swagger documentation included
}
```

**Reason:** Missing `@ApiProperty` decorators result in incomplete Swagger documentation, making API testing and integration difficult.

## Password Handling

### ❌ Anti-Pattern: Password in Response

**Wrong:**
```typescript
return user; // ❌ Password included in response
```

**Correct:**
```typescript
// Entity has @Exclude() decorator on password field
@Column()
@Exclude()
password: string;

// Response automatically excludes password
return user; // ✅ Password excluded via class-transformer
```

**Reason:** Passwords should never be returned in API responses. Use `@Exclude()` decorator from `class-transformer` to automatically exclude sensitive fields.

## Summary Checklist

When generating NestJS code, verify:

- ✅ Guards are NOT in `providers` array (only in `exports`)
- ✅ Environment variables have default values: `parseInt(process.env.VAR || 'default')`
- ✅ No unused imports (check linting)
- ✅ All paths use `src/` prefix for directories
- ✅ Repositories are injected with `@InjectRepository()`
- ✅ Services used by other modules are exported
- ✅ Entities are registered with `TypeOrmModule.forFeature([Entity])`
- ✅ HTTP exceptions used instead of generic `Error`
- ✅ DTOs have validation decorators
- ✅ DTOs have Swagger `@ApiProperty` decorators
- ✅ Passwords excluded from responses with `@Exclude()`

