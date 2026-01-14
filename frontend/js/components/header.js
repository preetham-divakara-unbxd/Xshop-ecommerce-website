/**
 * Header Component
 * Creates the site header with navigation, search, and cart
 */
import { cartAPI, wishlistAPI, categoryAPI } from '../api.js';

class Header {
  constructor() {
    this.cartCount = 0;
    this.wishlistCount = 0;
    this.cartTotal = 0;
  }

  async loadCounts() {
    try {
      const cart = await cartAPI.get();
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      this.cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    } catch (error) {
      console.error('Error loading cart count:', error);
    }

    try {
      const wishlist = await wishlistAPI.get();
      this.wishlistCount = wishlist.length;
    } catch (error) {
      console.error('Error loading wishlist count:', error);
    }
  }

  async render() {
    await this.loadCounts();
    
    const header = document.createElement('header');
    header.className = 'site-header';
    
    const cartTotal = this.cartTotal;
    const cartCount = this.cartCount;
    const wishlistCount = this.wishlistCount;

    header.innerHTML = `
      <div class="header-top">
        <div class="container">
          <div class="header-top-content">
            <div class="logo">
              <a href="index.html">
                <span class="logo-text">X<span class="logo-accent">SHOP</span></span>
              </a>
            </div>
            <div class="departments-dropdown">
              <button class="btn-departments">All Departments</button>
              <div class="dropdown-menu" id="categories-dropdown">
                <!-- Categories will be loaded dynamically -->
              </div>
            </div>
            <div class="search-bar">
              <input type="text" id="search-input" placeholder="search here..." class="search-input">
              <button class="search-btn" id="search-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </div>
            <div class="header-actions">
              <a href="#" class="header-link" id="sign-in-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Sign In Account</span>
              </a>
              <a href="wishlist.html" class="header-link wishlist-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>My Wishlist</span>
                <span class="wishlist-count ${wishlistCount > 0 ? 'visible' : ''}">${wishlistCount}</span>
              </a>
              <a href="orders.html" class="header-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span>My Orders</span>
              </a>
              <a href="cart.html" class="header-link cart-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span class="cart-total">${this.formatPrice(cartTotal)}</span>
                <span class="cart-count ${cartCount > 0 ? 'visible' : ''}">${cartCount}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="header-bottom">
        <div class="container">
          <div class="header-bottom-content">
            <nav class="main-nav">
              <a href="index.html" class="nav-link">Home</a>
              <a href="#" class="nav-link">Deals</a>
              <a href="#" class="nav-link">Features</a>
              <a href="#" class="nav-link">Grocery & Essentials</a>
              <a href="#" class="nav-link">Blog</a>
              <a href="#" class="nav-link">Brand</a>
              <a href="about-us.html" class="nav-link">About Us</a>
            </nav>
          </div>
        </div>
      </div>
    `;

    // Add search functionality
    const searchInput = header.querySelector('#search-input');
    const searchBtn = header.querySelector('#search-btn');
    
    const performSearch = () => {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
      }
    };

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    // Load categories for dropdown
    await this.loadCategoriesDropdown(header);

    return header;
  }

  async loadCategoriesDropdown(header) {
    try {
      const response = await categoryAPI.getAll();
      const categories = response.data || [];
      
      const dropdown = header.querySelector('#categories-dropdown');
      if (dropdown) {
        dropdown.innerHTML = categories.map(category => `
          <a href="category-results.html?category=${encodeURIComponent(category.name)}" class="dropdown-item">
            <span class="dropdown-icon">${category.icon}</span>
            <span>${category.name}</span>
          </a>
        `).join('');
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }

  static async create() {
    const header = new Header();
    return await header.render();
  }
}

export { Header };
