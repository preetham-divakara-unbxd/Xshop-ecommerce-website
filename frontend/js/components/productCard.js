/**
 * Product Card Component
 * Creates reusable product card elements
 */
import { Button } from './button.js';
import { cartAPI } from '../api.js';
import { updateCartCount } from '../main.js';

class ProductCard {
  constructor(product) {
    this.product = product;
  }

  formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  }

  renderStars(rating) {
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

  render() {
    const card = document.createElement('div');
    card.className = 'product-card';
    // Handle both MongoDB _id and regular id
    const productId = this.product._id || this.product.id;
    card.dataset.productId = productId;

    const discount = this.product.originalPrice 
      ? Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100)
      : 0;

    card.innerHTML = `
      <div class="product-image-container">
        <img src="${this.product.image}" alt="${this.product.name}" class="product-image" loading="lazy">
        ${this.product.tags && this.product.tags.length > 0 ? `
          <div class="product-tags">
            ${this.product.tags.map(tag => `<span class="product-tag tag-${tag.toLowerCase().replace(/\s+/g, '-')}">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">${this.product.name}</h3>
        <div class="product-rating">
          ${this.renderStars(this.product.rating)}
          <span class="rating-text">${this.product.rating} (${this.product.reviews})</span>
        </div>
        <p class="product-brand">${this.product.brand}</p>
        <div class="product-price">
          <span class="current-price">${this.formatPrice(this.product.price)}</span>
          ${this.product.originalPrice && this.product.originalPrice > this.product.price ? `
            <span class="original-price">${this.formatPrice(this.product.originalPrice)}</span>
          ` : ''}
        </div>
        <p class="product-shipping">${this.product.shipping || 'Standard shipping'}</p>
      </div>
    `;

    // Create Add to Cart button using Button component
    const addToCartBtn = Button.create(
      'Add To Cart',
      'btn-primary btn-add-cart',
      (e) => {
        e.stopPropagation();
        this.addToCart();
      }
    );
    addToCartBtn.dataset.productId = productId;
    card.querySelector('.product-info').appendChild(addToCartBtn);

    // Add click event to navigate to product page
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('btn-add-cart') && !e.target.closest('.btn-add-cart')) {
        window.location.href = `product-display.html?id=${productId}`;
      }
    });

    return card;
  }

  async addToCart() {
    try {
      const productId = this.product._id || this.product.id || this.product._id?.toString();
      await cartAPI.add(productId, 1);
      
      // Show notification
      this.showNotification('Product added to cart!');
      updateCartCount();
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showNotification('Error adding to cart');
    }
  }

  showNotification(message) {
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


  static create(product) {
    const card = new ProductCard(product);
    return card.render();
  }
}

export { ProductCard };
