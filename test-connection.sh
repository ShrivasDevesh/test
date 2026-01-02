#!/bin/bash

echo "================================"
echo "  Testing Backend-Frontend Connection"
echo "================================"
echo ""

echo "1️⃣  Testing Backend Health Check..."
HEALTH_RESPONSE=$(curl -s http://localhost:5000/api/health 2>&1)

if echo "$HEALTH_RESPONSE" | grep -q "status"; then
  echo "✅ Backend is running and responding!"
  echo "Response: $HEALTH_RESPONSE" | head -c 100
  echo ""
else
  echo "⚠️  Backend not responding. Make sure to run: cd backend && npm run dev"
  echo ""
fi

echo ""
echo "2️⃣  Testing Product List Endpoint..."
PRODUCTS_RESPONSE=$(curl -s http://localhost:5000/api/products?limit=1 2>&1)

if echo "$PRODUCTS_RESPONSE" | grep -q "success"; then
  echo "✅ Products endpoint is working!"
  echo "Sample: $(echo $PRODUCTS_RESPONSE | head -c 100)..."
else
  echo "⚠️  Products endpoint not responding"
  echo ""
fi

echo ""
echo "3️⃣  Frontend Configuration Check..."
if grep -q "REACT_APP_API_URL=http://localhost:5000/api" /workspaces/test/frontend/.env; then
  echo "✅ Frontend .env is correctly configured"
  echo "REACT_APP_API_URL=http://localhost:5000/api"
else
  echo "⚠️  Frontend .env configuration issue"
  echo ""
fi

echo ""
echo "4️⃣  Backend Configuration Check..."
if grep -q "PORT=5000" /workspaces/test/backend/.env; then
  echo "✅ Backend .env is correctly configured"
  echo "PORT=5000"
else
  echo "⚠️  Backend .env configuration issue"
  echo ""
fi

echo ""
echo "================================"
echo "  Connection Status Summary"
echo "================================"
echo ""
echo "Backend URL: http://localhost:5000"
echo "Frontend URL: http://localhost:3000"
echo ""
echo "To start both servers:"
echo "1. Terminal 1: cd backend && npm run dev"
echo "2. Terminal 2: cd frontend && npm start"
echo ""
echo "Then open: http://localhost:3000"
echo ""
