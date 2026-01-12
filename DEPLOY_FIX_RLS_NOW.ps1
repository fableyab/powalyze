# =====================================================
# DÉPLOIEMENT FIX RLS - CORRECTION IMMÉDIATE
# =====================================================

Write-Host "`n🔧 DÉPLOIEMENT FIX RLS ORGANIZATIONS" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

# Étape 1: Build avec corrections
Write-Host "📦 Étape 1: Build du projet..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build échoué!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build réussi" -ForegroundColor Green
Write-Host ""

# Étape 2: Instructions SQL
Write-Host "🗄️  Étape 2: FIX SQL SUPABASE (ACTION MANUELLE REQUISE)" -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: Vous devez exécuter le SQL manuellement:" -ForegroundColor Red
Write-Host ""
Write-Host "1. Ouvrez Supabase Dashboard:" -ForegroundColor White
Write-Host "   https://app.supabase.com" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Sélectionnez votre projet Powalyze" -ForegroundColor White
Write-Host ""
Write-Host "3. Menu gauche → SQL Editor → New Query" -ForegroundColor White
Write-Host ""
Write-Host "4. Copiez le contenu de:" -ForegroundColor White
Write-Host "   FIX_RLS_ORGANIZATION_CREATION.sql" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Collez dans l'éditeur et cliquez RUN" -ForegroundColor White
Write-Host ""
Write-Host "6. Vérifiez: 'Success. No rows returned'" -ForegroundColor White
Write-Host ""

$response = Read-Host "Avez-vous exécuté le SQL sur Supabase ? (o/n)"

if ($response -ne "o") {
    Write-Host ""
    Write-Host "⚠️  SQL non exécuté. Le déploiement continuera mais" -ForegroundColor Yellow
    Write-Host "   les erreurs RLS persisteront jusqu'à l'exécution du SQL." -ForegroundColor Yellow
    Write-Host ""
}

# Étape 3: Déploiement
Write-Host "🚀 Étape 3: Déploiement sur Vercel..." -ForegroundColor Yellow

vercel --prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Déploiement échoué!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Déploiement réussi!" -ForegroundColor Green
Write-Host ""

# Étape 4: Tests
Write-Host "🧪 Étape 4: TESTS À RÉALISER" -ForegroundColor Yellow
Write-Host ""
Write-Host "Test 1 - Création organisation:" -ForegroundColor White
Write-Host "  1. Ouvrez https://www.powalyze.ch/app/environment-admin" -ForegroundColor Gray
Write-Host "  2. Créez une organisation 'Test Fix RLS'" -ForegroundColor Gray
Write-Host "  3. ✅ Vérifiez: pas d'erreur RLS" -ForegroundColor Gray
Write-Host ""
Write-Host "Test 2 - Nouveau signup:" -ForegroundColor White
Write-Host "  1. Navigation privée → /signup" -ForegroundColor Gray
Write-Host "  2. Créez un compte test" -ForegroundColor Gray
Write-Host "  3. ✅ Vérifiez: redirect vers cockpit avec données" -ForegroundColor Gray
Write-Host ""

Write-Host "═" * 60 -ForegroundColor Green
Write-Host "DÉPLOIEMENT TERMINÉ" -ForegroundColor Green
Write-Host "═" * 60 -ForegroundColor Green
Write-Host ""
Write-Host "Corrections appliquées:" -ForegroundColor Cyan
Write-Host "  ✓ Colonne 'environment' supprimée du code" -ForegroundColor Gray
Write-Host "  ✓ Politiques RLS corrigées (si SQL exécuté)" -ForegroundColor Gray
Write-Host "  ✓ Code déployé sur production" -ForegroundColor Gray
Write-Host ""
Write-Host "Prochain étape: P1-002 (Onboarding auto-création)" -ForegroundColor Yellow
Write-Host "Voir GUIDE_CORRECTION_IMMEDIATE.md pour les détails" -ForegroundColor Gray
Write-Host ""
