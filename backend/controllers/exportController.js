const ExcelJS = require('exceljs');
const Product = require('../models/Product');
const { generateMockProducts } = require('../utils/mockData');
const mongoose = require('mongoose');

// Check if database is connected
const isDBConnected = () => mongoose.connection.readyState === 1;

// Export all products to Excel
exports.exportToExcel = async (req, res) => {
  try {
    let products = [];

    if (isDBConnected()) {
      products = await Product.find().lean();
    } else {
      // Use mock data if DB is not connected
      products = generateMockProducts(100);
    }
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    // Define columns
    worksheet.columns = [
      { header: 'ID', key: '_id', width: 25 },
      { header: 'Title', key: 'title', width: 40 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Price', key: 'price', width: 12 },
      { header: 'Vendor', key: 'vendor', width: 20 },
      { header: 'Product Type', key: 'product_type', width: 20 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Source', key: 'source', width: 12 },
      { header: 'Created At', key: 'created_at', width: 20 },
      { header: 'Updated At', key: 'updated_at', width: 20 },
      { header: 'Image URL', key: 'image_url', width: 50 }
    ];

    // Add styling to header
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' }
    };

    // Add data rows
    products.forEach((product) => {
      worksheet.addRow({
        _id: product._id?.toString() || '',
        title: product.title || '',
        description: product.body_html ? stripHtml(product.body_html) : product.description || '',
        price: product.variants?.[0]?.price || product.price || '',
        vendor: product.vendor || '',
        product_type: product.product_type || '',
        status: product.status || '',
        source: product.source || 'unknown',
        created_at: product.created_at || '',
        updated_at: product.updated_at || '',
        image_url: product.image?.src || product.images?.[0]?.src || ''
      });
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="products_export.xlsx"');

    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export filtered products to Excel
exports.exportFilteredToExcel = async (req, res) => {
  try {
    const { search, source, status } = req.body;

    let products = [];

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
      if (source) query.source = source;
      if (status) query.status = status;

      products = await Product.find(query).lean();
    } else {
      // Use mock data
      let allProducts = generateMockProducts(100);
      if (source) {
        allProducts = allProducts.filter(p => p.source === source);
      }
      if (status) {
        allProducts = allProducts.filter(p => p.status === status);
      }
      if (search) {
        allProducts = allProducts.filter(p =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          (p.vendor && p.vendor.toLowerCase().includes(search.toLowerCase()))
        );
      }
      products = allProducts;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    worksheet.columns = [
      { header: 'ID', key: '_id', width: 25 },
      { header: 'Title', key: 'title', width: 40 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Price', key: 'price', width: 12 },
      { header: 'Vendor', key: 'vendor', width: 20 },
      { header: 'Product Type', key: 'product_type', width: 20 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Source', key: 'source', width: 12 },
      { header: 'Created At', key: 'created_at', width: 20 },
      { header: 'Updated At', key: 'updated_at', width: 20 },
      { header: 'Image URL', key: 'image_url', width: 50 }
    ];

    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' }
    };

    products.forEach((product) => {
      worksheet.addRow({
        _id: product._id?.toString() || '',
        title: product.title || '',
        description: product.body_html ? stripHtml(product.body_html) : product.description || '',
        price: product.variants?.[0]?.price || product.price || '',
        vendor: product.vendor || '',
        product_type: product.product_type || '',
        status: product.status || '',
        source: product.source || 'unknown',
        created_at: product.created_at || '',
        updated_at: product.updated_at || '',
        image_url: product.image?.src || product.images?.[0]?.src || ''
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="products_${source || 'all'}_export.xlsx"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export products by source to Excel
exports.exportBySourceToExcel = async (req, res) => {
  try {
    const { source } = req.params;

    let products = [];

    if (isDBConnected()) {
      products = await Product.find({ source }).lean();
    } else {
      // Use mock data
      products = generateMockProducts(50, source);
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(source.charAt(0).toUpperCase() + source.slice(1));

    worksheet.columns = [
      { header: 'ID', key: '_id', width: 25 },
      { header: 'Title', key: 'title', width: 40 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Price', key: 'price', width: 12 },
      { header: 'Vendor', key: 'vendor', width: 20 },
      { header: 'Product Type', key: 'product_type', width: 20 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Created At', key: 'created_at', width: 20 },
      { header: 'Updated At', key: 'updated_at', width: 20 },
      { header: 'Image URL', key: 'image_url', width: 50 }
    ];

    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4472C4' }
    };

    products.forEach((product) => {
      worksheet.addRow({
        _id: product._id?.toString() || '',
        title: product.title || '',
        description: product.body_html ? stripHtml(product.body_html) : product.description || '',
        price: product.variants?.[0]?.price || product.price || '',
        vendor: product.vendor || '',
        product_type: product.product_type || '',
        status: product.status || '',
        created_at: product.created_at || '',
        updated_at: product.updated_at || '',
        image_url: product.image?.src || product.images?.[0]?.src || ''
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="products_${source}_export.xlsx"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to strip HTML tags
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}
