/**
 * Orders Page JavaScript
 */
import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';
import { formatPrice } from '../main.js';
import { Button } from '../components/button.js';
import { orderAPI } from '../api.js';

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

  await loadOrders();
});

async function loadOrders() {
  try {
    const response = await orderAPI.getAll();
    const orders = response.data || [];
    const ordersContainer = document.getElementById('orders-container');
    
    if (orders.length === 0) {
      showEmptyOrders();
      return;
    }

    // Orders are already sorted by date (newest first) from backend
    ordersContainer.innerHTML = '';
    orders.forEach(order => {
      const orderCard = createOrderCard(order);
      ordersContainer.appendChild(orderCard);
    });
  } catch (error) {
    console.error('Error loading orders:', error);
    showEmptyOrders();
  }
}

function createOrderCard(order) {
  const card = document.createElement('div');
  card.className = 'order-card';
  
  const orderDate = new Date(order.createdAt || order.orderDate);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Use status from backend
  const status = order.status || 'pending';
  
  // Use totals from backend
  const total = order.total || 0;

  card.innerHTML = `
    <div class="order-header">
      <div>
        <div class="order-id">${order.orderId}</div>
        <div class="order-date">Ordered on ${formattedDate}</div>
      </div>
      <div class="order-status ${status}">${status}</div>
    </div>
    <div class="order-items">
      ${order.items.map(item => `
        <div class="order-item">
          <div class="order-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="order-item-details">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-brand">${item.brand}</div>
            <div class="order-item-quantity">Quantity: ${item.quantity}</div>
          </div>
          <div class="order-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
      `).join('')}
    </div>
    <div class="order-summary">
      <div>
        <div style="font-size: 14px; color: var(--text-light); margin-bottom: 4px;">Total Amount</div>
        <div class="order-total">${formatPrice(total)}</div>
      </div>
    </div>
  `;

  return card;
}


function showEmptyOrders() {
  const ordersContainer = document.getElementById('orders-container');
  const emptyStateDiv = document.createElement('div');
  emptyStateDiv.className = 'empty-state';
  emptyStateDiv.style.textAlign = 'center';
  emptyStateDiv.style.margin = '0 auto';
  emptyStateDiv.style.maxWidth = '500px';
  emptyStateDiv.innerHTML = `
    <div class="empty-state-icon">📦</div>
    <div class="empty-state-title">No Orders Yet</div>
    <div class="empty-state-message">You haven't placed any orders yet. Start shopping to see your orders here!</div>
  `;
  
  // Create Continue Shopping button using Button component
  const continueShoppingBtn = Button.create(
    'Continue Shopping',
    'btn-primary',
    () => { window.location.href = 'index.html'; }
  );
  emptyStateDiv.appendChild(continueShoppingBtn);
  
  ordersContainer.innerHTML = '';
  ordersContainer.appendChild(emptyStateDiv);
}
