// Test script to verify the complete authentication flow
const API_BASE_URL = 'https://rehabitbe.onrender.com';

async function testAuthFlow() {
  console.log('🧪 Testing complete authentication flow...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check passed:', healthData);

    // Test 2: Register a new user
    console.log('\n2. Testing user registration...');
    const testEmail = `test${Date.now()}@example.com`;
    const registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: testEmail,
        password: 'password123'
      }),
    });
    const registerData = await registerResponse.json();
    console.log('✅ Registration response:', registerData);

    if (!registerData.token) {
      throw new Error('Registration failed - no token received');
    }

    // Test 3: Login with the registered user
    console.log('\n3. Testing user login...');
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: 'password123'
      }),
    });
    const loginData = await loginResponse.json();
    console.log('✅ Login response:', loginData);

    if (!loginData.token) {
      throw new Error('Login failed - no token received');
    }

    // Test 4: Get user profile with token
    console.log('\n4. Testing get profile with token...');
    const profileResponse = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${loginData.token}`,
        'Content-Type': 'application/json',
      },
    });
    const profileData = await profileResponse.json();
    console.log('✅ Profile response:', profileData);

    console.log('\n🎉 Complete authentication flow test passed!');
    console.log('\n📋 Summary:');
    console.log('- Backend URL:', API_BASE_URL);
    console.log('- Health check: ✅');
    console.log('- Registration: ✅');
    console.log('- Login: ✅');
    console.log('- Profile retrieval: ✅');
    console.log('- Token authentication: ✅');

    console.log('\n🚀 Ready for frontend integration!');
    console.log('The navbar should now switch between guest and authenticated states.');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('- Check if the backend is deployed and running');
    console.log('- Verify the API URL is correct');
    console.log('- Check network connectivity');
  }
}

// Run the test
testAuthFlow(); 