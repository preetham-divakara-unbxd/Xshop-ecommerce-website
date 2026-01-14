/**
 * Order Page JavaScript
 */
import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';
import { Button } from '../components/button.js';
import { formatPrice, updateCartCount } from '../main.js';
import { cartAPI, orderAPI } from '../api.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize header and footer
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');
  
  if (headerContainer) {
    const header = await Header.create();
    headerContainer.appendChild(header);
  }
  
  if (footerContainer) {
    footerContainer.appendChild(Footer.create());
  }

  try {
    const cart = await cartAPI.get();
    
    if (cart.length === 0) {
      showEmptyCart();
      return;
    }

    renderOrderSummary(cart);
    setupOrderForm(cart);
  } catch (error) {
    console.error('Error loading cart:', error);
    showEmptyCart();
  }
});

function renderOrderSummary(cart) {
  const orderItemsContainer = document.getElementById('order-items');
  orderItemsContainer.innerHTML = '';

  cart.forEach(item => {
    const orderItem = document.createElement('div');
    orderItem.className = 'order-item';
    orderItem.innerHTML = `
      <div class="order-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="order-item-details">
        <h4 class="order-item-name">${item.name}</h4>
        <p class="order-item-brand">${item.brand}</p>
        <p class="order-item-quantity">Quantity: ${item.quantity}</p>
      </div>
      <div class="order-item-price">
        ${formatPrice(item.price * item.quantity)}
      </div>
    `;
    orderItemsContainer.appendChild(orderItem);
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  document.getElementById('order-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('order-shipping').textContent = formatPrice(shipping);
  document.getElementById('order-tax').textContent = formatPrice(tax);
  document.getElementById('order-total').textContent = formatPrice(total);
}

function setupOrderForm(cart) {
  const orderForm = document.getElementById('order-form');
  
  // Create Place Order button using Button component
  const placeOrderContainer = document.getElementById('place-order-btn-container');
  if (placeOrderContainer) {
    placeOrderContainer.innerHTML = '';
    const placeOrderBtn = Button.create(
      'Place Order',
      'btn-primary btn-large btn-block',
      null,
      'submit'
    );
    placeOrderContainer.appendChild(placeOrderBtn);
  }
  
  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    
    // Convert cart items to order format
    const orderItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));
    
    const orderData = {
      customer: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        pincode: formData.get('pincode')
      },
      payment: {
        method: formData.get('payment-method'),
        cardNumber: formData.get('card-number'),
        expiryDate: formData.get('expiry-date'),
        cvv: formData.get('cvv')
      },
      items: orderItems
    };

    try {
      // Create order via API
      const response = await orderAPI.create(orderData);
      const order = response.data;

      // Clear cart
      await cartAPI.clear();
      updateCartCount();

      // Show success message and redirect
      showSuccess(order.orderId);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  });
}

function showSuccess(orderId) {
  const main = document.querySelector('main');
  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '60px 20px';
  
  const card = document.createElement('div');
  card.className = 'card';
  card.style.maxWidth = '600px';
  card.style.margin = '0 auto';
  card.style.textAlign = 'center';
  
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  cardBody.innerHTML = `
    <div style="font-size: 64px; margin-bottom: 20px;">✅</div>
    <h2 style="margin-bottom: 16px; color: var(--success-color);">Order Placed Successfully!</h2>
    <p style="margin-bottom: 8px; color: var(--text-light);">Your order ID is:</p>
    <p style="font-size: 24px; font-weight: bold; margin-bottom: 24px; color: var(--primary-color);">${orderId}</p>
    <p style="margin-bottom: 24px; color: var(--text-light);">
      We've sent a confirmation email with order details. You will receive your order within 3-5 business days.
    </p>
  `;
  
  // Create buttons using Button component
  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.gap = '12px';
  buttonContainer.style.justifyContent = 'center';
  
  const viewOrdersBtn = Button.create(
    'View My Orders',
    'btn-primary',
    () => { window.location.href = 'orders.html'; }
  );
  
  const continueShoppingBtn = Button.create(
    'Continue Shopping',
    'btn-secondary',
    () => { window.location.href = 'index.html'; }
  );
  
  buttonContainer.appendChild(viewOrdersBtn);
  buttonContainer.appendChild(continueShoppingBtn);
  cardBody.appendChild(buttonContainer);
  
  card.appendChild(cardBody);
  container.appendChild(card);
  main.innerHTML = '';
  main.appendChild(container);
}

function showEmptyCart() {
  const main = document.querySelector('main');
  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '60px 20px';
  
  const emptyStateDiv = document.createElement('div');
  emptyStateDiv.className = 'empty-state';
  emptyStateDiv.innerHTML = `
    <div class="empty-state-icon">🛒</div>
    <div class="empty-state-title">Your Cart is Empty</div>
    <div class="empty-state-message">Add some products to your cart to place an order!</div>
  `;
  
  // Create Continue Shopping button using Button component
  const continueShoppingBtn = Button.create(
    'Continue Shopping',
    'btn-primary',
    () => { window.location.href = 'index.html'; }
  );
  emptyStateDiv.appendChild(continueShoppingBtn);
  
  container.appendChild(emptyStateDiv);
  main.innerHTML = '';
  main.appendChild(container);
}

