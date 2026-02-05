import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

const Home = () => {
  const navigate = useNavigate();
  const { categories } = useAppContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      const allProducts = response.data.data || [];
      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/category?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-container">
            <div className="hero-banner">
              <div className="hero-content">
                <h2>Phone/Iphone</h2>
                <h1>Iphone 14 Midnight <span className="hero-storage">128gb</span></h1>
                <p className="hero-price">Starting from ₹75,000</p>
                <p className="hero-specs">
                  OLED 6.1 inch, 2532 x 1170 pixel, A15 Bionic, 6-core CPU, 5-core GPU
                </p>
                <Link to="/category?category=Mobile%20phone" className="btn btn-primary">Shop Now</Link>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop&q=95&auto=format" 
                alt="iPhone 14" 
                id="hero-image"
              />
              <div className="hero-banner-dots">
                <span className="hero-dot active"></span>
                <span className="hero-dot"></span>
                <span className="hero-dot"></span>
              </div>
            </div>
            <div className="promo-banners">
              <div className="promo-banner blue">
                <div>
                  <div className="promo-label">Trade-In Offer</div>
                  <div className="promo-title">Camera CCTV</div>
                  <div className="promo-price">From ₹5,999</div>
                  <Link to="/category?category=Camera" className="btn btn-white">Shop Now</Link>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop&q=95&auto=format" 
                  alt="CCTV Camera"
                />
              </div>
              <div className="promo-banner yellow">
                <div>
                  <div className="promo-label">Trade-In Offer</div>
                  <div className="promo-title">Headphone</div>
                  <div className="promo-price">From ₹10,999</div>
                  <Link to="/category?category=Headphone" className="btn btn-white">Shop Now</Link>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=95&auto=format" 
                  alt="Headphone"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-grid">
            {categories.map(category => (
              <div
                key={category._id || category.id}
                className="category-item"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="category-icon">{category.icon}</div>
                <div className="category-name">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <div className="products-grid">
            {products.slice(0, 8).map(product => (
              <ProductCard
                key={product._id || product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
