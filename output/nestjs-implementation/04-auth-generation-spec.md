# Authentication System Generation Specification: Task Manager Backend

**Objective:** Generate complete JWT authentication system with strategies, guards, and auth service based on authentication requirements in documentation.

**Input Sources:** 
- `output/documentation/features/authentication/` - Authentication feature documentation
- `output/documentation/architecture.md` - JWT configuration, auth strategy
- `output/documentation/business-rules.md` - Authentication business rules
- `output/documentation/api-specification.md` - Authentication endpoints

## Authentication Specifications

### AuthService

**File Location:** `src/auth/auth.service.ts`

**Dependencies:**
- `@InjectRepository(User)` - TypeORM User repository
- `JwtService` - From @nestjs/jwt
- `bcrypt` - For password hashing

**Methods:**

#### validateUser(email: string, password: string): Promise<User | null>
- **Business Rules:** AUTH-2 (User login requires email and password, not username)
- **Implementation:**
  - Find user by email (not username)
  - Compare password with hashed password using bcrypt
  - Return user if valid, null if invalid
- **Error Handling:** Return null for invalid credentials (handled by strategy)
- **Return:** User entity or null

#### login(user: User): { accessToken: string }
- **Business Rules:** AUTH-4 (JWT tokens required for protected endpoints), AUTH-5 (JWT tokens validated on every request)
- **Implementation:**
  - Generate JWT token with payload: { sub: user.id, email: user.email }
  - Use JWT_SECRET from environment (default: 'your-secret-key')
  - Use expiration: '1d' (1 day)
  - Return object with accessToken field (camelCase)
- **Return:** `{ accessToken: string }`

#### signup(signupDto: SignupDto): Promise<User>
- **Business Rules:** AUTH-1 (User registration requires username, email, password), AUTH-3 (Passwords hashed before storage), USER-1 (Username unique), USER-2 (Email unique), ERR-2 (Duplicate username), ERR-3 (Duplicate email)
- **Implementation:**
  - Check username uniqueness (throw BadRequestException if exists)
  - Check email uniqueness (throw BadRequestException if exists)
  - Hash password using bcrypt (salt rounds: 10)
  - Create user with hashed password
  - Return created user (password excluded via serialization)
- **Error Handling:**
  - Throw BadRequestException if username exists (ERR-2: "Username already exists")
  - Throw BadRequestException if email exists (ERR-3: "Email already exists")
- **Return:** User entity (password excluded)

#### hashPassword(password: string): Promise<string>
- **Implementation:** Hash password using bcrypt with salt rounds: 10
- **Return:** Hashed password string

#### comparePasswords(password: string, hashedPassword: string): Promise<boolean>
- **Implementation:** Compare password with hashed password using bcrypt
- **Return:** boolean

### Strategies

#### LocalStrategy

**File Location:** `src/auth/strategies/local.strategy.ts`

**Implementation:**
- Use PassportStrategy(Strategy) from @nestjs/passport
- Use Strategy from 'passport-local'
- Inject AuthService
- Implement validate method: `async validate(email: string, password: string): Promise<User>`
- Call AuthService.validateUser(email, password)
- Throw UnauthorizedException if user is null (ERR-4: "Invalid credentials")
- Return user if valid

#### JwtStrategy

**File Location:** `src/auth/strategies/jwt.strategy.ts`

**Implementation:**
- Use PassportStrategy(Strategy) from @nestjs/passport
- Use ExtractJwt.fromAuthHeaderAsBearerToken() for token extraction
- Use Strategy from 'passport-jwt'
- Inject UsersService (to find user by ID)
- JWT secret: process.env.JWT_SECRET || 'your-secret-key'
- Implement validate method: `async validate(payload: { sub: number, email: string }): Promise<User>`
- Find user by ID (payload.sub)
- Return user object (will be available as req.user)

### Guards

#### LocalAuthGuard

**File Location:** `src/auth/guards/local-auth.guard.ts`

**Implementation:**
- Extend AuthGuard('local') from @nestjs/passport
- Use with @UseGuards(LocalAuthGuard) on signin endpoint

#### JwtAuthGuard

**File Location:** `src/auth/guards/jwt-auth.guard.ts`

**Implementation:**
- Extend AuthGuard('jwt') from @nestjs/passport
- Use with @UseGuards(JwtAuthGuard) on protected endpoints
- Export from AuthModule for use in other modules

### AuthController

**File Location:** `src/auth/auth.controller.ts`

**Endpoints:**

#### POST /signup
- **DTO:** SignupDto
- **Method:** `signup(@Body() signupDto: SignupDto): Promise<User>`
- **Service Call:** `authService.signup(signupDto)`
- **Response:** 201 Created with User object (password excluded)
- **Swagger:** @ApiOperation, @ApiResponse(201), @ApiResponse(400)

#### POST /signin
- **DTO:** SigninDto
- **Guards:** @UseGuards(LocalAuthGuard)
- **Method:** `signin(@Request() req): { accessToken: string }`
- **Service Call:** `authService.login(req.user)`
- **Response:** 200 OK with { accessToken: string }
- **Swagger:** @ApiOperation, @ApiResponse(200), @ApiResponse(401)

## Module Configuration

**AuthModule** (`src/auth/auth.module.ts`):

**Imports:**
- TypeOrmModule.forFeature([User])
- JwtModule.register({
    secret: process.env.JWT_SECRET || 'your-secret-key',
    signOptions: { expiresIn: '1d' }
  })
- PassportModule
- UsersModule (to access UsersService for JwtStrategy)

**Providers:**
- AuthService
- LocalStrategy
- JwtStrategy

**Exports:**
- AuthService
- JwtAuthGuard (for use in other modules)
- JwtModule (for use in other modules)

**CRITICAL:** JwtAuthGuard should NOT be in providers array, only in exports array.

## Required Imports

**For AuthService:**
```typescript
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity/user.entity';
import { SignupDto } from './dto/signup.dto';
```

**For LocalStrategy:**
```typescript
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../users/entities/user.entity/user.entity';
```

**For JwtStrategy:**
```typescript
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity/user.entity';
```

**For Guards:**
```typescript
import { AuthGuard } from '@nestjs/passport';
```

## Validation Commands

After generation, verify:
```bash
cd output/task-manager
npm run build  # Must compile without errors
npm run lint   # Should pass validation
```

## Success Criteria

- All authentication components compile without errors
- JWT strategy properly validates tokens
- Local strategy validates email/password correctly (not username)
- Authentication flow works end-to-end (signup → login)
- Password hashing implemented with bcrypt
- JwtAuthGuard exported from AuthModule (not in providers)
- AuthModule imports UsersModule
- JwtModule configured with secret and expiration
- Error handling returns appropriate status codes (401 for invalid credentials, 400 for duplicates)

