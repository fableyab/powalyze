# =====================================================================
# SCRIPT CORRECTION OWNER_ID ORGANIZATIONS
# =====================================================================

Write-Host "`n🔧 CORRECTION AUTO-FILL OWNER_ID`n" -ForegroundColor Cyan

$SQL_FILE = "FIX_ORGANIZATIONS_OWNER.sql"
$PROJECT_REF = "phfeteiholkfiredgero"

if (!(Test-Path $SQL_FILE)) {
    Write-Host "❌ Fichier $SQL_FILE introuvable!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Fichier SQL trouvé: $SQL_FILE" -ForegroundColor Green

Write-Host "`n📋 Copie du SQL dans le presse-papiers..." -ForegroundColor Yellow
Get-Content $SQL_FILE | Set-Clipboard
Write-Host "✅ SQL copié dans le presse-papiers!`n" -ForegroundColor Green

Write-Host "📝 INSTRUCTIONS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Ouvrir le SQL Editor Supabase:" -ForegroundColor White
Write-Host "   https://supabase.com/dashboard/project/$PROJECT_REF/sql/new" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Coller le SQL (Ctrl+V)" -ForegroundColor White
Write-Host ""
Write-Host "3. Cliquer sur 'Run'" -ForegroundColor White
Write-Host ""
Write-Host "4. Vérifier:" -ForegroundColor White
Write-Host "   - Fonction auto_set_owner_id() créée" -ForegroundColor Gray
Write-Host "   - Trigger trg_organizations_auto_owner actif" -ForegroundColor Gray
Write-Host ""

Write-Host "🌐 Ouverture du SQL Editor..." -ForegroundColor Yellow
Start-Process "https://supabase.com/dashboard/project/$PROJECT_REF/sql/new"

Write-Host "`n✅ Le SQL est dans votre presse-papiers!`n" -ForegroundColor Green
Write-Host "⏳ Appuyez sur Entrée une fois appliqué..." -ForegroundColor Yellow
Read-Host

Write-Host "`n✅ CORRECTION APPLIQUÉE!`n" -ForegroundColor Green
Write-Host "🎉 Vous pouvez maintenant créer des organisations" -ForegroundColor Cyan
Write-Host "   Le owner_id sera automatiquement rempli avec votre user ID`n" -ForegroundColor White
