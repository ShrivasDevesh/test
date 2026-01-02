#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}   Product Manager Setup${NC}"
echo -e "${BLUE}================================${NC}\n"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js${NC} ${NODE_VERSION} found"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm${NC} ${NPM_VERSION} found\n"

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
npm install --silent
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}\n"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
cd ../frontend
npm install --silent
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}\n"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ..

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}   Setup Complete! 🎉${NC}"
echo -e "${GREEN}================================${NC}\n"

echo -e "${YELLOW}📝 Next steps:${NC}\n"

echo -e "1. ${BLUE}Start the backend:${NC}"
echo -e "   ${BLUE}cd backend && npm run dev${NC}\n"

echo -e "2. ${BLUE}In another terminal, start the frontend:${NC}"
echo -e "   ${BLUE}cd frontend && npm start${NC}\n"

echo -e "3. ${BLUE}Open your browser:${NC}"
echo -e "   ${BLUE}http://localhost:3000${NC}\n"

echo -e "${YELLOW}📚 Documentation:${NC}"
echo -e "   Backend: ${BLUE}backend/README.md${NC}"
echo -e "   Frontend: ${BLUE}frontend/README.md${NC}"
echo -e "   Project: ${BLUE}README.md${NC}\n"

echo -e "${YELLOW}💡 Features:${NC}"
echo -e "   ✓ List products from Shopify & Amazon"
echo -e "   ✓ Search & filter products"
echo -e "   ✓ Export to Excel"
echo -e "   ✓ Responsive UI"
echo -e "   ✓ Works without MongoDB (uses mock data)\n"

echo -e "${GREEN}Happy coding! 🚀${NC}\n"
