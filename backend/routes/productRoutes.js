/**
 * Product Routes
 */
import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

// GET /api/products - Get all products (with optional filters)
router.get('/', productController.getAllProducts);

// GET /api/products/search?q=query - Search products
router.get('/search', productController.searchProducts);

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', productController.getProductsByCategory);

// GET /api/products/:id - Get product by ID
router.get('/:id', productController.getProductById);

// POST /api/products - Create new product (admin)
router.post('/', productController.createProduct);

// PUT /api/products/:id - Update product (admin)
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id - Delete product (admin)
router.delete('/:id', productController.deleteProduct);

export default router;
