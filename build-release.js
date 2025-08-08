import fs from 'fs';
import { execSync } from 'child_process';

// Obtener información del commit actual
const getGitInfo = () => {
  try {
    const commitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    const commitMessage = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    return { commitHash, commitMessage, branch };
  } catch (error) {
    return { commitHash: 'unknown', commitMessage: 'No git info', branch: 'unknown' };
  }
};

// Leer package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;

// Obtener información de git
const gitInfo = getGitInfo();

// Crear archivo de información de build
const buildInfo = {
  version,
  buildDate: new Date().toISOString(),
  git: gitInfo,
  environment: process.env.NODE_ENV || 'development'
};

// Escribir build-info.json
fs.writeFileSync('dist/build-info.json', JSON.stringify(buildInfo, null, 2));

// Crear changelog básico
const changelog = `# ChatGPT Quick Access v${version}

## Build Information
- **Version**: ${version}
- **Build Date**: ${buildInfo.buildDate}
- **Git Commit**: ${gitInfo.commitHash}
- **Branch**: ${gitInfo.branch}

## Changes
${gitInfo.commitMessage}

## Installation
1. Download the extension from the \`dist\` folder
2. Load it as an unpacked extension in Chrome/Edge
3. Use Ctrl+Shift+K for temporary chat
4. Use Ctrl+Shift+L for normal chat

---
Generated automatically on ${buildInfo.buildDate}
`;

// Escribir CHANGELOG.md
fs.writeFileSync('dist/CHANGELOG.md', changelog);

console.log(`🚀 Build Release v${version} completed!`);
console.log(`📝 Changelog generated`);
console.log(`📦 Build info saved to dist/build-info.json`);
console.log(`🔗 Git: ${gitInfo.commitHash} (${gitInfo.branch})`);
