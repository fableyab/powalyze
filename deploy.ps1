# Quick Deploy Script for Powalyze
# Usage: .\deploy.ps1 [-Production]

param(
    [switch]$Production = $false,
    [switch]$SkipBuild = $false
)

$ErrorActionPreference = "Stop"

function Write-Step {
    param($Message)
    Write-Host "`n[" -NoNewline -ForegroundColor Cyan
    Write-Host "►" -NoNewline -ForegroundColor Green
    Write-Host "] " -NoNewline -ForegroundColor Cyan
    Write-Host $Message -ForegroundColor White
}

function Write-Success {
    param($Message)
    Write-Host "  ✓ " -NoNewline -ForegroundColor Green
    Write-Host $Message -ForegroundColor Gray
}

function Write-Error-Custom {
    param($Message)
    Write-Host "  ✗ " -NoNewline -ForegroundColor Red
    Write-Host $Message -ForegroundColor Red
}

Clear-Host
Write-Host "`n╔═══════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Powalyze Deployment Script         ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════╝`n" -ForegroundColor Cyan

try {
    # Check prerequisites
    Write-Step "Checking prerequisites..."
    
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Error-Custom "Node.js not found!"
        exit 1
    }
    Write-Success "Node.js installed"
    
    if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
        Write-Error-Custom "Vercel CLI not found. Installing..."
        npm install -g vercel
    }
    Write-Success "Vercel CLI ready"

    # Build project
    if (-not $SkipBuild) {
        Write-Step "Building project..."
        
        if (Test-Path "dist") {
            Remove-Item -Recurse -Force "dist"
            Write-Success "Cleaned previous build"
        }
        
        $buildOutput = npm run build 2>&1
        
        if (-not (Test-Path "dist\index.html")) {
            Write-Error-Custom "Build failed!"
            Write-Host $buildOutput
            exit 1
        }
        
        $distSize = (Get-ChildItem -Recurse dist | Measure-Object -Property Length -Sum).Sum / 1MB
        Write-Success "Build complete ($([math]::Round($distSize, 2)) MB)"
    } else {
        Write-Host "  ⊘ Skipping build" -ForegroundColor Yellow
    }

    # Deploy
    Write-Step "Deploying to Vercel..."
    
    if ($Production) {
        Write-Host "  → Production deployment" -ForegroundColor Magenta
        vercel --prod
    } else {
        Write-Host "  → Preview deployment" -ForegroundColor Yellow
        vercel
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Deployment failed!"
        exit 1
    }
    
    Write-Host "`n╔═══════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║   Deployment Successful! 🚀           ║" -ForegroundColor Green
    Write-Host "╚═══════════════════════════════════════╝`n" -ForegroundColor Green
    
} catch {
    Write-Host "`n╔═══════════════════════════════════════╗" -ForegroundColor Red
    Write-Host "║   Deployment Failed ❌                ║" -ForegroundColor Red
    Write-Host "╚═══════════════════════════════════════╝`n" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
