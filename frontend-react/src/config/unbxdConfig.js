// src/config/unbxdConfig.js

// Replace these with your actual keys
const UNBXD_SITE_KEY = "ss-unbxd-aus-demo-fashion831421736321881";
const UNBXD_API_KEY = "1ccbb7fcb0faf770d1c228be80ba16d9";

// Map Unbxd fields to your product fields
// Based on your Product model: name, brand, price, image, description, category
export const unbxdConfig = {
  siteKey: UNBXD_SITE_KEY,
  apiKey: UNBXD_API_KEY,
  
  // Map Unbxd's expected fields to your product fields
  attributesMap: {
    "unxTitle": "title",              // SDK uses unxTitle → API has "title"
    "unxImageUrl": "imageUrl",        // SDK uses unxImageUrl → API has "imageUrl"
    "unxPrice": "price",              // SDK uses unxPrice → API has "price"
    "unxDescription": "description",  // SDK uses unxDescription → API has "description"
    "unxBrand": "brand",              // SDK uses unxBrand → API has "brand"
    "unxCategory": "categoryPath",    // SDK uses unxCategory → API has "categoryPath"
    "unxId": "uniqueId"               // SDK uses unxId → API has "uniqueId"
  },
  
  // ✅ Fields to REQUEST from Unbxd API (use API field names!)
  productAttributes: [
    // Essential fields
    "uniqueId",
    "title",
    "imageUrl",
    "price",
    "brand",
    "description",
    
    // Category
    "categoryPath",
    "productType",
    
    // Product attributes (for display/filters)
    "color",
    "size",
    "material",
    "gender",
    "pattern",
    "fitType",
    "variants",
    "variantCount"

  
    
  ],
  
  // Product type - "SEARCH" for search page
  productType: "SEARCH",
  
  // If staging, uncomment and set endpoint
  // searchEndPoint: "https://wingman-argocd.unbxd.io/"
};

export default unbxdConfig;