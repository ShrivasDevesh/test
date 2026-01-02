const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Common fields
  title: {
    type: String,
    required: true,
    index: true
  },
  description: String,
  body_html: String,
  price: String,
  vendor: String,
  product_type: String,
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'active'
  },
  source: {
    type: String,
    enum: ['shopify', 'amazon'],
    required: true,
    index: true
  },
  
  // Shopify specific fields
  shopify_id: String,
  shop_domain: String,
  admin_graphql_api_id: String,
  handle: String,
  image: {
    id: String,
    alt: String,
    src: String,
    width: Number,
    height: Number,
    position: Number
  },
  images: [{
    id: String,
    alt: String,
    src: String,
    width: Number,
    height: Number,
    position: Number
  }],
  variants: [{
    id: String,
    title: String,
    price: String,
    sku: String,
    inventory_quantity: Number,
    compare_at_price: String,
    image_id: String
  }],
  options: [{
    id: String,
    name: String,
    values: [String]
  }],
  
  // Amazon specific fields
  amazon_id: String,
  asin: String,
  rating: Number,
  reviews_count: Number,
  amazon_price: String,
  
  // Metadata
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  synced_at: Date,
  published_at: Date,
  raw_data: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

// Index for common queries
productSchema.index({ title: 'text', description: 'text', vendor: 'text' });
productSchema.index({ source: 1, status: 1 });

module.exports = mongoose.model('Product', productSchema);
