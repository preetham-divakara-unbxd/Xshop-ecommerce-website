/**
 * Category Routes
 */
import express from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

// GET /api/categories - Get all categories
router.get('/', categoryController.getAllCategories);

// GET /api/categories/:id - Get category by ID
router.get('/:id', categoryController.getCategoryById);

// POST /api/categories - Create new category (admin)
router.post('/', categoryController.createCategory);

// PUT /api/categories/:id - Update category (admin)
router.put('/:id', categoryController.updateCategory);

// DELETE /api/categories/:id - Delete category (admin)
router.delete('/:id', categoryController.deleteCategory);

export default router;
