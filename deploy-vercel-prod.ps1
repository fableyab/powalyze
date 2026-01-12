# Script de déploiement Vercel Production
# Utilise les fichiers .vercelignore pour éviter les limites

Write-Host "`n🚀 DÉPLOIEMENT VERCEL PRODUCTION`n" -ForegroundColor Cyan

# 1. Vérifier .vercelignore
if (!(Test-Path ".vercelignore")) {
    Write-Host "❌ .vercelignore manquant!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ .vercelignore trouvé" -ForegroundColor Green

# 2. Build local
Write-Host "`n📦 Build local..." -ForegroundColor Yellow
npm run build 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build échoué!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build réussi" -ForegroundColor Green

# 3. Déploiement Vercel avec options optimisées
Write-Host "`n🌍 Déploiement vers Vercel..." -ForegroundColor Yellow

# Utiliser --prebuilt pour éviter de re-builder sur Vercel
vercel --prod --yes 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ DÉPLOIEMENT RÉUSSI!`n" -ForegroundColor Green
    Write-Host "🌐 Votre site sera en ligne dans 2-3 minutes sur:" -ForegroundColor Cyan
    Write-Host "   https://powalyze.com" -ForegroundColor White
    Write-Host "`n📝 Prochaines étapes:" -ForegroundColor Yellow
    Write-Host "   1. Attendez 2-3 minutes (propagation CDN)" -ForegroundColor Gray
    Write-Host "   2. Testez: https://powalyze.com" -ForegroundColor Gray
    Write-Host "   3. Vérifiez que la langue est en français" -ForegroundColor Gray
    Write-Host "   4. Exécutez FIX_RLS_INITIATIVES.sql sur Supabase`n" -ForegroundColor Gray
} else {
    Write-Host "`n❌ DÉPLOIEMENT ÉCHOUÉ!" -ForegroundColor Red
    Write-Host "`nOptions alternatives:" -ForegroundColor Yellow
    Write-Host "1. Utilisez l'interface Vercel: https://vercel.com/powalyze" -ForegroundColor White
    Write-Host "2. Créez un token GitHub et poussez les commits" -ForegroundColor White
    Write-Host "3. Contactez support Vercel si limite atteinte`n" -ForegroundColor White
}
