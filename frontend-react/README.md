# XSHOP React Frontend

This is the React + Vite version of the XSHOP e-commerce frontend. It maintains the exact same design, colors, and functionality as the original vanilla JavaScript version.

## Features

- ✅ Same design and colors as original
- ✅ React + Vite for fast development
- ✅ React Router for navigation
- ✅ All pages converted: Home, Product, Cart, Wishlist, Orders, Search, Category, About
- ✅ All components converted: Header, Footer, ProductCard, Button
- ✅ API integration with backend
- ✅ Responsive design
- ✅ Cross-browser compatible

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend-react/
├── src/
│   ├── components/       # React components (Header, Footer, ProductCard, Button)
│   ├── pages/           # Page components (Home, Product, Cart, etc.)
│   ├── hooks/           # Custom React hooks (useCartCount, useWishlistCount)
│   ├── utils/           # Utility functions (api.js, helpers.js)
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   ├── styles.css        # Main styles
│   ├── components.css    # Component styles
│   └── pages.css         # Page-specific styles
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Backend Integration

### Default Configuration

By default, the frontend connects to `http://localhost:3000/api`. Make sure your backend is running on this URL.

### Environment Variables

You can configure the API URL using environment variables:

1. **Create a `.env` file** in the `frontend-react` directory:
   ```bash
   VITE_API_URL=http://localhost:3000/api
   ```

2. **For production**, set your production API URL:
   ```bash
   VITE_API_URL=https://api.yourdomain.com/api
   ```

3. **Restart the development server** after creating/modifying `.env`:
   ```bash
   npm run dev
   ```

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

**Example `.env` file:**
```
# Development
VITE_API_URL=http://localhost:3000/api

# Production (uncomment and set your production URL)
# VITE_API_URL=https://api.yourdomain.com/api
```

**Important:** Make sure to add `.env` to your `.gitignore` file to prevent committing sensitive configuration. The `.env` file should never be committed to version control.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Notes

- All CSS files are preserved exactly as in the original
- All functionality matches the original vanilla JS version
- Uses React Router for client-side navigation
- API calls are handled through the `utils/api.js` file
- Cart and wishlist counts update automatically using React hooks
