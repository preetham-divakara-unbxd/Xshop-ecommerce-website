/**
 * Wishlist Service
 * Business logic for wishlist operations
 */
import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

export const getWishlist = async (sessionId) => {
  try {
    let wishlist = await Wishlist.findOne({ sessionId }).populate('products');
    
    if (!wishlist) {
      wishlist = new Wishlist({ sessionId, products: [] });
      await wishlist.save();
    }
    
    return wishlist.products;
  } catch (error) {
    throw new Error(`Error fetching wishlist: ${error.message}`);
  }
};

export const addToWishlist = async (sessionId, productId) => {
  try {
    let wishlist = await Wishlist.findOne({ sessionId });
    
    if (!wishlist) {
      wishlist = new Wishlist({ sessionId, products: [] });
    }
    
    // Check if product already in wishlist
    if (wishlist.products.includes(productId)) {
      return wishlist;
    }
    
    wishlist.products.push(productId);
    wishlist.updatedAt = new Date();
    await wishlist.save();
    
    return await getWishlist(sessionId);
  } catch (error) {
    throw new Error(`Error adding to wishlist: ${error.message}`);
  }
};

export const removeFromWishlist = async (sessionId, productId) => {
  try {
    const wishlist = await Wishlist.findOne({ sessionId });
    
    if (!wishlist) {
      throw new Error('Wishlist not found');
    }
    
    wishlist.products = wishlist.products.filter(
      id => id.toString() !== productId.toString()
    );
    
    wishlist.updatedAt = new Date();
    await wishlist.save();
    
    return await getWishlist(sessionId);
  } catch (error) {
    throw new Error(`Error removing from wishlist: ${error.message}`);
  }
};

export const clearWishlist = async (sessionId) => {
  try {
    const wishlist = await Wishlist.findOne({ sessionId });
    
    if (!wishlist) {
      return { message: 'Wishlist already empty' };
    }
    
    wishlist.products = [];
    wishlist.updatedAt = new Date();
    await wishlist.save();
    
    return { message: 'Wishlist cleared successfully' };
  } catch (error) {
    throw new Error(`Error clearing wishlist: ${error.message}`);
  }
};
