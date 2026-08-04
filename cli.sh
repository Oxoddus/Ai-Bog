#!/bin/sh
# =========================================================
# UBAYHUB BLORA - COMMAND LINE INTERFACE (CLI) TOOL
# =========================================================

set -e

COMMAND="${1:-help}"

print_header() {
  echo "================================================="
  echo "       UBAYHUB BLORA - MANAGEMENT CLI TOOL       "
  echo "  'Toko Elektronik Online & Offline Terlengkap'  "
  echo "================================================="
}

show_help() {
  print_header
  echo "Penggunaan: ./cli.sh [PERINTAH] atau npm run cli -- [PERINTAH]"
  echo ""
  echo "Daftar Perintah CLI UbayHub:"
  echo "  status       - Cek status aplikasi, port 3000, environment, & server health"
  echo "  build        - Lakukan validasi linter TypeScript & kompilasi produksi"
  echo "  start        - Jalankan server produksi UbayHub (dist/server.cjs)"
  echo "  docker:up    - Operasikan stack container (App + PostgreSQL + Redis)"
  echo "  docker:down  - Hentikan seluruh stack container Docker"
  echo "  env:init     - Inisialisasi file konfigurasi runtime .env dari .env.example"
  echo "  health       - Uji endpoint API kesehatan (/api/health)"
  echo "  admin:info   - Tampilkan kredensial default & status WAF Argon2 Admin"
  echo "  help         - Tampilkan panduan penggunaan CLI ini"
  echo "================================================="
}

check_status() {
  print_header
  echo "🔎 [1/4] Status Runtime & Environment:"
  if [ -f ".env" ]; then
    echo "  - File .env           : ✅ TERSEDIA"
  else
    echo "  - File .env           : ⚠️ TIDAK DITEMUKAN (Jalankan: ./cli.sh env:init)"
  fi

  echo ""
  echo "📦 [2/4] Status Hasil Build Produksi (dist/):"
  if [ -f "dist/server.cjs" ] && [ -f "dist/index.html" ]; then
    echo "  - Bundle Server (CJS) : ✅ READY (dist/server.cjs)"
    echo "  - Frontend Assets     : ✅ READY (dist/index.html)"
  else
    echo "  - Build Status        : ⚠️ BELUM DIKOMPILASI (Jalankan: ./cli.sh build)"
  fi

  echo ""
  echo "🐳 [3/4] Status Docker & Container Engine:"
  if command -v docker >/dev/null 2>&1; then
    echo "  - Docker Engine       : ✅ INSTALLED"
  else
    echo "  - Docker Engine       : ℹ️ NOT INSTALLED (Menggunakan Standalone Node.js)"
  fi

  echo ""
  echo "🌐 [4/4] Pengujian Endpoint API Health:"
  if command -v wget >/dev/null 2>&1; then
    wget -qO- http://localhost:3000/api/health 2>/dev/null && echo "  - Endpoint Health    : ✅ ONLINE (HTTP 200 OK)" || echo "  - Endpoint Health    : ℹ️ Server belum berjalan di port 3000"
  else
    echo "  - Endpoint Health    : ℹ️ Modul wget tidak tersedia untuk polling lokal"
  fi
  echo "================================================="
}

run_build() {
  print_header
  echo "🔨 Memulai proses build UbayHub Blora..."
  npm run lint
  npm run build
  echo "✅ Build selesai tanpa error."
}

init_env() {
  print_header
  if [ -f ".env" ]; then
    echo "⚠️ File .env sudah ada. Mengkonfirmasi salinan ulang..."
  fi
  cp .env.example .env
  echo "✅ File .env berhasil diinisialisasi dari .env.example!"
}

check_health() {
  print_header
  echo "🌐 Menguji API Health UbayHub..."
  if command -v curl >/dev/null 2>&1; then
    curl -i http://localhost:3000/api/health
  elif command -v wget >/dev/null 2>&1; then
    wget -qO- http://localhost:3000/api/health
  else
    echo "Gunakan browser atau Postman untuk membuka http://localhost:3000/api/health"
  fi
  echo ""
}

show_admin_info() {
  print_header
  echo "🔐 INFORMASI LOGIN ADMIN UBAYHUB (Argon2 WAF Guard):"
  echo "  Username Demo : ubay_master"
  echo "  Password Demo : ubay123456"
  echo "  Akses Panel   : Tombol 'Login Admin' di Top Navbar atau Floating Shield"
  echo "  Roles Supported: Super Admin, Admin, Editor, Teknisi, Customer Service"
  echo "================================================="
}

case "$COMMAND" in
  status)
    check_status
    ;;
  build)
    run_build
    ;;
  start)
    print_header
    echo "🚀 Memulai server produksi Node.js..."
    npm start
    ;;
  "docker:up")
    print_header
    echo "🐳 Memulai stack Docker Compose (App + Postgres + Redis)..."
    docker-compose up -d --build 2>/dev/null || docker compose up -d --build
    ;;
  "docker:down")
    print_header
    echo "🛑 Menghentikan stack Docker Compose..."
    docker-compose down 2>/dev/null || docker compose down
    ;;
  "env:init")
    init_env
    ;;
  health)
    check_health
    ;;
  "admin:info")
    show_admin_info
    ;;
  help|*)
    show_help
    ;;
esac
