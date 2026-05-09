@echo off
REM Project Verification Script for Windows
REM Run this to check if everything is properly set up

echo Verifying Scalable REST API Project Setup...
echo.

REM Colors in Windows batch
REM Using simple indicators instead

REM Check backend structure
echo Checking Backend Structure...
set backend_ok=1

if not exist "backend\package.json" (
    echo [ERROR] backend\package.json - MISSING
    set backend_ok=0
) else (
    echo [OK] backend\package.json
)

if not exist "backend\.env" (
    echo [ERROR] backend\.env - MISSING
    set backend_ok=0
) else (
    echo [OK] backend\.env
)

if not exist "backend\src\server.js" (
    echo [ERROR] backend\src\server.js - MISSING
    set backend_ok=0
) else (
    echo [OK] backend\src\server.js
)

echo.

REM Check frontend structure
echo Checking Frontend Structure...
set frontend_ok=1

if not exist "frontend\package.json" (
    echo [ERROR] frontend\package.json - MISSING
    set frontend_ok=0
) else (
    echo [OK] frontend\package.json
)

if not exist "frontend\public\index.html" (
    echo [ERROR] frontend\public\index.html - MISSING
    set frontend_ok=0
) else (
    echo [OK] frontend\public\index.html
)

if not exist "frontend\src\App.js" (
    echo [ERROR] frontend\src\App.js - MISSING
    set frontend_ok=0
) else (
    echo [OK] frontend\src\App.js
)

echo.

REM Check documentation
echo Checking Documentation...
set docs_ok=1

if not exist "README.md" (
    echo [ERROR] README.md - MISSING
    set docs_ok=0
) else (
    echo [OK] README.md
)

if not exist "PROJECT_SUMMARY.md" (
    echo [ERROR] PROJECT_SUMMARY.md - MISSING
    set docs_ok=0
) else (
    echo [OK] PROJECT_SUMMARY.md
)

echo.
echo ============================================

if %backend_ok%==1 if %frontend_ok%==1 if %docs_ok%==1 (
    echo [SUCCESS] All files verified successfully!
    echo.
    echo Ready to start:
    echo   1. cd backend ^& npm install ^& npm run dev
    echo   2. cd frontend ^& npm install ^& npm start
    echo.
    echo Read PROJECT_SUMMARY.md for detailed instructions
) else (
    echo [ERROR] Some files are missing
    echo Please check the marked files
)

echo ============================================
pause
