#!/usr/bin/env node

const https = require('https');
const http = require('http');

console.log('🔍 MediaPipe Loading Test Script');
console.log('================================\n');

const testUrls = [
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js',
  'https://unpkg.com/@mediapipe/pose/pose.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1635988162/pose.js',
  'https://unpkg.com/@mediapipe/pose@0.5.1635988162/pose.js',
  'https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose_solution_packed_assets.data',
  'https://unpkg.com/@mediapipe/pose/pose_solution_packed_assets.data'
];

const testUrl = (url) => {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      console.log(`✅ ${url}: ${res.statusCode} ${res.statusMessage}`);
      resolve({ url, status: res.statusCode, success: res.statusCode === 200 });
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${url}: ${err.message}`);
      resolve({ url, status: 'ERROR', success: false, error: err.message });
    });
    
    req.setTimeout(10000, () => {
      console.log(`⏰ ${url}: Timeout`);
      req.destroy();
      resolve({ url, status: 'TIMEOUT', success: false });
    });
  });
};

const runTests = async () => {
  console.log('Testing MediaPipe CDN availability...\n');
  
  const results = await Promise.all(testUrls.map(testUrl));
  
  console.log('\n📊 Test Results:');
  console.log('================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  
  if (successful.length > 0) {
    console.log('\n✅ Working URLs:');
    successful.forEach(r => console.log(`  - ${r.url}`));
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed URLs:');
    failed.forEach(r => console.log(`  - ${r.url} (${r.status})`));
  }
  
  console.log('\n💡 Recommendations:');
  console.log('===================');
  
  if (successful.length === 0) {
    console.log('❌ No CDN sources are working. This indicates:');
    console.log('   - Network connectivity issues');
    console.log('   - Firewall blocking CDN access');
    console.log('   - DNS resolution problems');
    console.log('\n🔧 Solutions:');
    console.log('   - Check internet connection');
    console.log('   - Try using a VPN');
    console.log('   - Contact network administrator');
  } else if (successful.length < results.length) {
    console.log('⚠️  Some CDN sources are working, but not all.');
    console.log('   - The app should work with the working sources');
    console.log('   - Consider using local MediaPipe files for better reliability');
  } else {
    console.log('✅ All CDN sources are working!');
    console.log('   - The app should load MediaPipe successfully');
    console.log('   - If you still have issues, check browser cache and extensions');
  }
  
  console.log('\n🔧 Next Steps:');
  console.log('==============');
  console.log('1. If some URLs work: Use the refactored code with fallbacks');
  console.log('2. If no URLs work: Check network/firewall settings');
  console.log('3. For development: Consider downloading MediaPipe files locally');
  console.log('4. For production: Use a CDN that works in your environment');
  
  console.log('\n📚 For more help, see: TROUBLESHOOTING_MEDIAPIPE.md');
};

runTests().catch(console.error); 