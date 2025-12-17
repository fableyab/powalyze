# ====================================================================
# 🚀 DÉPLOIEMENT AUTOMATIQUE POWALYZE VIA FTP HOSTINGER
# ====================================================================

$ErrorActionPreference = "Stop"

# Configuration FTP Hostinger
$FtpServer = "ftp.powalyze.com"
$FtpUser = "u356833578"
$FtpPassword = "A@pple2026A@pple2026"
$RemotePath = "/domains/powalyze.com/public_html"
$LocalPath = ".\dist"

Write-Host ""
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "🚀 DÉPLOIEMENT POWALYZE VIA FTP" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier dist
if (-Not (Test-Path $LocalPath)) {
    Write-Host "❌ ERREUR: Le dossier dist n'existe pas!" -ForegroundColor Red
    exit 1
}

$files = Get-ChildItem -Path $LocalPath -Recurse -File
Write-Host "✅ $($files.Count) fichiers à déployer" -ForegroundColor Green
Write-Host ""

Write-Host "📤 Connexion FTP à $FtpServer..." -ForegroundColor Yellow

# Fonction pour uploader via FTP
function Upload-FtpFile {
    param($LocalFile, $RemoteFile)
    
    try {
        $ftpUri = "ftp://$FtpServer$RemoteFile"
        $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $FtpPassword)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $ftpRequest.UseBinary = $true
        $ftpRequest.KeepAlive = $false
        
        $fileContent = [System.IO.File]::ReadAllBytes($LocalFile)
        $ftpRequest.ContentLength = $fileContent.Length
        
        $requestStream = $ftpRequest.GetRequestStream()
        $requestStream.Write($fileContent, 0, $fileContent.Length)
        $requestStream.Close()
        
        $response = $ftpRequest.GetResponse()
        $response.Close()
        
        return $true
    } catch {
        Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Fonction pour créer un répertoire FTP
function Create-FtpDirectory {
    param($RemoteDir)
    
    try {
        $ftpUri = "ftp://$FtpServer$RemoteDir"
        $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
        $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $FtpPassword)
        $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
        
        $response = $ftpRequest.GetResponse()
        $response.Close()
    } catch {
        # Ignorer si le dossier existe déjà
    }
}

# Upload des fichiers
$uploaded = 0
$failed = 0

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($LocalPath.Length + 1).Replace('\', '/')
    $remotePath = "$RemotePath/$relativePath"
    
    # Créer les dossiers parents
    $remoteDir = Split-Path $remotePath -Parent
    $dirs = $remoteDir.Split('/')
    $currentPath = ""
    foreach ($dir in $dirs) {
        if ($dir) {
            $currentPath += "/$dir"
            Create-FtpDirectory $currentPath
        }
    }
    
    Write-Host "📤 Upload: $relativePath" -ForegroundColor Gray
    
    if (Upload-FtpFile $file.FullName $remotePath) {
        $uploaded++
    } else {
        $failed++
    }
}

Write-Host ""
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "✅ DÉPLOIEMENT TERMINÉ!" -ForegroundColor Green
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Résultats:" -ForegroundColor Yellow
Write-Host "   • Uploadés : $uploaded fichiers" -ForegroundColor Green
Write-Host "   • Échecs   : $failed fichiers" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
Write-Host ""
Write-Host "🌐 Site accessible sur: https://powalyze.com" -ForegroundColor Green
Write-Host ""
