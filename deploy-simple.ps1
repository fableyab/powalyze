#!/usr/bin/env pwsh
# Script de déploiement POWALYZE - Version simplifiée
# Usage: .\deploy-simple.ps1

Write-Host "`n╔═══════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   DÉPLOIEMENT POWALYZE vers VPS         ║" -ForegroundColor Cyan  
Write-Host "╚═══════════════════════════════════════════╝`n" -ForegroundColor Cyan

$archivePath = "$env:TEMP\powalyze.tar.gz"

if (-not (Test-Path $archivePath)) {
    Write-Host "❌ Archive non trouvée: $archivePath" -ForegroundColor Red
    Write-Host "Exécutez d'abord: cd dist; tar -czf `$env:TEMP\powalyze.tar.gz .`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Archive trouvée`n" -ForegroundColor Green

Write-Host "📤 ÉTAPE 1: Transfert vers VPS" -ForegroundColor Yellow
Write-Host "   (Entrez le mot de passe VPS quand demandé)`n" -ForegroundColor Gray
scp -o StrictHostKeyChecking=no "$archivePath" root@193.203.169.19:/tmp/

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Échec du transfert`n" -ForegroundColor Red
    exit 1
}

Write-Host "`n✓ Transfert terminé`n" -ForegroundColor Green

Write-Host "🚀 ÉTAPE 2: Déploiement sur VPS" -ForegroundColor Yellow
Write-Host "   (Entrez à nouveau le mot de passe VPS)`n" -ForegroundColor Gray

$deployCmd = @"
cd /var/www/powalyze.com && \
rm -rf * && \
tar -xzf /tmp/powalyze.tar.gz && \
chown -R www-data:www-data . && \
chmod -R 755 . && \
systemctl reload nginx && \
ls -lah && \
echo '' && \
echo '✅ DÉPLOYÉ !' && \
echo '🌐 https://powalyze.com'
"@

ssh -o StrictHostKeyChecking=no root@193.203.169.19 $deployCmd

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n╔═══════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║     ✅ DÉPLOIEMENT RÉUSSI !             ║" -ForegroundColor Green
    Write-Host "╚═══════════════════════════════════════════╝`n" -ForegroundColor Green
    Write-Host "🌐 Votre site est en ligne: " -NoNewline -ForegroundColor Cyan
    Write-Host "https://powalyze.com`n" -ForegroundColor White
} else {
    Write-Host "`n❌ Erreur lors du déploiement`n" -ForegroundColor Red
    exit 1
}
