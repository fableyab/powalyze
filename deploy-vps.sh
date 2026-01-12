#!/bin/bash
set -e

VPS_IP="193.203.169.19"
VPS_USER="root"
PASSWORD="A@pple2026A@pple2026"
DOMAIN="powalyze.com"
APP_PATH="/var/www/powalyze"

echo "╔════════════════════════════════════════╗"
echo "║  🚀 DÉPLOIEMENT POWALYZE - VPS        ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📍 VPS: $VPS_IP"
echo "🌐 Domaine: $DOMAIN"
echo ""

# Trouver le fichier build
BUILD_FILE=$(ls dist-*.tar.gz 2>/dev/null | head -1)
if [ -z "$BUILD_FILE" ]; then
    echo "❌ Aucun fichier build trouvé!"
    exit 1
fi

echo "📦 Build: $BUILD_FILE"
echo ""

# Créer script de déploiement distant
cat > /tmp/deploy-remote.sh << 'EOFSCRIPT'
#!/bin/bash
set -e

APP_PATH="/var/www/powalyze"
DOMAIN="powalyze.com"
BUILD_FILE=$(ls /tmp/dist-*.tar.gz 2>/dev/null | tail -1)
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_PATH="/var/backups/powalyze-$TIMESTAMP"

echo "═══════════════════════════════════════════════"
echo "🚀 Déploiement Powalyze"
echo "═══════════════════════════════════════════════"

# Créer répertoires
echo "📁 Création des répertoires..."
mkdir -p "$APP_PATH"
mkdir -p "/var/backups"

# Backup
if [ -d "$APP_PATH/dist" ]; then
    echo "💾 Backup..."
    cp -r "$APP_PATH/dist" "$BACKUP_PATH" 2>/dev/null || true
fi

# Extraire
echo "📦 Extraction du build..."
cd "$APP_PATH"
tar -xzf "$BUILD_FILE" 2>/dev/null

# Installer Nginx
if ! command -v nginx &> /dev/null; then
    echo "📦 Installation Nginx..."
    apt-get update -qq && apt-get install -y nginx >/dev/null 2>&1 || true
fi

# Configurer Nginx
echo "⚙️  Configuration Nginx..."
mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

cat > /etc/nginx/sites-available/$DOMAIN << 'NGINXEOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name powalyze.com www.powalyze.com _;
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

# Activer site
echo "🔗 Activation du site..."
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/ || true
rm -f /etc/nginx/sites-enabled/default || true

# Test Nginx
echo "✅ Test Nginx..."
nginx -t || exit 1

# Redémarrer Nginx
echo "🔄 Redémarrage Nginx..."
systemctl restart nginx || service nginx restart || true

# Nettoyage
rm -f "$BUILD_FILE" || true

echo ""
echo "═══════════════════════════════════════════════"
echo "✅ DÉPLOIEMENT RÉUSSI!"
echo "═══════════════════════════════════════════════"
echo "🌐 http://$DOMAIN"
echo "💾 Backup: $BACKUP_PATH"
echo ""
EOFSCRIPT

# Upload build
echo "📤 Upload du build..."
sshpass -p "$PASSWORD" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$BUILD_FILE" "${VPS_USER}@${VPS_IP}:/tmp/" 2>/dev/null || {
    echo "⚠️  sshpass non disponible, essai sans..."
    scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$BUILD_FILE" "${VPS_USER}@${VPS_IP}:/tmp/"
}

echo "✅ Build uploadé"
echo ""

# Upload et exécuter script
echo "🔧 Déploiement sur VPS..."
sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "${VPS_USER}@${VPS_IP}" 'bash -s' < /tmp/deploy-remote.sh 2>/dev/null || {
    echo "⚠️  sshpass non disponible, essai sans..."
    ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "${VPS_USER}@${VPS_IP}" 'bash -s' < /tmp/deploy-remote.sh
}

echo ""
echo "╔════════════════════════════════════════╗"
echo "║     ✅ DÉPLOIEMENT TERMINÉ!           ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "🌐 Application: http://$DOMAIN"
echo "🌐 Ou accès par IP: http://$VPS_IP"
echo ""

# Nettoyage local
rm -f /tmp/deploy-remote.sh
echo "✅ Nettoyage terminé"
