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

