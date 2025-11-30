#!/bin/bash
set -e

PROJECT_NAME="task-manager"

echo "Step 1: Creating NestJS project: $PROJECT_NAME..."
npx --yes @nestjs/cli new $PROJECT_NAME --package-manager npm

cd $PROJECT_NAME

echo "Step 2: Installing core dependencies..."
npm install @nestjs/config @nestjs/typeorm typeorm pg class-validator class-transformer bcrypt

echo "Step 3: Installing authentication dependencies..."
npm install @nestjs/passport passport passport-local @nestjs/jwt passport-jwt

echo "Step 4: Installing API documentation dependencies..."
npm install @nestjs/swagger

echo "Step 5: Installing dev dependencies..."
npm install -D @types/passport-local @types/bcrypt @types/passport-jwt

echo "Step 6: Generating application modules, services, and controllers..."
# Generate with --no-spec to skip test files
# Using separate commands for reliability in non-interactive scripts

npx --yes @nestjs/cli g module users --no-spec
npx --yes @nestjs/cli g service users --no-spec
npx --yes @nestjs/cli g controller users --no-spec

npx --yes @nestjs/cli g module tasks --no-spec
npx --yes @nestjs/cli g service tasks --no-spec
npx --yes @nestjs/cli g controller tasks --no-spec

npx --yes @nestjs/cli g module auth --no-spec
npx --yes @nestjs/cli g service auth --no-spec
npx --yes @nestjs/cli g controller auth --no-spec

echo "Step 7: Generating TypeORM entities..."
npx --yes @nestjs/cli g class users/entities/user.entity --no-spec
npx --yes @nestjs/cli g class tasks/entities/task.entity --no-spec

echo "Step 8: Creating DTOs directories..."
# CRITICAL: All paths must be prefixed with src/ to ensure directories are created in the correct location
mkdir -p src/users/dto
mkdir -p src/tasks/dto
mkdir -p src/auth/dto

echo "Scaffolding complete. The project '$PROJECT_NAME' is ready."

