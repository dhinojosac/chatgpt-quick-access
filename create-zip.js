import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

// Leer package.json para obtener la versión
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;

// Crear nombre del archivo ZIP
const zipFileName = `chatgpt-quick-access-v${version}.zip`;
const releasesDir = 'releases';

// Crear directorio releases si no existe
if (!fs.existsSync(releasesDir)) {
  fs.mkdirSync(releasesDir, { recursive: true });
}

// Verificar que dist existe
if (!fs.existsSync('dist')) {
  console.error('❌ Error: dist folder not found. Run npm run build first.');
  process.exit(1);
}

try {
  console.log(`📦 Creating ZIP file: ${zipFileName}`);
  console.log(`📁 Source: dist/`);
  console.log(`📁 Destination: ${releasesDir}/${zipFileName}`);
  
  // Crear stream de escritura para el ZIP
  const output = fs.createWriteStream(path.join(releasesDir, zipFileName));
  const archive = archiver('zip', {
    zlib: { level: 9 } // Máxima compresión
  });
  
  // Escuchar eventos del archiver
  output.on('close', () => {
    const fileSizeInMB = (archive.pointer() / (1024 * 1024)).toFixed(2);
    
    console.log(`✅ ZIP created successfully!`);
    console.log(`📦 File: ${zipFileName}`);
    console.log(`📏 Size: ${fileSizeInMB} MB`);
    console.log(`📁 Location: ${releasesDir}/${zipFileName}`);
    
    // Crear archivo de información del release
    const releaseInfo = {
      version,
      buildDate: new Date().toISOString(),
      fileName: zipFileName,
      fileSize: `${fileSizeInMB} MB`,
      contents: [
        'manifest.json',
        'popup.html',
        'assets/',
        'icons/',
        'CHANGELOG.md',
        'build-info.json'
      ]
    };
    
    const releaseInfoPath = path.join(releasesDir, `release-info-v${version}.json`);
    fs.writeFileSync(releaseInfoPath, JSON.stringify(releaseInfo, null, 2));
    
    console.log(`📋 Release info saved to: ${releaseInfoPath}`);
    
    // Listar archivos en releases
    const releaseFiles = fs.readdirSync(releasesDir);
    console.log(`\n📂 Files in releases folder:`);
    releaseFiles.forEach(file => {
      const filePath = path.join(releasesDir, file);
      const fileStats = fs.statSync(filePath);
      const size = (fileStats.size / 1024).toFixed(1);
      console.log(`   ${file} (${size} KB)`);
    });
  });
  
  archive.on('error', (err) => {
    throw err;
  });
  
  // Pipe archive data to the file
  archive.pipe(output);
  
  // Agregar directorio dist al ZIP
  archive.directory('dist/', false);
  
  // Finalizar el archivo
  await archive.finalize();
  
} catch (error) {
  console.error('❌ Error creating ZIP file:', error.message);
  process.exit(1);
}
