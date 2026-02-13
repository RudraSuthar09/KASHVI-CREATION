# URGENT: Fix Vercel Deployment - Environment Variable Missing!

## 🚨 The Problem You're Experiencing

Your Vercel deployment shows these errors:
```
localhost:5000/api/auth/check-auth:1  Failed to load resource: net::ERR_CONNECTION_REFUSED
localhost:5000/api/shop/products/get:1  Failed to load resource: net::ERR_CONNECTION_REFUSED
/api/shop/review/top-reviews:1  Failed to load resource: 404
```

## ✅ The Solution (5 Minutes)

**You MUST set the environment variable on Vercel!** The code changes are complete, but Vercel doesn't know where your backend is.

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Find and click on your project: `kashvi-creation` or `KASHVI-CREATION`

### Step 2: Open Settings
1. Click the **Settings** tab at the top
2. Click **Environment Variables** in the left sidebar

### Step 3: Add This Variable

Click **"Add New"** and enter:

```
Name (exactly as shown):
VITE_BACKEND_URL

Value (exactly as shown):
https://kashvi-creation-1.onrender.com

Environment:
☑️ Production
☑️ Preview  
☑️ Development
```

Click **Save**

### Step 4: Redeploy (CRITICAL!)

⚠️ **The variable won't work until you redeploy!**

1. Click **Deployments** tab
2. Find your latest deployment at the top
3. Click the **⋯** (three dots) button on the right
4. Click **Redeploy**
5. **UNCHECK** "Use existing Build Cache"
6. Click **Redeploy** button

### Step 5: Wait and Verify

1. Wait for deployment to complete (1-2 minutes)
2. Open your site: https://kashvi-creation-e4iv.vercel.app
3. Press F12 to open DevTools
4. Look at Console tab - you should see:
   ```
   🔧 API Configuration: {
     mode: 'production',
     baseURL: 'https://kashvi-creation-1.onrender.com',
     backendConfigured: true
   }
   ```
5. Go to Network tab and refresh the page
6. You should see requests going to `kashvi-creation-1.onrender.com`
7. NOT to `localhost:5000`

## 🎯 Quick Checklist

- [ ] Opened Vercel Dashboard
- [ ] Selected your project
- [ ] Went to Settings → Environment Variables
- [ ] Added `VITE_BACKEND_URL` = `https://kashvi-creation-1.onrender.com`
- [ ] Checked "Production" box
- [ ] Clicked Save
- [ ] Went to Deployments tab
- [ ] Clicked Redeploy (not just push new code!)
- [ ] Unchecked "Use existing Build Cache"
- [ ] Clicked Redeploy button
- [ ] Waited for green checkmark
- [ ] Opened site and checked console
- [ ] Verified requests go to Render, not localhost

## ❓ Common Questions

**Q: Why didn't the code changes fix it?**
A: The code is fixed! But Vercel needs to know the backend URL. Environment variables tell Vercel configuration at runtime.

**Q: I pushed new code, isn't that enough?**
A: No! You must:
   1. Add the environment variable (one time)
   2. Redeploy (every time you change env vars)

**Q: Can I just commit the .env file?**
A: No! Never commit .env files with secrets. Use Vercel's environment variable settings.

**Q: What if I see a different Vercel URL?**
A: The env variable works for all your Vercel URLs (main, preview, etc.)

## 🆘 Still Not Working?

1. **Check the variable name** - Must be exactly `VITE_BACKEND_URL` (all caps, with underscores)
2. **Check the value** - Must be `https://kashvi-creation-1.onrender.com` (no trailing slash)
3. **Make sure you redeployed** - Environment variables don't auto-update running deployments
4. **Clear browser cache** - Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
5. **Check console** - Look for the "🔧 API Configuration" message

## 📸 What You Should See After Fix

### In Console (F12):
```
🔧 API Configuration: {
  mode: 'production',
  baseURL: 'https://kashvi-creation-1.onrender.com',
  backendConfigured: true
}
```

### In Network Tab:
All requests should show:
- ✅ `kashvi-creation-1.onrender.com/api/auth/check-auth`
- ✅ `kashvi-creation-1.onrender.com/api/shop/products/get`
- ✅ `kashvi-creation-1.onrender.com/api/shop/review/top-reviews`

NOT:
- ❌ `localhost:5000/api/...`
- ❌ Just `/api/...`

---

**Remember:** Code is ready ✅ | Environment variable needed ❌ | Must redeploy ⚠️
