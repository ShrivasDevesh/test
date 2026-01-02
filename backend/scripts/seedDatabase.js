#!/usr/bin/env node

// Script to seed the database with sample products

const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../models/Product');
const { sampleProducts } = require('../utils/sampleData');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/products', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const result = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${result.length} sample products`);

    // Display inserted products
    const products = await Product.find();
    console.log('\nInserted products:');
    products.forEach(p => {
      console.log(`- ${p.title} (${p.source})`);
    });

    console.log('\nDatabase seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
