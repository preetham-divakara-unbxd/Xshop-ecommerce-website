import React from 'react';
import { useNavigate, Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';
import Button from '../components/Button';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart } = useAppContext();

  const updateQuantity = (productId, change, newValue = null) => {
    try {
      const item = cart.find(i => i.id === productId || i._id === productId);
      if (!item) return;

      let newQuantity;
      if (newValue !== null) {
        newQuantity = Math.max(1, newValue);
      } else {
        newQuantity = Math.max(1, item.quantity + change);
      }

      updateCartItem(productId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = (productId) => {
    try {
      removeFromCart(productId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const updateCartSummary = (cartItems) => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  if (cart.length === 0) {
    return (
      <section className="cart-section">
        <div className="container">
          <h2 className="section-title" id="cart-title" style={{ textAlign: 'left' }}>Shopping Cart (0 items)</h2>
          <div className="cart-container">
            <div id="cart-container" className="empty-cart-container">
              <div className="empty-state">
                <div className="empty-state-icon">🛒</div>
                <div className="empty-state-title">Your Cart is Empty</div>
                <div className="empty-state-message">Add some products to your cart to get started!</div>
                <Link to="/">
                  <Button text="Continue Shopping" className="btn-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const uniqueItemCount = cart.length; // Count unique items, not total quantity
  const itemText = uniqueItemCount === 1 ? 'item' : 'items';
  const { subtotal, shipping, tax, total } = updateCartSummary(cart);

  return (
    <section className="cart-section">
      <div className="container">
        <h2 className="section-title" id="cart-title" style={{ textAlign: 'left' }}>
          Shopping Cart ({uniqueItemCount} {itemText})
        </h2>
        <div className="cart-container">
          <div id="cart-container">
            <div id="cart-items" className="cart-items">
              {cart.map(item => {
                const productId = item.id || item._id;
                return (
                  <div key={productId} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-content">
                      <div className="cart-item-details">
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-brand">{item.brand}</p>
                        <p className="cart-item-price">{formatPrice(item.price)} each</p>
                      </div>
                      <div className="cart-item-controls">
                        <div className="cart-item-quantity">
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(productId, -1)}
                          >
                            −
                          </button>
                          <input
                            type="number"
                            className="qty-input"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => updateQuantity(productId, 0, parseInt(e.target.value) || 1)}
                          />
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(productId, 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="cart-item-total">
                          <span className="item-total">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                        <div className="cart-item-actions">
                          <button
                            className="btn-remove"
                            onClick={() => removeItem(productId)}
                            title="Remove item"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div id="cart-summary" className="cart-summary">
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span id="cart-subtotal">{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span id="cart-shipping">{formatPrice(shipping)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (GST)</span>
              <span id="cart-tax">{formatPrice(tax)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span id="cart-total">{formatPrice(total)}</span>
            </div>
            <div id="checkout-btn-container" style={{ marginTop: '24px' }}>
              <Button
                text="Proceed to Checkout"
                className="btn-primary btn-block btn-large"
                onClick={() => navigate('/order')}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
