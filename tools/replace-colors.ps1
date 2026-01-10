# Script de remplacement global des couleurs legacy
# Remplace toutes les anciennes couleurs par le nouveau palette unifié
# #C9A86A → #D4AF37 (or)
# #0066FF → #4A9EFF (bleu)
# #0A0A0A → #000000 (noir)

Write-Host "🎨 Début du remplacement global des couleurs..." -ForegroundColor Cyan

# Définir le chemin du projet
$projectPath = "c:\powalyze\src"

# Définir les remplacements
$replacements = @(
    @{ Old = '#C9A86A'; New = '#D4AF37'; Name = 'Or (gold)' }
    @{ Old = '#B89858'; New = '#D4AF37'; Name = 'Or variant' }
    @{ Old = '#0066FF'; New = '#4A9EFF'; Name = 'Bleu (blue)' }
    @{ Old = '#0A0A0A'; New = '#000000'; Name = 'Noir (black)' }
)

# Compteurs
$totalFiles = 0
$totalReplacements = 0

# Récupérer tous les fichiers .jsx, .js, .tsx, .ts dans src
$files = Get-ChildItem -Path $projectPath -Recurse -Include *.jsx,*.js,*.tsx,*.ts -File

Write-Host "📁 Analyse de $($files.Count) fichiers..." -ForegroundColor Yellow

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileModified = $false
    $fileReplacements = 0

    foreach ($replacement in $replacements) {
        $oldColor = $replacement.Old
        $newColor = $replacement.New
        $colorName = $replacement.Name

        # Compter les occurrences avant remplacement
        $matches = ([regex]::Matches($content, [regex]::Escape($oldColor))).Count
        
        if ($matches -gt 0) {
            $content = $content -replace [regex]::Escape($oldColor), $newColor
            $fileReplacements += $matches
            $totalReplacements += $matches
            $fileModified = $true
            Write-Host "  ✓ $($file.Name): $matches × $colorName ($oldColor → $newColor)" -ForegroundColor Green
        }
    }

    # Sauvegarder si modifié
    if ($fileModified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $totalFiles++
        Write-Host "    💾 Fichier sauvegardé: $fileReplacements remplacement(s)" -ForegroundColor Magenta
    }
}

Write-Host ""
Write-Host "✅ Remplacement terminé!" -ForegroundColor Green
Write-Host "📊 Statistiques:" -ForegroundColor Cyan
Write-Host "   • Fichiers modifiés: $totalFiles" -ForegroundColor White
Write-Host "   • Total remplacements: $totalReplacements" -ForegroundColor White
Write-Host ""
Write-Host "🔍 N'oubliez pas de vérifier les changements avec:" -ForegroundColor Yellow
Write-Host "   git diff" -ForegroundColor White
