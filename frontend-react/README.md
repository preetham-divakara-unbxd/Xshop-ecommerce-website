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

Make sure your backend is running on `http://localhost:3000`. The frontend will automatically connect to the backend APIs.

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
