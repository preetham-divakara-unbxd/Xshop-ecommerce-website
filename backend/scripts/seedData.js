/**
 * Seed Data Script
 * Populates MongoDB with initial data from JSON files
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { connectDatabase } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const seedData = async () => {
  try {
    await connectDatabase();
    
    // Read JSON files
    const productsPath = path.join(__dirname, '../../data/products.json');
    const categoriesPath = path.join(__dirname, '../../data/categories.json');
    
    const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    
    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('✅ Cleared existing data');
    
    // Insert categories
    const categories = await Category.insertMany(categoriesData);
    console.log(`✅ Inserted ${categories.length} categories`);
    
    // Insert products
    const products = await Product.insertMany(productsData);
    console.log(`✅ Inserted ${products.length} products`);
    
    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
