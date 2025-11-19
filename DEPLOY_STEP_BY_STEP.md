# 🚀 Step-by-Step Deployment Guide

## Complete walkthrough with exact clicks and screenshots descriptions

---

## Part 1: MongoDB Atlas Setup (5 minutes)

### Step 1.1: Create MongoDB Account
1. Open browser and go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** (green button, top right)
3. Sign up with:
   - Email address
   - Password
   - Or use "Sign up with Google"
4. Click **"Create your Atlas account"**

### Step 1.2: Create Free Cluster
1. After login, you'll see "Deploy a cloud database"
2. Select **"M0 FREE"** (should be selected by default)
   - Provider: AWS (or any)
   - Region: Choose closest to you
3. Cluster Name: Keep default or name it `neighbourscare`
4. Click **"Create Deployment"** (bottom right)
5. Wait 1-3 minutes for cluster to be created

### Step 1.3: Create Database User
1. You'll see "Security Quickstart" popup
2. Under "How would you like to authenticate?":
   - Select **"Username and Password"**
   - Username: `neighbourcare_user` (or your choice)
   - Password: Click **"Autogenerate Secure Password"** 
   - **IMPORTANT:** Copy and save this password somewhere safe!
3. Click **"Create User"**

### Step 1.4: Add IP Whitelist
1. Still in "Security Quickstart" popup
2. Under "Where would you like to connect from?":
   - Click **"My Local Environment"**
   - Click **"Add My Current IP Address"**
   - OR for easier testing: Enter `0.0.0.0/0` and description "Allow All" (not recommended for production)
3. Click **"Add Entry"**
4. Click **"Finish and Close"**

### Step 1.5: Get Connection String
1. Click **"Database"** in left sidebar
2. Find your cluster (should see "Cluster0" or your name)
3. Click **"Connect"** button
4. Click **"Drivers"**
5. Select:
   - Driver: **Node.js**
   - Version: **5.5 or later**
6. Copy the connection string (looks like):
   ```
   mongodb+srv://neighbourcare_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. Replace `<password>` with your actual password from Step 1.3
8. Add database name at the end before `?`:
   ```
   mongodb+srv://neighbourcare_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/neighbourscare?retryWrites=true&w=majority
   ```
9. **Save this connection string** - you'll need it for Render

---

## Part 2: Deploy Backend to Render (7 minutes)

### Step 2.1: Create Render Account
1. Go to: **https://render.com**
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with GitHub:
   - Click **"GitHub"** button
   - Authorize Render to access your GitHub
   - Select repositories: Choose **"Only select repositories"**
   - Select: `neighbourscare`
   - Click **"Install"**

### Step 2.2: Create Web Service
1. After login, you'll be on Render Dashboard
2. Click **"New +"** (top right)
3. Select **"Web Service"**
4. You'll see "Create a new Web Service" page
5. Find your `neighbourscare` repository in the list
6. Click **"Connect"** button next to it

### Step 2.3: Configure Web Service
Fill in these fields:

**Name:**
```
neighbourscare-backend
```

**Region:**
```
Oregon (US West) - or closest to you
```

**Branch:**
```
main
```

**Root Directory:**
```
backend
```

**Runtime:**
```
Node
```

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Instance Type:**
```
Free
```

### Step 2.4: Add Environment Variables
Scroll down to **"Environment Variables"** section

Click **"Add Environment Variable"** for each of these:

1. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`

2. **PORT**
   - Key: `PORT`
   - Value: `10000`

3. **MONGODB_URI**
   - Key: `MONGODB_URI`
   - Value: `[Paste your MongoDB connection string from Part 1, Step 1.5]`
   - Example: `mongodb+srv://neighbourcare_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/neighbourscare?retryWrites=true&w=majority`

4. **JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: Generate a random secret by running this in PowerShell:
     ```powershell
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - Paste the output (will be like: `3f5a8b2c9d1e4f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a`)

5. **JWT_EXPIRE**
   - Key: `JWT_EXPIRE`
   - Value: `7d`

6. **EMAIL_HOST**
   - Key: `EMAIL_HOST`
   - Value: `smtp.gmail.com` (or your SMTP host)

7. **EMAIL_PORT**
   - Key: `EMAIL_PORT`
   - Value: `587`

8. **EMAIL_USER**
   - Key: `EMAIL_USER`
   - Value: `your-email@gmail.com`

9. **EMAIL_PASSWORD**
   - Key: `EMAIL_PASSWORD`
   - Value: Your Gmail App Password (see below for how to get it)

10. **EMAIL_FROM**
    - Key: `EMAIL_FROM`
    - Value: `NeighboursCare <your-email@gmail.com>`

11. **CLIENT_URL** (temporary - we'll update this after frontend deploy)
    - Key: `CLIENT_URL`
    - Value: `http://localhost:3000`

12. **CORS_ORIGIN** (temporary - we'll update this after frontend deploy)
    - Key: `CORS_ORIGIN`
    - Value: `http://localhost:3000`

### Step 2.5: Get Gmail App Password (for EMAIL_PASSWORD)

**IMPORTANT:** Don't use your regular Gmail password!

1. Go to: **https://myaccount.google.com/apppasswords**
2. You may need to enable 2-Factor Authentication first if not already enabled
3. Click **"Select app"** → Choose **"Other (Custom name)"**
4. Type: `NeighboursCare`
5. Click **"Generate"**
6. Copy the 16-character password shown (no spaces)
7. Use this in EMAIL_PASSWORD variable

### Step 2.6: Deploy Backend
1. After adding all environment variables
2. Scroll to bottom
3. Click **"Create Web Service"** (blue button)
4. Wait 5-10 minutes for first deploy
5. Watch the logs - you should see:
   ```
   Server running in production mode on port 10000
   MongoDB connection: mongodb+srv://...
   ```
6. **IMPORTANT:** Copy your backend URL from the top of the page
   - Will look like: `https://neighbourscare-backend.onrender.com`
   - **Save this URL** - you'll need it for Vercel

### Step 2.7: Test Backend
1. Click on the URL or open in new tab: `https://YOUR-BACKEND-URL.onrender.com/api/health`
2. You should see:
   ```json
   {
     "success": true,
     "message": "Server is running",
     "timestamp": "2025-11-19T...",
     "environment": "production"
   }
   ```
3. If you see this, backend is working! ✅

---

## Part 3: Deploy Frontend to Vercel (5 minutes)

### Step 3.1: Create Vercel Account
1. Go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel
5. You'll be redirected to Vercel Dashboard

### Step 3.2: Import Project
1. On Vercel Dashboard, click **"Add New..."** (top right)
2. Select **"Project"**
3. You'll see "Import Git Repository"
4. Find `neighbourscare` in the list
5. Click **"Import"** button next to it

### Step 3.3: Configure Project
You'll see "Configure Project" page

**Project Name:**
```
neighbourscare
```
(or keep auto-generated name)

**Framework Preset:**
```
Vite
```
(should auto-detect)

**Root Directory:**
- Click **"Edit"** next to Root Directory
- Enter: `frontend`
- Click **"Continue"**

**Build and Output Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `dist` (auto-filled)
- Install Command: `npm install` (auto-filled)

### Step 3.4: Add Environment Variables
Click **"Environment Variables"** dropdown to expand

Add these two variables:

1. **VITE_API_URL**
   - Key: `VITE_API_URL`
   - Value: `https://YOUR-BACKEND-URL.onrender.com`
   - Use your backend URL from Part 2, Step 2.6
   - Example: `https://neighbourscare-backend.onrender.com`
   - **DO NOT add trailing slash**

2. **VITE_SOCKET_URL**
   - Key: `VITE_SOCKET_URL`
   - Value: `https://YOUR-BACKEND-URL.onrender.com`
   - Use the same URL as above

### Step 3.5: Deploy Frontend
1. After adding environment variables
2. Click **"Deploy"** (blue button)
3. Wait 3-5 minutes for deployment
4. You'll see build logs
5. When done, you'll see confetti 🎉 and "Congratulations!"
6. Click **"Continue to Dashboard"**
7. **IMPORTANT:** Copy your frontend URL from the top
   - Will look like: `https://neighbourscare.vercel.app`
   - Or custom domain if you set one

### Step 3.6: Test Frontend
1. Click **"Visit"** or open the URL
2. You should see the NeighboursCare login page
3. Try to register/login - it should work!

---

## Part 4: Update Backend CORS (2 minutes)

Now we need to tell the backend about the frontend URL

### Step 4.1: Update Render Environment Variables
1. Go back to Render Dashboard: **https://dashboard.render.com**
2. Click on your **neighbourscare-backend** service
3. Click **"Environment"** in left sidebar
4. Find **CLIENT_URL** variable
5. Click **"Edit"** (pencil icon)
6. Change value from `http://localhost:3000` to your Vercel URL
   - Example: `https://neighbourscare.vercel.app`
   - **DO NOT add trailing slash**
7. Click **"Save Changes"**

8. Find **CORS_ORIGIN** variable
9. Click **"Edit"**
10. Change value to same Vercel URL
    - Example: `https://neighbourscare.vercel.app`
11. Click **"Save Changes"**

### Step 4.2: Wait for Redeploy
1. Render will automatically redeploy with new environment variables
2. Wait 2-3 minutes
3. Check logs to see "Deploy succeeded"

---

## Part 5: Final Testing (3 minutes)

### Step 5.1: Test Complete Flow
1. Open your frontend URL: `https://YOUR-APP.vercel.app`

2. **Test Registration:**
   - Click "Sign up"
   - Fill in name, email, password
   - Select role (User/Volunteer/Admin)
   - Click "Get Location" to auto-fill location
   - Click "Create Account"
   - Should redirect to dashboard ✅

3. **Test Login:**
   - Click "Sign in"
   - Enter email and password
   - Click "Sign in"
   - Should redirect to dashboard ✅

4. **Test Create Incident (as User):**
   - Click "Report Emergency"
   - Fill in title, description, priority
   - Click "Get Location"
   - Click "Report Emergency"
   - Should see success message ✅

5. **Test Map:**
   - Click "Show Map"
   - Map should load with your location
   - Should see incident markers ✅

6. **Test Real-time Updates:**
   - Open app in two browser windows
   - Create incident in one window
   - Should appear in other window automatically ✅

### Step 5.2: Check Backend Health
1. Visit: `https://YOUR-BACKEND.onrender.com/api/health`
2. Should return:
   ```json
   {
     "success": true,
     "message": "Server is running",
     "timestamp": "...",
     "environment": "production"
   }
   ```

---

## 🎉 Deployment Complete!

Your NeighboursCare platform is now live!

**Your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.onrender.com`

---

## 📱 Optional: Add Custom Domain

### For Vercel (Frontend):
1. Vercel Dashboard → Select project
2. Click **"Settings"** → **"Domains"**
3. Click **"Add"**
4. Enter your domain (e.g., `neighbourscare.com`)
5. Follow DNS configuration instructions
6. Update backend CORS_ORIGIN with new domain

### For Render (Backend):
1. Render Dashboard → Select service
2. Click **"Settings"** → **"Custom Domain"**
3. Enter your API subdomain (e.g., `api.neighbourscare.com`)
4. Follow DNS configuration instructions

---

## 🐛 Troubleshooting

### Backend won't start?
**Check Render logs:**
1. Render Dashboard → Your service
2. Click **"Logs"** tab
3. Look for errors:
   - MongoDB connection failed? Check MONGODB_URI is correct
   - Missing environment variable? Add it in Environment section

### Frontend can't connect to backend?
**Check browser console (F12):**
1. Open frontend URL
2. Press F12 → Console tab
3. Look for errors:
   - CORS error? Update backend CORS_ORIGIN to match frontend URL exactly
   - 404 errors? Check VITE_API_URL is correct
   - Connection refused? Check backend is running on Render

### Map not loading?
1. Check browser console for errors
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check internet connection
4. Verify Leaflet CSS is loading

### Emails not sending?
1. Check EMAIL_PASSWORD is Gmail App Password, not regular password
2. Verify Gmail 2FA is enabled
3. Check Render logs for email errors
4. Test with a different email service (SendGrid, etc.)

### Real-time updates not working?
1. Check browser Network tab → WS (WebSocket)
2. Should see connection to backend with Socket.IO
3. Check VITE_SOCKET_URL matches backend URL
4. Verify backend allows WebSocket connections (CORS)

---

## 💰 Cost Summary

**Current Setup (FREE):**
- MongoDB Atlas: Free (M0 - 512MB)
- Render: Free (750 hours/month, sleeps after 15 min inactivity)
- Vercel: Free (100GB bandwidth, unlimited deployments)
- **Total: $0/month**

**Note:** Render free tier sleeps after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.

---

## 🔄 Updating Your Deployment

### Update Code:
```bash
# Make changes to your code
git add .
git commit -m "Your changes"
git push origin main
```

Both Render and Vercel will **automatically redeploy** when you push to GitHub!

### Update Environment Variables:
- **Render:** Dashboard → Service → Environment → Edit
- **Vercel:** Dashboard → Project → Settings → Environment Variables

After updating, redeploy manually or wait for next git push.

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas Docs:** https://docs.atlas.mongodb.com/
- **Your Deployment Guides:** See `DEPLOYMENT.md` and `QUICKSTART.md` in repo

---

**🎊 Congratulations! You've successfully deployed NeighboursCare!**

Share your app URL with your community and start helping people in need! 🚑
