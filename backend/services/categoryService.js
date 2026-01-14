/**
 * Category Service
 * Business logic for category operations
 */
import Category from '../models/Category.js';

export const getAllCategories = async () => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return categories;
  } catch (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  } catch (error) {
    throw new Error(`Error fetching category: ${error.message}`);
  }
};

export const createCategory = async (categoryData) => {
  try {
    const category = new Category(categoryData);
    await category.save();
    return category;
  } catch (error) {
    throw new Error(`Error creating category: ${error.message}`);
  }
};

export const updateCategory = async (categoryId, updateData) => {
  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  } catch (error) {
    throw new Error(`Error updating category: ${error.message}`);
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  } catch (error) {
    throw new Error(`Error deleting category: ${error.message}`);
  }
};
