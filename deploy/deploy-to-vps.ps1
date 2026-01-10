# Deploy Metabase to VPS - Windows PowerShell Script
# Run: .\deploy-to-vps.ps1

$VPS_IP = "193.203.169.19"
$VPS_USER = "root"

Write-Host "🚀 Déploiement Metabase sur VPS $VPS_IP" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

# 1. Copy files to VPS
Write-Host "📤 Upload des scripts vers VPS..." -ForegroundColor Yellow

scp deploy/metabase-vps-install.sh ${VPS_USER}@${VPS_IP}:/root/
scp deploy/nginx-metabase.conf ${VPS_USER}@${VPS_IP}:/root/
scp deploy/install-nginx.sh ${VPS_USER}@${VPS_IP}:/root/

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Scripts uploadés avec succès!" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de l'upload" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Prochaines étapes:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Connectez-vous au VPS:"
Write-Host "   ssh root@$VPS_IP" -ForegroundColor White
Write-Host ""
Write-Host "2. Rendez les scripts exécutables:"
Write-Host "   chmod +x /root/metabase-vps-install.sh /root/install-nginx.sh" -ForegroundColor White
Write-Host ""
Write-Host "3. Lancez l'installation Metabase:"
Write-Host "   /root/metabase-vps-install.sh" -ForegroundColor White
Write-Host ""
Write-Host "4. (Optionnel) Installez Nginx:"
Write-Host "   /root/install-nginx.sh" -ForegroundColor White
Write-Host ""
Write-Host "5. Accédez à Metabase:"
Write-Host "   http://$VPS_IP:3000" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "📖 Guide complet: deploy/README-VPS-DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""

# Ask if user wants to connect directly
$connect = Read-Host "Voulez-vous vous connecter au VPS maintenant? (o/n)"
if ($connect -eq "o" -or $connect -eq "O") {
    Write-Host ""
    Write-Host "🔐 Connexion SSH..." -ForegroundColor Yellow
    ssh root@$VPS_IP
}
