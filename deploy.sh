#!/bin/bash

################################################################################
#           POWALYZE - SCRIPT DE DÉPLOIEMENT HOSTINGER VPS
################################################################################
# Description: Déploiement complet du site React sur VPS Hostinger
# Utilisation: bash deploy.sh [domain] [email] [github_repo]
# Exemple: bash deploy.sh powalyze.ch fabrice@powalyze.ch https://github.com/user/powalyze.git
# Prérequis: Ubuntu 20.04+ avec accès sudo
################################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration (Arguments ou defaults)
DOMAIN="${1:-powalyze.ch}"
EMAIL="${2:-fabrice@powalyze.ch}"
GITHUB_REPO="${3:-}"
APP_NAME="powalyze"
APP_PORT="3002"
APP_USER="powalyze"
APP_HOME="/home/$APP_USER"
APP_DIR="$APP_HOME/powalyze"

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}🚀 POWALYZE - VPS DEPLOYMENT${NC}"
echo -e "${BLUE}================================${NC}\n"
echo -e "Domaine: ${YELLOW}$DOMAIN${NC}"
echo -e "Email SSL: ${YELLOW}$EMAIL${NC}\n"

################################################################################
# STEP 1: Update System
################################################################################
echo -e "${YELLOW}[1/7]${NC} Mise à jour du système..."
sudo apt-get update && sudo apt-get upgrade -y

################################################################################
# STEP 2: Install Dependencies
################################################################################
echo -e "${YELLOW}[2/7]${NC} Installation des dépendances..."
sudo apt-get install -y curl wget git nginx certbot python3-certbot-nginx nodejs npm build-essential

# Upgrade npm
sudo npm install -g npm@latest
echo -e "${GREEN}✓ Dépendances${NC}\n"

################################################################################
# STEP 3: Create App User & Dir
################################################################################
echo -e "${YELLOW}[3/7]${NC} Configuration utilisateur..."
if ! id -u $APP_USER > /dev/null 2>&1; then
  sudo useradd -m -d $APP_HOME -s /bin/bash $APP_USER
fi
sudo mkdir -p $APP_DIR
sudo chown $APP_USER:$APP_USER $APP_DIR
echo -e "${GREEN}✓ Utilisateur et répertoires${NC}\n"

################################################################################
# STEP 4: Clone & Build App
################################################################################
echo -e "${YELLOW}[4/7]${NC} Setup application..."

# 5. Upload des fichiers
echo "📤 Upload des fichiers..."
rsync -avz --delete dist/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# 6. Permissions
echo "🔒 Configuration des permissions..."
ssh $SERVER_USER@$SERVER_HOST "chown -R www-data:www-data $SERVER_PATH && chmod -R 755 $SERVER_PATH"

# 7. Clear cache (optionnel)
echo "🧹 Clear cache..."
ssh $SERVER_USER@$SERVER_HOST "systemctl reload nginx"

echo ""
echo "✅ Déploiement terminé avec succès!"
echo "🌐 Site accessible sur: https://powalyze.ch"
