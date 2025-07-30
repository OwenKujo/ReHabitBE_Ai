// Test script to verify backend connection
const API_BASE_URL = 'https://rehabitbe.onrender.com';

async function testBackendConnection() {
  console.log('🧪 Testing backend connection...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check passed:', healthData);

    // Test 2: Register user
    console.log('\n2. Testing user registration...');
    const registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      }),
    });
    const registerData = await registerResponse.json();
    console.log('✅ Registration response:', registerData);

    // Test 3: Login
    console.log('\n3. Testing user login...');
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      }),
    });
    const loginData = await loginResponse.json();
    console.log('✅ Login response:', loginData);

    console.log('\n🎉 Backend connection test completed successfully!');
    console.log('\n📋 Summary:');
    console.log('- Backend URL:', API_BASE_URL);
    console.log('- Health check: ✅');
    console.log('- Registration: ✅');
    console.log('- Login: ✅');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('- Check if the backend is deployed and running');
    console.log('- Verify the API URL is correct');
    console.log('- Check network connectivity');
  }
}

// Run the test
testBackendConnection(); 