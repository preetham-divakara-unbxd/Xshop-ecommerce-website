/**
 * Home Page JavaScript
 */
import { Header } from '../components/header.js';
import { Footer } from '../components/footer.js';
import { ProductCard } from '../components/productCard.js';
import { fetchProducts, fetchCategories } from '../main.js';

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

  // Load categories
  const categories = await fetchCategories();
  renderCategories(categories);

  // Load products for New Arrivals
  const products = await fetchProducts();
  renderNewArrivals(products);

  // Setup filter tabs
  setupFilterTabs(products);
});

function renderCategories(categories) {
  const categoriesContainer = document.getElementById('categories-container');
  if (!categoriesContainer) return;

  categoriesContainer.innerHTML = categories.map(category => `
    <div class="category-item" data-category="${category.name}">
      <div class="category-icon">${category.icon}</div>
      <div class="category-name">${category.name}</div>
    </div>
  `).join('');

  // Add click handlers
  categoriesContainer.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      window.location.href = `category-results.html?category=${encodeURIComponent(category)}`;
    });
  });
}

function renderNewArrivals(products) {
  const productsContainer = document.getElementById('products-container');
  if (!productsContainer) return;

  // Show first 8 products
  const newArrivals = products.slice(0, 8);
  
  productsContainer.innerHTML = '';
  newArrivals.forEach(product => {
    const card = ProductCard.create(product);
    productsContainer.appendChild(card);
  });
}

function setupFilterTabs(products) {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productsContainer = document.getElementById('products-container');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter || tab.textContent.trim();
      let filteredProducts = products;

      if (filter !== 'All') {
        filteredProducts = products.filter(p => 
          p.category.toLowerCase() === filter.toLowerCase()
        );
      }

      // Show first 8 filtered products
      const displayProducts = filteredProducts.slice(0, 8);
      
      productsContainer.innerHTML = '';
      displayProducts.forEach(product => {
        const card = ProductCard.create(product);
        productsContainer.appendChild(card);
      });
    });
  });
}
