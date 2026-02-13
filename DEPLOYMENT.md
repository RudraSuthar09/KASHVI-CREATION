# Deployment Checklist for Kashvi Creations

## Pre-Deployment Verification

### Client (Vercel)
- [ ] Build succeeds locally (`npm run build`)
- [ ] No localhost URLs in production build
- [ ] Environment variables prepared:
  - `VITE_BACKEND_URL=https://kashvi-creation-1.onrender.com`
  - `REACT_APP_GOOGLE_MAPS_API_KEY=<your_key>`
  - `VITE_API_URL=<your_gemini_url>`

### Server (Render)
- [ ] Server starts successfully
- [ ] MongoDB connection works
- [ ] Environment variables configured:
  - `NODE_ENV=production`
  - `MONGO_URI=<your_mongodb_uri>`
  - `JWT_SECRET=<your_jwt_secret>`
  - All other required secrets
- [ ] CORS origins include Vercel domain(s):
  - `https://kashvi-creation-e4iv.vercel.app`
  - `https://kashvi-creation.vercel.app`
  - Any other Vercel preview URLs

## Deployment Steps

### 1. Deploy Backend (Render)
1. Ensure latest code is on GitHub
2. Connect GitHub repository to Render
3. Configure build settings:
   - Build Command: `npm install`
   - Start Command: `npm start` or `node server.js`
   - Root Directory: `server`
4. Add all environment variables in Render dashboard
5. Deploy and verify server is running
6. Test a simple API endpoint (e.g., `/api/health` if exists)

### 2. Deploy Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Configure build settings:
   - Framework: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables in Vercel dashboard:
   - `VITE_BACKEND_URL=https://kashvi-creation-1.onrender.com`
   - Add other required variables
4. Deploy and wait for build to complete

### 3. Post-Deployment Testing
- [ ] Visit Vercel URL
- [ ] Open browser DevTools Network tab
- [ ] Test authentication:
  - [ ] Register new user
  - [ ] Login
  - [ ] Check auth (page refresh)
  - [ ] Logout
- [ ] Verify API calls go to Render backend (not localhost)
- [ ] Check for CORS errors in console
- [ ] Test key features:
  - [ ] Product listing
  - [ ] Add to cart
  - [ ] Checkout flow
  - [ ] Contact form
  - [ ] Reviews
- [ ] Verify cookies are set with correct attributes
- [ ] Test on mobile device

## Common Issues & Solutions

### Issue: CORS Error
**Solution:** Add your Vercel domain to CORS origins in `server/server.js`

### Issue: Cookies not being sent
**Solution:** 
- Verify `withCredentials: true` in API calls
- Check cookies have `SameSite=None; Secure` in production
- Ensure both frontend and backend use HTTPS

### Issue: 404 on API calls
**Solution:**
- Verify `VITE_BACKEND_URL` is set correctly in Vercel
- Check backend is running on Render
- Verify API routes are correct

### Issue: Build fails on Vercel
**Solution:**
- Check build logs for errors
- Verify all dependencies are in `package.json`
- Ensure no TypeScript errors if using TS

## Monitoring

After deployment, monitor:
1. **Vercel Dashboard**: Build logs, deployment status
2. **Render Dashboard**: Server logs, health status
3. **Browser Console**: Client-side errors
4. **Network Tab**: API call responses

## Rollback Plan

If deployment fails:
1. Revert to previous Vercel deployment
2. Check Render logs for server errors
3. Verify environment variables
4. Test locally with production env vars
5. Re-deploy after fixing issues

## Security Checklist

- [ ] No secrets in git repository
- [ ] All API keys stored as environment variables
- [ ] HTTPS enabled on both frontend and backend
- [ ] JWT secret is strong and unique
- [ ] Database credentials are secure
- [ ] CORS restricted to known origins
- [ ] Rate limiting configured (if applicable)
