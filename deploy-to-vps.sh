#!/bin/bash

# 🚀 SCRIPT DE DÉPLOIEMENT HOSTINGER - POWALYZE
# Version: 1.0
# Date: 15.12.2025

set -e  # Exit on error

echo "=========================================="
echo "🚀 DÉPLOIEMENT POWALYZE - HOSTINGER"
echo "=========================================="

# Configuration
VPS_IP="193.203.169.19"
VPS_USER="root"
VPS_DOMAIN="powalyze.com"
VPS_PATH="/var/www/powalyze.com"
LOCAL_DIST="./dist"
LOCAL_STAGING="./deploy_staging/powalyze.com"

echo ""
echo "📋 Configuration:"
echo "  VPS IP: $VPS_IP"
echo "  Utilisateur: $VPS_USER"
echo "  Domaine: $VPS_DOMAIN"
echo "  Path VPS: $VPS_PATH"
echo ""

# Vérifier que dist existe
if [ ! -d "$LOCAL_DIST" ]; then
    echo "❌ Erreur: Le dossier 'dist' n'existe pas!"
    echo "Exécutez: npm run build"
    exit 1
fi

echo "✅ Dossier dist trouvé"
echo ""

# 1. Afficher les fichiers à déployer
echo "📁 Fichiers à déployer:"
echo "  - dist/ (Production build)"
echo "  - nginx.conf (Configuration NGINX)"
echo "  - .htaccess (Redirects)"
echo ""

# 2. Confirmation
echo "⚠️  Êtes-vous prêt à déployer ? (Ctrl+C pour annuler)"
read -p "Appuyez sur Entrée pour continuer..."

echo ""
echo "🔄 Étape 1/4: Préparation de SSH..."
echo "  Utilisation de paramètres SSH pour connexion sécurisée..."
echo ""

# 3. Créer les répertoires sur le VPS
echo "🔄 Étape 2/4: Création des répertoires VPS..."
ssh -o ConnectTimeout=10 $VPS_USER@$VPS_IP << 'EOF'
  set -e
  echo "Création de $VPS_PATH..."
  mkdir -p /var/www/powalyze.com
  echo "✅ Répertoires créés"
EOF

echo "✅ Répertoires VPS prêts"
echo ""

# 4. Transférer les fichiers
echo "🔄 Étape 3/4: Transfert des fichiers (cela peut prendre 1-2 minutes)..."

# Utiliser rsync si disponible, sinon scp
if command -v rsync &> /dev/null; then
    echo "  Utilisation de rsync..."
    rsync -avz --progress \
        --exclude='node_modules' \
        --exclude='.git' \
        ./dist/ \
        $VPS_USER@$VPS_IP:$VPS_PATH/
else
    echo "  Utilisation de scp..."
    scp -r ./dist/* $VPS_USER@$VPS_IP:$VPS_PATH/
fi

echo "✅ Fichiers transférés"
echo ""

# 5. Configurer NGINX sur le VPS
echo "🔄 Étape 4/4: Configuration NGINX..."
ssh -o ConnectTimeout=10 $VPS_USER@$VPS_IP << 'NGINX_CONFIG'
set -e

# Installer NGINX s'il n'est pas installé
if ! command -v nginx &> /dev/null; then
    echo "Installation de NGINX..."
    apt-get update
    apt-get install -y nginx
    echo "✅ NGINX installé"
fi

# Créer la configuration
cat > /etc/nginx/sites-available/powalyze.com << 'NGINX_CONF'
server {
    listen 80;
    listen [::]:80;
    
    server_name powalyze.com www.powalyze.com 193.203.169.19;
    
    root /var/www/powalyze.com;
    index index.html;
    
    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/javascript application/xml+rss application/json;
    
    # Cache assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
NGINX_CONF

echo "✅ Configuration NGINX créée"

# Activer le site
ln -sf /etc/nginx/sites-available/powalyze.com /etc/nginx/sites-enabled/
echo "✅ Site activé dans NGINX"

# Supprimer la config par défaut
rm -f /etc/nginx/sites-enabled/default
echo "✅ Config par défaut supprimée"

# Tester la configuration
echo "Vérification de la configuration NGINX..."
nginx -t

# Redémarrer NGINX
echo "Redémarrage de NGINX..."
systemctl restart nginx
echo "✅ NGINX redémarré"

# Vérifier le statut
systemctl status nginx | head -5

NGINX_CONFIG

echo "✅ NGINX configuré et redémarré"
echo ""

# 6. Corriger les permissions
echo "Correction des permissions..."
ssh $VPS_USER@$VPS_IP << 'PERMS'
chown -R www-data:www-data /var/www/powalyze.com
chmod -R 755 /var/www/powalyze.com
echo "✅ Permissions corrigées"
PERMS

echo ""
echo "=========================================="
echo "✅ DÉPLOIEMENT RÉUSSI!"
echo "=========================================="
echo ""
echo "🌐 Votre site est maintenant en ligne:"
echo "  ➜ http://193.203.169.19"
echo "  ➜ http://powalyze.com"
echo "  ➜ http://www.powalyze.com"
echo ""
echo "⏱️  Attendez 2-5 minutes pour la propagation DNS"
echo ""
echo "📋 Prochaines étapes:"
echo "  1. Accédez à http://193.203.169.19 pour vérifier"
echo "  2. Configurez un certificat SSL (Let's Encrypt recommandé)"
echo "  3. Pointez votre domaine vers cette IP"
echo ""
echo "=========================================="
