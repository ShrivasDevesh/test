import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product endpoints
export const productAPI = {
  // Get all products with pagination
  getAllProducts: (page = 1, limit = 20, search = '') => {
    return api.get('/products', {
      params: { page, limit, search },
    });
  },

  // Get products by source
  getProductsBySource: (source, page = 1, limit = 20) => {
    return api.get(`/products/source/${source}`, {
      params: { page, limit },
    });
  },

  // Get single product
  getProduct: (id) => {
    return api.get(`/products/${id}`);
  },

  // Create product
  createProduct: (productData) => {
    return api.post('/products', productData);
  },

  // Update product
  updateProduct: (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },

  // Delete product
  deleteProduct: (id) => {
    return api.delete(`/products/${id}`);
  },

  // Sync from Shopify
  syncShopify: () => {
    return api.post('/products/sync/shopify');
  },

  // Sync from Amazon
  syncAmazon: () => {
    return api.post('/products/sync/amazon');
  },
};

// Export endpoints
export const exportAPI = {
  // Export all products to Excel
  exportAllProducts: () => {
    return api.post('/export/excel', {}, { responseType: 'blob' });
  },

  // Export filtered products
  exportFiltered: (filters) => {
    return api.post('/export/excel/filtered', filters, { responseType: 'blob' });
  },

  // Export by source
  exportBySource: (source) => {
    return api.post(`/export/excel/${source}`, {}, { responseType: 'blob' });
  },
};

export default api;
