# Frontend Environment Setup

## Local Development

Create a `.env.local` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:8000
```

This file is automatically used when running `npm run dev`.

## Production Build

Create a `.env.production` file in the `frontend/` directory:

```env
VITE_API_URL=https://time-to-wish.onrender.com
```

This file is automatically used when running `npm run build`.

## For Vercel Deployment

Set the environment variable in Vercel Dashboard:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://time-to-wish.onrender.com`
   - **Environment**: Production, Preview, Development (select all)

## How It Works

- **Development** (`npm run dev`): Uses `.env.local` → connects to `http://localhost:8000`
- **Production** (`npm run build`): Uses `.env.production` → connects to `https://time-to-wish.onrender.com`
- **Vercel**: Uses environment variables set in dashboard → connects to Render server

The API URL is automatically selected based on the environment!

