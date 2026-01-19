/**
 * Main Server File
 * XSHOP E-commerce Backend API
 * Minimal backend with only Products, Search, and Categories APIs
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import models
import Product from './models/Product.js';
import Category from './models/Category.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xshop';

// ==================== Middleware ====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ==================== Error Handler Middleware ====================
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
};

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// ==================== Database Connection ====================
const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB error:', err);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// ==================== Seed Database ====================
const seedDatabase = async () => {
  try {
    // Check if database already has data
    const productCount = await Product.countDocuments();
    const categoryCount = await Category.countDocuments();
    
    if (productCount > 0 || categoryCount > 0) {
      console.log('📦 Database already has data, skipping seed');
      return;
    }
    
    // Read JSON files
    const productsPath = path.join(__dirname, '../data/products.json');
    const categoriesPath = path.join(__dirname, '../data/categories.json');
    
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    
    // Insert categories
    const categories = await Category.insertMany(categoriesData);
    console.log(`✅ Inserted ${categories.length} categories`);
    
    // Insert products
    const products = await Product.insertMany(productsData);
    console.log(`✅ Inserted ${products.length} products`);
    
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

// ==================== API Routes ====================

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ==================== Product API ====================
// Flexible endpoint: handles all products, by ID, and by category using query parameters
// GET /api/products - Get all products
// GET /api/products?id=123 - Get product by ID
// GET /api/products?category=Laptop - Get products by category
app.get('/api/products', async (req, res) => {
  try {
    const { id, category } = req.query;
    
    // Edge case: Cannot use both id and category parameters together
    if (id && category) {
      return res.status(400).json({
        success: false,
        message: 'Cannot use both id and category parameters together. Use only one.'
      });
    }
    
    // Get single product by ID
    if (id) {
      // Edge case: Empty or whitespace-only ID
      const trimmedId = String(id).trim();
      if (!trimmedId) {
        return res.status(400).json({
          success: false,
          message: 'Product ID is required'
        });
      }
      
      // Validate MongoDB ObjectId format (24 hex characters)
      if (!trimmedId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID format'
        });
      }
      
      const product = await Product.findById(trimmedId);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      return res.json({
        success: true,
        data: product
      });
    }
    
    // Get products by category
    if (category) {
      // Edge case: Empty category string
      const decodedCategory = decodeURIComponent(category).trim();
      
      if (!decodedCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category name is required'
        });
      }
      
      const products = await Product.find({ category: decodedCategory });
      
      return res.json({
        success: true,
        count: products.length,
        data: products
      });
    }
    
    // Get all products (no query parameters)
    const products = await Product.find()
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    // Handle MongoDB errors (e.g., invalid ObjectId format)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching products'
    });
  }
});

// ==================== Category API ====================
// GET /api/categories - Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    
    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching categories'
    });
  }
});

// ==================== Search API ====================
// GET /api/search?q=query - Search products
app.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    
    // Edge case: Missing search query
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required. Use ?q=your_search_term'
      });
    }
    
    // Edge case: Empty or whitespace-only search query
    const trimmedSearchTerm = searchTerm.trim();
    if (!trimmedSearchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Search query cannot be empty'
      });
    }
    
    // Edge case: Search query too short (optional - can remove if not needed)
    /*if (trimmedSearchTerm.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters long'
      });
    }*/
    
    const products = await Product.find({
      $or: [
        { name: { $regex: trimmedSearchTerm, $options: 'i' } },
        { brand: { $regex: trimmedSearchTerm, $options: 'i' } },
        { category: { $regex: trimmedSearchTerm, $options: 'i' } },
        { description: { $regex: trimmedSearchTerm, $options: 'i' } }
      ]
    });
    
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error searching products'
    });
  }
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// ==================== Start Server ====================
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Seed database if empty
    await seedDatabase();
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
      console.log(`📦 APIs: Products, Categories, Search`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
