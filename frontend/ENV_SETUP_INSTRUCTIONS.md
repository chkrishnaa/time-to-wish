# Where to Set VITE_API_URL

## 📁 File Locations

### For Local Development

Create a file called `.env.local` in the `frontend/` folder:

**File path:** `frontend/.env.local`

**Content:**
```env
VITE_API_URL=http://localhost:8000
```

This file is automatically used when you run `npm run dev`.

---

### For Production Build (Optional)

Create a file called `.env.production` in the `frontend/` folder:

**File path:** `frontend/.env.production`

**Content:**
```env
VITE_API_URL=https://time-to-wish.onrender.com
```

This file is automatically used when you run `npm run build`.

**Note:** You don't actually need this file because the code automatically uses the Render URL in production mode. But you can create it if you want to be explicit.

---

## 🚀 For Vercel Deployment

### Option 1: Set in Vercel Dashboard (Recommended)

1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Click on **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://time-to-wish.onrender.com`
   - **Environment:** Select all (Production, Preview, Development)
6. Click **Save**

### Option 2: Use Vercel CLI

```bash
vercel env add VITE_API_URL
# Enter: https://time-to-wish.onrender.com
# Select: Production, Preview, Development
```

---

## 📝 Quick Setup Steps

### Step 1: Create `.env.local` for Local Development

```bash
cd frontend
echo "VITE_API_URL=http://localhost:8000" > .env.local
```

### Step 2: Set Environment Variable in Vercel

1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Add `VITE_API_URL` = `https://time-to-wish.onrender.com`

---

## ✅ How It Works

- **Local (`npm run dev`)**: Reads from `.env.local` → Uses `http://localhost:8000`
- **Production Build (`npm run build`)**: 
  - If `VITE_API_URL` is set in Vercel → Uses that
  - If not set → Automatically uses `https://time-to-wish.onrender.com`
- **Vercel Deployment**: Uses environment variable from Vercel dashboard

---

## 🔍 Verify It's Working

After setting up, check the browser console:
- **Development**: Should see `🌐 API Base URL: http://localhost:8000`
- **Production**: Should connect to `https://time-to-wish.onrender.com`

---

## 📌 Important Notes

1. **`.env.local` is gitignored** - It won't be committed to GitHub (this is good!)
2. **Vercel environment variables** are set in the dashboard, not in files
3. **The code has a fallback** - Even if you don't set `VITE_API_URL`, production will use Render URL automatically

