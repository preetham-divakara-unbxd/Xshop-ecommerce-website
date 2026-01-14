# API Testing Guide

This guide shows you how to test if all backend APIs are working correctly.

## Prerequisites

1. **Backend server must be running:**
   ```bash
   cd backend
   npm start
   ```

2. **Database must be seeded:**
   ```bash
   npm run seed
   ```

## Method 1: Quick Health Check (Browser)

1. Open your browser
2. Go to: `http://localhost:3000/health`
3. You should see:
   ```json
   {
     "success": true,
     "message": "Server is running",
     "timestamp": "..."
   }
   ```

## Method 2: Test All APIs (Automated Script)

Run the automated test script:

```bash
cd backend
npm test
```

This will test all endpoints and show you which ones pass or fail.

## Method 3: Manual Testing with Browser

### Test Products API:
- `http://localhost:3000/api/products` - Get all products
- `http://localhost:3000/api/categories` - Get all categories
- `http://localhost:3000/api/products/search?q=phone` - Search products

### Test Cart API (requires session):
Open browser console (F12) and run:
```javascript
fetch('http://localhost:3000/api/cart', {
  headers: { 'x-session-id': 'test-123' }
})
.then(r => r.json())
.then(console.log)
```

## Method 4: Using curl (Terminal)

### Health Check:
```bash
curl http://localhost:3000/health
```

### Get All Products:
```bash
curl http://localhost:3000/api/products
```

### Get All Categories:
```bash
curl http://localhost:3000/api/categories
```

### Get Cart:
```bash
curl -H "x-session-id: test-123" http://localhost:3000/api/cart
```

### Add to Cart:
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -H "x-session-id: test-123" \
  -d '{"productId": "YOUR_PRODUCT_ID", "quantity": 2}'
```

### Search Products:
```bash
curl "http://localhost:3000/api/products/search?q=iphone"
```

## Method 5: Using VS Code REST Client

1. Install "REST Client" extension in VS Code
2. Open `backend/test-api.http`
3. Click "Send Request" above each endpoint
4. See the response in the side panel

## Method 6: Using Postman

1. Import the collection from `test-api.http` (or create manually)
2. Set base URL: `http://localhost:3000/api`
3. Test each endpoint

## Expected Results

### ✅ All APIs Working:
- Health check returns success
- Products API returns product list
- Categories API returns category list
- Cart API can add/remove items
- Wishlist API can add/remove items
- Orders API can create orders

### ❌ Common Issues:

1. **"Cannot GET /api/products"**
   - Server not running → Start with `npm start`

2. **"MongoDB connection error"**
   - MongoDB not running → Start MongoDB
   - Wrong connection string → Check `.env` file

3. **"No products found"**
   - Database not seeded → Run `npm run seed`

4. **"Product not found"**
   - Using wrong product ID → Get ID from `/api/products` first

## Quick Verification Checklist

- [ ] Server starts without errors
- [ ] Health endpoint works
- [ ] Products endpoint returns data
- [ ] Categories endpoint returns data
- [ ] Cart endpoint works (add/remove)
- [ ] Wishlist endpoint works (add/remove)
- [ ] Order endpoint can create orders
- [ ] Frontend can connect to backend

## Testing from Frontend

The easiest way to verify everything works is to:

1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm start`
3. Open browser: `http://localhost:8000`
4. Try adding products to cart
5. Check if cart count updates
6. Try searching products
7. Try adding to wishlist

If the frontend works, the backend APIs are working! 🎉
