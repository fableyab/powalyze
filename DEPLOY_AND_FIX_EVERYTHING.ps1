# =====================================================
# DÉPLOIEMENT COMPLET + FIX SUPABASE
# Applique le SQL puis déploie le frontend
# =====================================================

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   DÉPLOIEMENT COMPLET POWALYZE + FIX SUPABASE     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$SUPABASE_PROJECT_ID = "oeexuigxglxcsyglyxgs"
$SQL_FILE = "DEPLOY_COMPLETE_SCHEMA_NOW.sql"
$SQL_EDITOR_URL = "https://supabase.com/dashboard/project/$SUPABASE_PROJECT_ID/sql/new"

# ========================================
# ÉTAPE 1: OUVRIR SUPABASE SQL EDITOR
# ========================================
Write-Host "📋 ÉTAPE 1/3 : Configuration Supabase" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor Gray
Write-Host ""
Write-Host "🌐 Ouverture du SQL Editor Supabase..." -ForegroundColor Cyan
Start-Process $SQL_EDITOR_URL

Write-Host ""
Write-Host "📝 INSTRUCTIONS - Suivez ces étapes:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   1. Le SQL Editor Supabase s'ouvre dans votre navigateur" -ForegroundColor White
Write-Host "   2. COPIEZ tout le contenu du fichier: $SQL_FILE" -ForegroundColor White
Write-Host "      (Ctrl+A pour tout sélectionner, Ctrl+C pour copier)" -ForegroundColor Gray
Write-Host "   3. COLLEZ dans l'éditeur SQL de Supabase" -ForegroundColor White
Write-Host "      (Ctrl+V dans la zone de texte)" -ForegroundColor Gray
Write-Host "   4. CLIQUEZ sur le bouton 'Run' (ou Ctrl+Enter)" -ForegroundColor White
Write-Host "   5. ATTENDEZ le message de confirmation" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: Le SQL doit s'exécuter SANS ERREUR" -ForegroundColor Yellow
Write-Host "   Si erreur: vérifiez que toutes les lignes sont copiées" -ForegroundColor Gray
Write-Host ""
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor Gray
Write-Host ""
Write-Host "⏸️  Appuyez sur ENTRÉE quand le SQL est appliqué..." -ForegroundColor Cyan
$null = Read-Host

Write-Host ""
Write-Host "✅ SQL Supabase confirmé!" -ForegroundColor Green
Write-Host ""

# ========================================
# ÉTAPE 2: BUILD FRONTEND
# ========================================
Write-Host "📋 ÉTAPE 2/3 : Build Frontend" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor Gray
Write-Host ""

try {
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Build réussi!" -ForegroundColor Green
    } else {
        Write-Host "❌ Erreur build" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# ========================================
# ÉTAPE 3: DEPLOY VERCEL
# ========================================
Write-Host "📋 ÉTAPE 3/3 : Déploiement Vercel" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────────────" -ForegroundColor Gray
Write-Host ""

try {
    vercel --prod --yes
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Déploiement réussi!" -ForegroundColor Green
    } else {
        Write-Host "❌ Erreur déploiement" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║          ✅ DÉPLOIEMENT COMPLET TERMINÉ!           ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 RÉCAPITULATIF:" -ForegroundColor Cyan
Write-Host "   ✓ Base de données Supabase configurée" -ForegroundColor Green
Write-Host "   ✓ Politiques RLS corrigées (sans owner_id)" -ForegroundColor Green
Write-Host "   ✓ Frontend buildé et déployé" -ForegroundColor Green
Write-Host "   ✓ Live sur: https://www.powalyze.ch" -ForegroundColor Green
Write-Host ""
Write-Host "🧪 TESTS À EFFECTUER:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   1. Connectez-vous:" -ForegroundColor White
Write-Host "      → https://www.powalyze.ch/login" -ForegroundColor Cyan
Write-Host ""
Write-Host "   2. Créez un projet de test:" -ForegroundColor White
Write-Host "      → https://www.powalyze.ch/app/projects/new" -ForegroundColor Cyan
Write-Host "      → Remplissez: Nom, Type, Budget" -ForegroundColor Gray
Write-Host "      → Cliquez: 'Créer le projet'" -ForegroundColor Gray
Write-Host ""
Write-Host "   3. Vérification attendue:" -ForegroundColor White
Write-Host "      ✓ Pas d'erreur 'violates row-level security policy'" -ForegroundColor Green
Write-Host "      ✓ Organisation créée automatiquement" -ForegroundColor Green
Write-Host "      ✓ Projet créé avec succès" -ForegroundColor Green
Write-Host "      ✓ Redirection vers /app/projects" -ForegroundColor Green
Write-Host ""
Write-Host "🔗 LIENS UTILES:" -ForegroundColor Cyan
Write-Host "   • Application: https://www.powalyze.ch" -ForegroundColor White
Write-Host "   • Supabase Dashboard: https://supabase.com/dashboard/project/$SUPABASE_PROJECT_ID" -ForegroundColor White
Write-Host "   • SQL Editor: $SQL_EDITOR_URL" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
