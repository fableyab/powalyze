# =====================================================================
# SCRIPT AUTOMATIQUE DÉPLOIEMENT COMPLET
# Date: 2026-01-13
# Description: Applique la migration SQL complète en une seule fois
# =====================================================================

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "DÉPLOIEMENT MIGRATION V1 COMPLÈTE" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Copier le SQL dans le presse-papiers
$sqlFile = "MIGRATION_V1_COMPLETE_FINAL.sql"

if (-Not (Test-Path $sqlFile)) {
    Write-Host "ERREUR: Fichier $sqlFile introuvable!" -ForegroundColor Red
    exit 1
}

$sqlContent = Get-Content $sqlFile -Raw
Set-Clipboard -Value $sqlContent

Write-Host "✓ SQL copié dans le presse-papiers" -ForegroundColor Green
Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor Yellow
Write-Host "1. Ouvrir Supabase SQL Editor" -ForegroundColor White
Write-Host "2. Coller le contenu (Ctrl+V)" -ForegroundColor White
Write-Host "3. Cliquer sur 'Run' (Ctrl+Enter)" -ForegroundColor White
Write-Host "4. Vérifier les résultats dans l'onglet 'Results'" -ForegroundColor White
Write-Host ""
Write-Host "Le script contient:" -ForegroundColor Cyan
Write-Host "  - Trigger owner_id automatique" -ForegroundColor White
Write-Host "  - Colonnes supplémentaires (initiatives, risks, decisions)" -ForegroundColor White
Write-Host "  - 6 nouvelles tables (governance + data)" -ForegroundColor White
Write-Host "  - Activation RLS + Policies" -ForegroundColor White
Write-Host "  - 5 triggers auto-fill created_by" -ForegroundColor White
Write-Host "  - 4 vues analytiques (portfolio, risk_matrix, forecast, anomalies)" -ForegroundColor White
Write-Host ""

# Ouvrir Supabase SQL Editor
$url = "https://supabase.com/dashboard/project/rtsewobmykgqcngnhtmb/sql/new"
Write-Host "Ouverture du SQL Editor..." -ForegroundColor Yellow
Start-Process $url

Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "Une fois l'exécution terminée, revenez ici!" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
