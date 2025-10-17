#!/bin/bash

# NeighboursCare - Quick Deployment Checker
# This script helps verify your setup before deployment

echo "🚀 NeighboursCare Deployment Checker"
echo "======================================"
echo ""

# Check if Git is initialized
if [ -d ".git" ]; then
    echo "✅ Git repository found"
else
    echo "❌ Git repository not found. Run: git init"
    exit 1
fi

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "✅ Node.js installed ($(node -v))"
else
    echo "❌ Node.js not installed. Download from: https://nodejs.org"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    echo "✅ npm installed ($(npm -v))"
else
    echo "❌ npm not installed"
    exit 1
fi

# Check backend dependencies
echo ""
echo "📦 Checking Backend..."
if [ -f "backend/package.json" ]; then
    echo "✅ Backend package.json found"
    cd backend
    if [ -d "node_modules" ]; then
        echo "✅ Backend dependencies installed"
    else
        echo "⚠️  Backend dependencies not installed. Run: cd backend && npm install"
    fi
    cd ..
else
    echo "❌ Backend package.json not found"
fi

# Check frontend dependencies
echo ""
echo "📦 Checking Frontend..."
if [ -f "frontend/package.json" ]; then
    echo "✅ Frontend package.json found"
    cd frontend
    if [ -d "node_modules" ]; then
        echo "✅ Frontend dependencies installed"
    else
        echo "⚠️  Frontend dependencies not installed. Run: cd frontend && npm install"
    fi
    cd ..
else
    echo "❌ Frontend package.json not found"
fi

# Check environment files
echo ""
echo "🔐 Checking Environment Configuration..."
if [ -f "backend/.env" ]; then
    echo "✅ Backend .env file found"
else
    echo "⚠️  Backend .env not found (OK for deployment, will use platform env vars)"
fi

if [ -f "frontend/.env" ]; then
    echo "✅ Frontend .env file found"
else
    echo "⚠️  Frontend .env not found (OK for deployment, will use platform env vars)"
fi

# Check deployment files
echo ""
echo "📄 Checking Deployment Configuration..."
if [ -f "render.yaml" ]; then
    echo "✅ Render configuration found"
else
    echo "❌ render.yaml not found"
fi

if [ -f "vercel.json" ]; then
    echo "✅ Vercel configuration found"
else
    echo "⚠️  vercel.json not found"
fi

if [ -f "netlify.toml" ]; then
    echo "✅ Netlify configuration found"
else
    echo "⚠️  netlify.toml not found"
fi

if [ -f "DEPLOYMENT.md" ]; then
    echo "✅ Deployment guide found"
else
    echo "❌ DEPLOYMENT.md not found"
fi

echo ""
echo "======================================"
echo "📋 Next Steps:"
echo ""
echo "1. Commit your changes:"
echo "   git add ."
echo "   git commit -m 'Ready for deployment'"
echo "   git push origin main"
echo ""
echo "2. Follow the deployment guide:"
echo "   Read DEPLOYMENT.md for detailed instructions"
echo ""
echo "3. Deploy backend to Render:"
echo "   - Visit: https://dashboard.render.com"
echo "   - Connect your GitHub repository"
echo "   - Configure environment variables"
echo ""
echo "4. Deploy frontend to Vercel:"
echo "   - Visit: https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Set VITE_API_URL and VITE_SOCKET_URL"
echo ""
echo "✨ Good luck with your deployment!"
