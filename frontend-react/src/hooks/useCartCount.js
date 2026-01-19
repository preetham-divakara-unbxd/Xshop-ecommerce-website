import { useState, useEffect } from 'react';
import { getCartCount, getCartTotal } from '../utils/cartUtils';

export const useCartCount = () => {
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const updateCartCount = () => {
    const count = getCartCount(); // Count unique items, not total quantity
    const total = getCartTotal();
    setCartCount(count);
    setCartTotal(total);
  };

  useEffect(() => {
    updateCartCount();
    // Listen for storage changes (when cart is updated in other tabs/components)
    const handleStorageChange = () => {
      updateCartCount();
    };
    window.addEventListener('storage', handleStorageChange);
    // Also check periodically for same-tab updates
    const interval = setInterval(updateCartCount, 500);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return { cartCount, cartTotal, updateCartCount };
};
