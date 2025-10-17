# 🚀 Deployment Guide for NeighboursCare

This guide will help you deploy the NeighboursCare platform to production.

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **MongoDB Atlas Account** - For database hosting (free tier available)
3. **Email Service** - Gmail or any SMTP service for sending emails
4. **Render Account** - For backend deployment (free tier available)
5. **Vercel or Netlify Account** - For frontend deployment (free tier available)

---

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and create a new cluster
3. Click "Connect" and choose "Connect your application"
4. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
5. Replace `<password>` with your actual password
6. Save this connection string - you'll need it for environment variables

---

## 🔧 Step 2: Configure Email Service

### Option A: Using Gmail
1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Save the app password

### Option B: Using SendGrid or other SMTP
1. Sign up for the service
2. Get your SMTP credentials

---

## 🖥️ Step 3: Deploy Backend to Render

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [Render Dashboard](https://dashboard.render.com/)**

3. **Create a new Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `neighbourscare` repository

4. **Configure the service:**
   - **Name**: `neighbourscare-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-a-random-long-string>
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=<your-email@gmail.com>
   EMAIL_PASSWORD=<your-app-password>
   EMAIL_FROM=NeighboursCare <your-email@gmail.com>
   CLIENT_URL=<will-be-frontend-url-from-step-4>
   ```

6. **Click "Create Web Service"**
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://neighbourscare-backend.onrender.com`)

---

## 🌐 Step 4: Deploy Frontend to Vercel (Recommended)

### Option A: Vercel Deployment

1. **Go to [Vercel](https://vercel.com/)**

2. **Import your GitHub repository**
   - Click "Add New" → "Project"
   - Import your `neighbourscare` repository

3. **Configure the project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables:**
   ```
   VITE_API_URL=<your-backend-url-from-step-3>
   VITE_SOCKET_URL=<your-backend-url-from-step-3>
   ```
   Example:
   ```
   VITE_API_URL=https://neighbourscare-backend.onrender.com
   VITE_SOCKET_URL=https://neighbourscare-backend.onrender.com
   ```

5. **Click "Deploy"**
   - Wait for deployment (3-5 minutes)
   - You'll get a URL like `https://neighbourscare.vercel.app`

6. **Update Backend Environment Variable**
   - Go back to Render
   - Update `CLIENT_URL` to your Vercel URL
   - Click "Save Changes" to redeploy

---

### Option B: Netlify Deployment

1. **Go to [Netlify](https://www.netlify.com/)**

2. **Create New Site from Git**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository

3. **Configure build settings:**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

4. **Add Environment Variables:**
   Go to Site settings → Environment variables → Add variables:
   ```
   VITE_API_URL=<your-backend-url-from-step-3>
   VITE_SOCKET_URL=<your-backend-url-from-step-3>
   ```

5. **Deploy site**
   - Copy your site URL
   - Update `CLIENT_URL` in Render backend settings

---

## 🔄 Step 5: Update Frontend API Configuration

Make sure your frontend is pointing to the production backend:

1. Check `frontend/src/api/index.js`:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

2. Check `frontend/src/socket/index.js`:
   ```javascript
   const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
   ```

---

## ✅ Step 6: Test Your Deployment

1. **Visit your frontend URL**
2. **Test user registration and login**
3. **Test creating an incident**
4. **Verify real-time notifications work**
5. **Check email notifications**
6. **Test map functionality**

---

## 🔐 Security Checklist

- [ ] Changed all default passwords
- [ ] Set strong JWT_SECRET (at least 32 random characters)
- [ ] MongoDB Atlas has IP whitelist configured (or allow all for dynamic IPs)
- [ ] CORS is properly configured in backend
- [ ] Environment variables are not committed to Git
- [ ] Email credentials are secure (use app passwords, not account passwords)

---

## 🐛 Troubleshooting

### Backend Issues

**Issue**: Backend won't start
- Check Render logs: Dashboard → Service → Logs
- Verify all environment variables are set
- Check MongoDB connection string is correct

**Issue**: Database connection fails
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check if IP whitelist is properly configured
- Test connection string locally first

### Frontend Issues

**Issue**: API calls fail
- Open browser console (F12) to see errors
- Verify VITE_API_URL is set correctly
- Check if backend is running (visit backend URL)

**Issue**: Real-time updates not working
- Check VITE_SOCKET_URL is set correctly
- Verify WebSocket connection in browser Network tab
- Ensure backend CORS allows your frontend URL

### Map Issues

**Issue**: Map not displaying
- Check browser console for Leaflet errors
- Verify internet connection (map tiles load from external source)
- Clear browser cache

---

## 📊 Monitoring

### Render (Backend)
- View logs: Dashboard → Your Service → Logs
- Monitor metrics: CPU, Memory usage
- Set up alerts for downtime

### Vercel/Netlify (Frontend)
- View deployment logs in dashboard
- Monitor build times and errors
- Check analytics for traffic

---

## 🔄 Updating Your Deployment

Whenever you push changes to GitHub:

1. **Backend (Render)**: Automatically redeploys on git push
2. **Frontend (Vercel/Netlify)**: Automatically redeploys on git push

To manually redeploy:
- Render: Dashboard → Service → Manual Deploy → Deploy latest commit
- Vercel: Deployments → Click three dots → Redeploy
- Netlify: Deploys → Trigger deploy

---

## 💰 Cost Estimates

All services have free tiers suitable for development/small projects:

- **MongoDB Atlas**: Free (512MB storage)
- **Render**: Free (750 hours/month, sleeps after 15 min inactivity)
- **Vercel**: Free (100GB bandwidth)
- **Netlify**: Free (100GB bandwidth)

**Note**: Render free tier services sleep after inactivity. First request may take 30-60 seconds.

---

## 🚀 Going to Production

For production use, consider upgrading:

1. **Backend**: Render paid plan ($7/month) - No sleep, better performance
2. **Database**: MongoDB Atlas paid plan - More storage and backups
3. **CDN**: Cloudflare for better performance
4. **Monitoring**: Set up error tracking (Sentry)
5. **Custom Domain**: Purchase and configure custom domain

---

## 📞 Support

If you encounter issues:

1. Check service status pages
2. Review deployment logs
3. Test locally first
4. Check environment variables
5. Verify all services are running

---

## 🎉 Success!

Your NeighboursCare platform is now live! Share the URL with your community and start helping people in need.

**Frontend URL**: `https://your-app.vercel.app`
**Backend API**: `https://your-backend.onrender.com`

Remember to monitor your application and respond to user feedback!
