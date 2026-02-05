import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

const Category = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category) {
      loadCategoryProducts(category);
    }
  }, [category]);

  const loadCategoryProducts = async (categoryName) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products?category=${encodeURIComponent(categoryName)}`);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error loading category products:', error);
    }
  };

  if (!category) {
    return (
      <section className="products-section">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <div className="empty-state-title">No Products Found</div>
            <div className="empty-state-message">Please select a category</div>
            <Link to="/">
              <Button text="Back to Home" className="btn-primary" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="products-section">
        <div className="container">
          <h2 className="section-title" id="category-name">{category}</h2>
          <p id="products-count" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-light)' }}>
            0 products
          </p>
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <div className="empty-state-title">No Products Found</div>
            <div className="empty-state-message">No products found in {category} category</div>
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
        <h2 className="section-title" id="category-name">{category}</h2>
        <p id="products-count" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-light)' }}>
          {products.length} product{products.length !== 1 ? 's' : ''} in {category}
        </p>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product._id || product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
