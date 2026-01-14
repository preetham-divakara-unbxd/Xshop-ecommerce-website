# XSHOP E-commerce Website - Complete Documentation

## 📁 Project Structure Overview

```
Ecommerce/
├── data/                          # Data storage (JSON files)
│   ├── products.json              # Product catalog
│   └── categories.json             # Product categories
│
├── frontend/                       # Frontend application
│   ├── index.html                 # Home page
│   ├── search-results.html         # Search results page
│   ├── category-results.html       # Category products page
│   ├── product-display.html       # Product detail page
│   ├── cart.html                  # Shopping cart page
│   ├── order.html                 # Checkout/Order page
│   │
│   ├── css/                       # Stylesheets
│   │   ├── styles.css             # Main styles (layout, header, footer)
│   │   └── components.css         # Component styles (buttons, cards)
│   │
│   ├── js/                        # JavaScript files
│   │   ├── main.js                # Common utilities & helpers
│   │   │
│   │   ├── components/            # Reusable components
│   │   │   ├── header.js          # Header component
│   │   │   ├── footer.js          # Footer component
│   │   │   ├── productCard.js     # Product card component
│   │   │   └── button.js          # Button component
│   │   │
│   │   └── pages/                 # Page-specific scripts
│   │       ├── home.js            # Home page logic
│   │       ├── search.js          # Search page logic
│   │       ├── category.js        # Category page logic
│   │       ├── product.js        # Product detail page logic
│   │       ├── cart.js            # Cart page logic
│   │       └── order.js           # Order page logic
│   │
│   └── images/                    # Image assets (if any)
│
└── README.md                       # Project overview
```

---

## 📄 File-by-File Explanation

### 🗂️ Data Files

#### `data/products.json`
**Purpose**: Stores all product information in JSON format

**Structure**:
- Array of product objects
- Each product contains:
  - `id`: Unique identifier
  - `name`: Product name
  - `category`: Product category
  - `brand`: Manufacturer name
  - `price`: Current price (in rupees)
  - `originalPrice`: Original price (for discounts)
  - `description`: Product description
  - `image`: Product image URL
  - `rating`: Star rating (0-5)
  - `reviews`: Number of reviews
  - `tags`: Array of tags (e.g., "New", "40% off")
  - `shipping`: Shipping information
  - `inStock`: Availability status

**How it works**: 
- Frontend JavaScript fetches this file using `fetch()` API
- Products are loaded dynamically on pages
- Used for product listings, search, and filtering

---

#### `data/categories.json`
**Purpose**: Stores product category information

**Structure**:
- Array of category objects
- Each category contains:
  - `id`: Unique identifier
  - `name`: Category name
  - `icon`: Emoji icon
  - `image`: Category image URL

**How it works**:
- Loaded on home page to display category navigation
- Used for filtering products by category

---

### 🎨 CSS Files

#### `frontend/css/styles.css`
**Purpose**: Main stylesheet for layout, structure, and global styles

**Key Sections**:

1. **CSS Variables (`:root`)**
   - Defines color scheme, shadows, transitions
   - Makes theming easy and consistent

2. **Header Styles**
   - `.site-header`: Fixed header at top
   - `.header-top`: Blue top bar with logo, search, cart
   - `.header-bottom`: Navigation menu
   - Sticky/fixed positioning for always-visible navigation

3. **Hero Section**
   - `.hero-banner`: Main promotional banner
   - Dark blue gradient background
   - Flexbox layout for content and image
   - Navigation dots at bottom-left

4. **Promo Banners**
   - Side promotional banners (CCTV, Headphone)
   - Solid color backgrounds
   - Product images positioned absolutely

5. **Categories Section**
   - Grid layout for category icons
   - Hover effects and transitions

6. **Products Section**
   - Filter tabs with decorative lines
   - Product grid layout
   - Responsive grid (auto-fill)

7. **Footer**
   - Multi-column layout
   - Links and contact information

8. **Responsive Breakpoints**
   - Desktop: 1024px+
   - Tablet: 768px - 1023px
   - Mobile: < 768px

---

#### `frontend/css/components.css`
**Purpose**: Reusable component styles

**Key Components**:

1. **Buttons (`.btn`)**
   - Base button styles
   - Variants: `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-white`
   - Sizes: `.btn-small`, `.btn-large`, `.btn-block`
   - Hover effects and transitions

2. **Product Cards (`.product-card`)**
   - Card container with shadow
   - Image container with 4:3 aspect ratio
   - Product tags (New, 40% off)
   - Rating stars display
   - Price display with original price strikethrough
   - Add to cart button

3. **Form Elements**
   - Input fields, textareas, selects
   - Focus states with primary color
   - Consistent styling

4. **Utility Classes**
   - `.empty-state`: Empty state messages
   - `.notification`: Toast notifications
   - `.badge`: Badge components
   - `.card`: Generic card container

---

### 📜 JavaScript Files

#### `frontend/js/main.js`
**Purpose**: Common utilities and helper functions used across all pages

**Exports**:
- `updateCartCount()`: Updates cart count in header
- `formatPrice(price)`: Formats price in Indian Rupees (₹)
- `fetchProducts()`: Fetches products from JSON file
- `fetchCategories()`: Fetches categories from JSON file
- `getUrlParams()`: Extracts URL parameters (id, q, category)

**How it works**:
- Imported by page-specific scripts
- Provides shared functionality
- Handles data fetching from JSON files

---

#### `frontend/js/components/header.js`
**Purpose**: Creates the site header component

**Class**: `Header`

**Methods**:
- `getCartTotal()`: Calculates total cart value
- `getCartCount()`: Counts total items in cart
- `render()`: Creates and returns header HTML element
- `formatPrice(price)`: Formats price display
- `static create()`: Factory method to create header

**Features**:
- Logo with "XSHOP" branding
- Search bar with functionality
- Sign in, My Items, Cart links
- Cart count badge
- Navigation menu
- Language/Currency selector

**How it works**:
- Dynamically creates header element
- Adds event listeners for search
- Updates cart count from localStorage
- Injected into pages via `Header.create()`

---

#### `frontend/js/components/footer.js`
**Purpose**: Creates the site footer component

**Class**: `Footer`

**Methods**:
- `render()`: Creates and returns footer HTML element
- `static create()`: Factory method to create footer

**Features**:
- About section
- Quick links
- Customer service links
- Contact information
- Social media links
- Copyright notice

**How it works**:
- Simple component that renders footer HTML
- Injected into all pages for consistency

---

#### `frontend/js/components/productCard.js`
**Purpose**: Creates reusable product card components

**Class**: `ProductCard`

**Methods**:
- `formatPrice(price)`: Formats price display
- `renderStars(rating)`: Creates star rating display
- `render()`: Creates product card HTML element
- `addToCart()`: Adds product to cart (localStorage)
- `showNotification(message)`: Shows toast notification
- `updateCartCount()`: Updates header cart count
- `static create(product)`: Factory method

**Features**:
- Product image with tags overlay
- Product name, brand, rating
- Price with discount display
- Shipping information
- Add to cart button
- Click to view product details

**How it works**:
- Takes product object as input
- Creates card element with all product info
- Handles click events (navigate to product page)
- Manages cart operations via localStorage
- Shows notifications on add to cart

---

#### `frontend/js/components/button.js`
**Purpose**: Creates reusable button components

**Class**: `Button`

**Methods**:
- `render()`: Creates button element
- `static create()`: Factory method

**Features**:
- Customizable text, class, onClick handler
- Different button types and styles

**Note**: Currently used less frequently as buttons are mostly created via HTML/CSS classes

---

#### `frontend/js/pages/home.js`
**Purpose**: Home page functionality

**What it does**:
1. Initializes header and footer components
2. Loads and displays categories
3. Loads and displays "New Arrivals" products
4. Sets up filter tabs functionality

**Functions**:
- `renderCategories(categories)`: Creates category icons
- `renderNewArrivals(products)`: Displays product grid
- `setupFilterTabs(products)`: Handles category filtering

**How it works**:
- On page load, fetches categories and products
- Renders categories as clickable icons
- Displays first 8 products in grid
- Filter tabs allow filtering by category
- Category clicks navigate to category results page

---

#### `frontend/js/pages/search.js`
**Purpose**: Search results page functionality

**What it does**:
1. Gets search query from URL parameters
2. Searches products by name, brand, category, description
3. Displays search results
4. Shows empty state if no results

**Functions**:
- `performSearch(query)`: Filters products by search term
- `renderResults(results, query)`: Displays search results
- `showEmptyState(message)`: Shows empty state message

**How it works**:
- Extracts search query from URL (`?q=searchterm`)
- Filters products array for matching items
- Renders results using ProductCard component
- Shows count of results found

---

#### `frontend/js/pages/category.js`
**Purpose**: Category products page functionality

**What it does**:
1. Gets category from URL parameters
2. Filters products by category
3. Displays category products
4. Shows empty state if no products

**Functions**:
- `loadCategoryProducts(category)`: Filters products by category
- `renderProducts(products, category)`: Displays products
- `showEmptyState(message)`: Shows empty state

**How it works**:
- Extracts category from URL (`?category=CategoryName`)
- Filters products array for matching category
- Renders products using ProductCard component
- Displays product count

---

#### `frontend/js/pages/product.js`
**Purpose**: Product detail page functionality

**What it does**:
1. Gets product ID from URL
2. Loads and displays product details
3. Handles quantity selection
4. Adds product to cart with quantity

**Functions**:
- `loadProduct(productId)`: Finds and loads product
- `renderProduct(product)`: Displays product details
- `renderStars(rating)`: Creates star rating
- `addToCart(product)`: Adds to cart with quantity
- `showNotification(message)`: Shows success notification
- `updateCartCount()`: Updates header cart count
- `showError(message)`: Shows error state

**How it works**:
- Extracts product ID from URL (`?id=1`)
- Finds product in products array
- Renders all product details
- Quantity selector allows changing quantity
- Add to cart saves to localStorage with quantity
- Shows notification and updates cart count

---

#### `frontend/js/pages/cart.js`
**Purpose**: Shopping cart page functionality

**What it does**:
1. Loads cart from localStorage
2. Displays cart items in horizontal cards
3. Allows quantity updates
4. Allows item removal
5. Calculates and displays order summary
6. Handles checkout navigation

**Functions**:
- `loadCart()`: Loads cart and renders items
- `renderCart(cart)`: Displays all cart items
- `createCartItem(item)`: Creates cart item card
- `updateQuantity(productId, change, newValue)`: Updates item quantity
- `removeItem(productId)`: Removes item from cart
- `updateCartSummary(cart)`: Calculates totals
- `showEmptyCart()`: Shows empty cart message
- `updateCartCount()`: Updates header cart count

**How it works**:
- Reads cart from localStorage (array of products with quantities)
- Each item displayed as horizontal card with:
  - Product image
  - Product details (name, brand, price)
  - Quantity selector (+/- buttons)
  - Total price
  - Remove button (trash icon)
- Calculates subtotal, shipping, tax, total
- Updates localStorage on any change
- Checkout button navigates to order page

---

#### `frontend/js/pages/order.js`
**Purpose**: Checkout/Order page functionality

**What it does**:
1. Loads cart items
2. Displays order summary
3. Handles order form submission
4. Saves order to localStorage
5. Clears cart
6. Shows success message

**Functions**:
- `renderOrderSummary(cart)`: Displays order items and totals
- `setupOrderForm()`: Handles form submission
- `showSuccess(orderId)`: Shows success message
- `showEmptyCart()`: Shows empty cart message
- `updateCartCount()`: Updates header

**How it works**:
- Loads cart from localStorage
- Displays order items in summary
- Calculates and shows totals
- Form collects:
  - Shipping information (name, email, phone, address)
  - Payment method (Card, UPI, COD)
  - Payment details (if card selected)
- On submit:
  - Creates order object with all data
  - Generates order ID
  - Saves to localStorage (orders array)
  - Clears cart
  - Shows success message with order ID

---

### 📄 HTML Files

#### `frontend/index.html`
**Purpose**: Home page

**Structure**:
- Header container (injected by JavaScript)
- Hero section:
  - Main hero banner (iPhone promotion)
  - Two promo banners (CCTV, Headphone)
- Categories section (loaded dynamically)
- New Arrivals section:
  - Filter tabs (All, Laptop, Mobile phone, Camera)
  - Product grid (loaded dynamically)
- Footer container (injected by JavaScript)

**Scripts**:
- `js/pages/home.js`: Page-specific functionality

---

#### `frontend/search-results.html`
**Purpose**: Search results page

**Structure**:
- Header and footer
- Search query display
- Results count
- Product grid (loaded dynamically)

**Scripts**:
- `js/pages/search.js`: Handles search functionality

---

#### `frontend/category-results.html`
**Purpose**: Category products page

**Structure**:
- Header and footer
- Category name
- Product count
- Product grid (loaded dynamically)

**Scripts**:
- `js/pages/category.js`: Handles category filtering

---

#### `frontend/product-display.html`
**Purpose**: Product detail page

**Structure**:
- Header and footer
- Product image (large)
- Product details:
  - Name, brand, rating
  - Price with discount
  - Description
  - Category, shipping
  - Quantity selector
  - Add to cart button

**Scripts**:
- `js/pages/product.js`: Handles product display and cart

---

#### `frontend/cart.html`
**Purpose**: Shopping cart page

**Structure**:
- Header and footer
- Cart items container (loaded dynamically)
- Order summary sidebar:
  - Subtotal, shipping, tax
  - Total
  - Checkout button

**Styles**:
- Inline styles for cart-specific layout
- Horizontal product cards
- Icon-based remove buttons

**Scripts**:
- `js/pages/cart.js`: Handles cart operations

---

#### `frontend/order.html`
**Purpose**: Checkout/Order page

**Structure**:
- Header and footer
- Checkout form:
  - Shipping information fields
  - Payment method selection
  - Payment details (conditional)
- Order summary sidebar:
  - Order items
  - Totals
  - Place order button

**Scripts**:
- `js/pages/order.js`: Handles order submission
- Inline script for payment method toggle

---

## 🔄 Data Flow

### 1. **Product Data Flow**
```
data/products.json 
  → fetchProducts() (main.js)
  → Page-specific script (home.js, search.js, etc.)
  → ProductCard.create(product)
  → Rendered in DOM
```

### 2. **Cart Data Flow**
```
User clicks "Add to Cart"
  → ProductCard.addToCart()
  → localStorage.setItem('cart', JSON.stringify(cart))
  → Cart page reads from localStorage
  → Updates displayed on cart page
  → Header cart count updated
```

### 3. **Search Flow**
```
User enters search query
  → Header search button clicked
  → Navigate to search-results.html?q=query
  → search.js extracts query
  → Filters products array
  → Renders matching products
```

### 4. **Category Flow**
```
User clicks category icon
  → Navigate to category-results.html?category=CategoryName
  → category.js extracts category
  → Filters products by category
  → Renders category products
```

### 5. **Order Flow**
```
User fills checkout form
  → Form submission
  → order.js creates order object
  → Saves to localStorage (orders array)
  → Clears cart
  → Shows success message
```

---

## 🎯 Key Features

### 1. **Component-Based Architecture**
- Reusable components (Header, Footer, ProductCard)
- Consistent UI across pages
- Easy to maintain and update

### 2. **LocalStorage for Cart**
- Cart persists across page reloads
- No backend required for cart functionality
- Stores product data with quantities

### 3. **Dynamic Content Loading**
- Products loaded from JSON files
- No hardcoded product data in HTML
- Easy to add/remove products

### 4. **Responsive Design**
- Mobile-first approach
- Breakpoints for tablet and desktop
- Flexible grid layouts

### 5. **Search & Filter**
- Real-time search functionality
- Category filtering
- Filter tabs on home page

### 6. **User Experience**
- Toast notifications for actions
- Empty states for better UX
- Loading states (can be added)
- Smooth transitions and animations

---

## 🚀 How to Use

### Running the Application

1. **Start a local server** (required for ES6 modules):
   ```bash
   cd frontend
   python3 -m http.server 8000
   ```

2. **Open in browser**:
   ```
   http://localhost:8000
   ```

### Adding Products

1. Edit `data/products.json`
2. Add new product object with all required fields
3. Refresh page to see new product

### Modifying Styles

1. **Global styles**: Edit `css/styles.css`
2. **Component styles**: Edit `css/components.css`
3. **Page-specific styles**: Add inline `<style>` in HTML files

### Adding New Pages

1. Create HTML file in `frontend/`
2. Create corresponding JS file in `js/pages/`
3. Import components and utilities
4. Add page-specific logic

---

## 🔧 Technical Details

### ES6 Modules
- All JavaScript uses ES6 module syntax
- Components exported and imported
- Requires web server (not file:// protocol)

### LocalStorage Structure
```javascript
// Cart
[
  {
    id: 1,
    name: "Product Name",
    price: 1249,
    quantity: 2,
    // ... other product fields
  }
]

// Orders
[
  {
    orderId: "ORD1234567890",
    customer: { ... },
    payment: { ... },
    items: [ ... ],
    orderDate: "2024-01-01T00:00:00.000Z"
  }
]
```

### URL Parameters
- `?id=1` - Product ID (product-display.html)
- `?q=searchterm` - Search query (search-results.html)
- `?category=CategoryName` - Category name (category-results.html)

---

## 📝 Notes

- **No Backend**: Currently uses localStorage and JSON files
- **No Database**: Products stored in JSON files
- **No Authentication**: User sessions not implemented
- **No Payment Processing**: Order saved to localStorage only
- **Image URLs**: Uses Unsplash placeholder images
- **Responsive**: Works on mobile, tablet, desktop
- **Cross-Browser**: Compatible with modern browsers

---

## 🔮 Future Enhancements

When adding backend:
1. Replace `fetchProducts()` with API calls
2. Move cart to backend session/database
3. Implement user authentication
4. Add payment gateway integration
5. Connect to MongoDB for data storage
6. Add order management system
7. Implement admin panel

---

This documentation covers the complete structure and functionality of the XSHOP e-commerce website. Each file has a specific purpose and works together to create a functional, modern e-commerce experience.
