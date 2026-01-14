/**
 * Wishlist Controller
 * Handles HTTP requests for wishlist operations
 */
import * as wishlistService from '../services/wishlistService.js';

// Generate or get session ID from request
const getSessionId = (req) => {
  return req.headers['x-session-id'] || req.body.sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getWishlist = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const products = await wishlistService.getWishlist(sessionId);
    res.json({
      success: true,
      sessionId,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }
    
    const products = await wishlistService.addToWishlist(sessionId, productId);
    res.json({
      success: true,
      sessionId,
      message: 'Product added to wishlist',
      data: products
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { productId } = req.params;
    
    const products = await wishlistService.removeFromWishlist(sessionId, productId);
    res.json({
      success: true,
      message: 'Product removed from wishlist',
      data: products
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const clearWishlist = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const result = await wishlistService.clearWishlist(sessionId);
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
