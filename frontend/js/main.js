/**
 * Main JavaScript file
 * Handles common functionality across all pages
 */
import { cartAPI, wishlistAPI, productAPI, categoryAPI } from './api.js';

// Initialize cart and wishlist counts on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateWishlistCount();
});

async function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    try {
      const cart = await cartAPI.get();
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
      cartCount.classList.toggle('visible', totalItems > 0);
    } catch (error) {
      console.error('Error updating cart count:', error);
      cartCount.style.display = 'none';
    }
  }
}

async function updateWishlistCount() {
  const wishlistCount = document.querySelector('.wishlist-count');
  if (wishlistCount) {
    try {
      const wishlist = await wishlistAPI.get();
      const count = wishlist.length;
      wishlistCount.textContent = count;
      wishlistCount.style.display = count > 0 ? 'flex' : 'none';
      wishlistCount.classList.toggle('visible', count > 0);
    } catch (error) {
      console.error('Error updating wishlist count:', error);
      wishlistCount.style.display = 'none';
    }
  }
}

// Format price helper
function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await productAPI.getAll();
    return response.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch categories from API
async function fetchCategories() {
  try {
    const response = await categoryAPI.getAll();
    return response.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Get URL parameters
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get('id'),
    q: params.get('q'),
    category: params.get('category')
  };
}

export { updateCartCount, updateWishlistCount, formatPrice, fetchProducts, fetchCategories, getUrlParams };
