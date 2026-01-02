# Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/products
```

### 3. Start MongoDB (if local)
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Or using local MongoDB service
mongod
```

### 4. Seed Sample Data (optional)
```bash
node scripts/seedDatabase.js
```

### 5. Start the Server
```bash
npm run dev
```

Server will run on `http://localhost:3000`

## Testing the API

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Export Products to Excel
```bash
curl -X POST http://localhost:3000/api/export/excel \
  -H "Content-Type: application/json" \
  -o products.xlsx
```

### Export by Source
```bash
curl -X POST http://localhost:3000/api/export/excel/shopify \
  -o shopify_products.xlsx
```

### Filter and Export
```bash
curl -X POST http://localhost:3000/api/export/excel/filtered \
  -H "Content-Type: application/json" \
  -d '{
    "search": "kurta",
    "source": "shopify",
    "status": "active"
  }' \
  -o filtered_products.xlsx
```

## Integrating Shopify

1. Get your Shopify credentials from Admin
2. Update `.env`:
```
SHOPIFY_STORE_URL=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your-token
```

3. Sync products:
```bash
curl -X POST http://localhost:3000/api/products/sync/shopify
```

## Integrating Amazon

1. Sign up for RapidAPI
2. Subscribe to Amazon Products API
3. Get your API key and add to `.env`:
```
AMAZON_API_KEY=your-key
```

4. Sync products:
```bash
curl -X POST http://localhost:3000/api/products/sync/amazon
```

## File Structure

```
backend/
├── server.js                 # Main entry point
├── package.json              # Dependencies
├── .env.example              # Environment template
├── controllers/              # Request handlers
├── models/                   # Database schemas
├── routes/                   # API routes
├── services/                 # External API integration
├── utils/                    # Helper utilities
├── scripts/                  # Utility scripts
└── README.md                 # Full documentation
```

## Available Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/source/:source` | Products by source |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| POST | `/api/products/sync/shopify` | Sync from Shopify |
| POST | `/api/products/sync/amazon` | Sync from Amazon |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| POST | `/api/export/excel` | Export all to Excel |
| POST | `/api/export/excel/filtered` | Export filtered to Excel |
| POST | `/api/export/excel/:source` | Export by source |

## Next Steps

1. Configure your API credentials in `.env`
2. Connect your database
3. Start syncing products from Shopify/Amazon
4. Use export endpoints to generate Excel files
5. Build a frontend to consume these APIs

## Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`

**API Rate Limits**
- Implement caching for better performance
- Add request throttling

**Excel Export Issues**
- Ensure `exceljs` is installed
- Check file permissions in upload directory

For more help, see `README.md`
