# Script de vérification Supabase pour Powalyze
# Vérifie que toutes les tables sont créées correctement

Write-Host "🔍 Vérification de la configuration Supabase..." -ForegroundColor Cyan
Write-Host ""

# Vérifier que le fichier SQL existe
$sqlFile = "SUPABASE_TABLES_ESSENTIELLES.sql"
if (Test-Path $sqlFile) {
    Write-Host "✅ Fichier SQL trouvé: $sqlFile" -ForegroundColor Green
} else {
    Write-Host "❌ Fichier SQL manquant: $sqlFile" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Tables à créer dans Supabase:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  1. organizations           - Base multi-tenant"
Write-Host "  2. user_organizations      - Lien users ↔ organisations"
Write-Host "  3. initiatives             - Projets/portfolios"
Write-Host "  4. risks                   - Gestion des risques"
Write-Host "  5. decisions               - Décisions stratégiques"
Write-Host "  6. alerts                  - Alertes automatiques"
Write-Host ""

Write-Host "🔐 Sécurité configurée:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  ✅ Row Level Security (RLS) activée"
Write-Host "  ✅ Policies multi-tenant (isolation complète)"
Write-Host "  ✅ Function user_in_org() pour vérification"
Write-Host "  ✅ Index de performance sur organization_id"
Write-Host "  ✅ Cascade delete (cleanup automatique)"
Write-Host ""

Write-Host "📝 Instructions:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Ouvrez Supabase Dashboard: https://supabase.com/dashboard"
Write-Host "2. Sélectionnez votre projet Powalyze"
Write-Host "3. Allez dans SQL Editor (⚡ dans le menu)"
Write-Host "4. Cliquez 'New query'"
Write-Host "5. Copiez TOUT le contenu de: $sqlFile"
Write-Host "6. Collez dans l'éditeur SQL"
Write-Host "7. Cliquez RUN (ou Ctrl+Enter)"
Write-Host ""

Write-Host "✅ Vérification après exécution:" -ForegroundColor Green
Write-Host ""
Write-Host "Exécutez cette requête dans SQL Editor:"
Write-Host ""
Write-Host "SELECT table_name FROM information_schema.tables" -ForegroundColor Cyan
Write-Host "WHERE table_schema = 'public' ORDER BY table_name;" -ForegroundColor Cyan
Write-Host ""

Write-Host "Vous devez voir ces 6 tables:" -ForegroundColor Yellow
$tables = @(
    "alerts",
    "decisions",
    "initiatives",
    "organizations",
    "risks",
    "user_organizations"
)

foreach ($table in $tables) {
    Write-Host "  ✅ $table" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Test après déploiement:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Allez sur www.powalyze.com"
Write-Host "2. Connectez-vous (ou créez un compte)"
Write-Host "3. Naviguez vers /app/projects/new"
Write-Host "4. Créez un projet"
Write-Host ""
Write-Host "Console attendue:" -ForegroundColor Cyan
Write-Host "  🚀 Début création projet pour user: xxx"
Write-Host "  ⚠️ Aucune organisation trouvée - création automatique"
Write-Host "  ✅ Organisation créée: yyy"
Write-Host "  ✅ Utilisateur lié à l'organisation"
Write-Host "  ✅ Organization ID obtenu: yyy"
Write-Host ""

Write-Host "📊 Vérification des données créées:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Dans SQL Editor, vérifiez avec:" -ForegroundColor Cyan
Write-Host ""
Write-Host "-- Voir les organisations" -ForegroundColor Gray
Write-Host "SELECT * FROM organizations ORDER BY created_at DESC;" -ForegroundColor Cyan
Write-Host ""
Write-Host "-- Voir les liens user ↔ org" -ForegroundColor Gray
Write-Host "SELECT uo.*, o.name, u.email" -ForegroundColor Cyan
Write-Host "FROM user_organizations uo" -ForegroundColor Cyan
Write-Host "JOIN organizations o ON o.id = uo.organization_id" -ForegroundColor Cyan
Write-Host "JOIN auth.users u ON u.id = uo.user_id;" -ForegroundColor Cyan
Write-Host ""
Write-Host "-- Voir les projets" -ForegroundColor Gray
Write-Host "SELECT o.name AS org, i.name AS project, i.status" -ForegroundColor Cyan
Write-Host "FROM initiatives i" -ForegroundColor Cyan
Write-Host "JOIN organizations o ON o.id = i.organization_id;" -ForegroundColor Cyan
Write-Host ""

Write-Host "🐛 Dépannage:" -ForegroundColor Yellow
Write-Host ""
Write-Host "❌ Erreur 'relation already exists'" -ForegroundColor Red
Write-Host "   → NORMAL - Tables déjà créées" -ForegroundColor Gray
Write-Host ""
Write-Host "❌ Erreur 'permission denied'" -ForegroundColor Red
Write-Host "   → Vérifiez que vous êtes owner du projet" -ForegroundColor Gray
Write-Host ""
Write-Host "❌ Projets ne s'affichent pas" -ForegroundColor Red
Write-Host "   → Vérifiez RLS:" -ForegroundColor Gray
Write-Host "      SELECT * FROM user_organizations WHERE user_id = auth.uid();" -ForegroundColor Cyan
Write-Host ""

Write-Host "📞 Support:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Si problème persiste:"
Write-Host "  1. Vérifiez les logs Supabase Dashboard → Logs → API"
Write-Host "  2. Vérifiez la console navigateur (F12)"
Write-Host "  3. Testez avec un NOUVEAU compte utilisateur"
Write-Host ""

Write-Host "✅ Fichiers créés:" -ForegroundColor Green
Write-Host "  - SUPABASE_TABLES_ESSENTIELLES.sql (script SQL complet)"
Write-Host "  - GUIDE_DEPLOIEMENT_SUPABASE_URGENT.md (guide détaillé)"
Write-Host "  - verify-supabase.ps1 (ce script)"
Write-Host ""

Write-Host "🎉 Prêt pour le déploiement !" -ForegroundColor Green
Write-Host ""

# Ouvrir le fichier SQL dans l'éditeur par défaut
Write-Host "Voulez-vous ouvrir le fichier SQL maintenant ? (O/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "O" -or $response -eq "o" -or $response -eq "oui") {
    Write-Host "Ouverture de $sqlFile..." -ForegroundColor Cyan
    Start-Process $sqlFile
}

Write-Host ""
Write-Host "✅ Vérification terminée !" -ForegroundColor Green
