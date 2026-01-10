#!/bin/bash
# Installation Metabase One-Liner
# Copier-coller dans votre terminal SSH: ssh root@193.203.169.19

set -e

echo "🚀 Installation Metabase sur VPS 193.203.169.19"
echo "================================================"
echo ""

# Update & Install Docker
echo "📦 Installation Docker..."
apt-get update && apt-get upgrade -y
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh && rm get-docker.sh
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Create Metabase directory
mkdir -p /opt/metabase/data && cd /opt/metabase

# Create docker-compose.yml
cat > docker-compose.yml <<'EOFCOMPOSE'
version: '3.8'
services:
  metabase:
    image: metabase/metabase:latest
    container_name: metabase
    restart: always
    ports:
      - "3000:3000"
    volumes:
      - ./data:/metabase-data
    environment:
      - MB_DB_FILE=/metabase-data/metabase.db
      - MB_SITE_URL=http://193.203.169.19:3000
    networks:
      - metabase-net
networks:
  metabase-net:
    driver: bridge
EOFCOMPOSE

# Configure firewall
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 3000/tcp
    ufw --force enable
fi

# Start Metabase
docker-compose up -d

echo ""
echo "⏳ Démarrage Metabase (attente 30 secondes)..."
sleep 30

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ METABASE INSTALLÉ AVEC SUCCÈS!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Accédez à Metabase:"
echo "   http://193.203.169.19:3000"
echo ""
echo "📋 PROCHAINES ÉTAPES:"
echo ""
echo "1. Ouvrez http://193.203.169.19:3000"
echo "2. Créez votre compte admin"
echo "3. Admin → Settings → Embedding → Enable"
echo "4. Copiez le METABASE_SECRET_KEY"
echo "5. Admin → Databases → Add PostgreSQL (Supabase)"
echo "6. Créez vos dashboards et notez les IDs"
echo ""
echo "🔍 Logs: docker logs metabase -f"
echo "🛑 Stop: docker-compose down"
echo "🔄 Restart: docker-compose restart"
echo ""
