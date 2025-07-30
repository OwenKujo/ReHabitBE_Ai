require('dotenv').config();

console.log('🔍 Environment Variables Debug\n');

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN || 'NOT SET');

if (process.env.DATABASE_URL) {
  console.log('\n📊 DATABASE_URL Analysis:');
  const url = process.env.DATABASE_URL;
  const match = url.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  
  if (match) {
    console.log('✅ URL format is valid');
    console.log('User:', match[1]);
    console.log('Host:', match[3]);
    console.log('Port:', match[4]);
    console.log('Database:', match[5]);
    console.log('Password length:', match[2].length, 'characters');
  } else {
    console.log('❌ URL format is invalid');
  }
} else {
  console.log('\n❌ DATABASE_URL is not set!');
  console.log('Please create a .env file in the server directory with:');
  console.log('DATABASE_URL=postgresql://fortune_q9tq_user:oYe6KE2wQauo9mG9d28StvKrbNwKyzx8@dpg-d1da0k7diees73cmobj0-a.oregon-postgres.render.com/fortune_q9tq');
} 