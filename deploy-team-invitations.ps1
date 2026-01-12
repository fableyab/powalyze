# Script de déploiement de la migration Team Invitations
# Usage: .\deploy-team-invitations.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 DÉPLOIEMENT MIGRATION TEAM INVITATIONS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Vérifier que le fichier SQL existe
$sqlFile = "supabase\migrations\team_invitations.sql"

if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ ERREUR: Fichier $sqlFile introuvable!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Fichier SQL trouvé: $sqlFile" -ForegroundColor Green

# Lire le contenu du fichier
$sqlContent = Get-Content $sqlFile -Raw

# Afficher un résumé
Write-Host "`n📊 RÉSUMÉ DE LA MIGRATION:" -ForegroundColor Yellow
Write-Host "- Création de la table 'invitations'" -ForegroundColor White
Write-Host "- Ajout d'index pour optimisation" -ForegroundColor White
Write-Host "- Configuration des politiques RLS" -ForegroundColor White
Write-Host "- Ajout de colonnes à 'user_organizations'" -ForegroundColor White
Write-Host "- Création de fonctions utilitaires`n" -ForegroundColor White

# Copier dans le presse-papier
Set-Clipboard -Value $sqlContent

Write-Host "✅ Contenu SQL copié dans le presse-papier!" -ForegroundColor Green

Write-Host "`n📋 ÉTAPES SUIVANTES:" -ForegroundColor Yellow
Write-Host "1. Ouvrir Supabase Dashboard: https://supabase.com/dashboard" -ForegroundColor White
Write-Host "2. Sélectionner votre projet Powalyze" -ForegroundColor White
Write-Host "3. Aller dans: SQL Editor" -ForegroundColor White
Write-Host "4. Créer une nouvelle requête" -ForegroundColor White
Write-Host "5. Coller le contenu (Ctrl+V)" -ForegroundColor White
Write-Host "6. Exécuter la requête (Ctrl+Enter ou bouton RUN)" -ForegroundColor White

Write-Host "`n⚠️  IMPORTANT:" -ForegroundColor Red
Write-Host "Vérifiez qu'il n'y a pas d'erreurs après l'exécution!" -ForegroundColor Red

Write-Host "`n✅ VÉRIFICATION POST-MIGRATION:" -ForegroundColor Yellow
Write-Host "Dans SQL Editor, exécutez:" -ForegroundColor White
Write-Host "  SELECT * FROM invitations LIMIT 1;" -ForegroundColor Cyan
Write-Host "  SELECT column_name FROM information_schema.columns WHERE table_name = 'invitations';" -ForegroundColor Cyan

Write-Host "`n🎉 Script terminé avec succès!" -ForegroundColor Green

# Pause pour que l'utilisateur puisse lire
Write-Host "`nAppuyez sur une touche pour ouvrir Supabase Dashboard..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Ouvrir Supabase Dashboard
Start-Process "https://supabase.com/dashboard"

Write-Host "`n✨ Bonne migration!" -ForegroundColor Magenta
