import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { formatPrice } from '../utils/helpers';
import Button from '../components/Button';

const Order = () => {
  const navigate = useNavigate();
  const { cart, clearCart, addOrder } = useAppContext();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [validationError, setValidationError] = useState(null);

  // Validation functions
  const validateEmail = (email) => {
    if (!email || !email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const validatePhone = (phone) => {
    if (!phone || !phone.trim()) {
      return 'Phone number is required';
    }
    // Remove all non-digit characters
    const cleanedPhone = phone.replace(/\D/g, '');
    // Check if it's exactly 10 digits (Indian phone number format)
    if (cleanedPhone.length !== 10) {
      return 'Please enter a valid 10-digit phone number';
    }
    return null;
  };

  const validatePincode = (pincode) => {
    if (!pincode || !pincode.trim()) {
      return 'Pincode is required';
    }
    // Remove all non-digit characters
    const cleanedPincode = pincode.replace(/\D/g, '');
    // Check if it's exactly 6 digits (Indian pincode format)
    if (cleanedPincode.length !== 6) {
      return 'Please enter a valid 6-digit pincode';
    }
    return null;
  };

  useEffect(() => {
    // Initialize card details display when component mounts or payment method changes
    const cardDetails = document.getElementById('card-details');
    if (cardDetails) {
      if (paymentMethod === 'card') {
        cardDetails.style.display = 'block';
        cardDetails.querySelectorAll('input').forEach(input => input.required = true);
      } else {
        cardDetails.style.display = 'none';
        cardDetails.querySelectorAll('input').forEach(input => input.required = false);
      }
    }
  }, [paymentMethod]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError(null);
    
    const formData = new FormData(e.target);

    // Get form values
    const email = formData.get('email');
    const phone = formData.get('phone');
    const pincode = formData.get('pincode');

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setValidationError(emailError);
      document.getElementById('email')?.focus();
      return;
    }

    // Validate phone
    const phoneError = validatePhone(phone);
    if (phoneError) {
      setValidationError(phoneError);
      document.getElementById('phone')?.focus();
      return;
    }

    // Validate pincode
    const pincodeError = validatePincode(pincode);
    if (pincodeError) {
      setValidationError(pincodeError);
      document.getElementById('pincode')?.focus();
      return;
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 200;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;

    const orderItems = cart.map(item => ({
      productId: item.id || item._id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      image: item.image,
      quantity: item.quantity
    }));

    const orderData = {
      customer: {
        name: formData.get('name'),
        email: email.trim(),
        phone: phone.replace(/\D/g, ''), // Store only digits
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        pincode: pincode.replace(/\D/g, '') // Store only digits
      },
      payment: {
        method: formData.get('payment-method'),
        cardNumber: formData.get('card-number'),
        expiryDate: formData.get('expiry-date'),
        cvv: formData.get('cvv')
      },
      items: orderItems,
      subtotal,
      shipping,
      tax,
      total
    };

    // Add order
    const newOrder = addOrder(orderData);

    // Clear cart
    clearCart();

    // Navigate directly to orders page
    navigate('/orders');
  };


  if (cart.length === 0) {
    return (
      <section className="checkout-section">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <div className="empty-state-title">Your Cart is Empty</div>
            <div className="empty-state-message">Add some products to your cart to place an order!</div>
            <Link to="/">
              <Button text="Continue Shopping" className="btn-primary" />
            </Link>
          </div>
        </div>
      </section>
    );
  }


  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <section className="checkout-section">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'left' }}>Checkout</h2>
        <div className="checkout-container">
          <form id="order-form" className="checkout-form" onSubmit={handleSubmit}>
            {validationError && (
              <div style={{
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                padding: '10px 14px',
                borderRadius: '6px',
                marginBottom: '20px',
                border: '1px solid #fca5a5',
                fontSize: '14px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>⚠️</span>
                <span>{validationError}</span>
              </div>
            )}
            {/* Shipping Information */}
            <div className="form-section">
              <h3 className="form-section-title">Shipping Information</h3>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="address">Address *</label>
                <textarea id="address" name="address" className="form-input form-textarea" required></textarea>
              </div>
              <div className="form-grid form-grid-3">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City *</label>
                  <input type="text" id="city" name="city" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="state">State *</label>
                  <input type="text" id="state" name="state" className="form-input" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="pincode">Pincode *</label>
                  <input type="text" id="pincode" name="pincode" className="form-input" required />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="form-section">
              <h3 className="form-section-title">Payment Method</h3>
              <div className="payment-method-options">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="card"
                    name="payment-method"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="card">Credit/Debit Card</label>
                </div>
                <div className="payment-option">
                  <input
                    type="radio"
                    id="upi"
                    name="payment-method"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="upi">UPI</label>
                </div>
                <div className="payment-option">
                  <input
                    type="radio"
                    id="cod"
                    name="payment-method"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cod">Cash on Delivery</label>
                </div>
              </div>
              <div className="payment-details" id="card-details">
                <div className="form-group">
                  <label className="form-label" htmlFor="card-number">Card Number *</label>
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    className="form-input"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="form-grid form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="expiry-date">Expiry Date *</label>
                    <input
                      type="text"
                      id="expiry-date"
                      name="expiry-date"
                      className="form-input"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      className="form-input"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div id="place-order-btn-container">
              <Button
                text="Place Order"
                className="btn-primary btn-large btn-block"
                type="submit"
              />
            </div>
          </form>

          <div className="order-summary">
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Order Summary</h3>
            <div id="order-items" className="order-items">
              {cart.map(item => (
                <div key={item.id || item._id} className="order-item">
                  <div className="order-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="order-item-details">
                    <h4 className="order-item-name">{item.name}</h4>
                    <p className="order-item-brand">{item.brand}</p>
                    <p className="order-item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <div className="order-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span id="order-subtotal">{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span id="order-shipping">{formatPrice(shipping)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (GST)</span>
              <span id="order-tax">{formatPrice(tax)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span id="order-total">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
