/**
 * Cart Controller
 * Handles HTTP requests for cart operations
 */
import * as cartService from '../services/cartService.js';

// Generate or get session ID from request
const getSessionId = (req) => {
  // In a real app, this would come from authentication or session management
  // For now, we'll use a header or generate one
  return req.headers['x-session-id'] || req.body.sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const cart = await cartService.getCart(sessionId);
    res.json({
      success: true,
      sessionId: cart.sessionId,
      data: cart.items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { productId, quantity } = req.body;
    
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }
    
    const cart = await cartService.addToCart(sessionId, productId, quantity || 1);
    res.json({
      success: true,
      sessionId: cart.sessionId,
      message: 'Product added to cart',
      data: cart.items
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { productId } = req.params;
    const { quantity } = req.body;
    
    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Quantity is required'
      });
    }
    
    const cart = await cartService.updateCartItem(sessionId, productId, quantity);
    res.json({
      success: true,
      message: 'Cart item updated',
      data: cart.items
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { productId } = req.params;
    
    const cart = await cartService.removeFromCart(sessionId, productId);
    res.json({
      success: true,
      message: 'Product removed from cart',
      data: cart.items
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const result = await cartService.clearCart(sessionId);
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
