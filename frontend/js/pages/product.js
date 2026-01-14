/**
 * Product Display Page JavaScript
 */
import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';
import { Button } from '../components/button.js';
import { getUrlParams, formatPrice, updateWishlistCount, updateCartCount } from '../main.js';
import { productAPI, cartAPI, wishlistAPI } from '../api.js';

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

  // Get product ID from URL
  const params = getUrlParams();
  const productId = params.id;
  
  if (productId) {
    await loadProduct(productId);
  } else {
    showError('Product not found');
  }
});

async function loadProduct(productId) {
  try {
    const response = await productAPI.getById(productId);
    const product = response.data;
    
    if (!product) {
      showError('Product not found');
      return;
    }

    renderProduct(product);
  } catch (error) {
    console.error('Error loading product:', error);
    showError('Product not found');
  }
}

async function renderProduct(product) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  document.getElementById('product-image').src = product.image;
  document.getElementById('product-image').alt = product.name;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-brand').textContent = product.brand;
  document.getElementById('product-rating').innerHTML = renderStars(product.rating);
  document.getElementById('product-reviews').textContent = `(${product.reviews} reviews)`;
  document.getElementById('current-price').textContent = formatPrice(product.price);
  
  const originalPriceEl = document.getElementById('original-price');
  if (product.originalPrice && product.originalPrice > product.price) {
    originalPriceEl.textContent = formatPrice(product.originalPrice);
    originalPriceEl.style.display = 'inline';
    document.getElementById('discount-badge').textContent = `${discount}% OFF`;
    document.getElementById('discount-badge').style.display = 'inline-block';
  } else {
    originalPriceEl.style.display = 'none';
    document.getElementById('discount-badge').style.display = 'none';
  }
  
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-shipping').textContent = product.shipping || 'Standard shipping';
  
  // Setup wishlist button
  await setupWishlistButton(product);
  
  // Create Add to Cart button using Button component
  await setupAddToCartButton(product);
  
  // Quantity selector
  const quantityInput = document.getElementById('quantity');
  const decreaseBtn = document.getElementById('decrease-qty');
  const increaseBtn = document.getElementById('increase-qty');
  
  decreaseBtn.addEventListener('click', () => {
    const current = parseInt(quantityInput.value) || 1;
    if (current > 1) {
      quantityInput.value = current - 1;
    }
  });
  
  increaseBtn.addEventListener('click', () => {
    const current = parseInt(quantityInput.value) || 1;
    quantityInput.value = current + 1;
  });
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHTML = '';
  
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<span class="star filled">★</span>';
  }
  if (hasHalfStar) {
    starsHTML += '<span class="star half">★</span>';
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<span class="star">★</span>';
  }
  
  return starsHTML;
}

async function setupWishlistButton(product) {
  const wishlistBtn = document.getElementById('wishlist-btn');
  if (!wishlistBtn) return;
  
  try {
    const wishlist = await wishlistAPI.get();
    const isInWishlist = wishlist.some(item => item._id === product._id || item.id === product._id);
    
    if (isInWishlist) {
      wishlistBtn.classList.add('active');
    }
    
    wishlistBtn.addEventListener('click', async () => {
      try {
        const currentWishlist = await wishlistAPI.get();
        const isInWishlist = currentWishlist.some(item => item._id === product._id || item.id === product._id);
        
        if (isInWishlist) {
          await wishlistAPI.remove(product._id);
          wishlistBtn.classList.remove('active');
          showNotification('Removed from wishlist');
        } else {
          await wishlistAPI.add(product._id);
          wishlistBtn.classList.add('active');
          showNotification('Added to wishlist');
        }
        
        updateWishlistCount();
      } catch (error) {
        console.error('Error updating wishlist:', error);
        showNotification('Error updating wishlist');
      }
    });
  } catch (error) {
    console.error('Error checking wishlist:', error);
  }
}

async function setupAddToCartButton(product) {
  const addToCartContainer = document.getElementById('add-to-cart-container');
  if (!addToCartContainer) return;
  
  try {
    // Check if product is already in cart
    const cart = await cartAPI.get();
    const isInCart = cart.some(item => item.id === product._id || item.id === product.id);
    
    addToCartContainer.innerHTML = '';
    
    if (isInCart) {
      // Show "Go to Cart" button
      const goToCartBtn = Button.create(
        'Go to Cart',
        'btn-orange btn-large btn-block',
        () => { window.location.href = 'cart.html'; }
      );
      addToCartContainer.appendChild(goToCartBtn);
    } else {
      // Show "Add to Cart" button
      const addToCartBtn = Button.create(
        'Add To Cart',
        'btn-primary btn-large btn-block',
        () => addToCart(product)
      );
      addToCartContainer.appendChild(addToCartBtn);
    }
  } catch (error) {
    console.error('Error checking cart:', error);
    // Show "Add to Cart" button as fallback
    const addToCartBtn = Button.create(
      'Add To Cart',
      'btn-primary btn-large btn-block',
      () => addToCart(product)
    );
    addToCartContainer.innerHTML = '';
    addToCartContainer.appendChild(addToCartBtn);
  }
}

async function addToCart(product) {
  try {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    await cartAPI.add(product._id, quantity);
    showNotification(`Added ${quantity} item(s) to cart!`);
    updateCartCount();
    
    // Change button to "Go to Cart"
    await setupAddToCartButton(product);
  } catch (error) {
    console.error('Error adding to cart:', error);
    showNotification('Error adding to cart');
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}


function showError(message) {
  const main = document.querySelector('main');
  const container = document.createElement('div');
  container.className = 'container';
  container.style.padding = '60px 20px';
  
  const emptyStateDiv = document.createElement('div');
  emptyStateDiv.className = 'empty-state';
  emptyStateDiv.innerHTML = `
    <div class="empty-state-icon">❌</div>
    <div class="empty-state-title">Error</div>
    <div class="empty-state-message">${message}</div>
  `;
  
  // Create Back to Home button using Button component
  const backButton = Button.create(
    'Back to Home',
    'btn-primary',
    () => { window.location.href = 'index.html'; }
  );
  emptyStateDiv.appendChild(backButton);
  
  container.appendChild(emptyStateDiv);
  main.innerHTML = '';
  main.appendChild(container);
}
