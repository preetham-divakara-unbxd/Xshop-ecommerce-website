# XSHOP E-commerce Platform

A full-stack e-commerce website built with React (frontend) and Node.js with MongoDB (backend).

## 🚀 Features

- **Product Browsing**: Browse products by category, search, and view detailed product pages
- **Shopping Cart**: Add products to cart, update quantities, and remove items (client-side with localStorage)
- **Order Management**: Place orders and view order history (client-side with React Context)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Minimal RESTful API**: Clean, consolidated backend API with MongoDB integration
- **React Router**: Client-side routing for seamless navigation

## 📁 Project Structure

```
Ecommerce/
├── backend/                 # Node.js backend (minimal structure)
│   ├── models/             # MongoDB schemas (Product, Category)
│   ├── server.js           # Main server file (all routes, middleware, logic)
│   ├── package.json
│   └── README.md
├── frontend-react/         # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Button.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Order.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Category.jsx
│   │   │   └── About.jsx
│   │   ├── context/        # React Context providers
│   │   │   ├── OrderContext.jsx
│   │   │   └── CategoryContext.jsx
│   │   ├── hooks/          # Custom React hooks
│   │   │   └── useCartCount.js
│   │   ├── utils/          # Utility functions
│   │   │   ├── api.js       # API calls
│   │   │   ├── cartUtils.js # Cart operations (localStorage)
│   │   │   └── helpers.js   # Helper functions
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx        # Entry point
│   │   └── *.css           # Stylesheets
│   ├── public/
│   ├── package.json
│   └── vite.config.js
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
   Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/xshop
   PORT=3000
   NODE_ENV=development
   ```
   
   For MongoDB Atlas, use your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/xshop
   ```

4. **Start MongoDB:**
   - Local: Make sure MongoDB is running on your machine
   - Atlas: Use your MongoDB Atlas connection string in `.env`

5. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```
   
   The server will automatically:
   - Connect to MongoDB
   - Seed the database with products and categories from JSON files (if database is empty)
   - Start listening on `http://localhost:3000`

The backend API will be available at `http://localhost:3000/api`

### Frontend Setup

1. **Navigate to frontend-react directory:**
   ```bash
   cd frontend-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   This will start the Vite development server on `http://localhost:8000` and automatically open it in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   
   This creates an optimized production build in the `dist` folder.

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📡 API Endpoints

The backend provides a minimal set of 3 APIs:

### Products API
- `GET /api/products` - Get all products
- `GET /api/products?id=:id` - Get product by ID
- `GET /api/products?category=:category` - Get products by category

### Categories API
- `GET /api/categories` - Get all categories

### Search API
- `GET /api/search?q=:query` - Search products by name, brand, category, or description

### Notes
- **Cart**: Handled entirely in the frontend using `localStorage` (no backend API)
- **Orders**: Handled in the frontend using React Context (no backend API, persists until page refresh)
- **Wishlist**: Removed from the application

For detailed API documentation, see `backend/README.md`

## 🏗️ Architecture

### Backend Architecture

- **Minimal Structure**: All routes, controllers, services, and middleware consolidated in `server.js`
- **Models**: MongoDB schemas (Product, Category) in `models/` folder
- **Database Seeding**: Automatic seeding on server start if database is empty
- **Error Handling**: Centralized error handling middleware

### Frontend Architecture

- **React Components**: Reusable UI components (Header, Footer, ProductCard, Button)
- **Pages**: Page-specific components using React Router
- **Context API**: 
  - `OrderContext`: Manages orders in React state
  - `CategoryContext`: Shares categories across components (prevents duplicate API calls)
- **Custom Hooks**: `useCartCount` for cart badge updates
- **Utilities**: 
  - `api.js`: Centralized API communication
  - `cartUtils.js`: Cart operations using localStorage
  - `helpers.js`: Common helper functions
- **Client-Side Routing**: React Router for navigation

## 🔧 Technologies Used

### Frontend
- **React 18**: UI library with hooks and context
- **React Router**: Client-side routing
- **Vite**: Build tool and development server
- **CSS3**: Stylesheets with CSS Variables, Flexbox, Grid
- **localStorage**: Client-side cart persistence

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database with Mongoose ODM
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## 📝 Notes

### Data Management
- **Cart**: Stored in browser `localStorage` (persists across sessions)
- **Orders**: Stored in React Context (persists until page refresh)
- **Categories**: Loaded once via Context API (prevents duplicate API calls)

### Configuration
- **API Base URL**: Configured in `frontend-react/src/utils/api.js` (default: `http://localhost:3000/api`)
- **Backend Port**: Default `3000` (configurable via `.env`)
- **Frontend Port**: Default `8000` (configurable in `vite.config.js`)

### Development
- **React Strict Mode**: Removed to prevent double API calls in development
- **Category Context**: Implemented to share categories between Header and Home components
- Make sure both frontend and backend servers are running for full functionality

### Production Considerations
- In production, cart and orders should be stored in a database with user authentication
- API should include proper authentication and authorization
- Consider implementing rate limiting and request validation

## 🚧 Future Enhancements

- User authentication and authorization
- Backend cart and order persistence (database)
- Payment gateway integration
- Email notifications
- Admin panel
- Product reviews and ratings
- Inventory management
- Image upload functionality
- Search result caching
- Product pagination

## 📄 License

ISC

---

**Thank you for using XSHOP E-commerce Platform!**