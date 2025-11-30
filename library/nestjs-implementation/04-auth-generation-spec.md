# Authentication System Generation Specification

**Objective:** Generate complete JWT authentication system with strategies, guards, and auth service based on authentication requirements in documentation.

**Input Sources:** 
- `output/documentation/features/authentication/` - Authentication feature documentation
- `output/documentation/architecture.md` - JWT configuration, auth strategy
- `output/documentation/business-rules.md` - Authentication business rules
- `output/documentation/api-specification.md` - Authentication endpoints

## Instructions

You are a senior NestJS developer. Generate a complete authentication system using the specifications provided in the documentation.

**IMPORTANT:** Before generating code, review `library/patterns/nestjs-anti-patterns.md` to avoid common mistakes:
- Guards should NOT be in `providers` array (only in `exports`)
- Environment variables must have default values
- No unused imports
- Proper module configuration

### Requirements

1. **Extract authentication requirements** from `output/documentation/features/authentication/` or `output/documentation/api-specification.md`
2. **Create AuthService** with login, signup, and user validation methods
3. **Implement JWT and Local strategies** for Passport
4. **Create custom guards** including JwtAuthGuard and OptionalJwtAuthGuard (if needed)
5. **Use bcrypt** for password hashing with salt rounds from configuration
6. **Implement proper error handling** for authentication failures
7. **Add AuthController** with authentication endpoints

### Authentication Extraction Process

1. **Identify authentication endpoints** from API specification:
   - Signup endpoint (POST /signup or similar)
   - Login endpoint (POST /signin, POST /login, or similar)
2. **Extract authentication business rules** from business-rules.md (filter by AUTH- prefix or authentication section)
3. **Extract JWT configuration** from architecture.md (secret, expiration, algorithm)
4. **Extract password requirements** from domain models and business rules

### Components to Generate

**AuthService** (`src/auth/auth.service.ts`):
- `validateUser(identifier: string, password: string): Promise<User | null>` - Validate credentials, find user by identifier (username/email), compare password with bcrypt, return user if valid, null if invalid
- `login(user: User): { accessToken: string }` - Generate JWT token for authenticated user, include user ID and identifier in payload, return object with accessToken field
- `signup(signupDto: SignupDto): Promise<User>` - Register new user with password hashing, hash password before saving, handle unique constraint violations, return created user (excluding password)
- `hashPassword(password: string): Promise<string>` - Hash password using bcrypt with salt rounds from configuration
- `comparePasswords(password: string, hashedPassword: string): Promise<boolean>` - Compare passwords using bcrypt

**Strategies:**
- **LocalStrategy** (`src/auth/strategies/local.strategy.ts`): Credential validation, use AuthService.validateUser, throw UnauthorizedException on invalid credentials
- **JwtStrategy** (`src/auth/strategies/jwt.strategy.ts`): JWT token validation and user extraction, extract user from token payload, return user object for request.user

**Guards:**
- **LocalAuthGuard** (`src/auth/guards/local-auth.guard.ts`): Local authentication guard, use with @UseGuards(LocalAuthGuard)
- **JwtAuthGuard** (`src/auth/guards/jwt-auth.guard.ts`): Standard JWT authentication, use with @UseGuards(JwtAuthGuard)
- **OptionalJwtAuthGuard** (`src/auth/guards/optional-jwt-auth.guard.ts`): Optional JWT for public endpoints (if needed), override handleRequest to allow null user

**AuthController** (`src/auth/auth.controller.ts`):
- Extract signup endpoint from API specification (POST /signup or similar)
- Extract login endpoint from API specification (POST /signin, POST /login, or similar)
- Use appropriate DTOs (SignupDto, SigninDto, LoginDto)
- Return appropriate HTTP status codes (201 Created for signup, 200 OK for login)

### Authentication Configuration

**JWT Settings:**
- Extract from `output/documentation/architecture.md`:
  - Secret: Use environment variable JWT_SECRET or default value
  - Expires: Extract expiration time (e.g., 1 day, 7 days)
  - Algorithm: Extract from architecture (default: HS256)
- Configure in AuthModule using JwtModule.register()

**Bcrypt Settings:**
- Extract salt rounds from architecture.md or use default (10)

### Business Rules Implementation

Extract authentication business rules from `output/documentation/business-rules.md`:

1. **Login requirements:** Extract login validation rules
2. **Registration requirements:** Extract signup validation rules
3. **Token format:** Extract token response format
4. **Password hashing:** Extract password hashing requirements

### Guard Implementation Details

**OptionalJwtAuthGuard (if needed):**
```typescript
// Override handleRequest to allow null user
handleRequest(err, user) {
  return user; // Allow null user for public endpoints
}
```

### Error Handling

- **UnauthorizedException**: Invalid credentials or authentication required (401)
- **BadRequestException**: Registration validation errors, duplicate username/email (400)

### File Structure

```
src/auth/
├── auth.controller.ts
├── auth.service.ts
├── auth.module.ts
├── strategies/
│   ├── local.strategy.ts
│   └── jwt.strategy.ts
└── guards/
    ├── local-auth.guard.ts
    ├── jwt-auth.guard.ts
    └── optional-jwt-auth.guard.ts (if needed)
```

### Validation Commands

**Pre-Generation Validation:**
```bash
cd output/{project-name}
# Verify dependencies installed
npm list @nestjs/passport @nestjs/jwt passport passport-jwt passport-local bcrypt
# Verify services exist (from previous steps)
ls src/users/users.service.ts  # Or appropriate user service
```

**Post-Generation Verification:**
```bash
cd output/{project-name}

# 1. Build Verification (CRITICAL)
npm run build  # Must compile without errors

# 2. Linting Verification
npm run lint   # Should pass without errors (check for unused imports)

# 3. Module Configuration Verification (CRITICAL)
# Manually verify AuthModule:
# - JwtAuthGuard is NOT in providers array
# - JwtAuthGuard IS in exports array
# - AuthModule imports UsersModule (or appropriate user module)

# 4. Application Startup
npm run start:dev  # Should start without errors

# 5. Integration Testing
# Test authentication endpoints based on API specification
```

### Success Criteria

- All authentication components compile without errors
- JWT strategy properly validates tokens and extracts users
- Local strategy validates credentials correctly
- Custom guards enforce business rules appropriately
- Authentication flow works end-to-end (signup → login → protected routes)
- Password hashing implemented with bcrypt (salt rounds from configuration)
- Error handling returns appropriate HTTP status codes (401, 400)
- Access token format matches specification from API documentation
- **Module Configuration:** JwtAuthGuard NOT in providers array, IS in exports array
- **No Unused Imports:** Linting passes without unused import warnings
- **Type Safety:** All TypeScript types correct, no `any` types used
