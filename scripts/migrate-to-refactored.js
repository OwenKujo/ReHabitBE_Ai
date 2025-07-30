#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔄 MediaPipe Rehabilitation App Migration Script');
console.log('===============================================\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: Please run this script from the project root directory');
  process.exit(1);
}

// Create directories if they don't exist
const directories = [
  'src/utils',
  'src/hooks',
  'src/components'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Check if original file exists
const originalFile = 'src/page/MediaPipefulldemo.js';
if (!fs.existsSync(originalFile)) {
  console.error(`❌ Error: Original file not found: ${originalFile}`);
  process.exit(1);
}

// Backup original file
const backupFile = 'src/page/MediaPipefulldemo.js.backup';
if (!fs.existsSync(backupFile)) {
  fs.copyFileSync(originalFile, backupFile);
  console.log(`✅ Backed up original file to: ${backupFile}`);
} else {
  console.log(`ℹ️  Backup already exists: ${backupFile}`);
}

// Check if refactored file exists
const refactoredFile = 'src/page/MediaPipefulldemoRefactored.js';
if (!fs.existsSync(refactoredFile)) {
  console.error(`❌ Error: Refactored file not found: ${refactoredFile}`);
  console.log('Please ensure all refactored files are in place before running this script.');
  process.exit(1);
}

console.log('\n📋 Migration Summary:');
console.log('====================');
console.log('✅ Directories created/verified');
console.log('✅ Original file backed up');
console.log('✅ Refactored file found');

console.log('\n🚀 Next Steps:');
console.log('==============');
console.log('1. Update your routing to use the refactored component:');
console.log('   import MediaPipefulldemoRefactored from \'./page/MediaPipefulldemoRefactored\';');
console.log('');
console.log('2. Test the application:');
console.log('   npm start');
console.log('');
console.log('3. Verify all functionality works:');
console.log('   - Pose detection');
console.log('   - Face detection');
console.log('   - Audio feedback');
console.log('   - Multilingual support');
console.log('');
console.log('4. If issues occur, you can restore the original:');
console.log('   cp src/page/MediaPipefulldemo.js.backup src/page/MediaPipefulldemo.js');
console.log('');
console.log('📚 For detailed information, see: REFACTORING_GUIDE.md');

console.log('\n🎉 Migration script completed successfully!'); 