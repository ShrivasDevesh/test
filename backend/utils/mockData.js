// Mock data generator for testing without real APIs

const axios = require('axios');

// Mock function to generate sample products
exports.generateMockProducts = (count = 10, source = 'shopify') => {
  const products = [];
  const titles = [
    'Almond Cream Kota Doriya Printed Knot Work Unstitched Suit Set',
    'Chanderi Cotton Ethnic Wear Dress Material',
    'Traditional Printed Cotton Kurta',
    'Silk Blend Unstitched Suit Material',
    'Organic Cotton Ethnic Dress Material',
    'Embroidered Kota Doriya Saree Material',
    'Chikankari Cotton Kurta Set',
    'Printed Rayon Ethnic Wear',
    'Handloom Unstitched Dress Material',
    'Cotton Blend Ethnic Wear Suit'
  ];
  
  const vendors = ['Namostri', 'Ethnic Collections', 'Traditional Textiles', 'Artisan Wear', 'Heritage Fashion'];
  
  for (let i = 0; i < count; i++) {
    const title = titles[i % titles.length];
    const vendor = vendors[Math.floor(Math.random() * vendors.length)];
    const price = (Math.random() * 3000 + 1000).toFixed(2);
    
    const product = {
      title: `${title} - Variant ${i + 1}`,
      description: `Beautiful ethnic wear made with premium materials. Perfect for celebrations and everyday wear.`,
      price: price.toString(),
      vendor: vendor,
      product_type: 'Dress material',
      status: 'active',
      source: source,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    if (source === 'shopify') {
      product.shopify_id = (8210932007082 + i).toString();
      product.handle = title.toLowerCase().replace(/\s+/g, '-');
    } else {
      product.amazon_id = `B0D${Math.random().toString(36).substring(2, 11)}`;
      product.asin = product.amazon_id;
      product.rating = (Math.random() * 2 + 3).toFixed(1);
      product.reviews_count = Math.floor(Math.random() * 500 + 50);
    }
    
    products.push(product);
  }
  
  return products;
};

// Mock Shopify API response
exports.mockShopifyResponse = (productCount = 10) => {
  return {
    products: exports.generateMockProducts(productCount, 'shopify')
  };
};

// Mock Amazon API response
exports.mockAmazonResponse = (productCount = 10) => {
  return {
    results: exports.generateMockProducts(productCount, 'amazon')
  };
};
