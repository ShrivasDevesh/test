// Utility functions for data validation and formatting

// Validate product data
exports.validateProduct = (product) => {
  const errors = [];
  
  if (!product.title || product.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (product.price && isNaN(parseFloat(product.price))) {
    errors.push('Price must be a valid number');
  }
  
  if (!['shopify', 'amazon'].includes(product.source)) {
    errors.push('Source must be either shopify or amazon');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Format price
exports.formatPrice = (price) => {
  if (!price) return '0.00';
  const num = parseFloat(price);
  return isNaN(num) ? '0.00' : num.toFixed(2);
};

// Clean product data
exports.cleanProductData = (product) => {
  return {
    ...product,
    price: exports.formatPrice(product.price),
    title: product.title?.trim() || '',
    vendor: product.vendor?.trim() || '',
    description: product.description?.trim() || ''
  };
};

// Parse MongoDB ObjectId
exports.parseObjectId = (id) => {
  try {
    return id.toString();
  } catch {
    return id;
  }
};

// Handle null/undefined values
exports.sanitizeData = (data) => {
  if (typeof data !== 'object') return data;
  
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      sanitized[key] = '';
    } else if (typeof value === 'object') {
      sanitized[key] = exports.sanitizeData(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};
