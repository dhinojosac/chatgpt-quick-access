import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

// Crear nombre del archivo ZIP de desarrollo
const zipFileName = 'chatgpt-quick-access-dev.zip';
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
  console.log(`📦 Creating development ZIP file: ${zipFileName}`);
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
    
    console.log(`✅ Development ZIP created successfully!`);
    console.log(`📦 File: ${zipFileName}`);
    console.log(`📏 Size: ${fileSizeInMB} MB`);
    console.log(`📁 Location: ${releasesDir}/${zipFileName}`);
    console.log(`💡 Use this for testing and development`);
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
