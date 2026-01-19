# XSHOP Backend API

Minimal RESTful API backend for XSHOP e-commerce platform built with Node.js, Express, and MongoDB.

## 📁 Project Structure

```
backend/
├── models/                  # MongoDB schemas
│   ├── Product.js
│   └── Category.js
├── server.js                # Main server file (all routes, controllers, services)
├── package.json
└── .env
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
   Create a `.env` file:
   ```
   MONGODB_URI=mongodb://localhost:27017/xshop
   PORT=3000
   NODE_ENV=development
   ```

3. **Start MongoDB:**
   - Local: Make sure MongoDB is running on your machine
   - Atlas: Use your MongoDB Atlas connection string in `.env`

4. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

The server will automatically seed the database with products and categories from JSON files if the database is empty.

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Products API (Flexible endpoint)

- `GET /api/products` - Get all products
- `GET /api/products?id=123` - Get product by ID
- `GET /api/products?category=Laptop` - Get products by category

### Categories API

- `GET /api/categories` - Get all categories

### Search API

- `GET /api/search?q=query` - Search products


### Health Check

- `GET /health` - Server health check

## 🔧 Architecture

This is a minimal backend with all routes, controllers, and services consolidated into `server.js` for simplicity.

### Data Flow

```
Request → Route Handler (in server.js) → Database → Response
```

## 📝 Example API Calls

### Get all products
```bash
curl http://localhost:3000/api/products
```

### Get product by ID
```bash
curl http://localhost:3000/api/products?id=507f1f77bcf86cd799439011
```

### Get products by category
```bash
curl http://localhost:3000/api/products?category=Laptop
```

### Get all categories
```bash
curl http://localhost:3000/api/categories
```

### Search products
```bash
curl http://localhost:3000/api/search?q=iphone
```

## 📦 Database Models

### Product
- name, category, brand, price, originalPrice
- description, image, rating, reviews
- tags, shipping, inStock

### Category
- name, icon, image

## 🛠️ Development

- The server uses ES6 modules (`"type": "module"`)
- Auto-reload available with `npm run dev`
- Error handling middleware catches all errors
- CORS enabled for frontend integration
- Database seeding happens automatically on first run

## 📌 Notes

- **Cart**: Cart functionality is handled on the frontend using localStorage (not stored in backend)
- **Orders**: Orders are handled on the frontend using React state (not stored in backend)
- **Minimal Design**: All routes, controllers, and services are in `server.js` for simplicity
- **Page Independent**: All APIs can be called from any page - they are not tied to specific frontend pages

## 🚧 Future Enhancements

- User authentication and authorization
- Payment gateway integration
- Email notifications
- Admin panel APIs
- Image upload functionality
- Product reviews and ratings
- Inventory management
