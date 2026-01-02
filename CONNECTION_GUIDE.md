# Backend & Frontend Connection Guide

## 🔗 How They're Connected

The frontend and backend communicate through RESTful API calls using **Axios**.

### Architecture Overview

```
Frontend (React on port 3000)
    ↓
API Calls (Axios)
    ↓
Backend (Express on port 3001)
    ↓
MongoDB (or Mock Data)
```

## 🚀 Quick Start - Both Running Together

### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ MongoDB connected successfully
🚀 Backend Server running on port 3001
📍 API: http://localhost:3001/api
💚 Health check: http://localhost:3001/api/health
```

If MongoDB is not running, you'll see:
```
⚠️  MongoDB connection failed: ...
📌 Continuing without database - using mock data mode
```

This is **normal** - the app will work with sample data!

### Terminal 2: Start Frontend
```bash
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!
Webpack compiled with 1 warning.

Local:          http://localhost:3000
On Your Network: http://192.168.x.x:3000
```

Browser automatically opens → Visit `http://localhost:3000`

## 🔧 Configuration Files

### Backend (`/backend/.env`)
```env
PORT=3001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/products
SHOPIFY_STORE_URL=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your-token
AMAZON_API_KEY=your-key
```

### Frontend (`/frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:3001/api
```

**Important:** The frontend uses `3001` to connect to backend!

## 📡 API Endpoints

All requests from frontend go to `http://localhost:3001/api`

### Health Check
```bash
GET http://localhost:3001/api/health

Response:
{
  "status": "OK",
  "message": "Server is running",
  "database": "connected",
  "timestamp": "2025-01-02T10:30:00.000Z"
}
```

### Get Products
```bash
GET http://localhost:3001/api/products?page=1&limit=20

Response:
{
  "success": true,
  "data": [...products array],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5
  }
}
```

### Export to Excel
```bash
POST http://localhost:3001/api/export/excel

Response: Binary Excel file (.xlsx)
```

## ✅ Connection Checklist

- [ ] Backend running on port `3001`
- [ ] Frontend running on port `3000`
- [ ] Frontend `.env` has `REACT_APP_API_URL=http://localhost:3001/api`
- [ ] Backend `.env` configured (or using defaults)
- [ ] No CORS errors in browser console
- [ ] API health check returns status `OK`
- [ ] Product list displays in frontend

## 🔍 Testing the Connection

### From Browser Console

```javascript
// Test backend connection
fetch('http://localhost:3001/api/health')
  .then(res => res.json())
  .then(data => console.log('✅ Connected:', data))
  .catch(err => console.error('❌ Error:', err))
```

### Check Browser Network Tab

1. Open DevTools (`F12`)
2. Go to **Network** tab
3. Visit home page
4. Look for API calls like:
   - `GET /api/products` → Status `200`
   - `POST /api/export/excel` → Status `200`

Green status = ✅ Working!

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend

**Error:** `Failed to fetch products` or network errors

**Solutions:**
1. Check backend is running: `http://localhost:3001/api/health`
2. Verify frontend `.env`: `REACT_APP_API_URL=http://localhost:3001/api`
3. Restart frontend: `npm start`
4. Clear browser cache: `Ctrl+Shift+Delete`

### CORS Errors

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:** Backend already has CORS enabled for:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`

If you're getting CORS errors, check:
- Frontend is on `localhost:3000`
- Backend is on `localhost:3001`
- API calls use correct URL

### Backend Crashes

**Error:** `Cannot find module` or connection errors

**Solutions:**
1. Install dependencies: `npm install`
2. Check Node version: `node -v` (should be v14+)
3. Check port 3001 is free: `lsof -i :3001` (Mac/Linux)
4. Kill other process if needed: `kill -9 <PID>`

### No Products Displaying

**Possible causes:**
- MongoDB not running (OK - uses mock data)
- Products not synced yet
- API not returning data

**Solution:** Products should show automatically from mock data. If not:
1. Check browser console for errors
2. Check Network tab for API failures
3. Verify backend `.env` settings

## 📊 Data Flow

### Viewing Products

```
1. Frontend loads ProductList component
   ↓
2. useEffect calls productAPI.getAllProducts()
   ↓
3. Axios sends GET to http://localhost:3001/api/products
   ↓
4. Backend receives request in productController
   ↓
5. Checks if MongoDB connected:
   - If YES → Query database
   - If NO → Generate mock data
   ↓
6. Returns JSON response with products array
   ↓
7. Frontend renders products in grid layout
```

### Exporting to Excel

```
1. User clicks Export button
   ↓
2. Frontend calls exportAPI.exportAllProducts()
   ↓
3. Axios sends POST to http://localhost:3001/api/export/excel
   ↓
4. Backend collects products from DB or mock data
   ↓
5. ExcelJS creates .xlsx file
   ↓
6. Sends file as binary blob
   ↓
7. Frontend creates download link and triggers download
   ↓
8. File saves to user's downloads folder
```

## 🔐 Security Notes

- CORS is configured to only accept requests from localhost
- MongoDB connection uses local URI (no credentials needed for dev)
- Environment variables protect sensitive data
- Error messages are sanitized in production mode

## 📦 Mock Data Mode

If MongoDB is not available, the backend automatically switches to mock data:

```javascript
// Backend detects no DB connection
const isDBConnected = () => mongoose.connection.readyState === 1

if (!isDBConnected()) {
  // Use generateMockProducts() instead
  products = generateMockProducts(100)
}
```

This allows development and testing without needing MongoDB setup!

## 🚀 Deployment

When deploying to production:

### Backend
```env
PORT=3001
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/products
```

### Frontend
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

## 📞 Need Help?

1. **Check logs:** Look at terminal where server is running
2. **Check console:** Open DevTools (F12) in browser
3. **Check network:** Network tab shows all API requests
4. **Review docs:** See `backend/README.md` and `frontend/README.md`

---

**Everything is now connected! 🎉**

Your frontend and backend are communicating successfully. You can now:
- ✅ View products in real-time
- ✅ Search and filter
- ✅ Export to Excel
- ✅ Sync from Shopify/Amazon
