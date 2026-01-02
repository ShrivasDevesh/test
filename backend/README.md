# Product Listing & Export Backend

A Node.js/Express backend for listing products from Shopify and Amazon, with Excel export functionality.

## Features

- ✅ List products from Shopify
- ✅ List products from Amazon
- ✅ Export products to Excel (.xlsx)
- ✅ Filter products by source, status, and search
- ✅ MongoDB integration for product storage
- ✅ RESTful API endpoints
- ✅ Pagination support
- ✅ Sync from multiple sources

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Shopify API credentials (optional)
- Amazon API credentials (optional)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/products
SHOPIFY_API_KEY=your_key
SHOPIFY_API_PASSWORD=your_password
SHOPIFY_STORE_URL=your_store.myshopify.com
AMAZON_API_KEY=your_amazon_key
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Products

#### Get all products
```http
GET /api/products?page=1&limit=20&search=kurta
```

#### Get products by source
```http
GET /api/products/source/shopify
GET /api/products/source/amazon
```

#### Get product by ID
```http
GET /api/products/:id
```

#### Create product
```http
POST /api/products
Content-Type: application/json

{
  "title": "Product Title",
  "price": "1999",
  "vendor": "Vendor Name",
  "product_type": "Dress material",
  "source": "shopify"
}
```

#### Sync Shopify products
```http
POST /api/products/sync/shopify
```

#### Sync Amazon products
```http
POST /api/products/sync/amazon
```

### Export

#### Export all products to Excel
```http
POST /api/export/excel
```

#### Export filtered products to Excel
```http
POST /api/export/excel/filtered
Content-Type: application/json

{
  "search": "kurta",
  "source": "shopify",
  "status": "active"
}
```

#### Export products by source to Excel
```http
POST /api/export/excel/shopify
POST /api/export/excel/amazon
```

## Database Schema

### Product Model

```javascript
{
  title: String (required),
  description: String,
  body_html: String,
  price: String,
  vendor: String,
  product_type: String,
  status: String (active|draft|archived),
  source: String (shopify|amazon),
  
  // Shopify fields
  shopify_id: String,
  shop_domain: String,
  image: Object,
  images: Array,
  variants: Array,
  options: Array,
  
  // Amazon fields
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

## File Structure

```
backend/
├── server.js                 # Main server file
├── package.json              # Dependencies
├── .env.example              # Environment variables template
├── controllers/
│   ├── productController.js  # Product CRUD operations
│   └── exportController.js   # Excel export logic
├── models/
│   └── Product.js            # MongoDB schema
├── routes/
│   ├── products.js           # Product routes
│   └── export.js             # Export routes
├── services/
│   ├── shopifyService.js     # Shopify API integration
│   └── amazonService.js      # Amazon API integration
└── README.md                 # This file
```

## Configuration

### MongoDB Connection
- Local: `mongodb://localhost:27017/products`
- MongoDB Atlas: `mongodb+srv://user:password@cluster.mongodb.net/products`

### Shopify Setup
1. Get credentials from Shopify Admin
2. Add to `.env`:
   ```
   SHOPIFY_STORE_URL=your-store.myshopify.com
   SHOPIFY_ACCESS_TOKEN=your-access-token
   ```

### Amazon Setup
The backend uses RapidAPI's Amazon Products API:
1. Sign up at https://rapidapi.com/
2. Subscribe to Amazon Products API
3. Get your API key and add to `.env`

## Error Handling

The API returns errors in this format:
```json
{
  "error": "Error message",
  "message": "Detailed error information"
}
```

## CORS

CORS is enabled for all origins. For production, update `server.js`:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

## Testing

Use tools like Postman or curl to test endpoints:

```bash
# Get all products
curl http://localhost:3000/api/products

# Export to Excel
curl -X POST http://localhost:3000/api/export/excel -o products.xlsx

# Sync Shopify products
curl -X POST http://localhost:3000/api/products/sync/shopify
```

## Performance Tips

1. Add database indexes for frequently searched fields
2. Use pagination for large datasets
3. Implement caching for product listings
4. Use compression middleware for large exports

## Future Enhancements

- [ ] Authentication & authorization
- [ ] Advanced filtering options
- [ ] Bulk product operations
- [ ] Real-time WebSocket updates
- [ ] CSV export option
- [ ] Email export notifications
- [ ] Product comparison tools
- [ ] Inventory management

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
