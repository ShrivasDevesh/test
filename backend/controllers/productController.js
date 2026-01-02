const Product = require('../models/Product');
const { fetchShopifyProducts } = require('../services/shopifyService');
const { fetchAmazonProducts } = require('../services/amazonService');
const { generateMockProducts } = require('../utils/mockData');
const mongoose = require('mongoose');

// Check if database is connected
const isDBConnected = () => mongoose.connection.readyState === 1;

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const skip = (page - 1) * limit;

    let products = [];
    let total = 0;

    if (isDBConnected()) {
      let query = {};
      if (search) {
        query = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { vendor: { $regex: search, $options: 'i' } }
          ]
        };
      }

      products = await Product.find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ created_at: -1 });

      total = await Product.countDocuments(query);
    } else {
      // Use mock data if DB is not connected
      const mockProducts = generateMockProducts(60);
      total = mockProducts.length;
      products = mockProducts.slice(skip, skip + parseInt(limit));
    }

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by source
exports.getProductsBySource = async (req, res) => {
  try {
    const { source } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    let products = [];
    let total = 0;

    if (isDBConnected()) {
      products = await Product.find({ source })
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ created_at: -1 });

      total = await Product.countDocuments({ source });
    } else {
      const mockProducts = generateMockProducts(30, source);
      total = mockProducts.length;
      products = mockProducts.slice(skip, skip + parseInt(limit));
    }

    res.json({
      success: true,
      data: products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sync products from Shopify
exports.syncShopifyProducts = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ 
        message: 'Database not connected. Using mock data instead.',
        mockDataGenerated: true
      });
    }

    const shopifyProducts = await fetchShopifyProducts();
    
    for (const product of shopifyProducts) {
      await Product.updateOne(
        { shopify_id: product.shopify_id },
        {
          ...product,
          source: 'shopify',
          synced_at: new Date()
        },
        { upsert: true }
      );
    }

    res.json({
      success: true,
      message: `Synced ${shopifyProducts.length} products from Shopify`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sync products from Amazon
exports.syncAmazonProducts = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ 
        message: 'Database not connected. Using mock data instead.',
        mockDataGenerated: true
      });
    }

    const amazonProducts = await fetchAmazonProducts();
    
    for (const product of amazonProducts) {
      await Product.updateOne(
        { amazon_id: product.amazon_id },
        {
          ...product,
          source: 'amazon',
          synced_at: new Date()
        },
        { upsert: true }
      );
    }

    res.json({
      success: true,
      message: `Synced ${amazonProducts.length} products from Amazon`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ error: 'Database not available' });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
