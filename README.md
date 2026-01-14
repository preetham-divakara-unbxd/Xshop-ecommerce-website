# XSHOP E-commerce Platform

A full-stack e-commerce website built with HTML, CSS, Vanilla JavaScript (frontend) and Node.js with MongoDB (backend).

## 🚀 Features

- **Product Browsing**: Browse products by category, search, and view detailed product pages
- **Shopping Cart**: Add products to cart, update quantities, and remove items
- **Wishlist**: Save favorite products for later
- **Order Management**: Place orders and view order history
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **RESTful API**: Clean backend API with MongoDB integration

## 📁 Project Structure

```
Ecommerce/
├── backend/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── middleware/         # Custom middleware
│   ├── scripts/            # Utility scripts
│   └── server.js           # Main server file
├── frontend/               # Frontend application
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   │   ├── api.js          # API utility
│   │   ├── main.js         # Common utilities
│   │   ├── components/     # Reusable components
│   │   └── pages/          # Page-specific logic
│   ├── images/             # Image assets
│   └── *.html              # HTML pages
├── data/                   # JSON data files (for seeding)
│   ├── products.json
│   └── categories.json
└── README.md
```

## 🛠️ Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/xshop
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   - Local: Make sure MongoDB is running on your machine
   - Atlas: Use your MongoDB Atlas connection string in `.env`

5. **Seed the database:**
   ```bash
   npm run seed
   ```
   This populates the database with products and categories from JSON files.

6. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend server:**
   ```bash
   npm start
   # or
   npm run dev
   ```
   
   This will start a local server on `http://localhost:8000` and automatically open it in your browser.

   **Alternative options (if you prefer not to use npm):**
   
   - **Using Python:**
     ```bash
     python3 -m http.server 8000
     ```
   
   - **Using npx (without installing):**
     ```bash
     npx http-server -p 8000
     ```
   
   - **Using VS Code Live Server extension**

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get product by ID

### Categories
- `GET /api/categories` - Get all categories

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:orderId` - Get order by ID

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist/:productId` - Remove item from wishlist
- `DELETE /api/wishlist` - Clear wishlist

For detailed API documentation, see `backend/README.md`

## 🏗️ Architecture

### Backend Architecture

- **Routes**: Define API endpoints and map to controllers
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and data operations
- **Models**: MongoDB schemas and data validation

### Frontend Architecture

- **Components**: Reusable UI components (Header, Footer, ProductCard, Button)
- **Pages**: Page-specific logic and rendering
- **API Utility**: Centralized API communication
- **Main Utilities**: Common helper functions

## 🔧 Technologies Used

### Frontend
- HTML5
- CSS3 (with CSS Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6 Modules)
- No frameworks or libraries

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests

## 📝 Notes

- The frontend uses session IDs stored in localStorage for cart and wishlist management
- In production, this should be replaced with proper authentication
- The API base URL is configured in `frontend/js/api.js` (default: `http://localhost:3000/api`)
- Make sure both frontend and backend servers are running for full functionality

## 🚧 Future Enhancements

- User authentication and authorization
- Payment gateway integration
- Email notifications
- Admin panel
- Product reviews and ratings
- Inventory management
- Image upload functionality

## 📄 License

ISC
