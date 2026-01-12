# Script de déploiement du FIX RLS
Write-Host "=== Fix RLS Organizations ===" -ForegroundColor Green
Write-Host ""

$migrationFile = "migrations/fix-rls-organizations.sql"

if (-not (Test-Path $migrationFile)) {
    Write-Host "❌ Fichier introuvable: $migrationFile" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Fichier trouvé" -ForegroundColor Green

$sqlContent = Get-Content $migrationFile -Raw
Write-Host "✅ SQL chargé ($($sqlContent.Length) caractères)" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Ce script va:" -ForegroundColor Cyan
Write-Host "  - Supprimer les politiques RLS restrictives" -ForegroundColor Yellow
Write-Host "  - Créer de nouvelles politiques permettant la création d'organisations" -ForegroundColor Yellow
Write-Host "  - Permettre aux utilisateurs authentifiés de créer leurs organisations" -ForegroundColor Yellow
Write-Host "  - Corriger les politiques user_organizations" -ForegroundColor Yellow
Write-Host ""

Write-Host "⚠️  IMPORTANT: Exécutez ce SQL dans Supabase SQL Editor IMMÉDIATEMENT" -ForegroundColor Red
Write-Host ""
Write-Host "Instructions:" -ForegroundColor Cyan
Write-Host "1. Ouvrez https://supabase.com/dashboard → Votre projet → SQL Editor" -ForegroundColor White
Write-Host "2. Cliquez sur 'New Query'" -ForegroundColor White
Write-Host "3. Collez le SQL ci-dessous" -ForegroundColor White
Write-Host "4. Cliquez sur 'Run' (F5)" -ForegroundColor White
Write-Host ""

$response = Read-Host "Copier le SQL dans le presse-papiers? (O/N)"
if ($response -eq "O" -or $response -eq "o") {
    Set-Clipboard -Value $sqlContent
    Write-Host "✅ SQL copié! Allez dans Supabase et collez-le." -ForegroundColor Green
}

Write-Host ""
Write-Host "🔗 Lien direct: https://supabase.com/dashboard" -ForegroundColor Cyan
