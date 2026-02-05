import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router';
// import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import unbxdConfig from '../config/unbxdConfig';
import { getPaginationConfig } from '../utils/paginationConfigs';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('exact');
  const unbxdInstanceRef = useRef(null);

  // Initialize Unbxd with Products Configuration
  useEffect(() => {
    if (window.UnbxdSearch) {
      initializeUnbxd();
    } else {
      const checkSDK = setInterval(() => {
        if (window.UnbxdSearch) {
          clearInterval(checkSDK);
          initializeUnbxd();
        }
      }, 100);
      return () => clearInterval(checkSDK);
    }
  }, []);

  const initializeUnbxd = () => {
    if (unbxdInstanceRef.current) {
      return; // Already initialized
    }

    try {
      const PAGINATION_STYLE = 5;
     

      console.log('Initializing Unbxd with Products Configuration...');

      window.unbxdSearch = new window.UnbxdSearch({
        siteKey: unbxdConfig.siteKey,
        apiKey: unbxdConfig.apiKey,

        // Search Box Configuration
        searchBoxEl: document.getElementById("unbxdInput"),
        searchButtonEl: document.getElementById("searchBtn"),
        searchTrigger: "click",


        products: {
          productType: "SEARCH",
          el: document.getElementById("unbxd-search-results"),
          attributesMap: unbxdConfig.attributesMap,
          productAttributes: unbxdConfig.productAttributes,
          defaultImage: "https://via.placeholder.com/300",
          productItemClass: "unbxd-product-item",

          // Handle clicks (swatches + add to cart + navigation)
          onProductClick: function (product, e) {
            const { id, action, uniqueid } = e.target.dataset;

            console.log({ id, action, uniqueid });

            // Swatch click - change image
            if (action === "swatch") {
              document.querySelectorAll(`#${uniqueid} .img-wrap`).forEach(el => el.classList.add("hidden"));
              document.getElementById(id)?.classList.remove("hidden");
              document.querySelectorAll(`#${uniqueid} .swatch`).forEach(btn => btn.classList.remove("active"));
              e.target.classList.add("active");
              return;
            }

            // Add to cart
            if (action === "cart") {
              alert(product.title + " added to cart!");
              return;
            }

            // Navigate to product
            const productId = product.uniqueId || product._id || product.id;
            if (productId) {
              navigate(`/product/${productId}`);
            }
          },

          // Template with variants
          template: function (product, idx, swatchUI, productViewType) {
            const { uniqueId, title, imageUrl, price, brand, variants = [] } = product;
            const img = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
            const brandName = Array.isArray(brand) ? brand[0] : brand;
            const cardClass = productViewType === "LIST" ? "list-card" : "grid-card";

            let imagesHTML = '';
            let swatchHTML = '';

            if (variants.length > 1) {
              variants.slice(0, 5).forEach((v, i) => {
                const color = Array.isArray(v.v_color) ? v.v_color[0] : v.v_color;
                const vImg = Array.isArray(v.v_imageUrl) ? v.v_imageUrl[0] : v.v_imageUrl;
                const imgId = `img_${uniqueId}_${i}`;

                imagesHTML += `<div id="${imgId}" class="img-wrap ${i > 0 ? 'hidden' : ''}">
                  <img src="${vImg || img}" alt="${title}"/>
                </div>`;

                swatchHTML += `<button data-id="${imgId}" data-uniqueid="card_${uniqueId}" data-action="swatch" 
                  class="swatch ${i === 0 ? 'active' : ''}" 
                  style="background:${color?.toLowerCase() || '#ccc'}" title="${color}"></button>`;
              });
            } else {
              imagesHTML = `<div class="img-wrap"><img src="${img}" alt="${title}"/></div>`;
            }

            return `
              <div id="card_${uniqueId}" class="unbxd-product-item ${cardClass}" data-id="${uniqueId}">
                <div class="product-images">${imagesHTML}</div>
                <div class="product-info">
                  ${brandName ? `<p class="brand">${brandName}</p>` : ''}
                  <h3 class="title">${title}</h3>
                  <p class="price">$${price}</p>
                  ${swatchHTML ? `<div class="swatches">${swatchHTML}</div>` : ''}
                </div>
                <button data-action="cart" data-id="${uniqueId}" class="btn btn-primary">Add to Cart</button>
              </div>
            `;
          }
        },
        // Facets (Filters)
        facet: {
          facetsEl: document.getElementById("sdk-filters-root"),
          isCollapsible: true,
          defaultOpen: "ALL",
          isSearchable: true,
          enableViewMore: true,
          viewMoreText: ["+ Show More", "- Show less"],
          viewMoreLimit: 3,
          facetMultiSelect: true,   //does not allow multiple selection in same facet
          applyMultipleFilters: false,

        },

        noResults: {
          el: document.getElementById("no-results-container"),

        },
        // pagination: {
        //   type: 'INFINITE_SCROLL',
        //   infiniteScrollTriggerEl: window,
        //   heightDiffToTriggerNextPage: 100,
        // },
        // Pagination - Fixed (Page Numbers)
        // pagination: {
        //   enabled: true,
        //   type: "FIXED_PAGINATION",
        //   el: document.getElementById("pagination-container"),
        //   pageClass: "UNX-page-items",
        //   selectedPageClass: "UNX-selected-page-item",
        //   pageLimit: 6,
        //   action: "click"
        // },

        pagination: {
          ...getPaginationConfig(PAGINATION_STYLE),
          el: document.getElementById("pagination-container")
        },

       

        // pagesize: {
        //   enabled: true,
        //   el: document.getElementById("pagesize-container"),
        //   pageSize: 12,
        //   options: [12, 16, 20, 24],
        //   action: "change",

        // },
        pagesize: {
          enabled: true,
          el: document.getElementById("pagesize-container"),
          pageSize: 12,
          options: [12, 16, 24, 32],
          pageSizeClass: "radio-option",
          selectedPageSizeClass: "radio-active",
          action: "click",

          template: function (selected, pagesize) {
            const { pageSizeClass, selectedPageSizeClass, options } = pagesize;

            let radios = '';
            options.forEach((opt) => {
              const isChecked = selected == opt ? 'checked' : '';
              const activeClass = selected == opt ? selectedPageSizeClass : '';

              radios += `
                <label class="radio-label ${activeClass}">
                  <input type="radio" name="pagesize" id="${opt}" class="${pageSizeClass}" ${isChecked}>
                  <span class="radio-text">${opt}</span>
                </label>
              `;
            });

            return `
              <div class="pagesize-radios">
                <span class="radios-label">Show:</span>
                <div class="radios-group">${radios}</div>
              </div>
            `;
          }
        },
        // Sort
        sort: {
          enabled: true,
          el: document.getElementById("sort-container"),
          options: [
            { value: "price asc", text: "Price: Low to High" },
            { value: "price desc", text: "Price: High to Low" }
          ],
          action: "change"
        },

        productView: {
          enabled: true,
          el: document.getElementById("product-view-container"),
          defaultViewType: "GRID",
          action: "click"
        },
        breadcrumb: {
          enabled: true,
          el: document.getElementById("breadcrumb-container"),
          selectorClass: "UNX-bread-crumb"
        },
        spellCheck: {
          enabled: true,
          el: document.getElementById("spellcheck-container"),
          selectorClass: "UNX-suggestion",

        },
        loader: {
          //Below configurations should be added here.
          el: document.getElementById("loader-container"),


        },
        banner: {
          enabled: true,
          el: document.getElementById("banner-container"),
          openNewTab: true
        },
        variants: {
          enabled: true,
          count: 3,
          groupBy: "v_color",
          attributes: ["title", "v_imageUrl", "v_color"],
          mapping: {
            "image_url": "v_imageUrl"
          }
        },
        // swatches: {
        //   enabled: false,
        //   attributesMap: {
        //     "swatchImgs": "unbxd_color_mapping",
        //     "swatchColors": "color",
        //     "swatchList": "color"
        //   },
        //   swatchClass: "UNX-swatch-btn"
        // },

        debugMode: true
      });

      unbxdInstanceRef.current = window.unbxdSearch;
      console.log('✅ Unbxd initialized with Products Configuration!');



    } catch (error) {
      console.error('❌ Error initializing Unbxd:', error);
      setError('Failed to initialize search');
    }
  };



  // Handle search query changes - let Unbxd handle it
  // useEffect(() => {
  //   if (query && unbxdInstanceRef.current) {
  //     try {
  //       // ✅ Let Unbxd handle the search
  //       // unbxdInstanceRef.current.getResults(query);
  //       // Don't call backend API - Unbxd will handle it via onEvent
  //     } catch (error) {
  //       console.error('Error performing Unbxd search:', error);
  //       // Only fallback if Unbxd completely fails
  //       performSearch(query);
  //     }
  //   } else if (query && !unbxdInstanceRef.current) {
  //     // ✅ Only use backend if Unbxd is not initialized
  //     console.log('Unbxd not ready, using backend API');
  //     performSearch(query);
  //   }
  // }, [query]);


  // const performSearch = async (searchQuery) => {
  //   try {
  //     setError(null);
  //     const response = await axios.get(`http://localhost:3000/api/search?q=${encodeURIComponent(searchQuery)}`);
  //     setResults(response.data.data || []);
  //     setSearchType(response.data.searchType || 'exact');
  //   } catch (error) {
  //     console.error('Error searching products:', error);
  //     setError('Unable to connect to server. Please try again later.');
  //     setResults([]);
  //     setSearchType('exact');
  //   }
  // };

  if (!query) {
    return (
      <section className="products-section">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">No Results Found</div>
            <div className="empty-state-message">Please enter a search query</div>
            <Link to="/">
              <Button text="Back to Home" className="btn-primary" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="products-section">
        <div className="container">
          <h2 className="section-title">Search Results for "{query}"</h2>
          <div className="empty-state">
            <div className="empty-state-icon">⚠️</div>
            <div className="empty-state-title">Error</div>
            <div className="empty-state-message">{error}</div>
            <Link to="/">
              <Button text="Back to Home" className="btn-primary" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // if (results.length === 0) {
  //   return (
  //     <section className="products-section">
  //       <div className="container">
  //         <h2 className="section-title">Search Results for "{query}"</h2>
  //         <p id="results-count" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-light)' }}>
  //           0 results
  //         </p>
  //         <div className="empty-state">
  //           <div className="empty-state-icon">🔍</div>
  //           <div className="empty-state-title">No Results Found</div>
  //           <div className="empty-state-message">No results found for "{query}"</div>
  //           <Link to="/">
  //             <Button text="Back to Home" className="btn-primary" />
  //           </Link>
  //         </div>
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <section className="products-section">
      <div className="container">
        <h2 className="section-title">Search Results for "{query}"</h2>

        {/* Show suggestion message if searchType is 'suggestion' */}
        {searchType === 'suggestion' && (
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, color: '#92400e', fontWeight: '500', fontSize: '15px' }}>
              💡 No exact match for "{query}". Showing similar products:
            </p>
          </div>
        )}

        {/* Show fuzzy match message if searchType is 'fuzzy' */}
        {searchType === 'fuzzy' && (
          <div style={{
            backgroundColor: '#dbeafe',
            border: '1px solid #60a5fa',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, color: '#1e40af', fontWeight: '500', fontSize: '15px' }}>
              ✨ Showing results for "{query}" (including similar matches):
            </p>
          </div>
        )}

        {/* <p id="results-count" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-light)' }}>
          {results.length} result{results.length !== 1 ? 's' : ''} found
        </p> */}

        {/* Two-column layout: Filters on left, Results on right */}
        <div className="search-layout">
          {/* Filter Sidebar */}
          <aside className="search-filters">
            <div className="filter-container">
              {/* This is where you'll render your SDK filter components */}
              <div id="sdk-filters-root">
                {/* SDK filters will be rendered here */}
              </div>
            </div>
          </aside>

          {/* Search Results */}
          <div className="search-results">
            {/* Breadcrumb - ADD THIS */}
            <div id="breadcrumb-container"></div>
            {/* Spell Check - ADD THIS */}
            <div id="spellcheck-container"></div>
            {/* Banner - ADD THIS */}
            <div id="banner-container"></div>
            {/* Sort and Page Size Row */}
            <div className="search-toolbar">
              {/* Product View Toggle */}
              <div id="product-view-container"></div>
              {/* Sort Dropdown */}
              <div id="sort-container"></div>

              {/* Page Size Dropdown */}
              <div id="pagesize-container"></div>
            </div>
            {/* Loader */}
            <div id="loader-container"></div>
            {/* ✅ Unbxd Products Container */}

            <div id="unbxd-search-results">
              {/* Unbxd will render products here via template function */}
              {/* Fallback: Show React ProductCard if Unbxd not ready */}
              {results.length > 0 && (
                results.map(product => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                  />
                ))
              )}
            </div>
            {/* No results message */}
            <div id="no-results-container"></div>
            {/* Pagination */}
            <div id="pagination-container"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
