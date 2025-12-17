# ====================================================================
# 🚀 DÉPLOIEMENT AUTOMATIQUE POWALYZE SUR HOSTINGER VPS
# ====================================================================
# Usage: .\deploy-hostinger.ps1
# ====================================================================

$ErrorActionPreference = "Continue"

# Configuration
$SshUser = "u356833578"
$SshHost = "217.21.72.245"
$SshPassword = "A@pple2026A@pple2026"
$RemotePath = "/home/u356833578/domains/powalyze.com/public_html/"
$LocalPath = ".\dist"

Write-Host ""
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "🚀 DÉPLOIEMENT POWALYZE SUR HOSTINGER" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier que le dossier dist existe
if (-Not (Test-Path $LocalPath)) {
    Write-Host "❌ ERREUR: Le dossier dist n'existe pas!" -ForegroundColor Red
    Write-Host "   Exécutez d'abord: npm run build" -ForegroundColor Yellow
    exit 1
}

$fileCount = (Get-ChildItem -Path $LocalPath -Recurse -File).Count
Write-Host "✅ $fileCount fichiers trouvés dans dist/" -ForegroundColor Green
Write-Host ""

# Créer un script batch temporaire pour automatiser le mot de passe
$batchScript = @"
@echo off
echo Deploiement en cours...
cd /d "$PWD"
for /R dist %%f in (*) do (
    echo %%f | findstr /C:"dist\" >nul
    if not errorlevel 1 (
        set "file=%%f"
        set "file=!file:$PWD\dist\=!"
        echo Uploading: !file!
    )
)
"@

Write-Host "📤 Démarrage du transfert des fichiers..." -ForegroundColor Yellow
Write-Host ""

# Utiliser PSCP (PuTTY SCP) si disponible avec mot de passe
$pscpPath = "C:\Program Files\PuTTY\pscp.exe"
if (Test-Path $pscpPath) {
    Write-Host "✅ PSCP trouvé, utilisation de PuTTY SCP..." -ForegroundColor Green
    & $pscpPath -batch -r -pw $SshPassword "$LocalPath\*" "${SshUser}@${SshHost}:${RemotePath}"
} else {
    Write-Host "⚠️  PSCP non trouvé. Installation de WinSCP..." -ForegroundColor Yellow
    
    # Télécharger WinSCP portable si pas installé
    $winscpUrl = "https://winscp.net/download/WinSCP-5.21.7-Portable.zip"
    $winscpZip = ".\winscp.zip"
    $winscpDir = ".\winscp"
    
    if (-Not (Test-Path $winscpDir)) {
        Write-Host "📥 Téléchargement de WinSCP..." -ForegroundColor Yellow
        try {
            Invoke-WebRequest -Uri $winscpUrl -OutFile $winscpZip -UseBasicParsing
            Expand-Archive -Path $winscpZip -DestinationPath $winscpDir -Force
            Remove-Item $winscpZip
            Write-Host "✅ WinSCP téléchargé" -ForegroundColor Green
        } catch {
            Write-Host "❌ Erreur lors du téléchargement de WinSCP" -ForegroundColor Red
            Write-Host $_.Exception.Message -ForegroundColor Red
            exit 1
        }
    }
    
    # Créer un script WinSCP
    $winscpScript = @"
option batch abort
option confirm off
open sftp://${SshUser}:${SshPassword}@${SshHost}/ -hostkey=*
cd ${RemotePath}
lcd ${LocalPath}
put -delete *
exit
"@
    
    $scriptPath = ".\winscp_deploy.txt"
    $winscpScript | Out-File -FilePath $scriptPath -Encoding ASCII
    
    # Exécuter WinSCP
    $winscpExe = Join-Path $winscpDir "WinSCP.com"
    if (Test-Path $winscpExe) {
        Write-Host "📤 Transfert via WinSCP..." -ForegroundColor Yellow
        & $winscpExe /script=$scriptPath
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Déploiement réussi!" -ForegroundColor Green
        } else {
            Write-Host "❌ Erreur lors du déploiement" -ForegroundColor Red
            exit 1
        }
        
        Remove-Item $scriptPath -Force
    } else {
        Write-Host "❌ WinSCP.com introuvable" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "✅ DÉPLOIEMENT TERMINÉ!" -ForegroundColor Green
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Site accessible sur: https://powalyze.com" -ForegroundColor Green
Write-Host ""
