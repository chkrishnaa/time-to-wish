# Quick Start Guide

## 🚀 Render Deployment Fix

### Step 1: Fix MongoDB Atlas Connection

The deployment is failing because MongoDB Atlas needs to allow connections from Render.

**Fix this in 2 minutes:**

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Click **Network Access** (left sidebar, under Security)
3. Click **Add IP Address** button
4. Click **Allow Access from Anywhere** button
5. This will automatically add `0.0.0.0/0` - click **Confirm**

✅ This allows your Render backend to connect to MongoDB.

### Step 2: Set Environment Variables on Render

1. Go to your Render service dashboard
2. Click **Environment** tab
3. Add these environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_random_secret_string_here
```

**Note:** `PORT` is automatically set by Render, you don't need to add it.

### Step 3: Redeploy

After setting environment variables, Render will automatically redeploy. Your backend should now connect successfully!

---

## 💻 Local Development Setup

### Backend

1. Navigate to `backend/` folder
2. Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```
3. Run: `npm install && npm run dev`

### Frontend

1. Navigate to `frontend/` folder
2. Create `.env.local` file:
```env
VITE_API_URL=http://localhost:8000
```
3. Run: `npm install && npm run dev`

---

## 📦 Production Deployment

### Frontend (Vercel)

1. Set environment variable in Vercel:
   - Name: `VITE_API_URL`
   - Value: `https://time-to-wish.onrender.com`

2. Deploy - Vercel will automatically use the production API URL!

---

## ✅ How It Works

- **Local Development**: Frontend connects to `http://localhost:8000` (from `.env.local`)
- **Production**: Frontend connects to `https://time-to-wish.onrender.com` (from Vercel env vars or `.env.production`)

The code automatically switches based on the environment! 🎉

