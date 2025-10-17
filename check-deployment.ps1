# NeighboursCare - Quick Deployment Checker (Windows)
# This script helps verify your setup before deployment

Write-Host "🚀 NeighboursCare Deployment Checker" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is initialized
if (Test-Path ".git") {
    Write-Host "✅ Git repository found" -ForegroundColor Green
} else {
    Write-Host "❌ Git repository not found. Run: git init" -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js installed ($nodeVersion)" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not installed. Download from: https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm -v
    Write-Host "✅ npm installed ($npmVersion)" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not installed" -ForegroundColor Red
    exit 1
}

# Check backend dependencies
Write-Host ""
Write-Host "📦 Checking Backend..." -ForegroundColor Yellow
if (Test-Path "backend/package.json") {
    Write-Host "✅ Backend package.json found" -ForegroundColor Green
    if (Test-Path "backend/node_modules") {
        Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Backend dependencies not installed. Run: cd backend; npm install" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Backend package.json not found" -ForegroundColor Red
}

# Check frontend dependencies
Write-Host ""
Write-Host "📦 Checking Frontend..." -ForegroundColor Yellow
if (Test-Path "frontend/package.json") {
    Write-Host "✅ Frontend package.json found" -ForegroundColor Green
    if (Test-Path "frontend/node_modules") {
        Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Frontend dependencies not installed. Run: cd frontend; npm install" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Frontend package.json not found" -ForegroundColor Red
}

# Check environment files
Write-Host ""
Write-Host "🔐 Checking Environment Configuration..." -ForegroundColor Yellow
if (Test-Path "backend/.env") {
    Write-Host "✅ Backend .env file found" -ForegroundColor Green
} else {
    Write-Host "⚠️  Backend .env not found (OK for deployment, will use platform env vars)" -ForegroundColor Yellow
}

if (Test-Path "frontend/.env") {
    Write-Host "✅ Frontend .env file found" -ForegroundColor Green
} else {
    Write-Host "⚠️  Frontend .env not found (OK for deployment, will use platform env vars)" -ForegroundColor Yellow
}

# Check deployment files
Write-Host ""
Write-Host "📄 Checking Deployment Configuration..." -ForegroundColor Yellow
if (Test-Path "render.yaml") {
    Write-Host "✅ Render configuration found" -ForegroundColor Green
} else {
    Write-Host "❌ render.yaml not found" -ForegroundColor Red
}

if (Test-Path "vercel.json") {
    Write-Host "✅ Vercel configuration found" -ForegroundColor Green
} else {
    Write-Host "⚠️  vercel.json not found" -ForegroundColor Yellow
}

if (Test-Path "netlify.toml") {
    Write-Host "✅ Netlify configuration found" -ForegroundColor Green
} else {
    Write-Host "⚠️  netlify.toml not found" -ForegroundColor Yellow
}

if (Test-Path "DEPLOYMENT.md") {
    Write-Host "✅ Deployment guide found" -ForegroundColor Green
} else {
    Write-Host "❌ DEPLOYMENT.md not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Commit your changes:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Ready for deployment'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Follow the deployment guide:" -ForegroundColor White
Write-Host "   Read DEPLOYMENT.md for detailed instructions" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Deploy backend to Render:" -ForegroundColor White
Write-Host "   - Visit: https://dashboard.render.com" -ForegroundColor Gray
Write-Host "   - Connect your GitHub repository" -ForegroundColor Gray
Write-Host "   - Configure environment variables" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Deploy frontend to Vercel:" -ForegroundColor White
Write-Host "   - Visit: https://vercel.com" -ForegroundColor Gray
Write-Host "   - Import your GitHub repository" -ForegroundColor Gray
Write-Host "   - Set VITE_API_URL and VITE_SOCKET_URL" -ForegroundColor Gray
Write-Host ""
Write-Host "✨ Good luck with your deployment!" -ForegroundColor Green
