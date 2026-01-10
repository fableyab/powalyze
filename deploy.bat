@echo off
REM Quick Deploy Script for Powalyze on Windows
REM Usage: deploy.bat [prod]

echo.
echo ====================================
echo   Powalyze Deployment Script
echo ====================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [ERROR] node_modules not found. Run: npm install
    exit /b 1
)

REM Clean previous build
echo [1/4] Cleaning previous build...
if exist "dist\" rd /s /q dist
echo       Done.

REM Build project
echo [2/4] Building project...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed!
    exit /b 1
)
echo       Build successful.

REM Verify build
echo [3/4] Verifying build...
if not exist "dist\index.html" (
    echo [ERROR] dist\index.html not found!
    exit /b 1
)
echo       Verification passed.

REM Deploy to Vercel
echo [4/4] Deploying to Vercel...
if "%1"=="prod" (
    echo       Production deployment...
    call vercel --prod
) else (
    echo       Preview deployment...
    call vercel
)

if errorlevel 1 (
    echo [ERROR] Deployment failed!
    exit /b 1
)

echo.
echo ====================================
echo   Deployment Complete!
echo ====================================
echo.
