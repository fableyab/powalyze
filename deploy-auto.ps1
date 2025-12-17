# Auto-Deploy Script - Rebuild & Deploy on changes
# Usage: .\deploy-auto.ps1

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║          POWALYZE AUTO-DEPLOY - WATCH MODE                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

$projectPath = (Get-Location).Path
$distPath = Join-Path $projectPath "dist"
$sshKey = "$env:USERPROFILE\.ssh\id_rsa_powalyze"
$vpsHost = "root@193.203.169.19"
$vpsPath = "/var/www/powalyze.com"

Write-Host "📁 Projet: $projectPath" -ForegroundColor Yellow
Write-Host "🔑 Clé SSH: $sshKey" -ForegroundColor Yellow
Write-Host "🌐 VPS: $vpsHost:$vpsPath`n" -ForegroundColor Yellow

function Deploy {
    Write-Host "`n📦 BUILD & DEPLOY en cours..." -ForegroundColor Cyan
    
    # 1. Build
    Write-Host "`n  1️⃣  Building..." -ForegroundColor Green
    npm run build | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  ❌ Build échoué!" -ForegroundColor Red
        return
    }
    Write-Host "  ✅ Build réussi" -ForegroundColor Green
    
    # 2. Compress
    Write-Host "`n  2️⃣  Compressant dist/..." -ForegroundColor Green
    $tarPath = "$env:TEMP\powalyze-dist.tar.gz"
    if (Test-Path $tarPath) { Remove-Item $tarPath -Force }
    
    # Utiliser 7z ou tar
    if (Get-Command tar -ErrorAction SilentlyContinue) {
        tar -czf $tarPath -C $projectPath dist
    } else {
        Write-Host "  ⚠️  tar non trouvé, utilisant zip..." -ForegroundColor Yellow
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $zipPath = "$env:TEMP\powalyze-dist.zip"
        [System.IO.Compression.ZipFile]::CreateFromDirectory($distPath, $zipPath)
        $tarPath = $zipPath
    }
    $size = (Get-Item $tarPath).Length / 1MB
    Write-Host "  ✅ Archive créée: $([math]::Round($size, 1))MB" -ForegroundColor Green
    
    # 3. Transfer
    Write-Host "`n  3️⃣  Transfert vers VPS..." -ForegroundColor Green
    scp -i $sshKey -q $tarPath "${vpsHost}:/tmp/"
    Write-Host "  ✅ Transfert réussi" -ForegroundColor Green
    
    # 4. Extract & Reload
    Write-Host "`n  4️⃣  Extraction et reload..." -ForegroundColor Green
    if ($tarPath.EndsWith('.tar.gz')) {
        $cmd = "cd /tmp && tar -xzf powalyze-dist.tar.gz && rm -rf $vpsPath/* && cp -r dist/* $vpsPath/ && chown -R www-data:www-data $vpsPath && systemctl reload nginx && echo '✅ DEPLOYED'"
    } else {
        $cmd = "cd /tmp && unzip -q powalyze-dist.zip && rm -rf $vpsPath/* && cp -r dist/* $vpsPath/ && chown -R www-data:www-data $vpsPath && systemctl reload nginx && echo '✅ DEPLOYED'"
    }
    ssh -i $sshKey $vpsHost $cmd
    Write-Host "  ✅ VPS actualisé" -ForegroundColor Green
    
    Write-Host "`n✨ Déploiement terminé! https://powalyze.com" -ForegroundColor Cyan
    Write-Host "   $(Get-Date -Format 'HH:mm:ss')`n" -ForegroundColor Gray
}

# Initial deploy
Deploy

# Watch for changes in src/
Write-Host "👀 En attente de changements dans src/..." -ForegroundColor Yellow
Write-Host "   (Ctrl+C pour arrêter)`n" -ForegroundColor Gray

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = Join-Path $projectPath "src"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$debounceTimer = $null
$debounceTime = 1000  # 1 second

$action = {
    if ($debounceTimer) { $debounceTimer.Stop() }
    
    $debounceTimer = New-Object System.Timers.Timer
    $debounceTimer.Interval = $debounceTime
    $debounceTimer.AutoReset = $false
    
    $debounceTimer.add_Elapsed({
        Write-Host "`n🔄 Changement détecté: $(Split-Path $Event.SourceEventArgs.FullPath -Leaf)" -ForegroundColor Yellow
        Deploy
    })
    
    $debounceTimer.Start()
}

$watcher.add_Changed($action)
$watcher.add_Created($action)
$watcher.add_Renamed($action)

try {
    while ($true) { Start-Sleep -Milliseconds 100 }
} finally {
    $watcher.Dispose()
}
