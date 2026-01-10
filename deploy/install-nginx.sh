#!/bin/bash
# Install and configure Nginx for Metabase
# Run: bash install-nginx.sh

set -e

echo "🌐 Installation Nginx pour Metabase"
echo "===================================="
echo ""

# 1. Install Nginx
if ! command -v nginx &> /dev/null; then
    echo "📦 Installation Nginx..."
    apt-get update
    apt-get install -y nginx
else
    echo "✅ Nginx déjà installé"
fi

# 2. Generate self-signed certificate (temporary)
echo "🔐 Génération certificat SSL auto-signé..."
mkdir -p /etc/ssl/private
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt \
    -subj "/C=CH/ST=Vaud/L=Lausanne/O=Powalyze/CN=193.203.169.19"

# 3. Copy Nginx configuration
echo "📝 Configuration Nginx..."
if [ ! -f /etc/nginx/sites-available/metabase ]; then
    # Download config from your repo or copy manually
    echo "⚠️  Copiez manuellement nginx-metabase.conf vers /etc/nginx/sites-available/metabase"
    echo "    Puis lancez: ln -s /etc/nginx/sites-available/metabase /etc/nginx/sites-enabled/"
else
    echo "✅ Configuration déjà présente"
fi

# 4. Enable site
if [ ! -L /etc/nginx/sites-enabled/metabase ]; then
    ln -s /etc/nginx/sites-available/metabase /etc/nginx/sites-enabled/
    echo "✅ Site activé"
fi

# 5. Test configuration
echo "🧪 Test configuration Nginx..."
nginx -t

# 6. Restart Nginx
echo "🔄 Redémarrage Nginx..."
systemctl restart nginx
systemctl enable nginx

# 7. Open firewall ports
if command -v ufw &> /dev/null; then
    echo "🔥 Configuration firewall..."
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 3000/tcp
    echo "✅ Ports ouverts: 80, 443, 3000"
fi

echo ""
echo "✅ Installation Nginx terminée!"
echo ""
echo "🌐 Metabase accessible via:"
echo "   http://193.203.169.19 (redirect vers HTTPS)"
echo "   https://193.203.169.19 (certificat auto-signé)"
echo ""
echo "⚠️  ATTENTION: Certificat auto-signé"
echo "    Pour un vrai certificat SSL (Let's Encrypt):"
echo "    1. Configurez un nom de domaine pointant vers 193.203.169.19"
echo "    2. Installez certbot: apt-get install -y certbot python3-certbot-nginx"
echo "    3. Lancez: certbot --nginx -d votre-domaine.com"
echo ""
