#!/bin/sh
set -e

echo "================================================="
echo "  UBAYHUB BLORA - AUTOMATED PRODUCTION BUILDER   "
echo "================================================="

echo "[1/4] Validating TypeScript & Code Integrity..."
npm run lint

echo "[2/4] Cleaning legacy build artifacts..."
npm run clean || true

echo "[3/4] Compiling Vite Frontend Assets & Bundling Express Backend..."
npm run build

echo "[4/4] Verifying production dist directory..."
if [ -f "dist/server.cjs" ] && [ -f "dist/index.html" ]; then
    echo "================================================="
    echo "✅ BUILD SUCCESSFUL! Server bundle dist/server.cjs ready."
    echo "🚀 Run 'npm start' or 'sh deploy.sh' to launch UbayHub."
    echo "================================================="
else
    echo "❌ BUILD ERROR: Required build files missing in dist/"
    exit 1
fi
