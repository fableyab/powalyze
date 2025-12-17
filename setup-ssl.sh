#!/bin/bash
# POWALYZE - Automated SSL Setup Script (Let's Encrypt)
# Usage: bash setup-ssl.sh

DOMAIN="powalyze.com"
WWW_DOMAIN="www.powalyze.com"
EMAIL="your-email@example.com" # Change to your real email for renewal notices

set -e

# Install Certbot and NGINX plugin
apt-get update
apt-get install -y certbot python3-certbot-nginx

# Obtain and install SSL certificate
certbot --nginx -d "$DOMAIN" -d "$WWW_DOMAIN" --agree-tos --email "$EMAIL" --non-interactive

echo "✅ SSL certificate installed for https://$DOMAIN and https://$WWW_DOMAIN"
echo "🔄 NGINX has been reloaded."
echo "⏰ SSL will auto-renew. You will receive renewal notices at $EMAIL."
