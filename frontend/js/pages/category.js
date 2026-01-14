/**
 * Category Results Page JavaScript
 */
import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';
import { ProductCard } from '../components/productCard.js';
import { Button } from '../components/button.js';
import { getUrlParams } from '../main.js';
import { productAPI } from '../api.js';

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

  // Get category from URL
  const params = getUrlParams();
  const category = params.category || '';
  
  if (category) {
    document.getElementById('category-name').textContent = category;
    await loadCategoryProducts(category);
  } else {
    showEmptyState('Please select a category');
  }
});

async function loadCategoryProducts(category) {
  try {
    const response = await productAPI.getByCategory(category);
    const categoryProducts = response.data || [];
    renderProducts(categoryProducts, category);
  } catch (error) {
    console.error('Error loading category products:', error);
    showEmptyState(`Error loading products for ${category}`);
  }
}

function renderProducts(products, category) {
  const productsContainer = document.getElementById('products-container');
  const productsCount = document.getElementById('products-count');
  
  if (products.length === 0) {
    showEmptyState(`No products found in ${category} category`);
    productsCount.textContent = '0 products';
    return;
  }

  productsCount.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} in ${category}`;
  
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const card = ProductCard.create(product);
    productsContainer.appendChild(card);
  });
}

function showEmptyState(message) {
  const productsContainer = document.getElementById('products-container');
  const emptyStateDiv = document.createElement('div');
  emptyStateDiv.className = 'empty-state';
  emptyStateDiv.innerHTML = `
    <div class="empty-state-icon">📦</div>
    <div class="empty-state-title">No Products Found</div>
    <div class="empty-state-message">${message}</div>
  `;
  
  // Create Back to Home button using Button component
  const backButton = Button.create(
    'Back to Home',
    'btn-primary',
    () => { window.location.href = 'index.html'; }
  );
  emptyStateDiv.appendChild(backButton);
  
  productsContainer.innerHTML = '';
  productsContainer.appendChild(emptyStateDiv);
}
