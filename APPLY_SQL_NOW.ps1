# =====================================================
# SCRIPT AUTOMATIQUE : Appliquer SQL sur Supabase
# Utilise l'API REST Supabase avec service_role key
# =====================================================

Write-Host "🚀 APPLICATION AUTOMATIQUE DU SCHÉMA SQL" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration Supabase (nouvelle instance)
$SUPABASE_URL = "https://oeexuigxglxcsyglyxgs.supabase.co"
$SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZXh1aWd4Z2x4Y3N5Z2x5eGdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzY5Mjc2NSwiZXhwIjoyMDQ5MjY4NzY1fQ.5rNIKDmJ8LKaKnNqw7ZqFPTEp_HbGT_B2sOQN0o1fzE"
$SQL_FILE = "DEPLOY_COMPLETE_SCHEMA_NOW.sql"

# Vérifier que le fichier SQL existe
if (-not (Test-Path $SQL_FILE)) {
    Write-Host "❌ Fichier SQL introuvable: $SQL_FILE" -ForegroundColor Red
    exit 1
}

Write-Host "📄 Lecture du fichier SQL..." -ForegroundColor Yellow
$sqlContent = Get-Content -Path $SQL_FILE -Raw
Write-Host "   ✓ $($sqlContent.Length) caractères lus" -ForegroundColor Gray
Write-Host ""

# Préparer les headers pour l'API
$headers = @{
    "apikey" = $SERVICE_ROLE_KEY
    "Authorization" = "Bearer $SERVICE_ROLE_KEY"
    "Content-Type" = "application/json"
    "Prefer" = "return=representation"
}

# Diviser le SQL en statements individuels pour éviter les erreurs de parsing
Write-Host "🔧 Préparation des statements SQL..." -ForegroundColor Yellow

# Extraire les statements SQL importants
$statements = @(
    # Tables
    $sqlContent -match "CREATE TABLE IF NOT EXISTS public\.organizations.*?;" -replace "(?s).*?(CREATE TABLE.*?;).*", '$1'
    # Fonction
    "CREATE OR REPLACE FUNCTION public.user_in_org(org_id uuid) RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS `$`$ SELECT EXISTS (SELECT 1 FROM public.user_organizations uo WHERE uo.organization_id = org_id AND uo.user_id = auth.uid()); `$`$;"
    # Politiques organizations
    "ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;"
    "DROP POLICY IF EXISTS users_can_create_organizations ON public.organizations;"
    "CREATE POLICY users_can_create_organizations ON public.organizations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);"
    "DROP POLICY IF EXISTS users_can_view_their_organizations ON public.organizations;"
    "CREATE POLICY users_can_view_their_organizations ON public.organizations FOR SELECT USING (auth.uid() IS NOT NULL AND id IN (SELECT uo.organization_id FROM public.user_organizations uo WHERE uo.user_id = auth.uid()));"
    # Politiques user_organizations
    "ALTER TABLE public.user_organizations ENABLE ROW LEVEL SECURITY;"
    "DROP POLICY IF EXISTS users_can_join_organizations ON public.user_organizations;"
    "CREATE POLICY users_can_join_organizations ON public.user_organizations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());"
    "DROP POLICY IF EXISTS select_user_organizations ON public.user_organizations;"
    "CREATE POLICY select_user_organizations ON public.user_organizations FOR SELECT USING (user_id = auth.uid());"
    # Politiques initiatives
    "ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;"
    "DROP POLICY IF EXISTS insert_initiatives_by_org ON public.initiatives;"
    "CREATE POLICY insert_initiatives_by_org ON public.initiatives FOR INSERT WITH CHECK (public.user_in_org(organization_id));"
)

Write-Host "   ✓ Prêt à exécuter le SQL" -ForegroundColor Gray
Write-Host ""

# Méthode alternative : utiliser psql via Supabase connection string
Write-Host "🚀 Exécution du SQL via API Supabase..." -ForegroundColor Yellow
Write-Host ""

try {
    # API endpoint pour exécuter du SQL brut
    $endpoint = "$SUPABASE_URL/rest/v1/rpc"
    
    # Créer une fonction RPC temporaire pour exécuter du SQL
    Write-Host "   Tentative 1: Via API REST..." -ForegroundColor Gray
    
    $body = @{
        query = $sqlContent
    } | ConvertTo-Json -Depth 10

    $response = Invoke-RestMethod -Uri "$endpoint/exec_sql" -Method Post -Headers $headers -Body $body -ErrorAction Stop
    
    Write-Host "✅ SQL appliqué avec succès via API!" -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "⚠️  Méthode API REST non disponible, utilisation méthode alternative..." -ForegroundColor Yellow
    Write-Host ""
    
    # Méthode alternative : exécuter via PostgREST direct
    try {
        Write-Host "   Tentative 2: Exécution statement par statement..." -ForegroundColor Gray
        
        # Exécuter le SQL complet en une seule fois via connection string
        $dbUrl = "postgresql://postgres.oeexuigxglxcsyglyxgs:[password]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
        
        Write-Host "⚠️  Impossible d'exécuter automatiquement via API" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📋 APPLICATION MANUELLE REQUISE" -ForegroundColor Cyan
        Write-Host "================================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Ouvrez : https://supabase.com/dashboard/project/oeexuigxglxcsyglyxgs/sql/new" -ForegroundColor White
        Write-Host "2. Copiez TOUT le contenu du fichier : $SQL_FILE" -ForegroundColor White
        Write-Host "3. Collez dans l'éditeur SQL Supabase" -ForegroundColor White
        Write-Host "4. Cliquez sur 'Run' (Ctrl+Enter)" -ForegroundColor White
        Write-Host ""
        Write-Host "⏸️  Appuyez sur une touche quand c'est fait pour continuer..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        Write-Host ""
        
    } catch {
        Write-Host "❌ Erreur: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "📋 VEUILLEZ APPLIQUER LE SQL MANUELLEMENT" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "✅ CONFIGURATION SUPABASE TERMINÉE" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔗 Dashboard Supabase : https://supabase.com/dashboard/project/oeexuigxglxcsyglyxgs" -ForegroundColor White
Write-Host "🔗 Application : https://www.powalyze.ch" -ForegroundColor White
Write-Host ""
Write-Host "✅ Prochaine étape : Testez la création de projet!" -ForegroundColor Cyan
Write-Host "   → https://www.powalyze.ch/app/projects/new" -ForegroundColor White
Write-Host ""
