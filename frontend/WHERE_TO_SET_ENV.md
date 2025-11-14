# 📍 Where to Set VITE_API_URL

## ✅ I've Created These Files For You:

### 1. `.env.local` (Local Development)
**Location:** `frontend/.env.local`
**Content:**
```
VITE_API_URL=http://localhost:8000
```
**Used when:** Running `npm run dev` locally

### 2. `.env.production` (Production Build)
**Location:** `frontend/.env.production`
**Content:**
```
VITE_API_URL=https://time-to-wish.onrender.com
```
**Used when:** Running `npm run build`

---

## 🚀 For Vercel Deployment

You need to set the environment variable in **Vercel Dashboard**:

### Steps:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://time-to-wish.onrender.com`
   - **Environment:** Select all (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your project

---

## 📂 File Structure

```
frontend/
├── .env.local          ← For local development (localhost)
├── .env.production     ← For production build (Render URL)
└── src/
    └── utils/
        └── apiPaths.js ← Uses the env variables
```

---

## 🔍 How It Works

1. **Local Development** (`npm run dev`):
   - Reads `.env.local`
   - Uses: `http://localhost:8000`

2. **Production Build** (`npm run build`):
   - First checks Vercel environment variables
   - If not set, reads `.env.production`
   - If neither, automatically uses: `https://time-to-wish.onrender.com`

3. **Vercel Deployment**:
   - Uses environment variable from Vercel dashboard
   - If not set, uses the automatic Render URL

---

## ✅ Summary

- ✅ **Local files created:** `.env.local` and `.env.production`
- ⚠️ **Vercel:** You need to set `VITE_API_URL` in Vercel Dashboard
- ✅ **Code has fallback:** Will use Render URL automatically if nothing is set

---

## 🧪 Test It

After setting up:

1. **Local:** Run `npm run dev` → Should use `http://localhost:8000`
2. **Production:** Deploy to Vercel → Should use `https://time-to-wish.onrender.com`

Check browser console to see which URL is being used!

