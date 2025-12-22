#!/bin/bash
set -euo pipefail

# Deploy script for Powalyze Vite + React app
# Usage: run this on the VPS from the repo root

REPO_DIR="$(pwd)"
WWW_DIR="/var/www/powalyze"
NGINX_SRC="$REPO_DIR/nginx-powalyze-ssl.conf"
NGINX_DEST="/etc/nginx/sites-available/powalyze.conf"

echo "[deploy] Starting deployment from $REPO_DIR"
echo "[deploy] Using Vite + React architecture"

if [ ! -f package.json ]; then
  echo "[deploy] package.json not found in $(pwd). Run this from the repo root." >&2
  exit 1
fi

echo "[deploy] Installing dependencies..."
npm ci

echo "[deploy] Building Vite app..."
npm run build

if [ ! -d "dist" ]; then
  echo "[deploy] Build failed - dist/ directory not found" >&2
  exit 1
fi

echo "[deploy] Copying built app to $WWW_DIR"
sudo mkdir -p "$WWW_DIR"
sudo rm -rf "$WWW_DIR/dist"
sudo cp -r dist "$WWW_DIR/"
sudo chown -R www-data:www-data "$WWW_DIR"

echo "[deploy] Installing Nginx config..."
if [ -f "$NGINX_SRC" ]; then
  sudo cp "$NGINX_SRC" "$NGINX_DEST"
  sudo ln -fs "$NGINX_DEST" /etc/nginx/sites-enabled/powalyze.conf
  sudo nginx -t
  sudo systemctl reload nginx
else
  echo "[deploy] Nginx config $NGINX_SRC not found, skipping." >&2
fi

echo "[deploy] Deployment finished."
echo "[deploy] Application should be available at https://powalyze.com"
echo "[deploy] Test the PMO pages: /pmo-workspace, /pmo-projects, /pmo-tasks, etc."
