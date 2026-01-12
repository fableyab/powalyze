# Script de déploiement du nouveau schéma Powalyze V2 sur Supabase
# Usage: .\deploy-schema-v2.ps1

Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   POWALYZE V2 - Déploiement Schéma DB         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Vérifier que le fichier schema existe
$schemaPath = "supabase\schema_refonte_v2.sql"
if (-not (Test-Path $schemaPath)) {
    Write-Host "❌ Erreur : $schemaPath introuvable" -ForegroundColor Red
    exit 1
}

Write-Host "📄 Fichier trouvé : $schemaPath" -ForegroundColor Green
Write-Host ""

# Afficher les infos Supabase depuis customSupabaseClient.js
$clientPath = "src\lib\customSupabaseClient.js"
if (Test-Path $clientPath) {
    $content = Get-Content $clientPath -Raw
    if ($content -match "https://([a-z]+)\.supabase\.co") {
        $projectId = $matches[1]
        Write-Host "🔗 Projet Supabase détecté : $projectId" -ForegroundColor Yellow
        Write-Host ""
    }
}

Write-Host "⚠️  ATTENTION : Ce script va :" -ForegroundColor Yellow
Write-Host "   1. SUPPRIMER toutes les tables existantes (DROP CASCADE)" -ForegroundColor Red
Write-Host "   2. Créer le nouveau schéma V2 (9 tables)" -ForegroundColor Green
Write-Host "   3. Activer RLS sur toutes les tables" -ForegroundColor Green
Write-Host ""

$confirm = Read-Host "Voulez-vous continuer ? (oui/non)"
if ($confirm -ne "oui") {
    Write-Host "❌ Déploiement annulé" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "📋 Instructions de déploiement manuel :" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Ouvrez Supabase Dashboard :" -ForegroundColor White
Write-Host "   https://app.supabase.com/project/_/sql" -ForegroundColor Blue
Write-Host ""
Write-Host "2. Copiez le contenu de : $schemaPath" -ForegroundColor White
Write-Host ""
Write-Host "3. Collez-le dans l'éditeur SQL et cliquez sur 'Run'" -ForegroundColor White
Write-Host ""
Write-Host "4. Vérifiez que toutes les tables sont créées :" -ForegroundColor White
Write-Host "   - organizations" -ForegroundColor Gray
Write-Host "   - profiles" -ForegroundColor Gray
Write-Host "   - portfolios" -ForegroundColor Gray
Write-Host "   - projects" -ForegroundColor Gray
Write-Host "   - phases" -ForegroundColor Gray
Write-Host "   - tasks" -ForegroundColor Gray
Write-Host "   - kpis" -ForegroundColor Gray
Write-Host "   - risks" -ForegroundColor Gray
Write-Host "   - budget_entries" -ForegroundColor Gray
Write-Host ""

# Ouvrir le fichier SQL dans VS Code
Write-Host "📝 Ouverture du fichier SQL..." -ForegroundColor Cyan
code $schemaPath

Write-Host ""
Write-Host "✅ Fichier SQL ouvert dans VS Code" -ForegroundColor Green
Write-Host "   Copiez le contenu et collez-le dans Supabase SQL Editor" -ForegroundColor Yellow
Write-Host ""

# Proposer d'ouvrir le dashboard Supabase
$openDashboard = Read-Host "Ouvrir le Supabase Dashboard dans le navigateur ? (oui/non)"
if ($openDashboard -eq "oui") {
    Start-Process "https://app.supabase.com"
    Write-Host "🌐 Dashboard Supabase ouvert" -ForegroundColor Green
}

Write-Host ""
Write-Host "📚 Après déploiement, consultez :" -ForegroundColor Cyan
Write-Host "   - REFONTE_V2_GUIDE.md (guide complet)" -ForegroundColor White
Write-Host "   - supabase/schema_refonte_v2.sql (schéma avec commentaires)" -ForegroundColor White
Write-Host ""
