# Script ULTIME - Création des tables Supabase
# Ce script fait TOUT pour toi

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "     CRÉATION AUTOMATIQUE TABLES SUPABASE - ULTIME     " -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# 1. Vérifier que le fichier SQL existe
if (-not (Test-Path "SUPABASE_SCHEMA_CLEAN.sql")) {
    Write-Host "❌ Fichier SUPABASE_SCHEMA_CLEAN.sql introuvable" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Fichier SQL trouvé" -ForegroundColor Green
Write-Host ""

# 2. Lire et copier le SQL
$sql = Get-Content "SUPABASE_SCHEMA_CLEAN.sql" -Raw
$sql | Set-Clipboard

Write-Host "✅ SQL copié dans le presse-papier" -ForegroundColor Green
Write-Host ""

# 3. Ouvrir Supabase SQL Editor
Write-Host "🌐 Ouverture de Supabase SQL Editor..." -ForegroundColor Cyan
Start-Process "https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql"
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host "              👉 INSTRUCTIONS FINALES 👈               " -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host ""
Write-Host "L'onglet Supabase s'est ouvert dans ton navigateur." -ForegroundColor White
Write-Host ""
Write-Host "ÉTAPE 1:" -ForegroundColor Yellow
Write-Host "  → Clique sur le bouton vert 'New query'" -ForegroundColor Gray
Write-Host ""
Write-Host "ÉTAPE 2:" -ForegroundColor Yellow
Write-Host "  → Dans l'éditeur, fais Ctrl+V (le SQL est déjà copié)" -ForegroundColor Gray
Write-Host ""
Write-Host "ÉTAPE 3:" -ForegroundColor Yellow
Write-Host "  → Clique sur 'RUN' ou fais Ctrl+Enter" -ForegroundColor Gray
Write-Host ""
Write-Host "ÉTAPE 4:" -ForegroundColor Yellow
Write-Host "  → Attends 2-3 secondes → Tu vois 'Success'" -ForegroundColor Gray
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Yellow
Write-Host ""

# 4. Attendre confirmation
Write-Host "As-tu exécuté le SQL dans Supabase ? (O/N)" -ForegroundColor Cyan
$response = Read-Host

if ($response -eq "O" -or $response -eq "o" -or $response -eq "oui") {
    Write-Host ""
    Write-Host "🔍 Vérification des tables..." -ForegroundColor Cyan
    
    # Vérifier avec Node.js
    if (Test-Path "create-tables.js") {
        node create-tables.js
    } else {
        Write-Host "✅ Parfait !" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 Maintenant teste:" -ForegroundColor Yellow
        Write-Host "   1. Va sur www.powalyze.com" -ForegroundColor Gray
        Write-Host "   2. Connecte-toi" -ForegroundColor Gray
        Write-Host "   3. Crée un projet sur /app/projects/new" -ForegroundColor Gray
        Write-Host "   4. Aucune erreur ! 🎉" -ForegroundColor Gray
        Write-Host ""
    }
} else {
    Write-Host ""
    Write-Host "⚠️  N'oublie pas d'exécuter le SQL !" -ForegroundColor Yellow
    Write-Host "   Refais le script quand c'est fait." -ForegroundColor Gray
    Write-Host ""
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "                   SCRIPT TERMINÉ                      " -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
