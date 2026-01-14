/**
 * API Utility
 * Handles all API calls to the backend
 */

const API_BASE_URL = 'http://localhost:3000/api';

// Get or create session ID
function getSessionId() {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

// Generic fetch wrapper
async function apiCall(endpoint, options = {}) {
  try {
    const sessionId = getSessionId();
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'x-session-id': sessionId
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

// Product APIs
export const productAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params.append(key, filters[key]);
      }
    });
    const queryString = params.toString();
    return apiCall(`/products${queryString ? '?' + queryString : ''}`);
  },

  getById: async (id) => {
    return apiCall(`/products/${id}`);
  },

  getByCategory: async (category) => {
    return apiCall(`/products/category/${encodeURIComponent(category)}`);
  },

  search: async (query) => {
    return apiCall(`/products/search?q=${encodeURIComponent(query)}`);
  }
};

// Category APIs
export const categoryAPI = {
  getAll: async () => {
    return apiCall('/categories');
  },

  getById: async (id) => {
    return apiCall(`/categories/${id}`);
  }
};

// Cart APIs
export const cartAPI = {
  get: async () => {
    const data = await apiCall('/cart');
    return data.data || [];
  },

  add: async (productId, quantity = 1) => {
    const data = await apiCall('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity })
    });
    return data.data || [];
  },

  update: async (productId, quantity) => {
    const data = await apiCall(`/cart/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    });
    return data.data || [];
  },

  remove: async (productId) => {
    const data = await apiCall(`/cart/${productId}`, {
      method: 'DELETE'
    });
    return data.data || [];
  },

  clear: async () => {
    return apiCall('/cart', {
      method: 'DELETE'
    });
  }
};

// Order APIs
export const orderAPI = {
  create: async (orderData) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  },

  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params.append(key, filters[key]);
      }
    });
    const queryString = params.toString();
    return apiCall(`/orders${queryString ? '?' + queryString : ''}`);
  },

  getById: async (orderId) => {
    return apiCall(`/orders/${orderId}`);
  }
};

// Wishlist APIs
export const wishlistAPI = {
  get: async () => {
    const data = await apiCall('/wishlist');
    return data.data || [];
  },

  add: async (productId) => {
    const data = await apiCall('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId })
    });
    return data.data || [];
  },

  remove: async (productId) => {
    const data = await apiCall(`/wishlist/${productId}`, {
      method: 'DELETE'
    });
    return data.data || [];
  },

  clear: async () => {
    return apiCall('/wishlist', {
      method: 'DELETE'
    });
  }
};
