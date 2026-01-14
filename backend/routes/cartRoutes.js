/**
 * Cart Routes
 */
import express from 'express';
import * as cartController from '../controllers/cartController.js';

const router = express.Router();

// GET /api/cart - Get cart
router.get('/', cartController.getCart);

// POST /api/cart - Add item to cart
router.post('/', cartController.addToCart);

// PUT /api/cart/:productId - Update cart item quantity
router.put('/:productId', cartController.updateCartItem);

// DELETE /api/cart/:productId - Remove item from cart
router.delete('/:productId', cartController.removeFromCart);

// DELETE /api/cart - Clear cart
router.delete('/', cartController.clearCart);

export default router;
