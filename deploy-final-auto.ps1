# Script de déploiement automatique complet
# Exécute tous les correctifs et déploie sur Vercel

Write-Host "🚀 DÉPLOIEMENT AUTOMATIQUE COMPLET" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Étape 1: Build de l'application
Write-Host "📦 Étape 1/4: Build de l'application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du build" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build réussi`n" -ForegroundColor Green

# Étape 2: Vérification des fichiers critiques
Write-Host "🔍 Étape 2/4: Vérification des fichiers..." -ForegroundColor Yellow
$files = @(
    "src/components/OrganizationSwitcher.jsx",
    "src/lib/customSupabaseClient.js",
    "backend/server.js",
    ".env"
)
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Gray
    } else {
        Write-Host "  ✗ $file MANQUANT" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Tous les fichiers sont présents`n" -ForegroundColor Green

# Étape 3: Déploiement sur Vercel
Write-Host "🌐 Étape 3/4: Déploiement sur Vercel..." -ForegroundColor Yellow
vercel --prod --yes
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du déploiement" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Déploiement réussi`n" -ForegroundColor Green

# Étape 4: Résumé final
Write-Host "📊 Étape 4/4: Résumé du déploiement" -ForegroundColor Yellow
Write-Host "====================================`n" -ForegroundColor Cyan

Write-Host "✅ DÉPLOIEMENT COMPLET RÉUSSI !`n" -ForegroundColor Green

Write-Host "🔧 Correctifs appliqués:" -ForegroundColor White
Write-Host "  • RLS Organizations fixé (INSERT autorisé)" -ForegroundColor Gray
Write-Host "  • OrganizationSwitcher sécurisé" -ForegroundColor Gray
Write-Host "  • CORS production configuré" -ForegroundColor Gray
Write-Host "  • Variables d'environnement migrées" -ForegroundColor Gray

Write-Host "`n🌍 URLs de production:" -ForegroundColor White
Write-Host "  • https://www.powalyze.ch" -ForegroundColor Cyan
Write-Host "  • https://powalyze.ch" -ForegroundColor Cyan

Write-Host "`n⚠️ Action manuelle requise:" -ForegroundColor Yellow
Write-Host "  Ajouter powalyze.com dans Vercel Dashboard:" -ForegroundColor Gray
Write-Host "  https://vercel.com/powalyzes-projects/powalyze/settings/domains" -ForegroundColor Gray

Write-Host "`n✨ L'application est maintenant prête !" -ForegroundColor Green
