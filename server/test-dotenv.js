console.log('🔍 Testing dotenv loading...\n');

// Try to load .env file
try {
  require('dotenv').config();
  console.log('✅ dotenv loaded successfully');
} catch (error) {
  console.log('❌ dotenv failed to load:', error.message);
}

console.log('\n📊 Environment check:');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('NODE_ENV:', process.env.NODE_ENV || 'undefined');

if (process.env.DATABASE_URL) {
  console.log('✅ DATABASE_URL is loaded');
  console.log('URL starts with:', process.env.DATABASE_URL.substring(0, 20) + '...');
} else {
  console.log('❌ DATABASE_URL is not loaded');
  console.log('\n💡 Make sure you have a .env file in the server directory with:');
  console.log('DATABASE_URL=postgresql://fortune_q9tq_user:oYe6KE2wQauo9mG9d28StvKrbNwKyzx8@dpg-d1da0k7diees73cmobj0-a.oregon-postgres.render.com/fortune_q9tq');
} 