#!/bin/bash
set -e

APP_PATH="/var/www/powalyze"
DOMAIN="powalyze.com"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_PATH="/var/backups/powalyze-$TIMESTAMP"

echo "═══════════════════════════════════════════════"
echo "🚀 Déploiement Powalyze sur VPS"
echo "═══════════════════════════════════════════════"

# Créer répertoires
echo "📁 Création des répertoires..."
mkdir -p "$APP_PATH"
mkdir -p "/var/backups"

# Backup ancienne version
if [ -d "$APP_PATH/dist" ]; then
    echo "💾 Backup de l'ancienne version..."
    cp -r "$APP_PATH/dist" "$BACKUP_PATH" || true
fi

# Extraire build
echo "📦 Extraction du build..."
cd "$APP_PATH"
BUILD_FILE=$(ls /tmp/dist-*.tar.gz 2>/dev/null | tail -1)
if [ ! -f "$BUILD_FILE" ]; then
    echo "❌ Aucun fichier build trouvé!"
    exit 1
fi
tar -xzf "$BUILD_FILE"

# Configurer Nginx
echo "⚙️  Configuration Nginx..."
mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

cat > /etc/nginx/sites-available/$DOMAIN << 'NGINXEOF'
server {
    listen 80;
    listen [::]:80;
    server_name powalyze.com www.powalyze.com;
    root /var/www/powalyze/dist;
    index index.html;

    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript application/json;
    gzip_min_length 1000;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, max-age=3600";
    }

    access_log /var/log/nginx/powalyze-access.log;
    error_log /var/log/nginx/powalyze-error.log;
}
NGINXEOF

# Installer/activer Nginx
echo "🔗 Configuration Nginx..."
apt-get update -qq && apt-get install -y nginx >/dev/null 2>&1 || true
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/ || true
rm -f /etc/nginx/sites-enabled/default || true

# Test et redémarrage
echo "✅ Test Nginx..."
nginx -t || exit 1

echo "🔄 Redémarrage Nginx..."
systemctl restart nginx || service nginx restart || true

# Nettoyage
echo "🧹 Nettoyage..."
rm -f "$BUILD_FILE" || true

echo ""
echo "═══════════════════════════════════════════════"
echo "✅ DÉPLOIEMENT RÉUSSI!"
echo "═══════════════════════════════════════════════"
echo "🌐 http://$DOMAIN"
echo "💾 Backup: $BACKUP_PATH"
echo ""
