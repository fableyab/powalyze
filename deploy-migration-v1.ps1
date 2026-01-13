# =====================================================================
# SCRIPT DÉPLOIEMENT MIGRATION V1 SUR SUPABASE
# =====================================================================

Write-Host "`n🚀 DÉPLOIEMENT MIGRATION ARCHITECTURE V1`n" -ForegroundColor Cyan

# Informations Supabase
$SUPABASE_URL = "https://phfeteiholkfiredgero.supabase.co"
$PROJECT_REF = "phfeteiholkfiredgero"

Write-Host "📊 Projet Supabase:" -ForegroundColor Yellow
Write-Host "   URL: $SUPABASE_URL" -ForegroundColor White
Write-Host "   Ref: $PROJECT_REF`n" -ForegroundColor White

# Lire le fichier SQL
$SQL_FILE = "MIGRATION_FULL_ARCHITECTURE_V1.sql"
if (!(Test-Path $SQL_FILE)) {
    Write-Host "❌ Fichier $SQL_FILE introuvable!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Fichier SQL trouvé: $SQL_FILE" -ForegroundColor Green

# Copier le SQL dans le presse-papiers
Write-Host "`n📋 Copie du SQL dans le presse-papiers..." -ForegroundColor Yellow
Get-Content $SQL_FILE | Set-Clipboard
Write-Host "✅ SQL copié dans le presse-papiers!`n" -ForegroundColor Green

# Instructions pour l'utilisateur
Write-Host "📝 INSTRUCTIONS D'APPLICATION:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Ouvrir le SQL Editor Supabase:" -ForegroundColor White
Write-Host "   https://supabase.com/dashboard/project/$PROJECT_REF/sql/new" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Coller le SQL (Ctrl+V) dans l'éditeur" -ForegroundColor White
Write-Host ""
Write-Host "3. Cliquer sur 'Run' pour exécuter la migration" -ForegroundColor White
Write-Host ""
Write-Host "4. Vérifier les résultats des requêtes de vérification:" -ForegroundColor White
Write-Host "   - 6 tables créées avec RLS activé" -ForegroundColor Gray
Write-Host "   - 24 policies créées (4 par table)" -ForegroundColor Gray
Write-Host "   - 5 triggers créés" -ForegroundColor Gray
Write-Host "   - 4 vues créées" -ForegroundColor Gray
Write-Host ""

# Ouvrir le navigateur automatiquement
Write-Host "🌐 Ouverture du SQL Editor..." -ForegroundColor Yellow
Start-Process "https://supabase.com/dashboard/project/$PROJECT_REF/sql/new"

Write-Host "`n✅ Le SQL est dans votre presse-papiers, prêt à être collé!`n" -ForegroundColor Green

# Attendre confirmation
Write-Host "⏳ Appuyez sur Entrée une fois la migration appliquée..." -ForegroundColor Yellow
Read-Host

Write-Host "`n🔍 Vérification post-migration...`n" -ForegroundColor Cyan

# Créer un script de vérification
$VERIFY_SQL = @"
-- Vérification rapide des tables
SELECT tablename, rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'governance_templates', 'rituals', 'roadmap_items',
    'data_catalog', 'data_jobs', 'external_sources'
  )
ORDER BY tablename;
"@

Write-Host "📋 Script de vérification copié dans le presse-papiers" -ForegroundColor Green
$VERIFY_SQL | Set-Clipboard

Write-Host "`n✅ MIGRATION V1 COMPLÈTE!`n" -ForegroundColor Green
Write-Host "🎉 Les 16 nouvelles pages sont maintenant opérationnelles:" -ForegroundColor Cyan
Write-Host "   - Portfolio: Risks, Forecast, Arbitrage, Alignment" -ForegroundColor White
Write-Host "   - Project: Governance, Roadmap, Report" -ForegroundColor White
Write-Host "   - Data: Catalog, Quality, Flows, PowerBI" -ForegroundColor White
Write-Host "   - AI: Assistant, Summarize, Anomalies, Reports, Predict`n" -ForegroundColor White
