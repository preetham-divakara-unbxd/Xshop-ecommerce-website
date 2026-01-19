/**
 * API Utility
 * Handles all API calls to the backend
 */

const API_BASE_URL = 'http://localhost:3000/api';

// Generic fetch wrapper
async function apiCall(endpoint, options = {}) {
  try {
    const defaultHeaders = {
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Product API - Flexible endpoint using query parameters
export const productAPI = {
  getAll: async () => {
    return apiCall('/products');
  },

  getById: async (id) => {
    return apiCall(`/products?id=${encodeURIComponent(id)}`);
  },

  getByCategory: async (category) => {
    return apiCall(`/products?category=${encodeURIComponent(category)}`);
  }
};

// Search API - Separate endpoint for search
export const searchAPI = {
  search: async (query) => {
    return apiCall(`/search?q=${encodeURIComponent(query)}`);
  }
};

// Category APIs
export const categoryAPI = {
  getAll: async () => {
    return apiCall('/categories');
  }
};


