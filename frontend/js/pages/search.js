/**
 * Search Results Page JavaScript
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

  // Get search query
  const params = getUrlParams();
  const query = params.q || '';
  
  if (query) {
    document.getElementById('search-query').textContent = query;
    await performSearch(query);
  } else {
    showEmptyState('Please enter a search query');
  }
});

async function performSearch(query) {
  try {
    const response = await productAPI.search(query);
    const results = response.data || [];
    renderResults(results, query);
  } catch (error) {
    console.error('Error searching products:', error);
    showEmptyState(`Error searching for "${query}"`);
  }
}

function renderResults(results, query) {
  const resultsContainer = document.getElementById('results-container');
  const resultsCount = document.getElementById('results-count');
  
  if (results.length === 0) {
    showEmptyState(`No results found for "${query}"`);
    resultsCount.textContent = '0 results';
    return;
  }

  resultsCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found for "${query}"`;
  
  resultsContainer.innerHTML = '';
  results.forEach(product => {
    const card = ProductCard.create(product);
    resultsContainer.appendChild(card);
  });
}

function showEmptyState(message) {
  const resultsContainer = document.getElementById('results-container');
  const emptyStateDiv = document.createElement('div');
  emptyStateDiv.className = 'empty-state';
  emptyStateDiv.innerHTML = `
    <div class="empty-state-icon">🔍</div>
    <div class="empty-state-title">No Results Found</div>
    <div class="empty-state-message">${message}</div>
  `;
  
  // Create Back to Home button using Button component
  const backButton = Button.create(
    'Back to Home',
    'btn-primary',
    () => { window.location.href = 'index.html'; }
  );
  emptyStateDiv.appendChild(backButton);
  
  resultsContainer.innerHTML = '';
  resultsContainer.appendChild(emptyStateDiv);
}
