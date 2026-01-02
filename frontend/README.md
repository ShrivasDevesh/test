# Product Manager Frontend

A modern, responsive React frontend for managing and exporting products from Shopify and Amazon.

## Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔍 **Advanced Search & Filtering** - Filter by source, status, and search terms
- 📊 **Product Cards** - Beautiful product displays with images and details
- 💾 **Excel Export** - Export filtered or all products to Excel format
- 🔄 **Sync Products** - Sync products from Shopify and Amazon sources
- 📄 **Pagination** - Handle large product catalogs efficiently
- 🎨 **Modern UI** - Clean, modern design with smooth animations

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
REACT_APP_API_URL=http://localhost:3000/api
```

## Running the App

### Development mode:
```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production:
```bash
npm build
```

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ProductList.js      # Main product list container
│   │   ├── SearchBar.js        # Search & filter controls
│   │   ├── ProductCard.js      # Individual product card
│   │   ├── Pagination.js       # Page navigation
│   │   └── Toast.js            # Notification component
│   ├── services/
│   │   └── api.js              # API integration
│   ├── App.js                  # Main app component
│   └── index.js                # React entry point
├── package.json                # Dependencies
├── .env                        # Environment variables
└── README.md                   # This file
```

## Component Overview

### ProductList
Main container component that manages product data and user interactions.
- Fetches products from API
- Handles search, filtering, and pagination
- Manages export and sync operations

### SearchBar
Controls for searching and filtering products.
- Text search input
- Source filter (Shopify/Amazon)
- Status filter (Active/Draft/Archived)
- Sync and Export buttons

### ProductCard
Displays individual product information.
- Product image with fallback
- Title and description
- Price and vendor information
- Delete button

### Pagination
Navigation component for product pages.
- Previous/Next buttons
- Direct page selection
- Smart ellipsis for many pages

### Toast
Notification system for user feedback.
- Success messages
- Error alerts
- Loading states

## API Integration

The frontend communicates with the backend through the `api.js` service:

```javascript
import { productAPI, exportAPI } from '../services/api';

// Get products
productAPI.getAllProducts(page, limit, search);

// Export to Excel
exportAPI.exportAllProducts();
exportAPI.exportFiltered({ search, source, status });
exportAPI.exportBySource(source);
```

## Styling

The app uses modern CSS with:
- CSS Grid for product layout
- Flexbox for flexible layouts
- CSS animations for smooth interactions
- Mobile-first responsive design
- CSS variables for theming

## Environment Variables

```env
REACT_APP_API_URL=http://localhost:3000/api
```

Change this to your backend API URL.

## Features Guide

### Search Products
Type in the search box to filter products by title, vendor, or description in real-time.

### Filter by Source
Select "Shopify" or "Amazon" to view products from specific sources.

### Filter by Status
Filter products by their status: Active, Draft, or Archived.

### Export Products
Click "Export" to download filtered products as an Excel file (.xlsx).

### Sync Products
Click "Sync" to fetch the latest products from connected sources.

### Pagination
Use pagination controls to navigate through product pages (20 products per page).

## Performance Optimization

- Lazy loading for product images
- Memoized components to prevent unnecessary re-renders
- Pagination to limit DOM elements
- Optimized CSS with minimal repaints

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

**API Connection Error**
- Ensure backend is running on `http://localhost:3000`
- Check `REACT_APP_API_URL` in `.env`

**Blank Page**
- Check browser console for errors
- Verify Node.js and npm versions

**Images Not Loading**
- Products with missing images show a placeholder
- Check image URLs in product data

## Future Enhancements

- [ ] User authentication
- [ ] Advanced filtering options
- [ ] Product detail modal
- [ ] Bulk actions
- [ ] CSV export option
- [ ] Dark mode
- [ ] Favorites/wishlist
- [ ] Product comparison

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
