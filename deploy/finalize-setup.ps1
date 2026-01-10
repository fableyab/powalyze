# Configuration automatique .env et déploiement
# Run: .\finalize-setup.ps1

param(
    [Parameter(Mandatory=$true)]
    [string]$MetabaseSecretKey,
    
    [Parameter(Mandatory=$true)]
    [string]$DashboardCommercial,
    
    [Parameter(Mandatory=$true)]
    [string]$DashboardFinance,
    
    [Parameter(Mandatory=$true)]
    [string]$DashboardPMO,
    
    [Parameter(Mandatory=$true)]
    [string]$SupabaseHost,
    
    [Parameter(Mandatory=$true)]
    [SecureString]$SupabasePassword
)

Write-Host "🚀 Configuration finale Powalyze + Metabase" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

# 1. Create .env file
Write-Host "📝 Création fichier .env..." -ForegroundColor Yellow

$envContent = @"
# Supabase Configuration
VITE_SUPABASE_URL=https://$SupabaseHost
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Metabase Configuration
VITE_METABASE_URL=http://193.203.169.19:3000
VITE_METABASE_SECRET_KEY=$MetabaseSecretKey

# Metabase Dashboard IDs
VITE_METABASE_DASHBOARD_COMMERCIAL=$DashboardCommercial
VITE_METABASE_DASHBOARD_FINANCE=$DashboardFinance
VITE_METABASE_DASHBOARD_PMO=$DashboardPMO

# Environment
NODE_ENV=production
"@

Set-Content -Path ".env" -Value $envContent
Write-Host "✅ Fichier .env créé!" -ForegroundColor Green

# 2. Configure Vercel environment variables
Write-Host ""
Write-Host "☁️  Configuration Vercel..." -ForegroundColor Yellow

$vercelVars = @{
    "VITE_METABASE_URL" = "http://193.203.169.19:3000"
    "VITE_METABASE_SECRET_KEY" = $MetabaseSecretKey
    "VITE_METABASE_DASHBOARD_COMMERCIAL" = $DashboardCommercial
    "VITE_METABASE_DASHBOARD_FINANCE" = $DashboardFinance
    "VITE_METABASE_DASHBOARD_PMO" = $DashboardPMO
}

foreach ($key in $vercelVars.Keys) {
    Write-Host "   Ajout: $key" -ForegroundColor Cyan
    Write-Output $vercelVars[$key] | vercel env add $key production
}

Write-Host "✅ Variables Vercel configurées!" -ForegroundColor Green

# 3. Build
Write-Host ""
Write-Host "🔨 Build du projet..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build réussi!" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur de build" -ForegroundColor Red
    exit 1
}

# 4. Deploy
Write-Host ""
Write-Host "🚀 Déploiement production..." -ForegroundColor Yellow
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host "✅ DÉPLOIEMENT TERMINÉ AVEC SUCCÈS!" -ForegroundColor Green
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Site: https://www.powalyze.com" -ForegroundColor Cyan
    Write-Host "📊 PowerBIHub: https://www.powalyze.com/powerbi-hub" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🎯 Test l'intégration Metabase maintenant!" -ForegroundColor Yellow
} else {
    Write-Host "❌ Erreur de déploiement" -ForegroundColor Red
    exit 1
}
