# Product Manager - Full Stack Application 🎉

A complete full-stack application for managing products from Shopify and Amazon with Excel export capabilities.

## 🚀 Quick Start (2 Terminals)

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

✅ Backend: `http://localhost:5000`

### Terminal 2 - Frontend  
```bash
cd frontend
npm start
```

✅ Frontend: `http://localhost:3000` (auto-opens)

**That's it! Everything is connected and ready.** ✨

## 🔗 Connection Status

| Component | Port | URL | Status |
|-----------|------|-----|--------|
| Backend API | 5000 | http://localhost:5000/api | ✅ Ready |
| Frontend App | 3000 | http://localhost:3000 | ✅ Ready |
| Database | 27017 | Optional | ⚠️ Auto-uses mock data |

## 📁 Complete Project Structure

```
project/
├── backend/
│   ├── controllers/              # API request handlers
│   ├── models/                  # Database schemas
│   ├── routes/                  # API endpoint definitions
│   ├── services/                # Shopify/Amazon integrations
│   ├── utils/                   # Helpers & mock data
│   ├── scripts/                 # Database seeding
│   ├── server.js                # Express server
│   ├── package.json
│   ├── .env                     # Config: PORT=5000
│   ├── README.md
│   └── QUICKSTART.md
│
├── frontend/
│   ├── src/
│   │   ├── components/          # React UI components
│   │   │   ├── ProductList.js
│   │   │   ├── ProductCard.js
│   │   │   ├── SearchBar.js
│   │   │   ├── Pagination.js
│   │   │   └── Toast.js
│   │   ├── services/
│   │   │   └── api.js          # Axios API calls
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── .env                    # Config: API_URL
│   └── README.md
│
├── CONNECTION_GUIDE.md          # Detailed connection docs
├── CONNECTED.md                 # Connection verification
├── README.md                    # This file
├── setup.sh / setup.bat         # Automated setup
└── test-connection.sh           # Connection test script
```

## 🎯 Features

### Backend Features
✅ RESTful API with Express.js  
✅ MongoDB integration (optional)  
✅ Product CRUD operations  
✅ Search & filtering  
✅ Excel export with ExcelJS  
✅ Shopify/Amazon sync  
✅ Pagination (20 items/page)  
✅ Auto mock data (no DB needed)  
✅ Comprehensive error handling  
✅ Health check endpoint  

### Frontend Features
✅ Modern React UI  
✅ Real-time search  
✅ Source & status filters  
✅ Beautiful product cards  
✅ One-click Excel export  
✅ Smart pagination  
✅ Toast notifications  
✅ 100% responsive design  
✅ Smooth animations  
✅ Mobile optimized  

## 🔌 API Endpoints

All endpoints available at `http://localhost:5000/api`

### Products Management
```
GET    /products              List all products
GET    /products/source/:src  Filter by source
GET    /products/:id         Get single product
POST   /products             Create product
PUT    /products/:id         Update product
DELETE /products/:id         Delete product
```

### Sync & Import
```
POST   /products/sync/shopify    Sync from Shopify
POST   /products/sync/amazon     Sync from Amazon
```

### Export
```
POST   /export/excel            Export all to Excel
POST   /export/excel/filtered    Export filtered
POST   /export/excel/:source     Export by source
```

### Health & Status
```
GET    /health                  Server health check
```

## ⚙️ Configuration

### Backend (`.env`)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/products
SHOPIFY_STORE_URL=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your-token
AMAZON_API_KEY=your-key
```

### Frontend (`.env`)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**✅ Already configured! No changes needed.**

## 💾 Optional: MongoDB Setup

The app works perfectly **without MongoDB** using auto-generated mock data!

### To add real database:

**Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

**Or install locally:**
```bash
mongod
```

**With MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/products
```

**Seed sample data:**
```bash
cd backend
node scripts/seedDatabase.js
```

## 📦 Tech Stack

### Backend
- **Node.js v14+** - Runtime
- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database (optional)
- **ExcelJS** - Excel generation
- **Axios** - HTTP client
- **CORS** - Cross-origin support
- **Dotenv** - Configuration

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **Lucide React** - Icons
- **CSS3** - Styling
- **Modern ES6+** - JavaScript

## 🎨 UI/UX Features

**Beautiful Design:**
- Purple gradient header
- Smooth hover effects
- Animated transitions
- Professional color scheme
- Clear visual hierarchy

**Responsive Layout:**
- Mobile-first design
- Tablet optimized
- Desktop enhanced
- Touch-friendly buttons
- Flexible grids

**User Interaction:**
- Real-time search
- Smart filtering
- Loading states
- Toast notifications
- Error messages
- Smooth pagination

## ✅ Testing Connection

### Health Check
```bash
curl http://localhost:5000/api/health
```

**Expected:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "database": "disconnected",
  "timestamp": "2025-01-02T10:30:00.000Z"
}
```

### Get Products
```bash
curl http://localhost:5000/api/products?limit=5
```

### Browser Console Test
```javascript
fetch('http://localhost:5000/api/products')
  .then(r => r.json())
  .then(d => console.log('✅ Connected!', d))
  .catch(e => console.error('❌ Error:', e))
```

## 🚦 How They Communicate

```
User Opens Frontend
    ↓
http://localhost:3000 (React App)
    ↓
User clicks "View Products"
    ↓
Frontend calls API.getProducts()
    ↓
Axios sends: GET http://localhost:5000/api/products
    ↓
Backend receives request
    ↓
Backend queries DB or generates mock data
    ↓
Sends JSON response
    ↓
Frontend renders products in UI
```

## 🐛 Troubleshooting

### "Backend not starting"
```bash
# Check if port 5000 is in use
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process and restart
```

### "Frontend can't reach backend"
- ✅ Backend must be running first
- ✅ Check frontend `.env` has correct URL
- ✅ Clear browser cache (Ctrl+Shift+Del)
- ✅ Check Network tab in DevTools (F12)

### "No products showing"
- ✅ Mock data loads automatically
- ✅ Check browser console for errors
- ✅ Check Network tab for failed requests

### "Export not working"
- ✅ Make sure ExcelJS is installed
- ✅ Check browser allows downloads
- ✅ Try small export first

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [CONNECTION_GUIDE.md](./CONNECTION_GUIDE.md) | Detailed connection guide |
| [CONNECTED.md](./CONNECTED.md) | Quick connection status |
| [backend/README.md](./backend/README.md) | Backend documentation |
| [backend/QUICKSTART.md](./backend/QUICKSTART.md) | Backend quick start |
| [frontend/README.md](./frontend/README.md) | Frontend documentation |

## 🚀 Deployment

### Deploy Backend
```bash
# Platform: Heroku, Railway, AWS, DigitalOcean
# Add MongoDB Atlas URL to .env
# Set NODE_ENV=production
```

### Deploy Frontend
```bash
# Build: npm run build
# Platform: Vercel, Netlify, AWS S3
# Update REACT_APP_API_URL to production API
```

## 🔒 Security Features

✅ CORS enabled for localhost only  
✅ Credentials protected via .env  
✅ Input validation  
✅ Error message sanitization  
✅ No exposed credentials  
✅ HTTPS ready for production  

## 📊 Performance

✅ Paginated results (20 items/page)  
✅ Database indexing  
✅ Lazy loading images  
✅ CSS optimization  
✅ Component memoization  
✅ Efficient API calls  

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Axios Guide](https://axios-http.com/)
- [REST API Best Practices](https://restfulapi.net/)

## 📝 License

MIT - Free for personal and commercial use

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report issues
- Suggest features
- Submit pull requests
- Improve documentation

## ❓ FAQ

**Q: Do I need MongoDB running?**  
A: No! The app uses auto-generated mock data if MongoDB isn't available.

**Q: Can I change the ports?**  
A: Yes! Edit `.env` files in backend and frontend directories.

**Q: How do I add real products?**  
A: Use the API endpoints, or integrate with your product source.

**Q: Is this production-ready?**  
A: Almost! Add authentication, use real DB, configure CORS for your domain.

**Q: Can I customize the styling?**  
A: Absolutely! All CSS is modular and easy to modify.

---

## 🎉 You're All Set!

Everything is configured and ready to go. Start coding!

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2  
cd frontend && npm start

# Visit http://localhost:3000
```

**Built with ❤️ for product management**

Made with Node.js • React • MongoDB • Express
