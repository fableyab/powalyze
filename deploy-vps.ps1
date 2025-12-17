# ====================================================================
# 🚀 SCRIPT DE DÉPLOIEMENT POWALYZE SUR VPS HOSTINGER
# ====================================================================
# Date: 15 Décembre 2025
# Usage: .\deploy-vps.ps1 -SshUser root -VpsIp 193.203.169.19
# ====================================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$SshUser = "root",
    
    [Parameter(Mandatory=$false)]
    [string]$VpsHost = "srv1196525.hstgr.cloud",
    
    [Parameter(Mandatory=$false)]
    [string]$VpsIp = "193.203.169.19",
    
    [Parameter(Mandatory=$false)]
    [string]$Domain = "powalyze.com",
    
    [Parameter(Mandatory=$false)]
    [string]$Email = "fabri@powalyze.com"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# ====================================================================
# CONFIGURATION
# ====================================================================
$LocalPath = ".\deploy_staging\powalyze.com"
$RemotePath = "/var/www/powalyze.com"
$SshTarget = "$SshUser@$VpsHost"

Write-Host ""
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "🚀 DÉPLOIEMENT POWALYZE SUR VPS" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Configuration:" -ForegroundColor Yellow
Write-Host "   • SSH User    : $SshUser" -ForegroundColor White
Write-Host "   • VPS Host    : $VpsHost" -ForegroundColor White
Write-Host "   • VPS IP      : $VpsIp" -ForegroundColor White
Write-Host "   • Domain      : $Domain" -ForegroundColor White
Write-Host "   • Email       : $Email" -ForegroundColor White
Write-Host "   • Local Path  : $LocalPath" -ForegroundColor White
Write-Host "   • Remote Path : $RemotePath" -ForegroundColor White
Write-Host ""

# ====================================================================
# ÉTAPE 1: VÉRIFIER FICHIERS LOCAUX
# ====================================================================
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "📦 ÉTAPE 1: Vérification des fichiers locaux" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

if (-Not (Test-Path $LocalPath)) {
    Write-Host "❌ ERREUR: Le dossier $LocalPath n'existe pas!" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Solution: Exécutez d'abord:" -ForegroundColor Yellow
    Write-Host "   .\tools\package-deploy.ps1" -ForegroundColor White
    Write-Host ""
    exit 1
}

$fileCount = (Get-ChildItem -Path $LocalPath -Recurse -File).Count
Write-Host "✅ $fileCount fichiers trouvés dans $LocalPath" -ForegroundColor Green
Write-Host ""

# ====================================================================
# ÉTAPE 2: TEST CONNEXION SSH
# ====================================================================
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "🔐 ÉTAPE 2: Test de connexion SSH" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "🔍 Test de connexion à $SshTarget..." -ForegroundColor Yellow

$testCommand = "echo 'SSH_OK'"
$result = ssh $SshTarget $testCommand 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Connexion SSH réussie!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "❌ ERREUR: Impossible de se connecter via SSH!" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Vérifiez:" -ForegroundColor Yellow
    Write-Host "   1. Votre nom d'utilisateur SSH est correct" -ForegroundColor White
    Write-Host "   2. Vous pouvez vous connecter: ssh $SshTarget" -ForegroundColor White
    Write-Host "   3. Votre mot de passe est correct" -ForegroundColor White
    Write-Host ""
    exit 1
}

# ====================================================================
# ÉTAPE 3: INSTALLATION DES DÉPENDANCES SUR LE VPS
# ====================================================================
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "📥 ÉTAPE 3: Installation NGINX et Certbot sur le VPS" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📦 Installation de NGINX..." -ForegroundColor Yellow
ssh $SshTarget "sudo apt-get update -qq && sudo apt-get install -y -qq nginx"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ NGINX installé" -ForegroundColor Green
} else {
    Write-Host "⚠️  NGINX peut-être déjà installé (ignoré)" -ForegroundColor Yellow
}

Write-Host "📦 Installation de Certbot pour SSL..." -ForegroundColor Yellow
ssh $SshTarget "sudo apt-get install -y -qq certbot python3-certbot-nginx"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Certbot installé" -ForegroundColor Green
} else {
    Write-Host "⚠️  Certbot peut-être déjà installé (ignoré)" -ForegroundColor Yellow
}
Write-Host ""

# ====================================================================
# ÉTAPE 4: CRÉATION DES DOSSIERS SUR LE VPS
# ====================================================================
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "📁 ÉTAPE 4: Création des dossiers sur le VPS" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📁 Création de $RemotePath..." -ForegroundColor Yellow
ssh $SshTarget "sudo mkdir -p $RemotePath && sudo chown -R `$USER:`$USER $RemotePath"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dossier créé avec les bonnes permissions" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "❌ ERREUR: Impossible de créer le dossier" -ForegroundColor Red
    exit 1
}

# ====================================================================
# ÉTAPE 5: UPLOAD DES FICHIERS
# ====================================================================
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "📤 ÉTAPE 5: Upload des fichiers vers le VPS" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📤 Upload en cours (cela peut prendre 1-2 minutes)..." -ForegroundColor Yellow
Write-Host ""

# Utiliser rsync si disponible, sinon scp
$rsyncTest = Get-Command rsync -ErrorAction SilentlyContinue

if ($rsyncTest) {
    Write-Host "🚀 Utilisation de rsync (plus rapide)..." -ForegroundColor Cyan
    rsync -avz --progress "$LocalPath/" "$SshTarget`:$RemotePath/"
} else {
    Write-Host "📦 Utilisation de SCP..." -ForegroundColor Cyan
    scp -r "$LocalPath\*" "$SshTarget`:$RemotePath/"
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Fichiers uploadés avec succès!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ ERREUR lors de l'upload" -ForegroundColor Red
    exit 1
}

# ====================================================================
# ÉTAPE 6: CONFIGURATION NGINX
# ====================================================================
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "⚙️  ÉTAPE 6: Configuration NGINX" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📝 Création de la configuration NGINX..." -ForegroundColor Yellow

# S'assurer que NGINX est le serveur actif et libérer le port 80 si OpenLiteSpeed tourne
ssh $SshTarget "sudo systemctl stop openlitespeed 2>/dev/null || true"
ssh $SshTarget "sudo systemctl enable --now nginx"

$nginxConfig = @"
server {
    listen 80;
    listen [::]:80;
    
    server_name $Domain www.$Domain;
    
    root $RemotePath;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA fallback
    location / {
        try_files `\$uri `\$uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # .htaccess not needed with nginx
    location ~ /\.ht {
        deny all;
    }
}
"@

# Écrire le fichier localement puis l'uploader
$nginxConfig | Out-File -FilePath ".\nginx-config-temp.conf" -Encoding UTF8 -NoNewline

scp ".\nginx-config-temp.conf" "$SshTarget`:/tmp/powalyze.conf"
Remove-Item ".\nginx-config-temp.conf" -Force

# Déployer la conf sous conf.d (chargée par défaut dans le bloc http)
ssh $SshTarget "sudo mv /tmp/powalyze.conf /etc/nginx/conf.d/powalyze.conf"

Write-Host "✅ Configuration NGINX créée" -ForegroundColor Green
Write-Host ""

Write-Host "🔍 Test de la configuration NGINX..." -ForegroundColor Yellow
ssh $SshTarget "sudo nginx -t"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Configuration NGINX valide" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "🔄 Redémarrage de NGINX..." -ForegroundColor Yellow
    ssh $SshTarget "sudo systemctl reload nginx"
    
    Write-Host "✅ NGINX redémarré" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "❌ ERREUR: Configuration NGINX invalide" -ForegroundColor Red
    exit 1
}

# ====================================================================
# ÉTAPE 7: INSTALLATION SSL (CERTBOT)
# ====================================================================
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "🔒 ÉTAPE 7: Installation du certificat SSL (Let's Encrypt)" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "⚠️  IMPORTANT: Le DNS de $Domain doit pointer vers $VpsIp" -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Vérifiez dans votre panel Hostinger:" -ForegroundColor White
Write-Host "   • Enregistrement A: $Domain → $VpsIp" -ForegroundColor White
Write-Host "   • Enregistrement A: www.$Domain → $VpsIp" -ForegroundColor White
Write-Host ""

$response = Read-Host "Le DNS est-il configuré? (o/N)"

if ($response -eq "o" -or $response -eq "O" -or $response -eq "oui") {
    Write-Host ""
    Write-Host "🔐 Installation du certificat SSL..." -ForegroundColor Yellow
    Write-Host ""
    
    ssh $SshTarget "sudo certbot --nginx -d $Domain -d www.$Domain --non-interactive --agree-tos --email $Email --redirect"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Certificat SSL installé avec succès!" -ForegroundColor Green
        Write-Host "✅ Redirection HTTPS automatique activée" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "⚠️  Impossible d'installer le SSL automatiquement" -ForegroundColor Yellow
        Write-Host "🔧 Vous pourrez le faire manuellement plus tard:" -ForegroundColor White
        Write-Host "   ssh $SshTarget" -ForegroundColor White
        Write-Host "   sudo certbot --nginx -d $Domain -d www.$Domain" -ForegroundColor White
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "⏭️  Installation SSL ignorée" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🔧 Pour installer le SSL plus tard:" -ForegroundColor White
    Write-Host "   1. Configurez le DNS dans Hostinger" -ForegroundColor White
    Write-Host "   2. Attendez la propagation (5-30 minutes)" -ForegroundColor White
    Write-Host "   3. Exécutez sur le VPS:" -ForegroundColor White
    Write-Host "      sudo certbot --nginx -d $Domain -d www.$Domain" -ForegroundColor White
    Write-Host ""
}

# ====================================================================
# RÉSUMÉ FINAL
# ====================================================================
Write-Host "=====================================================================" -ForegroundColor Green
Write-Host "✅ DÉPLOIEMENT TERMINÉ!" -ForegroundColor Green
Write-Host "=====================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Votre site est accessible sur:" -ForegroundColor Yellow
Write-Host "   • http://$VpsIp (IP directe)" -ForegroundColor White
Write-Host "   • http://$Domain (si DNS configuré)" -ForegroundColor White
if ($response -eq "o" -or $response -eq "O" -or $response -eq "oui") {
    Write-Host "   • https://$Domain (avec SSL)" -ForegroundColor White
}
Write-Host ""
Write-Host "📋 Commandes utiles:" -ForegroundColor Yellow
Write-Host "   • Voir logs NGINX: ssh $SshTarget 'sudo tail -f /var/log/nginx/error.log'" -ForegroundColor White
Write-Host "   • Redémarrer NGINX: ssh $SshTarget 'sudo systemctl restart nginx'" -ForegroundColor White
Write-Host "   • Test NGINX: ssh $SshTarget 'sudo nginx -t'" -ForegroundColor White
Write-Host ""
Write-Host "🔄 Pour mettre à jour le site:" -ForegroundColor Yellow
Write-Host "   1. npm run build" -ForegroundColor White
Write-Host "   2. .\tools\package-deploy.ps1" -ForegroundColor White
Write-Host "   3. .\deploy-vps.ps1 -SshUser $SshUser" -ForegroundColor White
Write-Host ""
Write-Host "=====================================================================" -ForegroundColor Green
Write-Host ""
