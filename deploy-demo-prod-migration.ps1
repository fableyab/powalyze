# Script de déploiement de la migration demo/prod
# Exécute la migration SQL sur Supabase

Write-Host "=== Déploiement Migration Demo/Prod ===" -ForegroundColor Green
Write-Host ""

# Vérifier que le fichier de migration existe
$migrationFile = "migrations/add-demo-prod-environments.sql"
if (-not (Test-Path $migrationFile)) {
    Write-Host "❌ Fichier de migration introuvable: $migrationFile" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Fichier de migration trouvé" -ForegroundColor Green

# Lire le contenu du fichier
$sqlContent = Get-Content $migrationFile -Raw
Write-Host "✅ Migration SQL chargée ($($sqlContent.Length) caractères)" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Résumé de la migration:" -ForegroundColor Cyan
Write-Host "  - Ajoute la colonne 'environment' (demo/prod) à la table organizations"
Write-Host "  - Crée l'organisation de démonstration avec UUID fixe"
Write-Host "  - Ajoute des données de démonstration (initiatives, décisions, comités, documents)"
Write-Host "  - Crée une vue pour les statistiques des organisations"
Write-Host ""

Write-Host "⚠️  IMPORTANT: Cette migration doit être exécutée dans le SQL Editor de Supabase" -ForegroundColor Yellow
Write-Host ""
Write-Host "Instructions:" -ForegroundColor Cyan
Write-Host "1. Ouvrez https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new"
Write-Host "2. Copiez le contenu du fichier: $migrationFile"
Write-Host "3. Collez dans le SQL Editor"
Write-Host "4. Cliquez sur 'Run' pour exécuter la migration"
Write-Host ""

# Demander si on veut copier le SQL dans le presse-papiers
$response = Read-Host "Voulez-vous copier le SQL dans le presse-papiers? (O/N)"
if ($response -eq "O" -or $response -eq "o") {
    Set-Clipboard -Value $sqlContent
    Write-Host "✅ SQL copié dans le presse-papiers!" -ForegroundColor Green
    Write-Host "   Vous pouvez maintenant le coller dans Supabase SQL Editor" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔗 Liens rapides:" -ForegroundColor Cyan
Write-Host "   - Dashboard Supabase: https://supabase.com/dashboard"
Write-Host "   - SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql"
Write-Host ""
