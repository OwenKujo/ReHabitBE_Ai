const crypto = require('crypto');

// Generate a secure random JWT secret
const generateJWTSecret = () => {
  // Generate 64 random bytes and convert to base64
  const secret = crypto.randomBytes(64).toString('base64');
  
  console.log('🔐 Generated JWT Secret:');
  console.log('='.repeat(50));
  console.log(secret);
  console.log('='.repeat(50));
  console.log('\n📋 Copy this to your .env file as:');
  console.log(`JWT_SECRET=${secret}`);
  console.log('\n⚠️  Keep this secret secure and never share it!');
  
  return secret;
};

generateJWTSecret(); 