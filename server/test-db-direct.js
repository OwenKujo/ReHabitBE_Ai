// Set DATABASE_URL directly for testing
process.env.DATABASE_URL = 'postgresql://fortune_q9tq_user:oYe6KE2wQauo9mG9d28StvKrbNwKyzx8@dpg-d1da0k7diees73cmobj0-a.oregon-postgres.render.com/fortune_q9tq';
process.env.NODE_ENV = 'development';

const { pool, connect, initDatabase } = require('./config/database');

const testDatabase = async () => {
  console.log('🧪 Testing database connection (direct)...\n');
  console.log('DATABASE_URL set:', !!process.env.DATABASE_URL);
  console.log('URL starts with:', process.env.DATABASE_URL.substring(0, 20) + '...\n');
  
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
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

testDatabase(); 