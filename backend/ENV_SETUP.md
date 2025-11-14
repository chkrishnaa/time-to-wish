# Backend Environment Setup

## Create `.env` file

Create a `.env` file in the `backend/` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
PORT=8000
```

## For Render Deployment

Set these environment variables in the Render Dashboard:

1. Go to your Render service dashboard
2. Navigate to **Environment** tab
3. Add the following environment variables:
   - `MONGO_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - A random secret string for JWT signing
   - `PORT` - Will be automatically set by Render (you can omit this)

## MongoDB Atlas Setup

### Fix Connection Error

If you see "Could not connect to any servers in your MongoDB Atlas cluster":

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click on **Network Access** (under Security)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere**
5. Enter `0.0.0.0/0` and click **Confirm**

This allows your Render deployment to connect to MongoDB Atlas.

