@echo off
REM Startup Script for Windows Users
REM This script starts both backend and frontend automatically

title Scalable REST API - Startup Script
color 0A

cls
echo.
echo ========================================
echo   Scalable REST API - Auto Startup
echo ========================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please download Node.js from https://nodejs.org/
    echo Then restart this script
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Check if backend directory exists
if not exist "backend" (
    echo [ERROR] backend directory not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

REM Check if frontend directory exists
if not exist "frontend" (
    echo [ERROR] frontend directory not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

echo.
echo Starting installation and servers...
echo.

REM Install backend dependencies if needed
if not exist "backend\node_modules" (
    echo [1/4] Installing backend dependencies...
    cd backend
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install backend dependencies
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Backend dependencies installed
) else (
    echo [1/4] Backend dependencies already installed
)

echo.

REM Install frontend dependencies if needed
if not exist "frontend\node_modules" (
    echo [2/4] Installing frontend dependencies...
    cd frontend
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install frontend dependencies
        pause
        exit /b 1
    )
    cd ..
    echo [OK] Frontend dependencies installed
) else (
    echo [2/4] Frontend dependencies already installed
)

echo.
echo ========================================
echo   Ready to start servers
echo ========================================
echo.
echo [3/4] Starting backend server on port 5000...
echo [4/4] Frontend will start on port 3000
echo.
echo Three command windows will open:
echo   1. Backend API server
echo   2. Frontend development server
echo   3. This window (for reference)
echo.
pause

REM Start backend in new window
cd backend
start cmd /k "npm run dev"
timeout /t 3 /nobreak
cd ..

echo.
echo [OK] Backend started (check its window for status)
echo.
timeout /t 2 /nobreak

REM Start frontend in new window
cd frontend
start cmd /k "npm start"
cd ..

echo.
echo ========================================
echo   Startup Complete!
echo ========================================
echo.
echo [OK] Backend running on http://localhost:5000
echo [OK] Frontend will open at http://localhost:3000
echo.
echo If browser doesn't open, visit: http://localhost:3000
echo.
echo API Documentation: http://localhost:5000/api-docs
echo.
echo To stop servers:
echo   1. Close the backend command window (Ctrl+C)
echo   2. Close the frontend command window (Ctrl+C)
echo.
pause
