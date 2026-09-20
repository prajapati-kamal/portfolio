@echo off
setlocal enabledelayedexpansion
title Push 3D Portfolio to GitHub - Kamal Prajapati
echo ========================================================
echo   Push Kamal Prajapati 3D Portfolio to GitHub
echo ========================================================
echo.

cd /d "%~dp0"

REM Check if git is initialized
if not exist ".git" (
    echo [INFO] Initializing Git repository...
    git init
    git branch -M main
)

echo [INFO] Staging all portfolio files...
git add .

echo [INFO] Committing changes...
git commit -m "Deploy: Kamal Prajapati 3D Animated Portfolio"

echo.
echo Please enter your GitHub Repository URL.
echo (e.g. https://github.com/prajapati-kamal/portfolio.git or https://github.com/prajapati-kamal/prajapati-kamal.github.io.git)
echo If you have already set it, just press ENTER:
set /p REPO_URL="Repository URL: "

if not "%REPO_URL%"=="" (
    git remote remove origin 2>nul
    git remote add origin %REPO_URL%
    echo [INFO] Remote origin set to %REPO_URL%
)

echo.
echo [INFO] Pushing code to GitHub...
git branch -M main
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo  [SUCCESS] Code successfully pushed to GitHub!
    echo ========================================================
    echo.
    echo Next Steps for Instant Deployment:
    echo 1. Go to your repository on GitHub.
    echo 2. Go to Settings -> Pages.
    echo 3. Set Branch to 'main' and Folder to '/ (root)', then Save.
    echo 4. Your 3D portfolio will be LIVE on the web!
) else (
    echo ========================================================
    echo  [NOTICE] Push could not complete automatically.
    echo ========================================================
    echo If this is a new repository, make sure you created it on
    echo GitHub first: https://github.com/new
)
echo.
pause
