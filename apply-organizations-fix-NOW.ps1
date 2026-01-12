# =====================================================
# SCRIPT POWERSHELL: Appliquer le fix RLS Organizations
# =====================================================

Write-Host "🔧 Application du fix RLS Organizations..." -ForegroundColor Cyan

# Charger les variables Supabase
$env:SUPABASE_URL = "https://oeexuigxglxcsyglyxgs.supabase.co"
$env:SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZXh1aWd4Z2x4Y3N5Z2x5eGdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzY5Mjc2NSwiZXhwIjoyMDQ5MjY4NzY1fQ.5rNIKDmJ8LKaKnNqw7ZqFPTEp_HbGT_B2sOQN0o1fzE"

$sqlFile = "FIX_RLS_ORGANIZATIONS_NOW.sql"

if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ Fichier SQL introuvable: $sqlFile" -ForegroundColor Red
    exit 1
}

Write-Host "📄 Lecture du fichier SQL..." -ForegroundColor Yellow
$sqlContent = Get-Content -Path $sqlFile -Raw

Write-Host "🚀 Envoi à Supabase..." -ForegroundColor Yellow

# Appeler l'API Supabase pour exécuter le SQL
$headers = @{
    "apikey" = $env:SUPABASE_SERVICE_KEY
    "Authorization" = "Bearer $env:SUPABASE_SERVICE_KEY"
    "Content-Type" = "application/json"
}

$body = @{
    query = $sqlContent
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$env:SUPABASE_URL/rest/v1/rpc/exec_sql" -Method Post -Headers $headers -Body $body
    Write-Host "✅ Fix RLS appliqué avec succès!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔐 Politiques mises à jour:" -ForegroundColor Cyan
    Write-Host "  - users_can_view_their_organizations (SELECT)" -ForegroundColor White
    Write-Host "  - users_can_create_organizations (INSERT - PERMISSIVE)" -ForegroundColor White
    Write-Host "  - users_can_update_their_organizations (UPDATE)" -ForegroundColor White
    Write-Host "  - users_can_delete_their_organizations (DELETE)" -ForegroundColor White
    Write-Host "  - users_can_join_organizations (INSERT user_organizations)" -ForegroundColor White
    Write-Host ""
    Write-Host "✅ Vous pouvez maintenant créer des projets sur https://www.powalyze.com/app/projects/new" -ForegroundColor Green
}
catch {
    Write-Host "❌ Erreur lors de l'application du fix:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Solution alternative: Exécutez le SQL manuellement dans Supabase SQL Editor:" -ForegroundColor Yellow
    Write-Host "   1. Allez sur https://supabase.com/dashboard/project/oeexuigxglxcsyglyxgs/sql/new" -ForegroundColor White
    Write-Host "   2. Copiez le contenu de FIX_RLS_ORGANIZATIONS_NOW.sql" -ForegroundColor White
    Write-Host "   3. Cliquez sur 'Run'" -ForegroundColor White
}
