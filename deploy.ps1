# Script PowerShell de déploiement pour Powalyze
# Pour Windows

Write-Host "🚀 Déploiement de Powalyze" -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan
Write-Host ""

# 1. Vérifier que le build existe
if (-not (Test-Path "dist")) {
    Write-Host "❌ Erreur: Le dossier dist/ n'existe pas" -ForegroundColor Red
    Write-Host "   Exécutez d'abord: npm run build" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Dossier dist/ trouvé" -ForegroundColor Green
Write-Host ""

# 2. Variables à configurer
$ServerUser = "votre_user"
$ServerHost = "votre_serveur.ch"
$ServerPath = "/var/www/powalyze.ch"

Write-Host "📦 Configuration:" -ForegroundColor Cyan
Write-Host "   Serveur: $ServerHost"
Write-Host "   Chemin: $ServerPath"
Write-Host ""

# 3. Options de déploiement
Write-Host "Choisissez une méthode de déploiement:" -ForegroundColor Yellow
Write-Host "1. FTP/SFTP (FileZilla, WinSCP)"
Write-Host "2. Netlify (drag & drop)"
Write-Host "3. Vercel (CLI)"
Write-Host "4. SSH/SCP (serveur dédié)"
Write-Host ""

$choice = Read-Host "Votre choix (1-4)"

switch ($choice) {
    "1" {
        Write-Host "📂 Ouvrez FileZilla ou WinSCP et uploadez le contenu de dist/" -ForegroundColor Green
        Start-Process "explorer.exe" -ArgumentList "dist"
    }
    "2" {
        Write-Host "🌐 Déploiement sur Netlify..." -ForegroundColor Green
        if (Get-Command netlify -ErrorAction SilentlyContinue) {
            netlify deploy --prod --dir=dist
        } else {
            Write-Host "⚠️  Netlify CLI non installé. Installez avec: npm install -g netlify-cli" -ForegroundColor Yellow
            Write-Host "   Ou utilisez le drag & drop sur netlify.com" -ForegroundColor Yellow
            Start-Process "https://app.netlify.com/drop"
        }
    }
    "3" {
        Write-Host "🔺 Déploiement sur Vercel..." -ForegroundColor Green
        if (Get-Command vercel -ErrorAction SilentlyContinue) {
            vercel --prod
        } else {
            Write-Host "⚠️  Vercel CLI non installé. Installez avec: npm install -g vercel" -ForegroundColor Yellow
        }
    }
    "4" {
        Write-Host "🔐 Déploiement SSH..." -ForegroundColor Green
        Write-Host "   Commande: scp -r dist/* $ServerUser@$ServerHost`:$ServerPath/" -ForegroundColor Yellow
        Write-Host "   Ou utilisez WinSCP pour une interface graphique" -ForegroundColor Yellow
    }
    default {
        Write-Host "❌ Choix invalide" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Instructions affichées!" -ForegroundColor Green
Write-Host "📖 Consultez BUILD_REPORT.md pour plus de détails" -ForegroundColor Cyan
