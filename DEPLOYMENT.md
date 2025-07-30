# ReHabit Backend Deployment Guide

This guide will help you deploy the ReHabit backend API to Render with PostgreSQL database.

## Prerequisites

- GitHub account
- Render account
- Your code pushed to a GitHub repository

## Step 1: Set up PostgreSQL Database on Render

1. **Create a new PostgreSQL service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "PostgreSQL"
   - Choose "Free" plan
   - Name: `rehabit-postgres`
   - Click "Create Database"

2. **Get the database connection details**
   - Once created, click on your PostgreSQL service
   - Copy the `DATABASE_URL` from the "Connections" tab
   - Keep this URL safe for the next step

## Step 2: Deploy the Backend API

1. **Create a new Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Choose your repository

2. **Configure the service**
   - **Name**: `rehabit-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty

3. **Add Environment Variables**
   Click "Environment" tab and add these variables:

   ```env
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   CORS_ORIGIN=https://your-frontend-domain.com
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

   **Important**: Replace `DATABASE_URL` with the actual URL from Step 1.

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

## Step 3: Verify Deployment

1. **Check the deployment logs**
   - Go to your web service dashboard
   - Check the "Logs" tab for any errors

2. **Test the API**
   - Your API will be available at: `https://your-service-name.onrender.com`
   - Test the health endpoint: `https://your-service-name.onrender.com/api/health`

3. **Run the test script**
   ```bash
   # Set the API URL
   export API_URL=https://your-service-name.onrender.com
   
   # Run tests
   cd server
   npm test
   ```

## Step 4: Update Frontend Configuration

Update your React frontend to use the new API URL:

```javascript
// In your frontend code, update the API base URL
const API_BASE_URL = 'https://your-service-name.onrender.com';
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (production/development) | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `CORS_ORIGIN` | Frontend domain for CORS | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `PORT` | Server port (auto-set by Render) | No |

## Database Schema

The application will automatically create these tables:

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

Once deployed, your API will have these endpoints:

- `GET /api/health` - Health check
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `GET /api/scores` - Get user scores
- `POST /api/scores` - Create score
- `GET /api/scores/stats` - Get statistics
- `GET /api/scores/leaderboard/:move_type` - Get leaderboard

## Troubleshooting

### Common Issues

1. **Database connection failed**
   - Check if `DATABASE_URL` is correctly set
   - Verify the PostgreSQL service is running
   - Check the logs for connection errors

2. **Build fails**
   - Ensure all dependencies are in `package.json`
   - Check the build logs for specific errors
   - Verify the build command is correct

3. **CORS errors**
   - Update `CORS_ORIGIN` to match your frontend domain
   - Check if the frontend is making requests to the correct URL

4. **JWT errors**
   - Ensure `JWT_SECRET` is set and secure
   - Check if tokens are being sent correctly from frontend

### Getting Help

- Check the Render logs for detailed error messages
- Test the API endpoints using the provided test script
- Verify environment variables are correctly set
- Ensure the database is accessible and tables are created

## Security Notes

- Change the `JWT_SECRET` to a secure random string
- Use HTTPS in production
- Consider adding rate limiting for production use
- Regularly update dependencies for security patches

## Monitoring

- Monitor your application through Render's dashboard
- Set up alerts for service downtime
- Monitor database performance and connection limits
- Check logs regularly for errors or issues 