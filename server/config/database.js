const { Pool } = require('pg');

// Parse database URL for production (Render)
const parseDatabaseUrl = (url) => {
  if (!url) return null;
  
  try {
    // Use URL constructor for more robust parsing
    const urlObj = new URL(url);
    
    const config = {
      user: urlObj.username,
      password: urlObj.password,
      host: urlObj.hostname,
      port: parseInt(urlObj.port),
      database: urlObj.pathname.substring(1) // Remove leading slash
    };
    
    console.log('✅ Parsed DATABASE_URL successfully:');
    console.log('  User:', config.user);
    console.log('  Host:', config.host);
    console.log('  Port:', config.port);
    console.log('  Database:', config.database);
    
    return config;
  } catch (error) {
    console.log('❌ Failed to parse DATABASE_URL:', url);
    console.log('Error:', error.message);
    return null;
  }
};

// Database configuration
const getDbConfig = () => {
  console.log('🔍 Database configuration debug:');
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  
  // For production (Render), use DATABASE_URL
  if (process.env.DATABASE_URL) {
    console.log('📊 Using DATABASE_URL for configuration');
    const config = parseDatabaseUrl(process.env.DATABASE_URL);
    if (config) {
      const finalConfig = {
        ...config,
        ssl: { rejectUnauthorized: false },
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      };
      console.log('✅ Using parsed DATABASE_URL configuration');
      return finalConfig;
    } else {
      console.log('❌ Failed to parse DATABASE_URL, falling back to individual variables');
    }
  }
  
  // For development, use individual environment variables
  console.log('📊 Using individual environment variables');
  const fallbackConfig = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'rehabit_db',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };
  console.log('✅ Using fallback configuration');
  return fallbackConfig;
};

const pool = new Pool(getDbConfig());

// Test the connection
const connect = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connection successful');
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    throw err;
  }
};

// Initialize database tables
const initDatabase = async () => {
  try {
    const client = await pool.connect();
    
    // Create rehabit_user table
    await client.query(`
      CREATE TABLE IF NOT EXISTS rehabit_user (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create scores table for move 1 and 2
    await client.query(`
      CREATE TABLE IF NOT EXISTS scores (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES rehabit_user(id) ON DELETE CASCADE,
        move_type VARCHAR(50) NOT NULL CHECK (move_type IN ('move_1', 'move_2')),
        score DECIMAL(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
        duration INTEGER CHECK (duration > 0),
        accuracy DECIMAL(5,2) CHECK (accuracy >= 0 AND accuracy <= 100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_scores_user_id ON scores(user_id);
      CREATE INDEX IF NOT EXISTS idx_scores_move_type ON scores(move_type);
      CREATE INDEX IF NOT EXISTS idx_scores_created_at ON scores(created_at);
      CREATE INDEX IF NOT EXISTS idx_rehabit_user_email ON rehabit_user(email);
    `);

    client.release();
    console.log('✅ Database tables initialized successfully');
  } catch (err) {
    console.error('❌ Database initialization failed:', err.message);
    throw err;
  }
};

module.exports = {
  pool,
  connect,
  initDatabase
}; 