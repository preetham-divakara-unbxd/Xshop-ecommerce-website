import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCategories } from '../context/CategoryContext';
import { useCartCount } from '../hooks/useCartCount';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, cartTotal } = useCartCount();
  const { categories } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');

  // Manage search query based on current route
  useEffect(() => {
    if (location.pathname === '/search') {
      // If on search page, get query from URL
      const params = new URLSearchParams(location.search);
      const query = params.get('q') || '';
      setSearchQuery(query);
    } else {
      // Clear search query on all other pages (home, product, cart, etc.)
      setSearchQuery('');
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="logo">
              <Link to="/">
                <span className="logo-text">X<span className="logo-accent">SHOP</span></span>
              </Link>
            </div>
            <div className="departments-dropdown">
              <button className="btn-departments">All Departments</button>
              <div className="dropdown-menu" id="categories-dropdown">
                {categories.map(category => (
                  <Link
                    key={category._id || category.id}
                    to={`/category?category=${encodeURIComponent(category.name)}`}
                    className="dropdown-item"
                  >
                    <span className="dropdown-icon">{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="search here..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </form>
            <div className="header-actions">
              <a href="#" className="header-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Sign In Account</span>
              </a>
              <Link to="/orders" className="header-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span>My Orders</span>
              </Link>
              <Link to="/cart" className="header-link cart-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="cart-count visible">{cartCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <div className="header-bottom-content">
            <nav className="main-nav">
              <Link to="/" className="nav-link">Home</Link>
              <a href="#" className="nav-link">Deals</a>
              <a href="#" className="nav-link">Features</a>
              <a href="#" className="nav-link">Grocery & Essentials</a>
              <a href="#" className="nav-link">Blog</a>
              <a href="#" className="nav-link">Brand</a>
              <Link to="/about" className="nav-link">About Us</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
