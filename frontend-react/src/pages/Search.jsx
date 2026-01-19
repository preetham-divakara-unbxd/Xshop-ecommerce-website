import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { useCartCount } from '../hooks/useCartCount';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCartCount();

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    try {
      const response = await searchAPI.search(searchQuery);
      setResults(response.data || []);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCartUpdate = () => {
    updateCartCount();
  };

  if (loading) {
    return <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!query) {
    return (
      <section className="products-section">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">No Results Found</div>
            <div className="empty-state-message">Please enter a search query</div>
            <Link to="/">
              <Button text="Back to Home" className="btn-primary" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Search Results for "{query}"</h2>
          <p id="results-count" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-light)' }}>
            0 results
          </p>
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">No Results Found</div>
            <div className="empty-state-message">No results found for "{query}"</div>
            <Link to="/">
              <Button text="Back to Home" className="btn-primary" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="products-section">
      <div className="container">
        <h2 className="section-title">Search Results for "{query}"</h2>
        <p id="results-count" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-light)' }}>
          {results.length} result{results.length !== 1 ? 's' : ''} found for "{query}"
        </p>
        <div className="products-grid">
          {results.map(product => (
            <ProductCard
              key={product._id || product.id}
              product={product}
              onCartUpdate={handleCartUpdate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Search;
