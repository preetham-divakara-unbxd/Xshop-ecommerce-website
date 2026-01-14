/**
 * Wishlist Routes
 */
import express from 'express';
import * as wishlistController from '../controllers/wishlistController.js';

const router = express.Router();

// GET /api/wishlist - Get wishlist
router.get('/', wishlistController.getWishlist);

// POST /api/wishlist - Add item to wishlist
router.post('/', wishlistController.addToWishlist);

// DELETE /api/wishlist/:productId - Remove item from wishlist
router.delete('/:productId', wishlistController.removeFromWishlist);

// DELETE /api/wishlist - Clear wishlist
router.delete('/', wishlistController.clearWishlist);

export default router;
