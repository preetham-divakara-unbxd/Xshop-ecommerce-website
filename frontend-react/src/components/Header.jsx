import React from 'react';
import { Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import SearchBar from './SearchBar';

const Header = () => {
  const { categories, getCartCount } = useAppContext();
  const cartCount = getCartCount();

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
              <button 
                className="btn-departments"
                type="button"
              >
                All Departments
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dropdown-arrow">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div 
                className="dropdown-menu" 
                id="categories-dropdown"
              >
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
            <SearchBar />
            <div className="header-actions">
              <a href="#" className="header-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="header-link-text">Sign In Account</span>
              </a>
              <Link to="/orders" className="header-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span className="header-link-text">My Orders</span>
              </Link>
              <Link to="/cart" className="header-link cart-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span className="header-link-text">Cart</span>
                {cartCount > 0 && (
                  <span className="cart-count visible">{cartCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
