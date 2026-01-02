const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Get products by source (shopify, amazon)
router.get('/source/:source', productController.getProductsBySource);

// Get product by ID
router.get('/:id', productController.getProductById);

// Create product (for testing/manual entry)
router.post('/', productController.createProduct);

// Sync products from Shopify
router.post('/sync/shopify', productController.syncShopifyProducts);

// Sync products from Amazon
router.post('/sync/amazon', productController.syncAmazonProducts);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
