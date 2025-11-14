# Deployment Guide

## Environment Configuration

### Frontend Environment Variables

The frontend uses Vite environment variables. Create the following files:

#### For Local Development (`frontend/.env.local`):
```env
VITE_API_URL=http://localhost:8000
```

#### For Production Build (`frontend/.env.production`):
```env
VITE_API_URL=https://time-to-wish.onrender.com
```

**Note:** `.env.local` is automatically used in development mode, and `.env.production` is used when building for production.

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
PORT=8000
```

## Render Deployment Setup

### Backend Deployment on Render

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**: `chkrishnaa/time-to-wish`
3. **Build Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

4. **Environment Variables** (Set in Render Dashboard):
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   ```

### Frontend Deployment on Vercel

1. **Connect your GitHub repository** to Vercel
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables** (Set in Vercel Dashboard):
   ```
   VITE_API_URL=https://time-to-wish.onrender.com
   ```

## MongoDB Atlas Configuration

### Fixing MongoDB Connection Error on Render

The error "Could not connect to any servers in your MongoDB Atlas cluster" occurs because Render's IP addresses are not whitelisted in MongoDB Atlas.

#### Solution: Whitelist All IPs (Recommended for Cloud Deployments)

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Navigate to **Network Access** (under Security)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere**
5. Enter `0.0.0.0/0` in the IP Address field
6. Click **Confirm**

**Note:** This allows access from any IP address. For production, you can restrict this to specific IP ranges if needed.

#### Alternative: Whitelist Specific Render IPs

If you prefer not to allow all IPs, you can:
1. Check Render's documentation for their IP ranges
2. Add those specific IP ranges to MongoDB Atlas Network Access

### Verify MongoDB Connection String

Make sure your `MONGO_URI` in Render environment variables:
- Includes your database username and password
- Has the correct cluster name
- Uses the correct connection string format:
  ```
  mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
  ```

## Local Development Setup

### Backend
1. Navigate to `backend/` directory
2. Create `.env` file with your local MongoDB connection string
3. Run `npm install`
4. Run `npm run dev` (or `npm start`)

### Frontend
1. Navigate to `frontend/` directory
2. Create `.env.local` file with `VITE_API_URL=http://localhost:8000`
3. Run `npm install`
4. Run `npm run dev`

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Verify `MONGO_URI` is set correctly in Render environment variables
- Check MongoDB Atlas Network Access settings
- Ensure MongoDB Atlas cluster is running

**Port Issues:**
- Render automatically sets `PORT` environment variable
- Your code should use `process.env.PORT || 8000`

### Frontend Issues

**API Connection Error:**
- Verify `VITE_API_URL` is set correctly in Vercel environment variables
- Check that the backend URL is accessible (https://time-to-wish.onrender.com)
- Ensure CORS is properly configured in the backend

**Build Errors:**
- Make sure all environment variables are set in Vercel
- Check that `VITE_API_URL` is prefixed with `VITE_` (required for Vite)

## Environment Variable Reference

### Frontend (Vite)
- `VITE_API_URL` - Backend API URL

### Backend
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `PORT` - Server port (optional, defaults to 8000)

