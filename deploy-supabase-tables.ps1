# Script de création automatique des tables Supabase
# Exécute le SQL directement via l'API Supabase

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CRÉATION AUTOMATIQUE TABLES SUPABASE  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration Supabase (depuis customSupabaseClient.js)
$supabaseUrl = "https://xqwcpewngbxnkcytztzk.supabase.co"
$supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhxd2NwZXduZ2J4bmtjeXR6dHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5Njk4NTUsImV4cCI6MjA4MDU0NTg1NX0.XY-rz0BHw8Xe6fVa6FRHm2SoG0CCjF0TQZ7lUq9n234"

Write-Host "🔑 Credentials Supabase:" -ForegroundColor Yellow
Write-Host "   URL: $supabaseUrl" -ForegroundColor Gray
Write-Host "   Key: eyJ...234" -ForegroundColor Gray
Write-Host ""

Write-Host "⚠️  IMPORTANT: Ce script nécessite la SERVICE ROLE KEY (pas anon key)" -ForegroundColor Red
Write-Host ""
Write-Host "Pour obtenir votre SERVICE ROLE KEY:" -ForegroundColor Yellow
Write-Host "1. Allez sur https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/settings/api" -ForegroundColor Gray
Write-Host "2. Copiez la 'service_role key' (PAS la 'anon public key')" -ForegroundColor Gray
Write-Host "3. Collez-la ci-dessous" -ForegroundColor Gray
Write-Host ""

$serviceRoleKey = Read-Host "Entrez votre SERVICE ROLE KEY"

if ([string]::IsNullOrWhiteSpace($serviceRoleKey)) {
    Write-Host "❌ Clé manquante. Arrêt." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📝 Lecture du script SQL..." -ForegroundColor Cyan

# Lire le fichier SQL
$sqlFile = "SUPABASE_TABLES_ESSENTIELLES.sql"
if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ Fichier SQL introuvable: $sqlFile" -ForegroundColor Red
    exit 1
}

$sqlContent = Get-Content $sqlFile -Raw
Write-Host "✅ Script SQL chargé ($($sqlContent.Length) caractères)" -ForegroundColor Green
Write-Host ""

# Endpoint REST API de Supabase pour exécuter du SQL
$apiUrl = "$supabaseUrl/rest/v1/rpc/exec_sql"

Write-Host "🚀 Exécution du script SQL via API Supabase..." -ForegroundColor Cyan
Write-Host ""

# Headers
$headers = @{
    "apikey" = $serviceRoleKey
    "Authorization" = "Bearer $serviceRoleKey"
    "Content-Type" = "application/json"
}

# Body JSON
$body = @{
    query = $sqlContent
} | ConvertTo-Json

try {
    # Note: Supabase n'a pas de endpoint direct pour exec SQL via REST API
    # On doit utiliser le SQL Editor directement ou psql
    
    Write-Host "⚠️  L'API REST de Supabase ne permet pas d'exécuter du DDL SQL directement" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 SOLUTION ALTERNATIVE:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Ouvrez votre navigateur sur:" -ForegroundColor Yellow
    Write-Host "   https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "2. Cliquez 'New query'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "3. Copiez-collez ce SQL:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "-- COPIER DEPUIS ICI --" -ForegroundColor Green
    Write-Host $sqlContent -ForegroundColor Gray
    Write-Host "-- JUSQU'ICI --" -ForegroundColor Green
    Write-Host ""
    Write-Host "4. Cliquez 'RUN' (Ctrl+Enter)" -ForegroundColor Yellow
    Write-Host ""
    
    # Copier dans le presse-papier
    $sqlContent | Set-Clipboard
    Write-Host "✅ SQL copié dans le presse-papier !" -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "❌ Erreur: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📖 Ouverture de l'éditeur SQL Supabase..." -ForegroundColor Cyan
Start-Process "https://supabase.com/dashboard/project/xqwcpewngbxnkcytztzk/sql"

Write-Host ""
Write-Host "✅ Instructions copiées !" -ForegroundColor Green
Write-Host ""
Write-Host "PROCHAINES ÉTAPES:" -ForegroundColor Yellow
Write-Host "1. L'éditeur SQL va s'ouvrir dans votre navigateur" -ForegroundColor Gray
Write-Host "2. Cliquez 'New query'" -ForegroundColor Gray
Write-Host "3. Faites Ctrl+V pour coller le SQL (déjà copié)" -ForegroundColor Gray
Write-Host "4. Cliquez RUN ou Ctrl+Enter" -ForegroundColor Gray
Write-Host "5. Revenez ici et appuyez sur Entrée une fois terminé" -ForegroundColor Gray
Write-Host ""

Read-Host "Appuyez sur Entrée après avoir exécuté le SQL dans Supabase"

Write-Host ""
Write-Host "🔍 Vérification des tables créées..." -ForegroundColor Cyan

# Vérifier via l'API REST si les tables existent
$tablesUrl = "$supabaseUrl/rest/v1/organizations?limit=0"
$headersCheck = @{
    "apikey" = $supabaseAnonKey
    "Authorization" = "Bearer $supabaseAnonKey"
}

try {
    $response = Invoke-RestMethod -Uri $tablesUrl -Method Get -Headers $headersCheck -ErrorAction Stop
    Write-Host "✅ Table 'organizations' créée avec succès !" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 404) {
        Write-Host "❌ Table 'organizations' non trouvée" -ForegroundColor Red
        Write-Host "   Assurez-vous d'avoir exécuté le SQL dans Supabase" -ForegroundColor Yellow
    } else {
        Write-Host "⚠️  Impossible de vérifier: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "🎉 Processus terminé !" -ForegroundColor Green
Write-Host ""
Write-Host "🧪 TEST:" -ForegroundColor Yellow
Write-Host "1. Allez sur www.powalyze.com" -ForegroundColor Gray
Write-Host "2. Connectez-vous" -ForegroundColor Gray
Write-Host "3. Créez un projet sur /app/projects/new" -ForegroundColor Gray
Write-Host "4. Aucune erreur = ✅ Succès !" -ForegroundColor Gray
Write-Host ""
