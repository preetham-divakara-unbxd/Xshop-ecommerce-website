/**
 * Product Service
 * Business logic for product operations
 */
import Product from '../models/Product.js';

export const getAllProducts = async (filters = {}) => {
  try {
    const query = {};
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.search) {
      query.$text = { $search: filters.search };
    }
    
    if (filters.minPrice) {
      query.price = { ...query.price, $gte: filters.minPrice };
    }
    
    if (filters.maxPrice) {
      query.price = { ...query.price, $lte: filters.maxPrice };
    }
    
    if (filters.inStock !== undefined) {
      query.inStock = filters.inStock;
    }
    
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(filters.limit || 100)
      .skip(filters.skip || 0);
    
    return products;
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(`Error fetching product: ${error.message}`);
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const products = await Product.find({ category: category });
    return products;
  } catch (error) {
    throw new Error(`Error fetching products by category: ${error.message}`);
  }
};

export const searchProducts = async (searchTerm) => {
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });
    return products;
  } catch (error) {
    throw new Error(`Error searching products: ${error.message}`);
  }
};

export const createProduct = async (productData) => {
  try {
    const product = new Product(productData);
    await product.save();
    return product;
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};

export const updateProduct = async (productId, updateData) => {
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};
