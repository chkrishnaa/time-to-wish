# 🔐 Vercel Environment Variable Setup

## Add This to Vercel Dashboard

### Step-by-Step Instructions:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **TimeToWish** project
3. Click on **Settings** (top menu)
4. Click on **Environment Variables** (left sidebar)
5. Click **Add New** button
6. Fill in the form:

```
Key:   VITE_API_URL
Value: https://time-to-wish.onrender.com
```

7. Select all environments:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

8. Click **Save**

9. **Important:** Go to **Deployments** tab and click **Redeploy** (or wait for next deployment)

---

## 📋 Copy-Paste Format

**Key:**
```
VITE_API_URL
```

**Value:**
```
https://time-to-wish.onrender.com
```

**Environments:** Production, Preview, Development (all three)

---

## ✅ How It Works

- **Local Development** (`npm run dev`): 
  - Uses `.env.local` → `http://localhost:8000`
  
- **Vercel Deployment**:
  - Uses `VITE_API_URL` from Vercel → `https://time-to-wish.onrender.com`

---

## 🧪 Verify It's Working

After adding the environment variable and redeploying:

1. Check your deployed site
2. Open browser console (F12)
3. Try to login
4. Should connect to `https://time-to-wish.onrender.com`

---

## 📝 Notes

- The `.env.local` file is for local development only
- Vercel environment variables override `.env.local` when deployed
- After adding the variable, you must redeploy for it to take effect

