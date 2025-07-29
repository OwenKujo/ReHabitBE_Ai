const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:5000';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

let authToken = null;
let userId = null;
let scoreId = null;

const testAPI = async () => {
  console.log('🧪 Starting API tests...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data);

    // Test 2: Register user
    console.log('\n2. Testing user registration...');
    const registerResponse = await axios.post(`${BASE_URL}/api/auth/register`, testUser);
    console.log('✅ Registration successful:', registerResponse.data.message);
    authToken = registerResponse.data.token;
    userId = registerResponse.data.user.id;

    // Test 3: Login
    console.log('\n3. Testing user login...');
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login successful:', loginResponse.data.message);

    // Test 4: Get user profile
    console.log('\n4. Testing get profile...');
    const profileResponse = await axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Profile retrieved:', profileResponse.data.user.name);

    // Test 5: Create score
    console.log('\n5. Testing score creation...');
    const scoreData = {
      move_type: 'move_1',
      score: 85.5,
      duration: 120,
      accuracy: 92.3
    };
    const scoreResponse = await axios.post(`${BASE_URL}/api/scores`, scoreData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Score created:', scoreResponse.data.score);
    scoreId = scoreResponse.data.score.id;

    // Test 6: Get scores
    console.log('\n6. Testing get scores...');
    const scoresResponse = await axios.get(`${BASE_URL}/api/scores`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Scores retrieved:', scoresResponse.data.scores.length, 'scores');

    // Test 7: Get score statistics
    console.log('\n7. Testing score statistics...');
    const statsResponse = await axios.get(`${BASE_URL}/api/scores/stats`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Statistics retrieved:', statsResponse.data.statistics);

    // Test 8: Get leaderboard
    console.log('\n8. Testing leaderboard...');
    const leaderboardResponse = await axios.get(`${BASE_URL}/api/scores/leaderboard/move_1`);
    console.log('✅ Leaderboard retrieved:', leaderboardResponse.data.leaderboard.length, 'entries');

    // Test 9: Update score
    console.log('\n9. Testing score update...');
    const updateResponse = await axios.put(`${BASE_URL}/api/scores/${scoreId}`, {
      score: 90.0,
      accuracy: 95.0
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Score updated:', updateResponse.data.score.score);

    // Test 10: Get specific score
    console.log('\n10. Testing get specific score...');
    const specificScoreResponse = await axios.get(`${BASE_URL}/api/scores/${scoreId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Specific score retrieved:', specificScoreResponse.data.score);

    // Test 11: Delete score
    console.log('\n11. Testing score deletion...');
    const deleteResponse = await axios.delete(`${BASE_URL}/api/scores/${scoreId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Score deleted:', deleteResponse.data.message);

    console.log('\n🎉 All tests passed successfully!');
    console.log('\n📊 API Summary:');
    console.log('- Authentication: ✅');
    console.log('- User Management: ✅');
    console.log('- Score Management: ✅');
    console.log('- Statistics: ✅');
    console.log('- Leaderboard: ✅');

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
};

// Run tests
testAPI(); 