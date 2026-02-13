# Vercel Deployment Setup Guide

## ⚠️ IMPORTANT: Environment Variables MUST Be Set

If you see `localhost:5000` errors in the Vercel deployment console, it means the environment variable is **NOT SET**.

## Step-by-Step Vercel Setup

### Step 1: Access Vercel Project Settings

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `kashvi-creation`
3. Click on **Settings** tab

### Step 2: Add Environment Variables

1. In Settings, click on **Environment Variables** (left sidebar)
2. Add the following variables:

#### Required Variables:

**Variable 1: Backend URL**
```
Name: VITE_BACKEND_URL
Value: https://kashvi-creation-1.onrender.com
Environment: Production, Preview, Development (select all)
```

**Variable 2: Google Maps API Key** (if you have one)
```
Name: REACT_APP_GOOGLE_MAPS_API_KEY
Value: YOUR_GOOGLE_MAPS_API_KEY
Environment: Production, Preview, Development
```

**Variable 3: Gemini API URL** (if you have one)
```
Name: VITE_API_URL
Value: YOUR_GEMINI_API_URL
Environment: Production, Preview, Development
```

### Step 3: Redeploy

**CRITICAL**: After adding environment variables, you MUST redeploy!

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the three dots (⋯) menu
4. Select **Redeploy**
5. Check "Use existing Build Cache" is **UNCHECKED** (to ensure fresh build with new env vars)
6. Click **Redeploy**

### Step 4: Verify Deployment

Once the deployment is complete:

1. Visit your Vercel URL: `https://kashvi-creation-e4iv.vercel.app`
2. Open **Browser DevTools** (F12)
3. Go to **Console** tab
4. Look for this message:
   ```
   🔧 API Configuration: {
     mode: 'production',
     baseURL: 'https://kashvi-creation-1.onrender.com',
     backendConfigured: true
   }
   ```

5. Go to **Network** tab
6. Verify API requests go to `https://kashvi-creation-1.onrender.com/api/...`
7. NOT to `localhost:5000` or `/api/...` (relative)

## Troubleshooting

### ❌ Still seeing `localhost:5000` errors?

**Problem:** Environment variable not set correctly

**Solutions:**
1. Double-check the variable name is exactly `VITE_BACKEND_URL` (case-sensitive)
2. Ensure the value is `https://kashvi-creation-1.onrender.com` (no trailing slash)
3. Make sure you selected "Production" environment
4. **REDEPLOY** after setting variables (very important!)
5. Clear your browser cache and try again

### ❌ Seeing 404 errors on `/api/...` endpoints?

**Problem:** Backend URL not being used, requests hitting Vercel instead

**This means:** Environment variable is not set

**Solution:** Follow Steps 1-3 above to set `VITE_BACKEND_URL`

### ❌ Seeing CORS errors?

**Problem:** Backend CORS configuration

**Solution:** 
1. Check server CORS settings include your Vercel domain
2. Current allowed origins in `server/server.js`:
   - `https://kashvi-creation-e4iv.vercel.app`
   - `https://kashvi-creation.vercel.app`
   - `https://kashvi-creation-rudrasuthar09.vercel.app`
3. If using a different Vercel URL, add it to the CORS origins

### ✅ Seeing this in console?

```
⚠️ CONFIGURATION ERROR: VITE_BACKEND_URL is not set!
```

This confirms the environment variable is missing. Follow Steps 1-3 above.

## Quick Verification Checklist

- [ ] Logged into Vercel Dashboard
- [ ] Selected correct project
- [ ] Opened Settings → Environment Variables
- [ ] Added `VITE_BACKEND_URL` with value `https://kashvi-creation-1.onrender.com`
- [ ] Selected "Production" environment (and Preview/Development if needed)
- [ ] Saved the variable
- [ ] Triggered a REDEPLOY (not just a new commit)
- [ ] Waited for deployment to complete
- [ ] Opened Vercel URL in browser
- [ ] Checked console for API configuration message
- [ ] Verified network requests go to Render backend
- [ ] No `localhost:5000` errors in console

## Screenshots Guide

### Where to Add Environment Variables:

1. **Vercel Dashboard → Project → Settings**
   ![Settings Tab Location]

2. **Settings → Environment Variables**
   ![Environment Variables Section]

3. **Add New Variable**
   - Name: `VITE_BACKEND_URL`
   - Value: `https://kashvi-creation-1.onrender.com`
   - Environment: Check all boxes (Production, Preview, Development)

4. **After Adding → Click Save**

5. **Then → Redeploy**
   - Go to Deployments tab
   - Find latest deployment
   - Three dots menu → Redeploy
   - Uncheck "Use existing Build Cache"

## Expected Console Output After Fix

```
🔧 API Configuration: {
  mode: 'production',
  baseURL: 'https://kashvi-creation-1.onrender.com',
  backendConfigured: true
}
```

## Expected Network Requests After Fix

All API requests should show:
- `https://kashvi-creation-1.onrender.com/api/auth/check-auth`
- `https://kashvi-creation-1.onrender.com/api/shop/products/get`
- `https://kashvi-creation-1.onrender.com/api/shop/review/top-reviews`
- etc.

**NOT:**
- ❌ `localhost:5000/api/...`
- ❌ `https://kashvi-creation-e4iv.vercel.app/api/...`

## Common Mistakes to Avoid

1. ❌ **Forgetting to redeploy** - Environment variables only take effect on new builds
2. ❌ **Typo in variable name** - Must be exactly `VITE_BACKEND_URL`
3. ❌ **Wrong environment selected** - Make sure "Production" is checked
4. ❌ **Not clearing browser cache** - Old cached code may still run
5. ❌ **Adding trailing slash** - Use `https://kashvi-creation-1.onrender.com` not `...com/`

## Need Help?

If you've followed all steps and still have issues:

1. Check browser console for the API configuration message
2. Check Network tab for actual request URLs
3. Verify the environment variable is showing in Vercel Settings
4. Try a hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
5. Try in incognito/private browsing mode to rule out cache issues

## Summary

The fix requires **TWO actions**:
1. ✅ Code changes (already done in this PR)
2. ❌ **Set environment variable on Vercel** ← YOU MUST DO THIS!

Without step 2, the application cannot work on Vercel.
