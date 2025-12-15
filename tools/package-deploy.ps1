# Packages a deployable folder and archive for Powalyze
param(
  [string]$ProjectFolder = "powalyze.com",
  [string]$StagingRoot = "deploy_staging"
)

Write-Host "📦 Preparing deploy package..." -ForegroundColor Cyan

$root = (Get-Location).Path
$distPath = Join-Path $root "dist"

if (-not (Test-Path $distPath)) {
  Write-Host "🔨 dist/ not found. Running npm run build..." -ForegroundColor Yellow
  npm run build | Out-Null
  if (-not (Test-Path $distPath)) {
    Write-Host "❌ Build failed or dist/ missing." -ForegroundColor Red
    exit 1
  }
}

$stagingBase = Join-Path $root $StagingRoot
New-Item -ItemType Directory -Force -Path $stagingBase | Out-Null

$stagingPath = Join-Path $stagingBase $ProjectFolder
New-Item -ItemType Directory -Force -Path $stagingPath | Out-Null

# Copy site files (flat into site root, as typically served under /var/www/<domain>)
Write-Host "➡️  Copying dist/* to $stagingPath" -ForegroundColor Green
Copy-Item -Path (Join-Path $distPath '*') -Destination $stagingPath -Recurse -Force

# Include nginx config if present
$nginxConf = Join-Path $root "nginx.conf"
if (Test-Path $nginxConf) {
  Copy-Item $nginxConf (Join-Path $stagingPath "nginx.conf") -Force
}

# Create archive
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$archiveName = "$($ProjectFolder)_$timestamp.zip"
$archivePath = Join-Path $stagingBase $archiveName

if (Test-Path $archivePath) { Remove-Item $archivePath -Force }
Write-Host "🗜️  Creating archive: $archivePath" -ForegroundColor Green
Compress-Archive -Path (Join-Path $stagingPath '*') -DestinationPath $archivePath -Force

Write-Host ""; Write-Host "✅ Deploy package ready" -ForegroundColor Cyan
Write-Host ("   Folder: {0}" -f $stagingPath)
Write-Host ("   Archive: {0}" -f $archivePath)
Write-Host ""
Write-Host "To create the folder on your VPS and upload:" -ForegroundColor Yellow
Write-Host ("  ssh <SSH_USER>@<HOST> 'sudo mkdir -p /var/www/{0} && sudo chown `u0024USER:`u0024USER /var/www/{0}'" -f $ProjectFolder)
Write-Host ("  scp -r '{0}/*' <SSH_USER>@<HOST>:/var/www/{1}/" -f $stagingPath, $ProjectFolder)
Write-Host ""