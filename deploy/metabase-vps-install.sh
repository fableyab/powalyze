#!/bin/bash
# Metabase Installation on VPS - Automated Script
# Run: bash metabase-vps-install.sh

set -e

echo "🚀 Installation Metabase sur VPS"
echo "=================================="
echo ""

# 1. Update system
echo "📦 Mise à jour du système..."
apt-get update && apt-get upgrade -y

# 2. Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "🐳 Installation Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
else
    echo "✅ Docker déjà installé"
fi

# 3. Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installation Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
else
    echo "✅ Docker Compose déjà installé"
fi

# 4. Create Metabase directory
echo "📁 Création répertoire Metabase..."
mkdir -p /opt/metabase/data
cd /opt/metabase

# 5. Create docker-compose.yml
echo "📝 Création docker-compose.yml..."
cat > docker-compose.yml <<'EOF'
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
EOF

# 6. Start Metabase
echo "🚀 Démarrage Metabase..."
docker-compose up -d

# 7. Wait for Metabase to be ready
echo "⏳ Attente démarrage Metabase (30 secondes)..."
sleep 30

# 8. Show status
echo ""
echo "✅ Installation terminée!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 METABASE EST MAINTENANT ACCESSIBLE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 URL: http://193.203.169.19:3000"
echo ""
echo "📋 PROCHAINES ÉTAPES:"
echo ""
echo "1. Ouvrez http://193.203.169.19:3000 dans votre navigateur"
echo "2. Créez votre compte administrateur"
echo "3. Allez dans: Admin → Settings → Embedding"
echo "4. Activez 'Embedding' et copiez le SECRET_KEY"
echo "5. Connectez votre base Supabase:"
echo "   Admin → Databases → Add database"
echo "   Type: PostgreSQL"
echo ""
echo "🔍 Vérifier les logs:"
echo "   docker logs metabase -f"
echo ""
echo "🛑 Arrêter Metabase:"
echo "   docker-compose down"
echo ""
echo "🔄 Redémarrer Metabase:"
echo "   docker-compose restart"
echo ""
