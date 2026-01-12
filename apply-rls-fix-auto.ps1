# Script PowerShell pour appliquer automatiquement le fix RLS
param(
    [string]$ServiceRoleKey = $env:SUPABASE_SERVICE_KEY
)

Write-Host "=== Application Automatique du Fix RLS ===" -ForegroundColor Green
Write-Host ""

if (-not $ServiceRoleKey) {
    Write-Host "⚠️  Service Role Key requise" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "OPTIONS:" -ForegroundColor Cyan
    Write-Host "1. Via variable d'environnement:" -ForegroundColor White
    Write-Host '   $env:SUPABASE_SERVICE_KEY = "votre_key"' -ForegroundColor Gray
    Write-Host '   .\apply-rls-fix-auto.ps1' -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Via paramètre:" -ForegroundColor White
    Write-Host '   .\apply-rls-fix-auto.ps1 -ServiceRoleKey "votre_key"' -ForegroundColor Gray
    Write-Host ""
    Write-Host "🔑 Pour obtenir la Service Role Key:" -ForegroundColor Cyan
    Write-Host "   https://supabase.com/dashboard/project/phfeteiholkfiredgero/settings/api" -ForegroundColor White
    Write-Host "   → Copiez la clé 'service_role' (secret, ne pas partager!)" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Lire le SQL
$sqlFile = "migrations/fix-rls-organizations.sql"
if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ Fichier SQL introuvable: $sqlFile" -ForegroundColor Red
    exit 1
}

$sqlContent = Get-Content $sqlFile -Raw
Write-Host "✅ SQL chargé" -ForegroundColor Green

# URL Supabase
$supabaseUrl = "https://phfeteiholkfiredgero.supabase.co"
$apiUrl = "$supabaseUrl/rest/v1/rpc/exec_sql"

Write-Host "🔄 Connexion à Supabase..." -ForegroundColor Cyan

# Préparer les headers
$headers = @{
    "Content-Type" = "application/json"
    "apikey" = $ServiceRoleKey
    "Authorization" = "Bearer $ServiceRoleKey"
}

# Diviser en commandes
$commands = $sqlContent -split ';' | Where-Object { 
    $_.Trim() -and -not $_.Trim().StartsWith('--') 
}

Write-Host "📝 $($commands.Count) commandes à exécuter" -ForegroundColor Cyan
Write-Host ""

$success = 0
$failed = 0

foreach ($i in 0..($commands.Count - 1)) {
    $cmd = $commands[$i].Trim() + ";"
    Write-Host "⏳ [$($i+1)/$($commands.Count)] " -NoNewline -ForegroundColor Yellow
    
    try {
        $body = @{ query = $cmd } | ConvertTo-Json
        
        $response = Invoke-WebRequest -Uri $apiUrl -Method POST -Headers $headers -Body $body -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            Write-Host "✅" -ForegroundColor Green
            $success++
        } else {
            Write-Host "⚠️ " -ForegroundColor Yellow
            $failed++
        }
    } catch {
        Write-Host "❌ $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "=== Résultat ===" -ForegroundColor Cyan
Write-Host "✅ Réussies: $success" -ForegroundColor Green
Write-Host "❌ Échouées: $failed" -ForegroundColor Red

if ($failed -eq 0) {
    Write-Host ""
    Write-Host "🎉 Fix RLS appliqué avec succès!" -ForegroundColor Green
    Write-Host "   Vous pouvez maintenant créer des projets!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⚠️  Certaines commandes ont échoué" -ForegroundColor Yellow
    Write-Host "   Essayez d'appliquer le SQL manuellement dans Supabase" -ForegroundColor Yellow
}
