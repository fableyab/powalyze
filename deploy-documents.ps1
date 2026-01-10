#!/usr/bin/env pwsh
# Script de déploiement automatique - Module Documents Powalyze
# Date: 2026-01-08

Write-Host "`n🚀 DÉPLOIEMENT AUTOMATIQUE - MODULE DOCUMENTS" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

# 1. Vérification de l'environnement
Write-Host "`n📋 1. Vérification de l'environnement..." -ForegroundColor Yellow

if (!(Test-Path "dist\index.html")) {
    Write-Host "❌ Build dist/ manquant" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build dist/ présent" -ForegroundColor Green

# 2. Vérification Supabase
Write-Host "`n📋 2. Vérification Supabase..." -ForegroundColor Yellow
# Configuration Supabase vérifiée

if (!(Get-Content "src\lib\customSupabaseClient.js" | Select-String "xqwcpewngbxnkcytztzk.supabase.co")) {
    Write-Host "⚠️  Supabase non configuré dans customSupabaseClient.js" -ForegroundColor Yellow
    $supabaseConfigured = $false
} else {
    Write-Host "✅ Supabase URL configurée" -ForegroundColor Green
}

# 3. Déploiement Vercel
Write-Host "`n📋 3. Déploiement sur Vercel..." -ForegroundColor Yellow

# Vérifier si vercel est installé
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (!$vercelInstalled) {
    Write-Host "❌ Vercel CLI non installé. Installez-le avec: npm i -g vercel" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 Démarrage du déploiement..." -ForegroundColor Cyan
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ DÉPLOIEMENT RÉUSSI!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Échec du déploiement" -ForegroundColor Red
    exit 1
}

# 4. Instructions post-déploiement
Write-Host "`n📋 4. Configuration Supabase (ACTION MANUELLE REQUISE)" -ForegroundColor Yellow
Write-Host "=" * 60 -ForegroundColor Cyan

Write-Host "`n⚠️  IMPORTANT: Configurer Supabase Storage" -ForegroundColor Yellow
Write-Host "`n1️⃣  Créer le bucket 'documents':" -ForegroundColor White
Write-Host "   - Aller sur: https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/storage/buckets"
Write-Host "   - Cliquer: New bucket"
Write-Host "   - Name: documents"
Write-Host "   - Public: NO (privé avec RLS)"
Write-Host "   - File size limit: 52428800 (50MB)"

Write-Host "`n2️⃣  Appliquer la migration SQL:" -ForegroundColor White
Write-Host "   - Aller sur: https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql/new"
Write-Host "   - Copier le contenu de: supabase\migrations\20260108_documents_module.sql"
Write-Host "   - Exécuter le SQL"

Write-Host "`n3️⃣  Tester le module:" -ForegroundColor White
Write-Host "   - Aller sur: https://powalyze.vercel.app/app/documents"
Write-Host "   - Upload un PDF (drag & drop)"
Write-Host "   - Vérifier: Preview, Download, Delete"

Write-Host "`n📚 Guide complet: DOCUMENTS_MODULE_SETUP.md" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Cyan

Write-Host "`n✅ Script terminé!" -ForegroundColor Green
