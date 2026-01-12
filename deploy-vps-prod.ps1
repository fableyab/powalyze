#!/usr/bin/env pwsh
# Déploiement Powalyze React sur VPS - Production
# Usage: .\deploy-vps-prod.ps1

param(
    [string]$VpsIp = "193.203.169.19",
    [string]$VpsUser = "root",
    [string]$Domain = "powalyze.com",
    [string]$AppPath = "/var/www/powalyze"
)

$ErrorActionPreference = "Stop"

Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🚀 DÉPLOIEMENT POWALYZE - PRODUCTION  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 VPS: $VpsIp" -ForegroundColor Yellow
Write-Host "🌐 Domaine: $Domain" -ForegroundColor Yellow
Write-Host "📁 Chemin: $AppPath" -ForegroundColor Yellow
Write-Host ""

# Vérifier prérequis
Write-Host "🔍 Vérification des prérequis..." -ForegroundColor Cyan
$prerequisites = @("ssh", "scp", "git")
foreach ($tool in $prerequisites) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        Write-Host "❌ $tool non trouvé!" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Tous les outils sont présents" -ForegroundColor Green
Write-Host ""

# Vérifier build
if (-not (Test-Path "./dist")) {
    Write-Host "❌ Le build n'existe pas! Lancez 'npm run build' d'abord." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build React présent" -ForegroundColor Green
Write-Host ""

# 1. Compresser le build
Write-Host "📦 Compression du build..." -ForegroundColor Cyan
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$zipPath = "./dist-$timestamp.tar.gz"
try {
    tar -czf $zipPath -C . dist
    Write-Host "✅ Build compressé: $zipPath" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors de la compression" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 2. Upload vers VPS
Write-Host "📤 Upload vers VPS ($VpsIp)..." -ForegroundColor Cyan
try {
    scp -r $zipPath "${VpsUser}@${VpsIp}:/tmp/"
    Write-Host "✅ Build uploadé avec succès" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur SSH: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 3. Extraction et déploiement sur VPS
Write-Host "🔧 Déploiement sur VPS..." -ForegroundColor Cyan
$remoteFileName = Split-Path $zipPath -Leaf

$bashScript = @"
#!/bin/bash
set -e

APP_PATH='$AppPath'
BUILD_FILE="/tmp/$remoteFileName"
DOMAIN='$Domain'
BACKUP_PATH="/var/backups/powalyze-\$(date +%Y%m%d-%H%M%S)"

echo "═══════════════════════════════════════════════"
echo "🚀 Déploiement sur VPS"
echo "═══════════════════════════════════════════════"

# 1. Créer répertoires
echo "📁 Création des répertoires..."
mkdir -p "\$APP_PATH"
mkdir -p "/var/backups"

# 2. Backup de l'ancienne version
if [ -d "\$APP_PATH/dist" ]; then
    echo "💾 Backup de l'ancienne version..."
    cp -r "\$APP_PATH/dist" "\$BACKUP_PATH" || true
fi

# 3. Extraire la nouvelle version
echo "📦 Extraction du build..."
cd "\$APP_PATH"
tar -xzf "\$BUILD_FILE"

# 4. Vérifier si Nginx existe
if ! command -v nginx &> /dev/null; then
    echo "⚠️  Nginx non installé, installation..."
    apt-get update && apt-get install -y nginx || true
fi

# 5. Configurer Nginx
echo "⚙️  Configuration Nginx..."
mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

cat > /etc/nginx/sites-available/\$DOMAIN << 'NGINXEOF'
server {
    listen 80;
    listen [::]:80;
    server_name $Domain www.$Domain;
    root $AppPath/dist;
    index index.html;

    # Compression gzip
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript application/json;
    gzip_min_length 1000;

    # Cache pour assets statiques
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - reroute vers index.html
    location / {
        try_files \$uri \$uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, max-age=3600";
    }

    # Logs
    access_log /var/log/nginx/powalyze-access.log;
    error_log /var/log/nginx/powalyze-error.log;
}
NGINXEOF

# 6. Activer le site Nginx
echo "🔗 Activation du site Nginx..."
ln -sf /etc/nginx/sites-available/\$DOMAIN /etc/nginx/sites-enabled/ || true
rm -f /etc/nginx/sites-enabled/default || true

# 7. Tester config Nginx
echo "✅ Test de la configuration Nginx..."
nginx -t || { echo "❌ Erreur Nginx!"; exit 1; }

# 8. Redémarrer Nginx
echo "🔄 Redémarrage de Nginx..."
systemctl restart nginx || service nginx restart || true

# 9. Nettoyage
echo "🧹 Nettoyage..."
rm -f "\$BUILD_FILE"

echo ""
echo "═══════════════════════════════════════════════"
echo "✅ DÉPLOIEMENT RÉUSSI!"
echo "═══════════════════════════════════════════════"
echo ""
echo "🌐 Application disponible à: http://\$DOMAIN"
echo "📊 Logs Nginx:"
echo "   Access: /var/log/nginx/powalyze-access.log"
echo "   Error: /var/log/nginx/powalyze-error.log"
echo ""
echo "💾 Backup: \$BACKUP_PATH"
echo ""
"@

# Exécuter le script bash via SSH
try {
    $bashScript | ssh "${VpsUser}@${VpsIp}" "bash -s"
    Write-Host "✅ Déploiement exécuté avec succès" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur lors du déploiement: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║     ✅ DÉPLOIEMENT TERMINÉ!           ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Application disponible à: http://$Domain" -ForegroundColor Cyan
Write-Host "📝 Vérifiez les logs: ssh root@$VpsIp" -ForegroundColor Cyan
Write-Host "   tail -f /var/log/nginx/powalyze-error.log" -ForegroundColor Cyan
Write-Host ""

# Nettoyage local
Write-Host "🧹 Nettoyage des fichiers temporaires..." -ForegroundColor Cyan
Remove-Item -Path $zipPath -Force -ErrorAction SilentlyContinue
Write-Host "✅ Nettoyage terminé" -ForegroundColor Green
Write-Host ""
