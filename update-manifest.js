import fs from 'fs';
import path from 'path';

// Read the original manifest
const manifestPath = './manifest.json';
const distManifestPath = './dist/manifest.json';
const distAssetsPath = './dist/assets';

// Read original manifest
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Find the background script file
const assets = fs.readdirSync(distAssetsPath);
const backgroundFile = assets.find(file => file.startsWith('background-') && file.endsWith('.js'));

if (backgroundFile) {
  // Update the background script path
  manifest.background.service_worker = `assets/${backgroundFile}`;
  
  // Write updated manifest to dist
  fs.writeFileSync(distManifestPath, JSON.stringify(manifest, null, 2));
  
  console.log(`✅ Manifest updated with background script: assets/${backgroundFile}`);
} else {
  console.error('❌ Background script not found in assets folder');
}
