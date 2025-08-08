import fs from 'fs';
import path from 'path';

const releasesDir = 'releases';

// Verificar si existe el directorio releases
if (!fs.existsSync(releasesDir)) {
  console.log('📁 No releases directory found. Nothing to clean.');
  process.exit(0);
}

try {
  const files = fs.readdirSync(releasesDir);
  
  if (files.length === 0) {
    console.log('📁 Releases directory is empty. Nothing to clean.');
    process.exit(0);
  }
  
  console.log(`🧹 Cleaning releases directory...`);
  console.log(`📂 Found ${files.length} files in releases/`);
  
  // Contar archivos por tipo
  const zipFiles = files.filter(file => file.endsWith('.zip'));
  const infoFiles = files.filter(file => file.endsWith('.json'));
  
  console.log(`📦 ZIP files: ${zipFiles.length}`);
  console.log(`📋 Info files: ${infoFiles.length}`);
  
  // Mostrar archivos que se van a eliminar
  console.log(`\n🗑️  Files to be removed:`);
  files.forEach(file => {
    const filePath = path.join(releasesDir, file);
    const stats = fs.statSync(filePath);
    const size = (stats.size / 1024).toFixed(1);
    console.log(`   ${file} (${size} KB)`);
  });
  
  // Eliminar todos los archivos
  files.forEach(file => {
    const filePath = path.join(releasesDir, file);
    fs.unlinkSync(filePath);
  });
  
  console.log(`\n✅ Cleaned ${files.length} files from releases/`);
  console.log(`💡 Run 'npm run zip' to create new release files`);
  
} catch (error) {
  console.error('❌ Error cleaning releases:', error.message);
  process.exit(1);
}
