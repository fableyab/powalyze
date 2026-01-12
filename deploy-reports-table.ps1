# Script pour déployer la table reports dans Supabase
# Exécuter depuis PowerShell: .\deploy-reports-table.ps1

Write-Host "=== Déploiement de la table Reports dans Supabase ===" -ForegroundColor Cyan
Write-Host ""

# Charger le fichier SQL
$sqlFile = "SUPABASE_REPORTS_TABLE.sql"

if (-not (Test-Path $sqlFile)) {
    Write-Host "Erreur: Le fichier $sqlFile n'existe pas!" -ForegroundColor Red
    exit 1
}

Write-Host "Lecture du fichier SQL..." -ForegroundColor Yellow
$sqlContent = Get-Content $sqlFile -Raw

Write-Host ""
Write-Host "Instructions de déploiement:" -ForegroundColor Green
Write-Host "1. Ouvrez https://app.supabase.com" -ForegroundColor White
Write-Host "2. Sélectionnez votre projet Powalyze" -ForegroundColor White
Write-Host "3. Allez dans 'SQL Editor'" -ForegroundColor White
Write-Host "4. Cliquez sur 'New Query'" -ForegroundColor White
Write-Host "5. Collez le contenu SQL ci-dessous" -ForegroundColor White
Write-Host "6. Cliquez sur 'Run' pour exécuter" -ForegroundColor White
Write-Host ""
Write-Host "--- CONTENU SQL (copier/coller) ---" -ForegroundColor Cyan
Write-Host $sqlContent -ForegroundColor Gray
Write-Host "--- FIN DU SQL ---" -ForegroundColor Cyan
Write-Host ""

# Copier dans le presse-papiers si possible
try {
    Set-Clipboard -Value $sqlContent
    Write-Host "✓ Le SQL a été copié dans votre presse-papiers!" -ForegroundColor Green
    Write-Host "  Vous pouvez maintenant le coller directement dans Supabase SQL Editor" -ForegroundColor Green
} catch {
    Write-Host "Note: Impossible de copier dans le presse-papiers automatiquement" -ForegroundColor Yellow
    Write-Host "      Veuillez copier manuellement le SQL ci-dessus" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Après avoir exécuté le SQL dans Supabase:" -ForegroundColor Cyan
Write-Host "- La table 'reports' sera créée" -ForegroundColor White
Write-Host "- Les politiques RLS seront activées" -ForegroundColor White
Write-Host "- Les index seront créés pour la performance" -ForegroundColor White
Write-Host "- Vous pourrez créer et sauvegarder des rapports!" -ForegroundColor White
Write-Host ""
Write-Host "Pour tester le système de rapports:" -ForegroundColor Green
Write-Host "1. Allez sur https://www.powalyze.com/app/report-builder" -ForegroundColor White
Write-Host "2. Configurez votre rapport" -ForegroundColor White
Write-Host "3. Cliquez sur 'Sauvegarder le rapport'" -ForegroundColor White
Write-Host "4. Allez sur https://www.powalyze.com/app/reports pour voir tous vos rapports" -ForegroundColor White
Write-Host ""
Write-Host "=== Déploiement prêt ===" -ForegroundColor Green
