#!/bin/bash

# Script de déploiement Powalyze - SFTP upload

SERVER="217.21.72.245"
USER="u356833578"
PASSWORD="A@pple2026A@pple2026"
REMOTE_PATH="/home/u356833578/domains/powalyze.com/public_html"
LOCAL_PATH="./dist"

echo "======================================================================"
echo "🚀 DÉPLOIEMENT POWALYZE SUR HOSTINGER VIA SFTP"
echo "======================================================================"
echo ""

# Vérifier que dist existe
if [ ! -d "$LOCAL_PATH" ]; then
    echo "❌ ERREUR: Le dossier dist/ n'existe pas"
    echo "   Exécutez d'abord: npm run build"
    exit 1
fi

FILE_COUNT=$(find "$LOCAL_PATH" -type f | wc -l)
echo "✅ $FILE_COUNT fichiers trouvés dans dist/"
echo ""

# Créer script SFTP
SFTP_SCRIPT=$(mktemp)
cat > "$SFTP_SCRIPT" << EOF
cd $REMOTE_PATH
lcd $LOCAL_PATH
put -r *
quit
EOF

echo "📤 Connexion SFTP à $SERVER..."
echo ""

# Essayer SFTP avec sshpass (si disponible)
if command -v sshpass &> /dev/null; then
    sshpass -p "$PASSWORD" sftp -oStrictHostKeyChecking=no -oUserKnownHostsFile=/dev/null "$USER@$SERVER" < "$SFTP_SCRIPT"
    RESULT=$?
elif command -v lftp &> /dev/null; then
    lftp -u "$USER,$PASSWORD" "$SERVER" << EOF
set sftp:connect-timeout 10
set net:timeout 10
cd $REMOTE_PATH
lcd $LOCAL_PATH
mirror -R .
quit
EOF
    RESULT=$?
else
    echo "❌ ERREUR: sshpass ou lftp non disponible"
    echo ""
    echo "📥 Installation requise:"
    echo "   Ubuntu/Debian: sudo apt-get install sshpass lftp"
    echo "   macOS: brew install sshpass lftp"
    echo ""
    RESULT=1
fi

rm -f "$SFTP_SCRIPT"

if [ $RESULT -eq 0 ]; then
    echo ""
    echo "======================================================================"
    echo "✅ DÉPLOIEMENT RÉUSSI!"
    echo "======================================================================"
    echo ""
    echo "🌐 Site accessible sur: https://powalyze.com"
    echo ""
else
    echo ""
    echo "======================================================================"
    echo "❌ ERREUR DE CONNEXION"
    echo "======================================================================"
    echo ""
    echo "⚠️  Upload manuel requis. Utilise le File Manager Hostinger:"
    echo ""
    echo "1. Va sur: https://hpanel.hostinger.com"
    echo "2. Clique: Files → File Manager"
    echo "3. Navigue vers: /domains/powalyze.com/public_html/"
    echo "4. Supprime tous les fichiers actuels"
    echo "5. Glisse-dépose tout le contenu de dist/"
    echo ""
fi
