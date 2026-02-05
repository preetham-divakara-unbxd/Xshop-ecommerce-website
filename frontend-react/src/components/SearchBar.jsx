import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    const trimmedSearchQuery = searchQuery.trim();
    if (trimmedSearchQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedSearchQuery)}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        autoComplete="off"
        id="unbxdInput"  
        type="text"
        placeholder="search here..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button id="searchBtn" type="submit" className="search-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
