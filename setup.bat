@echo off
REM Product Manager Setup Script for Windows

echo.
echo ================================
echo    Product Manager Setup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% found

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not installed
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% found
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install --silent
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install backend dependencies
    exit /b 1
)
echo [OK] Backend dependencies installed
echo.

REM Install frontend dependencies
echo Installing frontend dependencies...
cd ..\frontend
call npm install --silent
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install frontend dependencies
    exit /b 1
)
echo [OK] Frontend dependencies installed
echo.

cd ..

echo ================================
echo    Setup Complete!
echo ================================
echo.

echo Next steps:
echo.
echo 1. Start the backend:
echo    cd backend ^&^& npm run dev
echo.
echo 2. In another terminal, start the frontend:
echo    cd frontend ^&^& npm start
echo.
echo 3. Open your browser:
echo    http://localhost:3000
echo.
echo Happy coding!
