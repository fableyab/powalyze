# =====================================================
# DÉPLOIEMENT COMPLET POWALYZE
# SQL + Frontend Build + Vercel Deploy
# =====================================================

Write-Host "🚀 DÉPLOIEMENT COMPLET POWALYZE" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration Supabase
$SUPABASE_PROJECT_ID = "oeexuigxglxcsyglyxgs"
$SUPABASE_URL = "https://oeexuigxglxcsyglyxgs.supabase.co"
$SQL_FILE = "DEPLOY_COMPLETE_SCHEMA_NOW.sql"

# ÉTAPE 1: Vérifier si Supabase CLI est installé
Write-Host "📋 ÉTAPE 1/4 : Vérification Supabase CLI..." -ForegroundColor Yellow
$supabaseCli = Get-Command supabase -ErrorAction SilentlyContinue

if ($null -eq $supabaseCli) {
    Write-Host "⚠️  Supabase CLI non installé" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🔧 INSTRUCTIONS MANUELLES POUR APPLIQUER LE SQL :" -ForegroundColor Cyan
    Write-Host "   1. Ouvrez : https://supabase.com/dashboard/project/$SUPABASE_PROJECT_ID/sql/new" -ForegroundColor White
    Write-Host "   2. Copiez tout le contenu du fichier : $SQL_FILE" -ForegroundColor White
    Write-Host "   3. Collez dans l'éditeur SQL" -ForegroundColor White
    Write-Host "   4. Cliquez sur 'Run' (Ctrl+Enter)" -ForegroundColor White
    Write-Host ""
    Write-Host "⏸️  Le script continuera après 30 secondes..." -ForegroundColor Yellow
    Write-Host "   (Appuyez sur Ctrl+C pour annuler si vous n'avez pas terminé)" -ForegroundColor Gray
    Write-Host ""
    
    # Attendre 30 secondes
    for ($i = 30; $i -gt 0; $i--) {
        Write-Host "   Continuation dans $i secondes..." -ForegroundColor Gray
        Start-Sleep -Seconds 1
    }
    Write-Host ""
} else {
    Write-Host "✅ Supabase CLI trouvé" -ForegroundColor Green
    Write-Host ""
    
    # ÉTAPE 2: Appliquer le SQL via CLI
    Write-Host "📋 ÉTAPE 2/4 : Application du schéma SQL..." -ForegroundColor Yellow
    
    try {
        # Link au projet (si pas déjà fait)
        Write-Host "   Linking to project..." -ForegroundColor Gray
        supabase link --project-ref $SUPABASE_PROJECT_ID 2>&1 | Out-Null
        
        # Exécuter le SQL
        Write-Host "   Exécution du SQL..." -ForegroundColor Gray
        $result = supabase db push --file $SQL_FILE 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Schéma SQL appliqué avec succès!" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Erreur lors de l'application SQL (peut être normal si tables déjà créées)" -ForegroundColor Yellow
            Write-Host "   $result" -ForegroundColor Gray
        }
    } catch {
        Write-Host "⚠️  Erreur CLI Supabase : $_" -ForegroundColor Yellow
        Write-Host "   Continuons avec le build..." -ForegroundColor Gray
    }
    Write-Host ""
}

# ÉTAPE 3: Build Frontend
Write-Host "📋 ÉTAPE 3/4 : Build Frontend (Vite)..." -ForegroundColor Yellow
Write-Host ""

try {
    npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Build réussi!" -ForegroundColor Green
    } else {
        Write-Host "❌ Erreur lors du build" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erreur build : $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# ÉTAPE 4: Deploy Vercel
Write-Host "📋 ÉTAPE 4/4 : Déploiement Vercel Production..." -ForegroundColor Yellow
Write-Host ""

try {
    vercel --prod --yes
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Déploiement Vercel réussi!" -ForegroundColor Green
    } else {
        Write-Host "❌ Erreur lors du déploiement Vercel" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Erreur deploy : $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🎉 DÉPLOIEMENT COMPLET TERMINÉ!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔗 URL de production : https://www.powalyze.ch" -ForegroundColor White
Write-Host "🔗 Dashboard Supabase : https://supabase.com/dashboard/project/$SUPABASE_PROJECT_ID" -ForegroundColor White
Write-Host ""
Write-Host "✅ Tests à effectuer :" -ForegroundColor Cyan
Write-Host "   1. Connectez-vous sur https://www.powalyze.ch/login" -ForegroundColor White
Write-Host "   2. Allez sur https://www.powalyze.ch/app/projects/new" -ForegroundColor White
Write-Host "   3. Créez un projet de test" -ForegroundColor White
Write-Host "   4. Vérifiez qu'il n'y a plus d'erreur RLS" -ForegroundColor White
Write-Host ""
Write-Host "📊 Si erreur SQL persistante :" -ForegroundColor Yellow
Write-Host "   → Appliquez manuellement le SQL via Dashboard Supabase" -ForegroundColor White
Write-Host "   → URL : https://supabase.com/dashboard/project/$SUPABASE_PROJECT_ID/sql/new" -ForegroundColor White
Write-Host ""
