#!/bin/sh
set -e

echo "================================================="
echo "  UBAYHUB BLORA - AUTOMATED DEPLOYMENT WORKFLOW   "
echo "================================================="

# Step 1: Environment Configuration Check
echo "[1/5] Checking environment configuration (.env)..."
if [ ! -f ".env" ]; then
    echo "⚠️ .env file not found. Copying from .env.example..."
    cp .env.example .env
    echo "✅ Created .env configuration file."
else
    echo "✅ .env file verified."
fi

# Step 2: Install Dependencies
echo "[2/5] Verifying and installing Node.js dependencies..."
npm install

# Step 3: Run Linter & Build Project
echo "[3/5] Running TypeScript validation and compiling production bundle..."
npm run lint
npm run build

# Step 4: Docker & Docker Compose Check
echo "[4/5] Checking container engine availability..."
if command -v docker-compose >/dev/null 2>&1 || docker compose version >/dev/null 2>&1; then
    echo "🚀 Docker Compose detected! Starting multi-container orchestration..."
    if command -v docker-compose >/dev/null 2>&1; then
        docker-compose down 2>/dev/null || true
        docker-compose up -d --build
    else
        docker compose down 2>/dev/null || true
        docker compose up -d --build
    fi
    echo "================================================="
    echo "✅ DEPLOYMENT SUCCESSFUL VIA DOCKER COMPOSE!"
    echo "🌐 UbayHub Platform running on: http://localhost:3000"
    echo "================================================="
elif command -v docker >/dev/null 2>&1; then
    echo "🚀 Docker daemon detected! Building & running single container..."
    docker stop ubayhub-app 2>/dev/null || true
    docker rm ubayhub-app 2>/dev/null || true
    docker build -t ubayhub-platform .
    docker run -d --name ubayhub-app -p 3000:3000 --env-file .env ubayhub-platform
    echo "================================================="
    echo "✅ DEPLOYMENT SUCCESSFUL VIA DOCKER CONTAINER!"
    echo "🌐 UbayHub Platform running on: http://localhost:3000"
    echo "================================================="
else
    echo "⚠️ Docker engine not found in current host environment."
    echo "🚀 Launching Node.js standalone production server on port 3000..."
    npm start
fi
