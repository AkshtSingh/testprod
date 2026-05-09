#!/bin/bash

# Project Verification Script
# Run this to check if everything is properly set up

echo "🔍 Verifying Scalable REST API Project Setup..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check backend structure
echo "📦 Checking Backend Structure..."
backend_files=(
    "backend/package.json"
    "backend/.env"
    "backend/src/server.js"
    "backend/src/config/constants.js"
    "backend/src/middleware/authMiddleware.js"
    "backend/src/controllers/authController.js"
    "backend/src/controllers/taskController.js"
    "backend/src/models/User.js"
    "backend/src/models/Task.js"
    "backend/src/routes/authRoutes.js"
    "backend/src/routes/taskRoutes.js"
    "backend/src/utils/errorHandler.js"
    "backend/src/utils/validators.js"
)

backend_ok=true
for file in "${backend_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (MISSING)"
        backend_ok=false
    fi
done

echo ""

# Check frontend structure
echo "⚛️  Checking Frontend Structure..."
frontend_files=(
    "frontend/package.json"
    "frontend/public/index.html"
    "frontend/src/App.js"
    "frontend/src/index.js"
    "frontend/src/contexts/AuthContext.js"
    "frontend/src/components/Auth.js"
    "frontend/src/components/Tasks.js"
    "frontend/src/pages/Dashboard.js"
    "frontend/src/services/api.js"
    "frontend/src/styles/App.css"
    "frontend/src/styles/Auth.css"
    "frontend/src/styles/Dashboard.css"
    "frontend/src/styles/Tasks.css"
)

frontend_ok=true
for file in "${frontend_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (MISSING)"
        frontend_ok=false
    fi
done

echo ""

# Check documentation files
echo "📚 Checking Documentation..."
docs_files=(
    "README.md"
    "QUICKSTART.md"
    "TESTING.md"
    "SECURITY.md"
    "ARCHITECTURE.md"
    "PROJECT_SUMMARY.md"
    "FILE_INDEX.md"
    "Postman_Collection.json"
)

docs_ok=true
for file in "${docs_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (MISSING)"
        docs_ok=false
    fi
done

echo ""

# Check configuration files
echo "⚙️  Checking Configuration Files..."
config_files=(
    "docker-compose.yml"
    ".gitignore"
    "backend/Dockerfile"
    "frontend/Dockerfile"
)

config_ok=true
for file in "${config_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (MISSING)"
        config_ok=false
    fi
done

echo ""
echo "============================================"

# Summary
if [ "$backend_ok" = true ] && [ "$frontend_ok" = true ] && [ "$docs_ok" = true ] && [ "$config_ok" = true ]; then
    echo -e "${GREEN}✓ All files verified successfully!${NC}"
    echo ""
    echo "🚀 You're ready to start:"
    echo "  1. cd backend && npm install && npm run dev"
    echo "  2. cd frontend && npm install && npm start"
    echo ""
    echo "📚 Read PROJECT_SUMMARY.md for getting started"
else
    echo -e "${RED}✗ Some files are missing${NC}"
    echo "Please check the marked files"
fi

echo "============================================"
