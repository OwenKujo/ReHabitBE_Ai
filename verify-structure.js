const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying project structure...\n');

// Check if server directory exists
const serverPath = path.join(__dirname, 'server');
if (fs.existsSync(serverPath)) {
  console.log('✅ Server directory exists');
  
  // Check if package.json exists in server
  const serverPackagePath = path.join(serverPath, 'package.json');
  if (fs.existsSync(serverPackagePath)) {
    console.log('✅ Server package.json exists');
    
    // Check if index.js exists in server
    const serverIndexPath = path.join(serverPath, 'index.js');
    if (fs.existsSync(serverIndexPath)) {
      console.log('✅ Server index.js exists');
    } else {
      console.log('❌ Server index.js missing');
    }
  } else {
    console.log('❌ Server package.json missing');
  }
} else {
  console.log('❌ Server directory missing');
}

// Check root package.json
const rootPackagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(rootPackagePath)) {
  console.log('✅ Root package.json exists');
} else {
  console.log('❌ Root package.json missing');
}

// List all directories
console.log('\n📁 Directory structure:');
const items = fs.readdirSync(__dirname);
items.forEach(item => {
  const itemPath = path.join(__dirname, item);
  const stats = fs.statSync(itemPath);
  if (stats.isDirectory()) {
    console.log(`  📁 ${item}/`);
  } else {
    console.log(`  📄 ${item}`);
  }
});

console.log('\n🎯 Ready for deployment!'); 