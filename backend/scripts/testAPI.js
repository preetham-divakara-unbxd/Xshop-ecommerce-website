/**
 * Simple API Test Script
 * Run with: node scripts/testAPI.js
 * Note: Requires Node.js 18+ for built-in fetch
 */

const API_BASE = 'http://localhost:3000/api';
const SESSION_ID = `test-session-${Date.now()}`;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testAPI(name, method, endpoint, body = null, headers = {}) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': SESSION_ID,
        ...headers
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();

    if (response.ok) {
      log(`✅ ${name}: PASSED`, 'green');
      if (data.data) {
        log(`   Response: ${JSON.stringify(data.data).substring(0, 100)}...`, 'blue');
      }
      return { success: true, data };
    } else {
      log(`❌ ${name}: FAILED - ${data.message || 'Unknown error'}`, 'red');
      return { success: false, data };
    }
  } catch (error) {
    log(`❌ ${name}: ERROR - ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('\n🧪 Starting API Tests...\n', 'yellow');

  // Test 1: Health Check (note: health endpoint is at /health, not /api/health)
  try {
    const response = await fetch('http://localhost:3000/health');
    const data = await response.json();
    if (response.ok) {
      log(`✅ Health Check: PASSED`, 'green');
    } else {
      log(`❌ Health Check: FAILED - ${data.message || 'Unknown error'}`, 'red');
    }
  } catch (error) {
    log(`❌ Health Check: ERROR - ${error.message}`, 'red');
  }

  // Test 2: Get All Products
  const productsResult = await testAPI('Get All Products', 'GET', '/products');
  let productId = null;
  if (productsResult.success && productsResult.data?.data?.length > 0) {
    productId = productsResult.data.data[0]._id || productsResult.data.data[0].id;
    log(`   Found ${productsResult.data.count} products`, 'blue');
  }

  // Test 3: Get All Categories
  await testAPI('Get All Categories', 'GET', '/categories');

  // Test 4: Search Products
  await testAPI('Search Products', 'GET', '/products/search?q=phone');

  // Test 5: Get Cart (should be empty initially)
  await testAPI('Get Cart', 'GET', '/cart');

  // Test 6: Add to Cart (if we have a product)
  if (productId) {
    await testAPI('Add to Cart', 'POST', '/cart', {
      productId,
      quantity: 2
    });

    // Test 7: Get Cart Again (should have items now)
    await testAPI('Get Cart (After Add)', 'GET', '/cart');

    // Test 8: Update Cart Item
    await testAPI('Update Cart Item', 'PUT', `/cart/${productId}`, {
      quantity: 3
    });

    // Test 9: Add to Wishlist
    await testAPI('Add to Wishlist', 'POST', '/wishlist', {
      productId
    });

    // Test 10: Get Wishlist
    await testAPI('Get Wishlist', 'GET', '/wishlist');

    // Test 11: Create Order
    const orderResult = await testAPI('Create Order', 'POST', '/orders', {
      customer: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        address: '123 Test St',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      payment: {
        method: 'card'
      },
      items: [
        {
          productId,
          quantity: 1
        }
      ]
    });

    // Test 12: Get All Orders
    await testAPI('Get All Orders', 'GET', '/orders');

    // Test 13: Remove from Cart
    await testAPI('Remove from Cart', 'DELETE', `/cart/${productId}`);

    // Test 14: Remove from Wishlist
    await testAPI('Remove from Wishlist', 'DELETE', `/wishlist/${productId}`);
  } else {
    log('⚠️  Skipping cart/wishlist/order tests - no products found in database', 'yellow');
    log('   Run: npm run seed (in backend directory) to populate database', 'yellow');
  }

  log('\n✨ Tests completed!\n', 'yellow');
}

// Check if server is running
fetch('http://localhost:3000/health')
  .then(() => {
    runTests();
  })
  .catch(() => {
    log('❌ Backend server is not running!', 'red');
    log('   Please start the server with: npm start (in backend directory)', 'yellow');
    process.exit(1);
  });
