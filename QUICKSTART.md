# 🚀 Quick Deployment Guide

## ⚡ Fast Track (15 minutes)

### Step 1: Prepare MongoDB (5 min)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) → Sign up (free)
2. Create New Cluster (free tier) → Wait 3-5 minutes
3. Security → Database Access → Add User (remember username/password)
4. Security → Network Access → Add IP Address → Allow from Anywhere (0.0.0.0/0)
5. Databases → Connect → Connect your application → Copy connection string
   - Example: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/neighbourscare`

### Step 2: Deploy Backend to Render (5 min)
1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Deploy ready"
   git push origin main
   ```

2. Go to [Render](https://dashboard.render.com) → Sign in with GitHub

3. New → Web Service → Connect your repository → Configure:
   - **Name**: `neighbourscare-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables** (click Advanced):
   ```
   NODE_ENV=production
   MONGODB_URI=<paste-your-mongodb-connection-string>
   JWT_SECRET=super-secret-key-change-this-to-random-32-chars
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   EMAIL_FROM=NeighboursCare <your-email@gmail.com>
   CLIENT_URL=https://your-app.vercel.app
   CORS_ORIGIN=https://your-app.vercel.app
   ```
   *Note: Get Gmail App Password from [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)*

5. Click **Create Web Service** → Wait 5-10 min → Copy your backend URL

### Step 3: Deploy Frontend to Vercel (5 min)
1. Go to [Vercel](https://vercel.com) → Sign in with GitHub

2. New Project → Import your repository → Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   VITE_SOCKET_URL=https://your-backend-url.onrender.com
   ```
   *Paste your Render backend URL from Step 2*

4. Click **Deploy** → Wait 3-5 min → Copy your frontend URL

5. **Go back to Render** → Update backend environment variables:
   - Update `CLIENT_URL` and `CORS_ORIGIN` with your Vercel URL
   - Click **Save** (will auto-redeploy)

### Step 4: Test! 🎉
Visit your Vercel URL and:
- ✅ Register a new account
- ✅ Create an incident
- ✅ Check real-time updates
- ✅ Test the map

---

## 🔧 Environment Variables Quick Reference

### Backend (Render)
```env
NODE_ENV=production
MONGODB_URI=<from-mongodb-atlas>
JWT_SECRET=<random-32-char-string>
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your-gmail>
EMAIL_PASSWORD=<gmail-app-password>
EMAIL_FROM=NeighboursCare <your-gmail>
CLIENT_URL=<your-vercel-url>
CORS_ORIGIN=<your-vercel-url>
```

### Frontend (Vercel)
```env
VITE_API_URL=<your-render-backend-url>
VITE_SOCKET_URL=<your-render-backend-url>
```

---

## 🐛 Common Issues

**Backend won't start?**
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

**Can't connect to database?**
- MongoDB Atlas → Network Access → Make sure 0.0.0.0/0 is whitelisted
- Check connection string has correct password

**Frontend can't reach backend?**
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Look at browser console (F12) for errors

**Map not loading?**
- Check internet connection
- Clear browser cache
- Verify Leaflet CSS is loading

---

## 💰 Costs

Everything is **FREE** for development:
- ✅ MongoDB Atlas: Free 512MB
- ✅ Render: Free tier (sleeps after 15min inactive)
- ✅ Vercel: Free 100GB bandwidth

**First request may take 30-60 seconds** (Render wakes up from sleep)

---

## 📚 Need More Help?

Read the full guide: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## ✨ You're Done!

**Your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.onrender.com`

Share with your community and start saving lives! 🚑
