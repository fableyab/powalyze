# Script de Déploiement Powalyze
# Date: 12 janvier 2026

Write-Host "🚀 DÉPLOIEMENT POWALYZE" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Gray
Write-Host ""

# Étape 1: Vérifier l'état Git
Write-Host "📋 Étape 1: Vérification de l'état Git..." -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "✅ Changements commités localement" -ForegroundColor Green
Write-Host "   Commit: fix vercel.json to use build:full" -ForegroundColor Gray
Write-Host ""

# Étape 2: Solutions de déploiement
Write-Host "🔧 Étape 2: Options de déploiement disponibles" -ForegroundColor Yellow
Write-Host ""

Write-Host "OPTION A - Push GitHub (RECOMMANDÉ)" -ForegroundColor Cyan
Write-Host "   1. Configurez l'authentification GitHub:" -ForegroundColor White
Write-Host "      git config credential.helper wincred" -ForegroundColor Gray
Write-Host "   2. Ou créez un Personal Access Token sur:" -ForegroundColor White
Write-Host "      https://github.com/settings/tokens" -ForegroundColor Blue -NoNewline
Write-Host " (classic token avec repo access)" -ForegroundColor Gray
Write-Host "   3. Puis:" -ForegroundColor White
Write-Host "      git push origin main" -ForegroundColor Gray
Write-Host ""

Write-Host "OPTION B - Interface Vercel (RAPIDE)" -ForegroundColor Cyan
Write-Host "   1. Allez sur:" -ForegroundColor White
Write-Host "      https://vercel.com/powalyze" -ForegroundColor Blue
Write-Host "   2. Cliquez sur Deployments" -ForegroundColor White
Write-Host "   3. Dernier déploiement > ⋯ > Redeploy" -ForegroundColor White
Write-Host "   4. ⚠️  DÉCOCHEZ 'Use existing Build Cache'" -ForegroundColor Red
Write-Host "   5. Cliquez 'Redeploy'" -ForegroundColor White
Write-Host ""

Write-Host "OPTION C - Vercel CLI avec build pré-compilé" -ForegroundColor Cyan
Write-Host "   1. Build local:" -ForegroundColor White
Write-Host "      npm run build:full" -ForegroundColor Gray
Write-Host "   2. Déployer le dossier dist uniquement:" -ForegroundColor White
Write-Host "      vercel --prod --prebuilt" -ForegroundColor Gray
Write-Host ""

# Étape 3: Vérification post-déploiement
Write-Host "📊 Étape 3: Après le déploiement" -ForegroundColor Yellow
Write-Host "   1. Attendre 2-5 minutes (propagation)" -ForegroundColor White
Write-Host "   2. Vider le cache DNS:" -ForegroundColor White
Write-Host "      ipconfig /flushdns" -ForegroundColor Gray
Write-Host "   3. Tester en navigation privée:" -ForegroundColor White
Write-Host "      chrome.exe --incognito https://www.powalyze.com" -ForegroundColor Gray
Write-Host ""

Write-Host "=" * 50 -ForegroundColor Gray
Write-Host ""

# Menu interactif
Write-Host "Que voulez-vous faire ?" -ForegroundColor Cyan
Write-Host "  [A] Configurer Git et Push" -ForegroundColor White
Write-Host "  [B] Ouvrir interface Vercel" -ForegroundColor White
Write-Host "  [C] Build local + déploiement dist" -ForegroundColor White
Write-Host "  [Q] Quitter" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Votre choix"

switch ($choice.ToUpper()) {
    "A" {
        Write-Host ""
        Write-Host "🔐 Configuration Git..." -ForegroundColor Yellow
        git config credential.helper wincred
        Write-Host "✅ Credential helper configuré" -ForegroundColor Green
        Write-Host ""
        Write-Host "📤 Push vers GitHub..." -ForegroundColor Yellow
        git push origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Push réussi ! Vercel va auto-déployer." -ForegroundColor Green
            Write-Host "   Suivez le déploiement sur: https://vercel.com/powalyze" -ForegroundColor Blue
        } else {
            Write-Host "❌ Échec du push. Utilisez l'OPTION B (interface Vercel)" -ForegroundColor Red
        }
    }
    "B" {
        Write-Host ""
        Write-Host "🌐 Ouverture de Vercel..." -ForegroundColor Yellow
        Start-Process "https://vercel.com/powalyze"
        Write-Host "✅ Interface ouverte dans le navigateur" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠️  N'oubliez pas de DÉCOCHER 'Use existing Build Cache' !" -ForegroundColor Red
    }
    "C" {
        Write-Host ""
        Write-Host "🔨 Build local en cours..." -ForegroundColor Yellow
        npm run build:full
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Build réussi" -ForegroundColor Green
            Write-Host ""
            Write-Host "📤 Déploiement du dossier dist..." -ForegroundColor Yellow
            vercel --prod --prebuilt
        } else {
            Write-Host "❌ Échec du build" -ForegroundColor Red
        }
    }
    "Q" {
        Write-Host "Bye! 👋" -ForegroundColor Gray
    }
    default {
        Write-Host "❌ Choix invalide" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📖 Voir VERCEL_DEPLOYMENT_FIX.md pour plus de détails" -ForegroundColor Gray
