#!/bin/bash
# Script de déploiement POWALYZE - Hostinger VPS
# Exécuter sur le VPS via SSH

echo "🚀 DÉPLOIEMENT AUTOMATIQUE POWALYZE"
echo "════════════════════════════════════"

# 1. Nettoyage
echo ""
echo "1️⃣  Nettoyage du répertoire..."
rm -rf /var/www/powalyze.com/*
echo "✅ Répertoire nettoyé"

# 2. Permissions par défaut
echo ""
echo "2️⃣  Configuration des permissions..."
chmod 755 /var/www/powalyze.com
echo "✅ Permissions répertoire fixées"

# 3. Vérifier les fichiers localement
echo ""
echo "3️⃣  Vérification des fichiers..."
echo "Fichiers dans /var/www/powalyze.com:"
ls -lh /var/www/powalyze.com/ || echo "Répertoire vide (en attente de fichiers)"

echo ""
echo "4️⃣  Configuration NGINX..."

# Créer la config NGINX
cat > /etc/nginx/sites-available/powalyze.com << 'NGINX_CONFIG'
server {
    listen 80;
    server_name powalyze.com www.powalyze.com 193.203.169.19;
    root /var/www/powalyze.com;
    index index.html;
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
NGINX_CONFIG

# Activer le site
ln -sf /etc/nginx/sites-available/powalyze.com /etc/nginx/sites-enabled/powalyze.com
echo "✅ Configuration NGINX créée"

# 5. Test et redémarrage
echo ""
echo "5️⃣  Redémarrage NGINX..."
nginx -t
systemctl restart nginx
echo "✅ NGINX redémarré"

# 6. Afficher le statut
echo ""
echo "════════════════════════════════════"
echo "📊 STATUS FINAL:"
echo "════════════════════════════════════"
systemctl status nginx --no-pager | head -5
echo ""
echo "📁 Fichiers dans /var/www/powalyze.com:"
ls -lh /var/www/powalyze.com/ | head -10
echo ""
echo "🌐 Test accès:"
curl -s -I http://localhost/ | head -3
echo ""
echo "════════════════════════════════════"
echo "✅ DÉPLOIEMENT AUTOMATIQUE TERMINÉ"
echo "════════════════════════════════════"
