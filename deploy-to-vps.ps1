# 🚀 SCRIPT DE DÉPLOIEMENT POWALYZE - HOSTINGER
# Pour Windows PowerShell
# Version: 1.0
# Date: 15.12.2025

# Configuration
$VPS_IP = "193.203.169.19"
$VPS_USER = "root"
$VPS_PASSWORD = $args[0]  # Passé en argument
$VPS_DOMAIN = "powalyze.com"
$VPS_PATH = "/var/www/powalyze.com"
$LOCAL_DIST = ".\dist"
$PROJECT_ROOT = Get-Location

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "🚀 DÉPLOIEMENT POWALYZE - HOSTINGER" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Vérification
if (-not (Test-Path $LOCAL_DIST)) {
    Write-Host "❌ Erreur: Le dossier 'dist' n'existe pas!" -ForegroundColor Red
    Write-Host "Exécutez: npm run build" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Dossier dist trouvé" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Configuration:" -ForegroundColor Yellow
Write-Host "  VPS IP: $VPS_IP"
Write-Host "  Utilisateur: $VPS_USER"
Write-Host "  Domaine: $VPS_DOMAIN"
Write-Host "  Path VPS: $VPS_PATH"
Write-Host ""

Write-Host "📁 Fichiers à déployer:" -ForegroundColor Yellow
Write-Host "  - dist/ (Production build - 4.7 MB)"
Write-Host "  - nginx.conf (Configuration NGINX)"
Write-Host ""

Write-Host "⚠️  Déploiement automatique en cours..." -ForegroundColor Yellow
Write-Host "(Suppression de la pause interactive)"
Write-Host ""

# Étape 1: Créer les répertoires
Write-Host "🔄 Étape 1/4: Création des répertoires VPS..." -ForegroundColor Cyan

$setupCmd = @"
set -e
mkdir -p /var/www/powalyze.com
echo "✅ Répertoires créés"
"@

$setupCmd | ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $VPS_USER@$VPS_IP 2>$null
Write-Host "✅ Répertoires VPS prêts" -ForegroundColor Green
Write-Host ""

# Étape 2: Transférer les fichiers
Write-Host "🔄 Étape 2/4: Transfert des fichiers (1-3 minutes)..." -ForegroundColor Cyan

# Compter les fichiers
$fileCount = (Get-ChildItem -Path $LOCAL_DIST -Recurse -File | Measure-Object).Count
Write-Host "  Fichiers à transférer: $fileCount" -ForegroundColor Gray

# Utiliser scp pour transférer
try {
    # Créer un script de transfert
    $scpCmd = @"
@echo off
for /r "$(Get-Location)\dist" %%F in (*) do (
    set "FILE=%%F"
    set "FILE=!FILE:$(Get-Location)\dist\=!"
    echo Transfert: !FILE!
)
"@
    
    # Alternative: Créer un zip et transférer
    Write-Host "  Préparation du fichier pour transfert..." -ForegroundColor Gray
    
    $zipPath = "$env:TEMP\powalyze-dist.zip"
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
    
    # Compresser
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::CreateFromDirectory($LOCAL_DIST, $zipPath)
    
    Write-Host "  Transfert du fichier ZIP..." -ForegroundColor Gray
    
    # Transférer et décompresser
    scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null `
        $zipPath "${VPS_USER}@${VPS_IP}:/tmp/powalyze-dist.zip" 2>$null
    
    # Décompresser sur le VPS
    $unzipCmd = @"
set -e
cd /tmp
unzip -q powalyze-dist.zip
mv dist/* /var/www/powalyze.com/
rm -rf dist powalyze-dist.zip
echo "✅ Fichiers décompressés et placés"
"@
    
    $unzipCmd | ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "${VPS_USER}@${VPS_IP}" 2>$null
    
    Write-Host "✅ Fichiers transférés et déployés" -ForegroundColor Green
    Remove-Item $zipPath -Force
}
catch {
    Write-Host "⚠️  Transfert alternative..." -ForegroundColor Yellow
    # Transférer récursivement avec scp
    scp -r -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null `
        "$LOCAL_DIST\*" "${VPS_USER}@${VPS_IP}:/var/www/powalyze.com/" 2>$null
    Write-Host "✅ Fichiers transférés" -ForegroundColor Green
}

Write-Host ""

# Étape 3: Configurer NGINX
Write-Host "🔄 Étape 3/4: Configuration NGINX..." -ForegroundColor Cyan

$nginxConfig = @"
server {
    listen 80;
    listen [::]:80;
    
    server_name powalyze.com www.powalyze.com 193.203.169.19;
    
    root /var/www/powalyze.com;
    index index.html;
    
    # Compression gzip
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
        try_files \$uri \$uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
"@

$nginxSetupCmd = @"
set -e

# Installer NGINX
if ! command -v nginx &> /dev/null; then
    apt-get update
    apt-get install -y nginx
fi

# Créer la configuration
cat > /etc/nginx/sites-available/powalyze.com << 'NGINX_EOF'
$nginxConfig
NGINX_EOF

# Activer le site
ln -sf /etc/nginx/sites-available/powalyze.com /etc/nginx/sites-enabled/

# Supprimer la config par défaut
rm -f /etc/nginx/sites-enabled/default

# Tester
nginx -t

# Redémarrer NGINX
systemctl restart nginx

echo "✅ NGINX configuré"
"@

$nginxSetupCmd | ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $VPS_USER@$VPS_IP 2>$null

Write-Host "✅ NGINX configuré et redémarré" -ForegroundColor Green
Write-Host ""

# Étape 4: Permissions
Write-Host "🔄 Étape 4/4: Correction des permissions..." -ForegroundColor Cyan

$permCmd = @"
chown -R www-data:www-data /var/www/powalyze.com
chmod -R 755 /var/www/powalyze.com
echo "✅ Permissions corrigées"
"@

$permCmd | ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $VPS_USER@$VPS_IP 2>$null

Write-Host "✅ Permissions corrigées" -ForegroundColor Green
Write-Host ""

# Succès
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ DÉPLOIEMENT RÉUSSI!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "🌐 Votre site est maintenant en ligne:" -ForegroundColor Yellow
Write-Host "  ➜ http://193.203.169.19" -ForegroundColor Cyan
Write-Host "  ➜ http://powalyze.com (après config DNS)" -ForegroundColor Cyan
Write-Host "  ➜ http://www.powalyze.com (après config DNS)" -ForegroundColor Cyan
Write-Host ""

Write-Host "⏱️  Attendez 2-5 minutes pour la propagation DNS" -ForegroundColor Gray
Write-Host ""

Write-Host "📋 Prochaines étapes:" -ForegroundColor Yellow
Write-Host "  1. Accédez à http://193.203.169.19 pour vérifier" -ForegroundColor White
Write-Host "  2. Configurez un certificat SSL (Let's Encrypt gratuit)" -ForegroundColor White
Write-Host "  3. Pointez votre domaine vers 193.203.169.19" -ForegroundColor White
Write-Host ""

Write-Host "🔒 Pour SSL (Let's Encrypt):" -ForegroundColor Yellow
Write-Host "  ssh root@193.203.169.19" -ForegroundColor Cyan
Write-Host "  apt-get install -y certbot python3-certbot-nginx" -ForegroundColor Cyan
Write-Host "  certbot --nginx -d powalyze.com -d www.powalyze.com" -ForegroundColor Cyan
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
