# ReHabit Backend API

A Node.js/Express backend API for the ReHabit application with PostgreSQL database support.

## Features

- 🔐 JWT Authentication
- 👥 User registration and login
- 📊 Score tracking for move_1 and move_2
- 🏆 Leaderboard functionality
- 📈 User statistics and analytics
- 🛡️ Input validation and security
- 🚀 Production-ready for Render deployment

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: bcryptjs, helmet
- **Logging**: morgan

## Database Schema

### ReHabit User Table
```sql
CREATE TABLE rehabit_user (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Scores Table
```sql
CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES rehabit_user(id) ON DELETE CASCADE,
  move_type VARCHAR(50) NOT NULL CHECK (move_type IN ('move_1', 'move_2')),
  score DECIMAL(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
  duration INTEGER CHECK (duration > 0),
  accuracy DECIMAL(5,2) CHECK (accuracy >= 0 AND accuracy <= 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

### Users
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/me/scores` - Get current user's scores summary
- `PUT /api/users/me` - Update current user profile

### Scores
- `GET /api/scores` - Get user's scores (authenticated)
- `GET /api/scores/stats` - Get score statistics
- `POST /api/scores` - Create new score
- `GET /api/scores/:id` - Get specific score
- `PUT /api/scores/:id` - Update score
- `DELETE /api/scores/:id` - Delete score
- `GET /api/scores/leaderboard/:move_type` - Get leaderboard

### Health Check
- `GET /api/health` - Health check endpoint

## Local Development Setup

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your local database credentials.

3. **Set up PostgreSQL database**
   - Install PostgreSQL
   - Create a database named `rehabit_db`
   - Update `.env` with your database credentials

4. **Start the server**
   ```bash
   npm run dev
   ```

## Environment Variables

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rehabit_db
DB_USER=postgres
DB_PASSWORD=your_password_here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## Render Deployment

### 1. Create a new Web Service on Render

1. Connect your GitHub repository
2. Choose the repository
3. Configure the service:
   - **Name**: `rehabit-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (or specify if needed)

### 2. Add Environment Variables

In your Render service settings, add these environment variables:

```env
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CORS_ORIGIN=https://your-frontend-domain.com
```

### 3. Set up PostgreSQL Database

1. Create a new PostgreSQL service on Render
2. Copy the `DATABASE_URL` from the PostgreSQL service
3. Add it to your Web Service environment variables

### 4. Deploy

The service will automatically deploy when you push to your main branch.

## API Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a score
```bash
curl -X POST http://localhost:5000/api/scores \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "move_type": "move_1",
    "score": 85.5,
    "duration": 120,
    "accuracy": 92.3
  }'
```

### Get user scores
```bash
curl -X GET http://localhost:5000/api/scores \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Input validation with express-validator
- CORS protection
- Helmet security headers
- SQL injection prevention with parameterized queries
- Rate limiting (can be added)

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": [] // For validation errors
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License 