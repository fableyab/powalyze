#!/bin/bash
set -euo pipefail

# Deployment script for Powalyze Vite + React app
# Usage: ./deploy-powalyze.sh

REPO_DIR="$(pwd)"
WWW_DIR="/var/www/powalyze"
NGINX_SRC="$REPO_DIR/nginx-powalyze-ssl.conf"
NGINX_DEST="/etc/nginx/sites-available/powalyze.conf"

echo "[deploy] Starting deployment from $REPO_DIR"

if [ ! -f package.json ]; then
  echo "[deploy] package.json not found in $(pwd). Run this from the repo root." >&2
  exit 1
fi

echo "[deploy] Installing dependencies..."
npm install

echo "[deploy] Building Vite app..."
npm run build

echo "[deploy] Copying built app to $WWW_DIR"
sudo mkdir -p "$WWW_DIR"
sudo rsync -a --delete dist/ "$WWW_DIR/"
sudo chown -R www-data:www-data "$WWW_DIR"

echo "[deploy] Installing Nginx config..."
if [ -f "$NGINX_SRC" ]; then
  sudo cp "$NGINX_SRC" "$NGINX_DEST"
  sudo ln -fs "$NGINX_DEST" /etc/nginx/sites-enabled/powalyze.conf
  sudo nginx -t && sudo systemctl reload nginx
  echo "[deploy] Nginx configured and reloaded."
else
  echo "[deploy] Warning: Nginx config $NGINX_SRC not found, skipping." >&2
fi

echo "[deploy] ✅ Deployment finished! Your app is now live."
echo "[deploy] Access it at http://YOUR_DOMAIN or http://YOUR_IP"
