/**
 * Cart Service
 * Business logic for cart operations
 */
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (sessionId) => {
  try {
    let cart = await Cart.findOne({ sessionId }).populate('items.productId');
    
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
      await cart.save();
    }
    
    // Populate product details
    const itemsWithDetails = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) return null;
        
        return {
          id: product._id.toString(),
          _id: product._id.toString(), // Also include _id for compatibility
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          quantity: item.quantity
        };
      })
    );
    
    return {
      sessionId: cart.sessionId,
      items: itemsWithDetails.filter(item => item !== null)
    };
  } catch (error) {
    throw new Error(`Error fetching cart: ${error.message}`);
  }
};

export const addToCart = async (sessionId, productId, quantity = 1) => {
  try {
    let cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }
    
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId.toString()
    );
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    
    cart.updatedAt = new Date();
    await cart.save();
    
    return await getCart(sessionId);
  } catch (error) {
    throw new Error(`Error adding to cart: ${error.message}`);
  }
};

export const updateCartItem = async (sessionId, productId, quantity) => {
  try {
    const cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      throw new Error('Cart not found');
    }
    
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId.toString()
    );
    
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }
    
    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
    
    cart.updatedAt = new Date();
    await cart.save();
    
    return await getCart(sessionId);
  } catch (error) {
    throw new Error(`Error updating cart item: ${error.message}`);
  }
};

export const removeFromCart = async (sessionId, productId) => {
  try {
    const cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      throw new Error('Cart not found');
    }
    
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId.toString()
    );
    
    cart.updatedAt = new Date();
    await cart.save();
    
    return await getCart(sessionId);
  } catch (error) {
    throw new Error(`Error removing from cart: ${error.message}`);
  }
};

export const clearCart = async (sessionId) => {
  try {
    const cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      return { message: 'Cart already empty' };
    }
    
    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();
    
    return { message: 'Cart cleared successfully' };
  } catch (error) {
    throw new Error(`Error clearing cart: ${error.message}`);
  }
};
