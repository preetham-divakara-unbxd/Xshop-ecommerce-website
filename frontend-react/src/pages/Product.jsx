import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';
import Button from '../components/Button';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useAppContext();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products?id=${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error loading product:', error);
      setError('Product not found');
    }
  };

  const handleAddToCart = () => {
    try {
      addToCart(product, quantity);
      showNotification(`Added ${quantity} item(s) to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('Error adding to cart');
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star">★</span>);
    }

    return stars;
  };

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <div className="empty-state-title">Error</div>
          <div className="empty-state-message">{error || 'Product not found'}</div>
          <Link to="/">
            <Button text="Back to Home" className="btn-primary" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="product-detail-section">
        <div className="container">
          <div className="product-detail-container">
            <div className="product-image-wrapper">
              <img src={product.image} alt={product.name} className="product-image-large" />
            </div>
            <div className="product-details">
              <h1>{product.name}</h1>
              <p className="product-brand-name">{product.brand}</p>
              <div className="product-rating-large">
                <div>{renderStars(product.rating)}</div>
                <span>({product.reviews} reviews)</span>
              </div>
              <div className="product-price-large">
                <span className="current-price-large">{formatPrice(product.price)}</span>
              </div>
              <div className="product-info-section">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
              <div className="product-info-section">
                <h3>Category</h3>
                <p>{product.category}</p>
              </div>
              <div className="product-info-section">
                <h3>Shipping</h3>
                <p>{product.shipping || 'Standard shipping'}</p>
              </div>
              <div className="quantity-selector">
                <label style={{ fontWeight: 500 }}>Quantity:</label>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="qty-input"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <div id="add-to-cart-container">
                {isInCart(product._id || product.id) ? (
                  <Button
                    text="Go to Cart"
                    className="btn-orange btn-large btn-block"
                    onClick={() => navigate('/cart')}
                  />
                ) : (
                  <Button
                    text="Add To Cart"
                    className="btn-primary btn-large btn-block"
                    onClick={handleAddToCart}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {notification && (
        <div className="notification show">{notification}</div>
      )}
    </>
  );
};

export default Product;
