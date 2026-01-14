# XSHOP Backend API

RESTful API backend for XSHOP e-commerce platform built with Node.js, Express, and MongoDB.

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/             # Request handlers
│   ├── productController.js
│   ├── categoryController.js
│   ├── cartController.js
│   ├── orderController.js
│   └── wishlistController.js
├── models/                  # MongoDB schemas
│   ├── Product.js
│   ├── Category.js
│   ├── Order.js
│   ├── Cart.js
│   └── Wishlist.js
├── routes/                  # API route definitions
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   └── wishlistRoutes.js
├── services/                # Business logic
│   ├── productService.js
│   ├── categoryService.js
│   ├── cartService.js
│   ├── orderService.js
│   └── wishlistService.js
├── middleware/              # Custom middleware
│   └── errorHandler.js
├── scripts/                 # Utility scripts
│   └── seedData.js
├── server.js                # Main server file
├── package.json
└── .env.example
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/xshop
   PORT=3000
   NODE_ENV=development
   ```

3. **Start MongoDB:**
   - Local: Make sure MongoDB is running on your machine
   - Atlas: Use your MongoDB Atlas connection string in `.env`

4. **Seed the database:**
   ```bash
   npm run seed
   ```
   This will populate the database with products and categories from the JSON files.

5. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Products

- `GET /api/products` - Get all products
  - Query params: `category`, `search`, `minPrice`, `maxPrice`, `inStock`, `limit`, `skip`
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)

### Cart

- `GET /api/cart` - Get cart
  - Header: `x-session-id` (optional, auto-generated if not provided)
- `POST /api/cart` - Add item to cart
  - Body: `{ productId, quantity, sessionId? }`
- `PUT /api/cart/:productId` - Update cart item quantity
  - Body: `{ quantity, sessionId? }`
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders

- `POST /api/orders` - Create new order
  - Body: `{ customer, payment, items }`
- `GET /api/orders` - Get all orders
  - Query params: `email`, `status`, `limit`
- `GET /api/orders/:orderId` - Get order by ID
- `PUT /api/orders/:orderId/status` - Update order status (admin)
  - Body: `{ status }`

### Wishlist

- `GET /api/wishlist` - Get wishlist
  - Header: `x-session-id` (optional)
- `POST /api/wishlist` - Add item to wishlist
  - Body: `{ productId, sessionId? }`
- `DELETE /api/wishlist/:productId` - Remove item from wishlist
- `DELETE /api/wishlist` - Clear wishlist

## 🔧 Architecture

### Separation of Concerns

1. **Routes** (`routes/`) - Define API endpoints and map to controllers
2. **Controllers** (`controllers/`) - Handle HTTP requests/responses
3. **Services** (`services/`) - Business logic and data operations
4. **Models** (`models/`) - MongoDB schemas and data validation

### Data Flow

```
Request → Route → Controller → Service → Model → Database
                ↓
            Response
```

## 📝 Example API Calls

### Get all products
```bash
curl http://localhost:3000/api/products
```

### Search products
```bash
curl http://localhost:3000/api/products/search?q=iphone
```

### Add to cart
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -H "x-session-id: session123" \
  -d '{"productId": "507f1f77bcf86cd799439011", "quantity": 2}'
```

### Create order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "address": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001"
    },
    "payment": {
      "method": "card"
    },
    "items": [
      {
        "productId": "507f1f77bcf86cd799439011",
        "quantity": 1
      }
    ]
  }'
```

## 🔐 Session Management

Currently, the API uses session IDs for cart and wishlist management:
- Session ID can be sent via `x-session-id` header or `sessionId` in request body
- If not provided, a new session ID is generated
- In production, this should be replaced with proper authentication

## 🛠️ Development

- The server uses ES6 modules (`"type": "module"`)
- Auto-reload available with `npm run dev`
- Error handling middleware catches all errors
- CORS enabled for frontend integration

## 📦 Database Models

### Product
- name, category, brand, price, originalPrice
- description, image, rating, reviews
- tags, shipping, inStock

### Category
- name, icon, image

### Order
- orderId, customer, payment, items
- subtotal, shipping, tax, total, status

### Cart
- sessionId, items (productId, quantity)

### Wishlist
- sessionId, products (array of product IDs)

## 🚧 Future Enhancements

- User authentication and authorization
- Payment gateway integration
- Email notifications
- Admin panel APIs
- Image upload functionality
- Product reviews and ratings
- Inventory management
