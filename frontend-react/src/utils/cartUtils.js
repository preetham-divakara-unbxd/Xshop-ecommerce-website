/**
 * Cart Utilities
 * Handles cart operations using localStorage
 */

const CART_STORAGE_KEY = 'xshop_cart';

/**
 * Get cart from localStorage
 */
export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

/**
 * Save cart to localStorage
 */
export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return false;
  }
};

/**
 * Add item to cart
 */
export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const productId = product._id || product.id;
  
  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex(
    item => (item.id === productId || item._id === productId)
  );
  
  if (existingItemIndex >= 0) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({
      id: productId,
      _id: productId,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  saveCart(cart);
  return cart;
};

/**
 * Update item quantity in cart
 */
export const updateCartItem = (productId, quantity) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    item => (item.id === productId || item._id === productId)
  );
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    saveCart(cart);
  }
  
  return cart;
};

/**
 * Remove item from cart
 */
export const removeFromCart = (productId) => {
  const cart = getCart();
  const filteredCart = cart.filter(
    item => (item.id !== productId && item._id !== productId)
  );
  saveCart(filteredCart);
  return filteredCart;
};

/**
 * Clear entire cart
 */
export const clearCart = () => {
  saveCart([]);
  return [];
};

/**
 * Get cart count (number of unique items)
 */
export const getCartCount = () => {
  return getCart().length;
};

/**
 * Get cart total
 */
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

/**
 * Check if product is in cart
 */
export const isInCart = (productId) => {
  const cart = getCart();
  return cart.some(item => (item.id === productId || item._id === productId));
};
