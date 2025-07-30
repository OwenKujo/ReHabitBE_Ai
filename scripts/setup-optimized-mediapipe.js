#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Optimized MediaPipe Detection System\n');

// Check if required directories exist
const requiredDirs = [
  'src/utils',
  'src/hooks', 
  'src/components',
  'src/page'
];

console.log('📁 Checking directory structure...');
requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  } else {
    console.log(`✓ Directory exists: ${dir}`);
  }
});

// Check if required files exist
const requiredFiles = [
  'src/utils/mediaPipeDetection.js',
  'src/hooks/useSmoothPoseDetection.js',
  'src/hooks/useSmoothFaceDetection.js',
  'src/components/PerformanceMonitor.js',
  'src/components/MediaPipeNavigation.js',
  'src/page/MediaPipefulldemoOptimized.js'
];

console.log('\n📄 Checking required files...');
let missingFiles = [];
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✓ File exists: ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log('\n⚠️  Some files are missing. Please ensure all optimized files are created.');
  console.log('Missing files:');
  missingFiles.forEach(file => console.log(`  - ${file}`));
} else {
  console.log('\n✅ All required files are present!');
}

// Check App.js for optimized route
console.log('\n🔍 Checking App.js for optimized route...');
try {
  const appJsPath = 'src/App.js';
  if (fs.existsSync(appJsPath)) {
    const appJsContent = fs.readFileSync(appJsPath, 'utf8');
    if (appJsContent.includes('MediaPipefulldemoOptimized')) {
      console.log('✓ Optimized route found in App.js');
    } else {
      console.log('⚠️  Optimized route not found in App.js');
      console.log('   Please add: <Route path="/mediapipe-optimized" element={<MediaPipefulldemoOptimized />} />');
    }
  } else {
    console.log('❌ App.js not found');
  }
} catch (error) {
  console.log('❌ Error reading App.js:', error.message);
}

console.log('\n🎯 Setup Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Start your development server: npm start');
console.log('2. Navigate to: http://localhost:3000/mediapipe-optimized');
console.log('3. Compare with original: http://localhost:3000/mediapipe');
console.log('4. Use the navigation buttons to switch between versions');
console.log('5. Monitor performance with the "Show Performance" button');

console.log('\n🔧 Features Available:');
console.log('- Smooth 30 FPS detection');
console.log('- Real-time performance monitoring');
console.log('- Frame rate control');
console.log('- Cached calculations');
console.log('- Automatic resource management');

console.log('\n📊 Performance Monitoring:');
console.log('- Green: Excellent (25+ FPS)');
console.log('- Yellow: Good (20-24 FPS)');
console.log('- Orange: Fair (15-19 FPS)');
console.log('- Red: Poor (<15 FPS)');

console.log('\n🎉 Enjoy the optimized MediaPipe experience!'); 