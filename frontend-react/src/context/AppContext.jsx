import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // ==================== Categories State ====================
  const [categories, setCategories] = useState([]);

  // ==================== Cart State ====================
  const [cart, setCart] = useState([]);

  // ==================== Orders State ====================
  const [orders, setOrders] = useState([]);

  // ==================== Load Categories ====================
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data.data || []);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);

  // ==================== Cart Functions ====================
  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const productId = product._id || product.id;
      const existingItemIndex = prevCart.findIndex(
        item => (item.id === productId || item._id === productId)
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            id: productId,
            _id: productId,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            quantity: quantity
          }
        ];
      }
    });
  };

  // Update item quantity in cart
  const updateCartItem = (productId, quantity) => {
    setCart(prevCart => {
      const itemIndex = prevCart.findIndex(
        item => (item.id === productId || item._id === productId)
      );

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          return prevCart.filter(
            item => (item.id !== productId && item._id !== productId)
          );
        } else {
          const updatedCart = [...prevCart];
          updatedCart[itemIndex] = {
            ...updatedCart[itemIndex],
            quantity: quantity
          };
          return updatedCart;
        }
      }
      return prevCart;
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => 
      prevCart.filter(
        item => (item.id !== productId && item._id !== productId)
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Get cart count
  const getCartCount = () => {
    return cart.length;
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart.some(item => (item.id === productId || item._id === productId));
  };

  // ==================== Orders Functions ====================
  // Add order
  const addOrder = (orderData) => {
    const orderId = 'ORD' + Date.now();
    const newOrder = {
      orderId,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  // ==================== Context Value ====================
  const value = {
    categories,
    cart,
    orders,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartCount,
    isInCart,
    addOrder
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
