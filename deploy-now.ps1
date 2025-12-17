#!/usr/bin/env pwsh
# Script de déploiement POWALYZE vers VPS
# Usage: .\deploy-now.ps1

$ErrorActionPreference = 'Continue'

Write-Host "`n╔═══════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   DÉPLOIEMENT POWALYZE vers VPS         ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Vérifier que l'archive existe
$archivePath = "$env:TEMP\powalyze.tar.gz"
if (-not (Test-Path $archivePath)) {
    Write-Host "❌ Archive non trouvée: $archivePath" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Archive trouvée: $archivePath" -ForegroundColor Green

# Demander le mot de passe
$pass = Read-Host -AsSecureString "`nMot de passe VPS root@193.203.169.19"
$cred = New-Object System.Management.Automation.PSCredential("root", $pass)

Write-Host "`n📤 Transfert de l'archive..." -ForegroundColor Yellow

# Utiliser pscp si disponible, sinon instructions manuelles
$pscpPath = where.exe pscp 2>$null
$scpPath = where.exe scp 2>$null

if ($pscpPath) {
    Write-Host "✓ Utilisation de pscp" -ForegroundColor Green
    # Créer fichier temporaire avec mot de passe (méthode non sécurisée mais pratique)
    $plainPass = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($pass))
    echo "y" | pscp -pw $plainPass $archivePath root@193.203.169.19:/tmp/
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Fichier transféré" -ForegroundColor Green
        Write-Host "🚀 Déploiement en cours..." -ForegroundColor Yellow
        
        # Exécuter commandes de déploiement
        $cmd = "cd /var/www/powalyze.com && rm -rf * && tar -xzf /tmp/powalyze.tar.gz && chown -R www-data:www-data . && systemctl reload nginx && echo 'DEPLOYED'"
        echo $plainPass | plink -batch -pw $plainPass root@193.203.169.19 $cmd
        
        Write-Host "`n✅ DÉPLOIEMENT RÉUSSI !`n" -ForegroundColor Green
        Write-Host "🌐 Site disponible sur: https://powalyze.com" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Échec du transfert" -ForegroundColor Red
        exit 1
    }
    
} elseif ($scpPath) {
    Write-Host "✓ Utilisation de scp/ssh natif" -ForegroundColor Green
    Write-Host "`n⚠ Entrez le mot de passe VPS quand demandé:`n" -ForegroundColor Yellow
    
    # Transférer avec scp
    scp -o StrictHostKeyChecking=no $archivePath root@193.203.169.19:/tmp/
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ Fichier transféré" -ForegroundColor Green
        Write-Host "🚀 Déploiement en cours...`n" -ForegroundColor Yellow
        
        # Déployer avec ssh
        ssh -o StrictHostKeyChecking=no root@193.203.169.19 "cd /var/www/powalyze.com && rm -rf * && tar -xzf /tmp/powalyze.tar.gz && chown -R www-data:www-data . && systemctl reload nginx && echo 'DEPLOYED'"
        
        Write-Host "`n✅ DÉPLOIEMENT RÉUSSI !`n" -ForegroundColor Green
        Write-Host "🌐 Site disponible sur: https://powalyze.com" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Échec du transfert" -ForegroundColor Red
        exit 1
    }
    
} else {
    Write-Host "⚠ Module Posh-SSH non disponible" -ForegroundColor Yellow
    Write-Host "`n📋 Commandes manuelles à exécuter:`n" -ForegroundColor Cyan
    
    Write-Host "1️⃣  Transférer l'archive:" -ForegroundColor White
    Write-Host "   scp `"$archivePath`" root@193.203.169.19:/tmp/`n" -ForegroundColor Gray
    
    Write-Host "2️⃣  Se connecter au VPS:" -ForegroundColor White
    Write-Host "   ssh root@193.203.169.19`n" -ForegroundColor Gray
    
    Write-Host "3️⃣  Déployer:" -ForegroundColor White
    Write-Host @"
   cd /var/www/powalyze.com
   rm -rf *
   tar -xzf /tmp/powalyze.tar.gz
   chown -R www-data:www-data .
   systemctl reload nginx

"@ -ForegroundColor Gray
    
    Write-Host "Puis vérifier: https://powalyze.com`n" -ForegroundColor Cyan
}
