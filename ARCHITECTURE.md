# System Architecture & Connection Diagram

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER BROWSER                            │
│                 http://localhost:3000                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ React App Loads
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  FRONTEND (React)                           │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ App.js                                               │  │
│  │ ├─ ProductList (Main Container)                     │  │
│  │ │  ├─ SearchBar (Search & Filters)                  │  │
│  │ │  ├─ ProductCard (Grid Layout)                     │  │
│  │ │  ├─ Pagination (Page Navigation)                  │  │
│  │ │  └─ Toast (Notifications)                         │  │
│  │ └─ Services/api.js (Axios Calls)                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Port: 3000                                                 │
│  Tech: React 18, Axios, CSS3                               │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTTP Requests
                      │
   ┌──────────────────┼──────────────────────┐
   │                  │                      │
   │ GET /products    │ POST /export/excel   │ POST /sync
   │                  │                      │
   ▼                  ▼                      ▼
┌─────────────────────────────────────────────────────────────┐
│             BACKEND (Express.js)                            │
│          http://localhost:5000/api                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ server.js (Main Entry Point)                        │  │
│  │                                                      │  │
│  │ Routes:                                              │  │
│  │ ├─ /products          → productController           │  │
│  │ └─ /export            → exportController            │  │
│  │                                                      │  │
│  │ Controllers:                                         │  │
│  │ ├─ productController.js                             │  │
│  │ │  ├─ getAllProducts()                              │  │
│  │ │  ├─ getProductsBySource()                         │  │
│  │ │  ├─ createProduct()                               │  │
│  │ │  ├─ syncShopifyProducts()                         │  │
│  │ │  └─ syncAmazonProducts()                          │  │
│  │ │                                                    │  │
│  │ └─ exportController.js                              │  │
│  │    ├─ exportToExcel()                               │  │
│  │    ├─ exportFilteredToExcel()                       │  │
│  │    └─ exportBySourceToExcel()                       │  │
│  │                                                      │  │
│  │ Services:                                            │  │
│  │ ├─ shopifyService.js  (Shopify API calls)           │  │
│  │ ├─ amazonService.js   (Amazon API calls)            │  │
│  │                                                      │  │
│  │ Utils:                                               │  │
│  │ ├─ mockData.js        (Sample data generator)       │  │
│  │ └─ validators.js      (Input validation)            │  │
│  │                                                      │  │
│  │ Models:                                              │  │
│  │ └─ Product.js         (Mongoose schema)             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Port: 5000                                                 │
│  Tech: Express.js, Node.js, Mongoose                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Query/Insert/Update
                      │
   ┌──────────────────┴──────────────────────┐
   │                                         │
   ▼                                         ▼
┌──────────────────────────┐     ┌──────────────────────────┐
│   MONGODB (Optional)     │     │   MOCK DATA Generator    │
│  mongodb://localhost:    │     │  (Auto if no DB)        │
│  27017/products         │     │                          │
│                         │     │ generateMockProducts()  │
│ Collections:            │     │ - 100+ sample products  │
│ ├─ products            │     │ - Shopify & Amazon      │
│ └─ (with indexes)      │     │ - Various prices        │
└──────────────────────────┘     │ - Multiple images       │
                                 └──────────────────────────┘
```

## 📊 Request/Response Flow

### Product Listing Flow

```
User clicks "View Products"
    │
    ▼
ProductList useEffect triggers
    │
    ▼
api.js: productAPI.getAllProducts(page, limit, search)
    │
    ▼
Axios GET request
    │
    ▼ HTTP GET /api/products?page=1&limit=20&search=...
    │
    ▼
Backend receives in productController.getAllProducts()
    │
    ├─ Check: isDBConnected()?
    │   ├─ YES → Query MongoDB
    │   └─ NO  → generateMockProducts()
    │
    ▼
Build JSON response with:
├─ success: true
├─ data: [products array]
└─ pagination: {page, limit, total, pages}
    │
    ▼ HTTP 200 OK
    │
    ▼
Frontend receives response
    │
    ▼
React setState({products: data})
    │
    ▼
ProductCard components re-render
    │
    ▼
User sees 20 products on screen ✅
```

### Excel Export Flow

```
User clicks "Export" button
    │
    ▼
handleExport() function triggers
    │
    ▼
exportAPI.exportAllProducts()
    │
    ▼ HTTP POST /api/export/excel
    │
    ▼
Backend exportController.exportToExcel()
    │
    ├─ Check: isDBConnected()?
    │   ├─ YES → Get products from MongoDB
    │   └─ NO  → Generate mock products
    │
    ▼
Create ExcelJS Workbook
    │
    ├─ Create worksheet named "Products"
    │
    ├─ Define columns:
    │  ├─ ID
    │  ├─ Title
    │  ├─ Price
    │  ├─ Vendor
    │  ├─ Source
    │  └─ ...
    │
    ├─ Style header row (blue background, white text)
    │
    ├─ Add product rows (with data)
    │
    ▼
Generate Excel file (in memory)
    │
    ▼ Send as blob response
    │
    ▼
Frontend receives blob
    │
    ▼
Create download link
    │
    ▼
Trigger browser download
    │
    ▼
File saved to Downloads folder ✅
File: products_2025-01-02.xlsx
```

### Search & Filter Flow

```
User types in search box
    │
    ▼ setSearch(value)
    │
    ▼
useEffect triggers (dependency: [search])
    │
    ▼
fetchProducts(page=1, search="kurta")
    │
    ▼ GET /api/products?page=1&search=kurta
    │
    ▼
Backend query:
{
  $or: [
    {title: /kurta/i},
    {description: /kurta/i},
    {vendor: /kurta/i}
  ]
}
    │
    ▼
Return matching products
    │
    ▼
Frontend displays filtered results ✅
```

### Sync Flow

```
User clicks "Sync" button
    │
    ▼
handleSync() function
    │
    ▼ POST /api/products/sync/shopify
    │ POST /api/products/sync/amazon
    │
    ▼
Backend syncShopifyProducts()
    │
    ├─ Check: isDBConnected()?
    │   ├─ YES → Fetch from Shopify API
    │   └─ NO  → Return success (mock)
    │
    ├─ For each product:
    │   └─ Product.updateOne() with upsert
    │
    ▼
Backend syncAmazonProducts()
    │
    ├─ Check: isDBConnected()?
    │   ├─ YES → Fetch from Amazon API
    │   └─ NO  → Return success (mock)
    │
    ├─ For each product:
    │   └─ Product.updateOne() with upsert
    │
    ▼
Return success message
    │
    ▼
Frontend shows toast notification
    │
    ▼
Refresh product list ✅
```

## 🔄 Data Models

### Product Schema (MongoDB)
```javascript
{
  _id: ObjectId,
  
  // Common fields
  title: String,
  description: String,
  body_html: String,
  price: String,
  vendor: String,
  product_type: String,
  status: "active" | "draft" | "archived",
  source: "shopify" | "amazon",
  
  // Shopify specific
  shopify_id: String,
  shop_domain: String,
  handle: String,
  image: {
    id: String,
    src: String,
    alt: String,
    width: Number,
    height: Number
  },
  images: Array,
  variants: Array,
  options: Array,
  
  // Amazon specific
  amazon_id: String,
  asin: String,
  rating: Number,
  reviews_count: Number,
  
  // Metadata
  created_at: Date,
  updated_at: Date,
  synced_at: Date,
  published_at: Date
}
```

### API Response Format
```javascript
// List Products Response
{
  success: true,
  data: [
    {
      _id: "...",
      title: "Product Name",
      price: "2999.00",
      source: "shopify",
      ...
    },
    // ... more products
  ],
  pagination: {
    total: 150,
    page: 1,
    limit: 20,
    pages: 8
  }
}

// Export Response
Binary blob (.xlsx file)

// Sync Response
{
  success: true,
  message: "Synced 25 products from Shopify"
}
```

## 🔐 Data Security Flow

```
Sensitive Data (.env files)
    │
    ├─ MONGO_URI
    ├─ SHOPIFY_ACCESS_TOKEN
    ├─ AMAZON_API_KEY
    │
    ▼ NOT committed to git
    ▼ Stored locally only
    │
    ▼
Backend Uses Environment Variables
    │
    ├─ Reads from .env
    ├─ Never logs credentials
    ├─ Never sends to client
    │
    ▼
Frontend Uses Public API URL
    │
    ├─ REACT_APP_API_URL = http://localhost:5000/api
    ├─ No sensitive data
    ├─ Safe to commit
    │
    ▼
CORS Validation
    │
    ├─ Only localhost:3000 allowed
    ├─ Blocks unknown origins
    ├─ Protects API from abuse
    │
    ▼
Database Connection
    │
    ├─ Optional (mock data fallback)
    ├─ No required credentials
    ├─ Safe development environment ✅
```

## 📡 Network Diagram

```
                     THE INTERNET
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
    GITHUB          YOUR BROWSER      EXTERNAL APIs
    (Source)      (http://3000)    (Shopify, Amazon)
        │            │                   │
        │            └───────┬───────────┘
        │                    │
        ├────────────────────┼────────────┐
        │                    │            │
        ▼                    ▼            ▼
    .git                 FRONTEND      BACKEND
    History           React on 3000  Express on 5000
                           │            │
                           └─── JSON ───┘
                                 
                           ┌─────────────┐
                           │   MONGODB   │
                           │  (Optional) │
                           └─────────────┘
```

## 🎯 Port Mapping

```
Port 3000  → Frontend React App
             - User Interface
             - Product Display
             - Search Interface

Port 5000  → Backend Express API
             - REST Endpoints
             - Business Logic
             - Data Processing

Port 27017 → MongoDB (Optional)
             - Database
             - Document Storage
             - Or Mock Data
```

## ✅ Connection Checklist

```
□ Backend Port 5000
  ├─ Running: npm run dev
  ├─ Health: http://localhost:5000/api/health
  └─ Products: http://localhost:5000/api/products

□ Frontend Port 3000
  ├─ Running: npm start
  ├─ Display: http://localhost:3000
  └─ Console: No errors (F12)

□ Network Connection
  ├─ Frontend → Backend: Axios calls
  ├─ CORS: Enabled for localhost
  └─ API: All endpoints working

□ Data Layer
  ├─ MongoDB: Optional
  ├─ Mock Data: Auto-enabled
  └─ Products: Displaying ✅
```

---

**System is fully connected and operational!** 🚀
