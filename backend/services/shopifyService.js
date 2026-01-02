const axios = require('axios');

const SHOPIFY_API_VERSION = '2023-10';

// Fetch products from Shopify
exports.fetchShopifyProducts = async (storeUrl, accessToken) => {
  try {
    const url = `https://${storeUrl}/admin/api/${SHOPIFY_API_VERSION}/products.json`;
    
    const response = await axios.get(url, {
      headers: {
        'X-Shopify-Access-Token': accessToken || process.env.SHOPIFY_ACCESS_TOKEN
      },
      params: {
        limit: 250,
        status: 'active'
      }
    });

    return response.data.products.map(product => ({
      shopify_id: product.id.toString(),
      title: product.title,
      body_html: product.body_html,
      vendor: product.vendor,
      product_type: product.product_type,
      handle: product.handle,
      status: product.status,
      created_at: product.created_at,
      updated_at: product.updated_at,
      published_at: product.published_at,
      admin_graphql_api_id: product.admin_graphql_api_id,
      image: product.image ? {
        id: product.image.id.toString(),
        src: product.image.src,
        alt: product.image.alt,
        width: product.image.width,
        height: product.image.height,
        position: product.image.position
      } : null,
      images: product.images?.map(img => ({
        id: img.id.toString(),
        src: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
        position: img.position
      })) || [],
      variants: product.variants?.map(variant => ({
        id: variant.id.toString(),
        title: variant.title,
        price: variant.price,
        sku: variant.sku,
        inventory_quantity: variant.inventory_quantity,
        compare_at_price: variant.compare_at_price,
        image_id: variant.image_id?.toString()
      })) || [],
      options: product.options || [],
      source: 'shopify'
    }));
  } catch (error) {
    console.error('Error fetching Shopify products:', error.message);
    throw error;
  }
};

// Fetch single product from Shopify
exports.fetchShopifyProduct = async (productId, storeUrl, accessToken) => {
  try {
    const url = `https://${storeUrl}/admin/api/${SHOPIFY_API_VERSION}/products/${productId}.json`;
    
    const response = await axios.get(url, {
      headers: {
        'X-Shopify-Access-Token': accessToken || process.env.SHOPIFY_ACCESS_TOKEN
      }
    });

    const product = response.data.product;
    return {
      shopify_id: product.id.toString(),
      title: product.title,
      body_html: product.body_html,
      vendor: product.vendor,
      product_type: product.product_type,
      handle: product.handle,
      status: product.status,
      created_at: product.created_at,
      updated_at: product.updated_at,
      published_at: product.published_at,
      admin_graphql_api_id: product.admin_graphql_api_id,
      images: product.images?.map(img => ({
        id: img.id.toString(),
        src: img.src,
        alt: img.alt
      })) || [],
      variants: product.variants?.map(variant => ({
        id: variant.id.toString(),
        title: variant.title,
        price: variant.price,
        sku: variant.sku
      })) || [],
      source: 'shopify'
    };
  } catch (error) {
    console.error('Error fetching Shopify product:', error.message);
    throw error;
  }
};
