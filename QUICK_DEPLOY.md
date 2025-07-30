# Quick Deployment Guide for ReHabit

## 🚀 Deploy to Render

### Step 1: Push to GitHub
Make sure your code is pushed to GitHub with the latest changes.

### Step 2: Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Click "Apply" to deploy both the database and backend

### Step 3: Configure Environment Variables
After deployment, update these in your Render dashboard:

- `CORS_ORIGIN`: Set to your frontend domain (or `http://localhost:3000` for local testing)
- `JWT_SECRET`: Should be auto-generated, but you can set a custom one

### Step 4: Test the API
Your API will be available at: `https://rehabit-backend.onrender.com`

Test endpoints:
- Health check: `GET https://rehabit-backend.onrender.com/api/health`
- Register: `POST https://rehabit-backend.onrender.com/api/auth/register`
- Login: `POST https://rehabit-backend.onrender.com/api/auth/login`

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
4. Check that the `server` folder exists and contains `package.json`

## 📝 Next Steps

After successful deployment:
1. Update your frontend to use the new API URL
2. Deploy your frontend to a hosting service
3. Update the `CORS_ORIGIN` to match your frontend domain 