# NestJS Scaffolding Script Generation Specification

## Objective

Generate cross-platform scripts (bash and PowerShell) that scaffold a NestJS project structure based on documentation. The scripts create the project, install dependencies, and generate modules, services, controllers, entities, and DTO directories.

## Script Generation

Generate two scripts:
1. `scaffolding-script.sh` - Bash script for Linux/Mac/Git Bash
2. `scaffolding-script.ps1` - PowerShell script for Windows

Both scripts must have identical functionality and structure.

## Platform Detection and Execution

Generate a wrapper script or instructions for automatic platform detection:

### Option 1: Node.js Wrapper (Recommended)
Generate `scaffold.js` that detects the platform and executes the appropriate script:
```javascript
const { execSync } = require('child_process');
const os = require('os');
const path = require('path');

const platform = os.platform();
const scriptDir = __dirname;

if (platform === 'win32') {
    // Windows - use PowerShell
    execSync(`powershell -ExecutionPolicy Bypass -File "${path.join(scriptDir, 'scaffolding-script.ps1')}"`, { stdio: 'inherit' });
} else {
    // Linux/Mac - use bash
    execSync(`bash "${path.join(scriptDir, 'scaffolding-script.sh')}"`, { stdio: 'inherit' });
}
```

### Option 2: README Instructions
Include in generated README:
- **Windows:** `powershell -ExecutionPolicy Bypass -File scaffolding-script.ps1`
- **Linux/Mac/Git Bash:** `bash scaffolding-script.sh`

The spec should generate both scripts and prefer Option 1 (Node.js wrapper) for automatic platform detection.

## Script Structure

### 1. Script Header

**Bash (`scaffolding-script.sh`):**
- Shebang: `#!/bin/bash`
- Error handling: `set -e`
- Project name variable: `PROJECT_NAME="{project-name}"`

**PowerShell (`scaffolding-script.ps1`):**
- Error handling: `$ErrorActionPreference = "Stop"`
- Project name variable: `$PROJECT_NAME = "{project-name}"`

### 2. Create NestJS Project

**Bash:**
- Echo: `echo "Step 1: Creating NestJS project: $PROJECT_NAME..."`
- Command: `npx --yes @nestjs/cli new $PROJECT_NAME --package-manager npm`
- Change directory: `cd $PROJECT_NAME`

**PowerShell:**
- Echo: `Write-Host "Step 1: Creating NestJS project: $PROJECT_NAME..."`
- Command: `npx --yes @nestjs/cli new $PROJECT_NAME --package-manager npm`
- Change directory: `cd $PROJECT_NAME`

### 3. Install Dependencies

**Bash:**
- Echo: `echo "Step 2: Installing core dependencies..."`
- Install: `npm install @nestjs/config @nestjs/typeorm typeorm pg class-validator class-transformer bcrypt`
- Echo: `echo "Step 3: Installing authentication dependencies..."`
- Install: `npm install @nestjs/passport passport passport-local @nestjs/jwt passport-jwt`
- Echo: `echo "Step 4: Installing API documentation dependencies..."`
- Install: `npm install @nestjs/swagger`
- Dev dependencies: `npm install -D @types/passport-local @types/bcrypt @types/passport-jwt`

**PowerShell:**
- Echo: `Write-Host "Step 2: Installing core dependencies..."`
- Install: `npm install @nestjs/config @nestjs/typeorm typeorm pg class-validator class-transformer bcrypt`
- Echo: `Write-Host "Step 3: Installing authentication dependencies..."`
- Install: `npm install @nestjs/passport passport passport-local @nestjs/jwt passport-jwt`
- Echo: `Write-Host "Step 4: Installing API documentation dependencies..."`
- Install: `npm install @nestjs/swagger`
- Dev dependencies: `npm install -D @types/passport-local @types/bcrypt @types/passport-jwt`

### 4. Generate Modules, Services, Controllers

**Bash:**
- Echo: `echo "Step 4: Generating application modules, services, and controllers..."`
- Comment: `# Generate with --no-spec to skip test files`
- Comment: `# Using separate commands for reliability in non-interactive scripts`
- For each module from documentation:
  - `npx --yes @nestjs/cli g module {module-name} --no-spec`
  - `npx --yes @nestjs/cli g service {module-name} --no-spec`
  - `npx --yes @nestjs/cli g controller {module-name} --no-spec`

**PowerShell:**
- Echo: `Write-Host "Step 4: Generating application modules, services, and controllers..."`
- Comment: `# Generate with --no-spec to skip test files`
- Comment: `# Using separate commands for reliability in non-interactive scripts`
- For each module from documentation:
  - `npx --yes @nestjs/cli g module {module-name} --no-spec`
  - `npx --yes @nestjs/cli g service {module-name} --no-spec`
  - `npx --yes @nestjs/cli g controller {module-name} --no-spec`

### 5. Generate Entities

**Bash:**
- Echo: `echo "Step 5: Generating TypeORM entities..."`
- For each entity from documentation:
  - `npx --yes @nestjs/cli g class {module}/entities/{entity}.entity --no-spec`

**PowerShell:**
- Echo: `Write-Host "Step 5: Generating TypeORM entities..."`
- For each entity from documentation:
  - `npx --yes @nestjs/cli g class {module}/entities/{entity}.entity --no-spec`

### 6. Create DTO Directories

**Bash:**
- Echo: `echo "Step 6: Creating DTOs directories..."`
- Create directories: `mkdir -p src/{module}/dto` for each module
- **CRITICAL:** All paths must be prefixed with `src/` to ensure directories are created in the correct location

**PowerShell:**
- Echo: `Write-Host "Step 6: Creating DTOs directories..."`
- Create directories: `New-Item -ItemType Directory -Force -Path "src\{module}\dto"` for each module
- Suppress output: `| Out-Null` to avoid verbose output
- **CRITICAL:** All paths must be prefixed with `src\` to ensure directories are created in the correct location

### 7. Completion

**Bash:**
- Echo: `echo "Scaffolding complete. The project '$PROJECT_NAME' is ready."`

**PowerShell:**
- Echo: `Write-Host "Scaffolding complete. The project '$PROJECT_NAME' is ready."`

## Extraction Rules

### Project Name
- Extract from documentation folder name or use default

### Modules
- Read `documentation/architecture.md`
- Extract from "Module Structure" section
- Convert to lowercase, hyphenated format

### Entities
- Read `documentation/domain-models.md`
- Extract entity names from entity definitions
- Map to modules (e.g., User → users, Task → tasks)
- Format: `{module}/entities/{entity}.entity`

### Dependencies
- Read `documentation/architecture.md`
- Extract based on technology stack:
  - TypeORM → `@nestjs/typeorm`, `typeorm`
  - PostgreSQL → `pg`
  - JWT → `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `passport-local`
  - Validation → `class-validator`, `class-transformer`
  - Security → `bcrypt`
  - Config → `@nestjs/config`
  - API Documentation → `@nestjs/swagger` (always include for DTO Swagger decorators)
- Add `@types/{package}` as dev dependencies where needed

**Complete Dependency List (Always Include):**
- Core: `@nestjs/config`, `@nestjs/typeorm`, `typeorm`, `pg`
- Validation: `class-validator`, `class-transformer`
- Security: `bcrypt`
- Authentication: `@nestjs/passport`, `passport`, `passport-local`, `@nestjs/jwt`, `passport-jwt`
- API Documentation: `@nestjs/swagger`
- Dev Dependencies: `@types/passport-local`, `@types/bcrypt`, `@types/passport-jwt`

## Script Formatting

**Bash:**
- Use `--no-spec` flag for all generation commands
- Use `--yes` flag for all npx commands
- Use `--package-manager npm` for project creation
- Include descriptive comments with `#`
- Use `echo` for output messages

**PowerShell:**
- Use `--no-spec` flag for all generation commands
- Use `--yes` flag for all npx commands
- Use `--package-manager npm` for project creation
- Include descriptive comments with `#`
- Use `Write-Host` for output messages
- Use `$ErrorActionPreference = "Stop"` for error handling
- Use `New-Item -ItemType Directory -Force` for directory creation
- Use `| Out-Null` to suppress verbose output where appropriate

## Path Validation

**CRITICAL:** All directory paths must be validated to ensure they are created under `src/`:

### Pre-Generation Validation
- Verify project structure: `{project-name}/src/` exists after project creation
- Verify current working directory is `{project-name}/` before creating directories

### Post-Generation Validation
- Verify all DTO directories exist under `src/{module}/dto/` (not at project root)
- Verify all entity directories exist under `src/{module}/entities/`
- Verify all module files exist under `src/{module}/`

### Validation Commands

**Bash:**
```bash
# Verify DTO directories
for module in {modules}; do
  if [ ! -d "src/$module/dto" ]; then
    echo "ERROR: DTO directory missing: src/$module/dto"
    exit 1
  fi
done
```

**PowerShell:**
```powershell
# Verify DTO directories
foreach ($module in $modules) {
  if (-not (Test-Path "src\$module\dto")) {
    Write-Host "ERROR: DTO directory missing: src\$module\dto"
    exit 1
  }
}
```

## Verification

### Script Generation Verification
- Both bash and PowerShell scripts are generated
- Platform detection wrapper (Node.js script) is generated (preferred) or README instructions provided
- All modules from documentation are generated
- All entities from documentation are generated
- All dependencies from documentation are installed (including `@nestjs/swagger`)
- DTO directories created for all modules under `src/{module}/dto/` (not at root)
- Bash script follows bash best practices
- PowerShell script follows PowerShell best practices
- Both scripts have identical functionality
- Wrapper script correctly detects platform and executes appropriate script

### Path Verification
- All DTO directories created under `src/{module}/dto/` (verified)
- All entity directories created under `src/{module}/entities/` (verified)
- No directories created at project root (except standard NestJS structure)
- All paths use correct prefix (`src/` for bash, `src\` for PowerShell)

### Dependency Verification
- All required dependencies installed (core, validation, security, auth, swagger)
- All dev dependencies installed (`@types/*` packages)
- `@nestjs/swagger` included in dependency list
- No missing dependencies that would cause compilation errors

