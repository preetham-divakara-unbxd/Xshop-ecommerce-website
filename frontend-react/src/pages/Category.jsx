import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { productAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { useCartCount } from '../hooks/useCartCount';

const Category = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCartCount();

  useEffect(() => {
    if (category) {
      loadCategoryProducts(category);
    } else {
      setLoading(false);
    }
  }, [category]);

  const loadCategoryProducts = async (categoryName) => {
    try {
      const response = await productAPI.getByCategory(categoryName);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error loading category products:', error);
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
              onCartUpdate={handleCartUpdate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
