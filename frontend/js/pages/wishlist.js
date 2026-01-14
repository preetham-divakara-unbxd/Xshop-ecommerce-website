/**
 * Wishlist Page JavaScript
 */
import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';
import { ProductCard } from '../components/productCard.js';
import { Button } from '../components/button.js';
import { wishlistAPI } from '../api.js';
import { updateWishlistCount } from '../main.js';

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

  await loadWishlist();
  updateWishlistCount();
});

async function loadWishlist() {
  try {
    const wishlist = await wishlistAPI.get();
    const wishlistContainer = document.getElementById('wishlist-container');
    
    if (wishlist.length === 0) {
      showEmptyWishlist();
      return;
    }

    // Reset container class if it was set to empty
    wishlistContainer.className = 'products-grid';
    wishlistContainer.innerHTML = '';
    wishlist.forEach(product => {
      const card = ProductCard.create(product);
      wishlistContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading wishlist:', error);
    showEmptyWishlist();
  }
}

function showEmptyWishlist() {
  const wishlistContainer = document.getElementById('wishlist-container');
  wishlistContainer.className = 'wishlist-empty-container';
  
  const emptyStateDiv = document.createElement('div');
  emptyStateDiv.className = 'empty-state';
  emptyStateDiv.innerHTML = `
    <div class="empty-state-icon">❤️</div>
    <div class="empty-state-title">Your Wishlist is Empty</div>
    <div class="empty-state-message">Start adding products to your wishlist to save them for later!</div>
  `;
  
  // Create Continue Shopping button using Button component
  const continueShoppingBtn = Button.create(
    'Continue Shopping',
    'btn-primary',
    () => { window.location.href = 'index.html'; }
  );
  emptyStateDiv.appendChild(continueShoppingBtn);
  
  wishlistContainer.innerHTML = '';
  wishlistContainer.appendChild(emptyStateDiv);
}
