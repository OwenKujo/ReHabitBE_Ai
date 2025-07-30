# Quick Deployment Guide for ReHabit

## 🚀 Deploy to Render

### Step 1: Push to GitHub
Make sure your code is pushed to GitHub with the latest changes.

### Step 2: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Click "Apply" to deploy:
   - PostgreSQL Database
   - Backend API
   - Frontend React App

### Step 3: Service Configuration

**Backend Service (`rehabit-backend`):**
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

**Frontend Service (`rehabit-frontend`):**
- Root Directory: `/` (root)
- Build Command: `npm install && npm run build`
- Start Command: `npx serve -s build -l $PORT`

### Step 4: Environment Variables

**Backend Environment Variables:**
```
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CORS_ORIGIN=https://rehabit-frontend.onrender.com
```

**Frontend Environment Variables:**
```
REACT_APP_API_URL=https://rehabit-backend.onrender.com
```

### Step 5: Test the Deployment

**Backend API URLs:**
- Health check: `https://rehabit-backend.onrender.com/api/health`
- Register: `POST https://rehabit-backend.onrender.com/api/auth/register`
- Login: `POST https://rehabit-backend.onrender.com/api/auth/login`

**Frontend URL:**
- Main app: `https://rehabit-frontend.onrender.com`

## 🧪 Testing Commands

### Test Registration:
```bash
curl -X POST https://rehabit-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "password123"
  }'
```

### Test Login:
```bash
curl -X POST https://rehabit-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🔧 Troubleshooting

If deployment fails:
1. Check the build logs in Render dashboard
2. Ensure all files are committed to GitHub
3. Verify the `render.yaml` is in the root directory
4. Check that both `server/` and root directories have their own `package.json`

## ✅ Benefits of This Setup

- ✅ **No conflicts** between frontend and backend builds
- ✅ **Separate scaling** for each service
- ✅ **Independent deployments** - update one without affecting the other
- ✅ **Proper environment variables** for each service
- ✅ **Clear separation** of concerns 