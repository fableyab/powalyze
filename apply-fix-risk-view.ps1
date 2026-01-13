# =====================================================================
# SCRIPT CORRECTION RISK_MATRIX_VIEW
# =====================================================================

Write-Host "`n🔧 CORRECTION VUE RISK_MATRIX_VIEW`n" -ForegroundColor Cyan

$SQL_FILE = "FIX_RISK_MATRIX_VIEW.sql"
$PROJECT_REF = "phfeteiholkfiredgero"

if (!(Test-Path $SQL_FILE)) {
    Write-Host "❌ Fichier $SQL_FILE introuvable!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Fichier SQL trouvé: $SQL_FILE" -ForegroundColor Green

Write-Host "`n📋 Copie du SQL dans le presse-papiers..." -ForegroundColor Yellow
Get-Content $SQL_FILE | Set-Clipboard
Write-Host "✅ SQL copié!`n" -ForegroundColor Green

Write-Host "📝 CE QUE LE SCRIPT FAIT:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Supprime la vue risk_matrix_view existante" -ForegroundColor White
Write-Host "2. Supprime la colonne score (GENERATED ALWAYS pose problème)" -ForegroundColor White
Write-Host "3. Ajoute les colonnes manquantes (category, mitigation, owner_id)" -ForegroundColor White
Write-Host "4. Recrée la vue avec calcul dynamique du score" -ForegroundColor White
Write-Host ""

Write-Host "📝 INSTRUCTIONS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Ouvrir le SQL Editor Supabase:" -ForegroundColor White
Write-Host "   https://supabase.com/dashboard/project/$PROJECT_REF/sql/new" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Coller le SQL (Ctrl+V)" -ForegroundColor White
Write-Host ""
Write-Host "3. Cliquer sur 'Run'" -ForegroundColor White
Write-Host ""

Write-Host "🌐 Ouverture du SQL Editor..." -ForegroundColor Yellow
Start-Process "https://supabase.com/dashboard/project/$PROJECT_REF/sql/new"

Write-Host "`n✅ Le SQL est dans votre presse-papiers!`n" -ForegroundColor Green
Write-Host "⏳ Appuyez sur Entrée une fois appliqué..." -ForegroundColor Yellow
Read-Host

Write-Host "`n✅ CORRECTION APPLIQUÉE!`n" -ForegroundColor Green
Write-Host "🎉 La vue risk_matrix_view est maintenant fonctionnelle" -ForegroundColor Cyan
Write-Host "   Le score est calculé dynamiquement: probability × impact`n" -ForegroundColor White
