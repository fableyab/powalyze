# =====================================================
# SCRIPT DE FIX POUR ORGANIZATIONS RLS
# À exécuter dans l'éditeur SQL de Supabase
# =====================================================

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  FIX ORGANIZATIONS - CRÉATION AUTOMATIQUE" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Ouvrez votre projet Supabase:" -ForegroundColor White
Write-Host "   https://supabase.com/dashboard/project/YOUR_PROJECT_ID" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Allez dans 'SQL Editor' (icône base de données dans le menu)" -ForegroundColor White
Write-Host ""
Write-Host "3. Cliquez sur 'New query'" -ForegroundColor White
Write-Host ""
Write-Host "4. Copiez-collez le contenu du fichier:" -ForegroundColor White
Write-Host "   fix-organizations-rls.sql" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Cliquez sur 'Run' (ou Ctrl+Enter)" -ForegroundColor White
Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📄 Contenu du fichier SQL à exécuter:" -ForegroundColor Green
Write-Host ""

# Afficher le contenu
Get-Content "fix-organizations-rls.sql" | Write-Host -ForegroundColor Gray

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "✅ Une fois exécuté, la création d'organisation fonctionnera!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Ouvrir le fichier dans le bloc-notes pour faciliter la copie
notepad.exe "fix-organizations-rls.sql"
