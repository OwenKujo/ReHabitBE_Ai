require('dotenv').config();
const { pool, connect, initDatabase } = require('./config/database');

const testDatabase = async () => {
  console.log('🧪 Testing database connection...\n');
  
  try {
    // Test connection
    console.log('1. Testing database connection...');
    await connect();
    console.log('✅ Database connection successful!\n');
    
    // Test table initialization
    console.log('2. Testing table initialization...');
    await initDatabase();
    console.log('✅ Database tables initialized successfully!\n');
    
    // Test a simple query
    console.log('3. Testing simple query...');
    const client = await pool.connect();
    const result = await client.query('SELECT COUNT(*) as user_count FROM rehabit_user');
    client.release();
    console.log(`✅ Query successful! Current users: ${result.rows[0].user_count}\n`);
    
    console.log('🎉 All database tests passed!');
    console.log('\n📊 Database Status:');
    console.log('- Connection: ✅');
    console.log('- Tables: ✅');
    console.log('- Queries: ✅');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

testDatabase(); 