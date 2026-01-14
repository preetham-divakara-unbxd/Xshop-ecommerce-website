/**
 * Cart Page JavaScript
 */
import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';
import { Button } from '../components/button.js';
import { formatPrice, updateCartCount } from '../main.js';
import { cartAPI } from '../api.js';

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

  await loadCart();
});

async function loadCart() {
  try {
    const cart = await cartAPI.get();
    
    if (cart.length === 0) {
      showEmptyCart();
      return;
    }

    renderCart(cart);
    updateCartSummary(cart);
  } catch (error) {
    console.error('Error loading cart:', error);
    showEmptyCart();
  }
}

function renderCart(cart) {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.classList.remove('empty-cart-container');
  
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  // Update cart title with item count
  updateCartTitle(cart);

  cart.forEach(item => {
    const cartItem = createCartItem(item);
    cartItems.appendChild(cartItem);
  });
}

function updateCartTitle(cart) {
  const cartTitle = document.getElementById('cart-title');
  if (cartTitle) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const itemText = totalItems === 1 ? 'item' : 'items';
    cartTitle.textContent = `Shopping Cart (${totalItems} ${itemText})`;
  }
}

function createCartItem(item) {
  const div = document.createElement('div');
  div.className = 'cart-item';
  div.innerHTML = `
    <div class="cart-item-image">
      <img src="${item.image}" alt="${item.name}">
    </div>
    <div class="cart-item-content">
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-brand">${item.brand}</p>
        <p class="cart-item-price">${formatPrice(item.price)} each</p>
      </div>
      <div class="cart-item-controls">
        <div class="cart-item-quantity">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
          <input type="number" class="qty-input" value="${item.quantity}" min="1" data-id="${item.id}">
          <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
        </div>
        <div class="cart-item-total">
          <span class="item-total">${formatPrice(item.price * item.quantity)}</span>
        </div>
        <div class="cart-item-actions">
          <button class="btn-remove" data-id="${item.id}" title="Remove item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Add event listeners
  const decreaseBtn = div.querySelector('[data-action="decrease"]');
  const increaseBtn = div.querySelector('[data-action="increase"]');
  const qtyInput = div.querySelector('.qty-input');
  const removeBtn = div.querySelector('.btn-remove');

  decreaseBtn.addEventListener('click', () => updateQuantity(item.id, -1));
  increaseBtn.addEventListener('click', () => updateQuantity(item.id, 1));
  qtyInput.addEventListener('change', (e) => updateQuantity(item.id, 0, parseInt(e.target.value)));
  removeBtn.addEventListener('click', () => removeItem(item.id));

  return div;
}

async function updateQuantity(productId, change, newValue = null) {
  try {
    const cart = await cartAPI.get();
    const item = cart.find(i => i.id === productId);
    
    if (!item) return;

    let newQuantity;
    if (newValue !== null) {
      newQuantity = Math.max(1, newValue);
    } else {
      newQuantity = Math.max(1, item.quantity + change);
    }

    if (newQuantity === 0) {
      await cartAPI.remove(productId);
    } else {
      await cartAPI.update(productId, newQuantity);
    }
    
    await loadCart();
    updateCartCount();
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
}

async function removeItem(productId) {
  try {
    await cartAPI.remove(productId);
    await loadCart();
    updateCartCount();
  } catch (error) {
    console.error('Error removing item:', error);
  }
}

function updateCartSummary(cart) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('cart-shipping').textContent = formatPrice(shipping);
  document.getElementById('cart-tax').textContent = formatPrice(tax);
  document.getElementById('cart-total').textContent = formatPrice(total);

  // Update checkout button using Button component
  const checkoutBtnContainer = document.getElementById('checkout-btn-container');
  if (checkoutBtnContainer) {
    checkoutBtnContainer.innerHTML = '';
    const checkoutBtn = Button.create(
      'Proceed to Checkout',
      'btn-primary btn-block btn-large',
      () => {
        if (cart.length > 0) {
          window.location.href = 'order.html';
        }
      }
    );
    checkoutBtnContainer.appendChild(checkoutBtn);
  }
}

function showEmptyCart() {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.classList.add('empty-cart-container');
  
  const emptyStateDiv = document.createElement('div');
  emptyStateDiv.className = 'empty-state';
  emptyStateDiv.innerHTML = `
    <div class="empty-state-icon">🛒</div>
    <div class="empty-state-title">Your Cart is Empty</div>
    <div class="empty-state-message">Add some products to your cart to get started!</div>
  `;
  
  // Create Continue Shopping button using Button component
  const continueShoppingBtn = Button.create(
    'Continue Shopping',
    'btn-primary',
    () => { window.location.href = 'index.html'; }
  );
  emptyStateDiv.appendChild(continueShoppingBtn);
  
  cartContainer.innerHTML = '';
  cartContainer.appendChild(emptyStateDiv);
  document.getElementById('cart-summary').style.display = 'none';
  
  // Update cart title for empty state
  const cartTitle = document.getElementById('cart-title');
  if (cartTitle) {
    cartTitle.textContent = 'Shopping Cart (0 items)';
  }
}

