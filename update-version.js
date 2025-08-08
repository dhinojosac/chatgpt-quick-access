import fs from 'fs';
import path from 'path';

// Leer package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;

// Leer manifest.json
const manifestPath = 'manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Actualizar versión en manifest.json
manifest.version = version;

// Escribir manifest.json actualizado
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`✅ Versión sincronizada: ${version}`);
console.log(`📦 package.json: ${packageJson.version}`);
console.log(`📋 manifest.json: ${manifest.version}`);
