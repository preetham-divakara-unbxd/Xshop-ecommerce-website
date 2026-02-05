import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';
import Button from './Button';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [notification, setNotification] = useState(null);
  const productId = product._id || product.id;

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

  const handleCardClick = (e) => {
    if (!e.target.closest('.btn-add-cart')) {
      navigate(`/product/${productId}`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    try {
      addToCart(product, 1);
      showNotification('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('Error adding to cart');
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  };

  return (
    <>
      <div className="product-card" onClick={handleCardClick}>
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-rating">
            {renderStars(product.rating)}
            <span className="rating-text">{product.rating} ({product.reviews})</span>
          </div>
          <p className="product-brand">{product.brand}</p>
          <div className="product-price">
            <span className="current-price">{formatPrice(product.price)}</span>
          </div>
          <p className="product-shipping">{product.shipping || 'Standard shipping'}</p>
          <Button
            text="Add To Cart"
            className="btn-primary btn-add-cart"
            onClick={handleAddToCart}
          />
        </div>
      </div>
      {notification && (
        <div className="notification show">{notification}</div>
      )}
    </>
  );
};

export default ProductCard;
