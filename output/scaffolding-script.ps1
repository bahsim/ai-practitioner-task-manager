$ErrorActionPreference = "Stop"

$PROJECT_NAME = "task-manager"

Write-Host "Step 1: Creating NestJS project: $PROJECT_NAME..."
npx --yes @nestjs/cli new $PROJECT_NAME --package-manager npm

cd $PROJECT_NAME

Write-Host "Step 2: Installing core dependencies..."
npm install @nestjs/config @nestjs/typeorm typeorm pg class-validator class-transformer bcrypt

Write-Host "Step 3: Installing authentication dependencies..."
npm install @nestjs/passport passport passport-local @nestjs/jwt passport-jwt

Write-Host "Step 4: Installing API documentation dependencies..."
npm install @nestjs/swagger

Write-Host "Step 5: Installing dev dependencies..."
npm install -D @types/passport-local @types/bcrypt @types/passport-jwt

Write-Host "Step 6: Generating application modules, services, and controllers..."
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

Write-Host "Step 7: Generating TypeORM entities..."
npx --yes @nestjs/cli g class users/entities/user.entity --no-spec
npx --yes @nestjs/cli g class tasks/entities/task.entity --no-spec

Write-Host "Step 8: Creating DTOs directories..."
# CRITICAL: All paths must be prefixed with src\ to ensure directories are created in the correct location
New-Item -ItemType Directory -Force -Path "src\users\dto" | Out-Null
New-Item -ItemType Directory -Force -Path "src\tasks\dto" | Out-Null
New-Item -ItemType Directory -Force -Path "src\auth\dto" | Out-Null

Write-Host "Scaffolding complete. The project '$PROJECT_NAME' is ready."

