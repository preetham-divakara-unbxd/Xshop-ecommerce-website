/**
 * Order Service
 * Business logic for order operations
 */
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const generateOrderId = () => {
  return 'ORD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
};

export const createOrder = async (orderData) => {
  try {
    // Calculate totals
    let subtotal = 0;
    
    for (const item of orderData.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      subtotal += product.price * item.quantity;
      
      // Store product details in order
      item.name = product.name;
      item.brand = product.brand;
      item.price = product.price;
      item.image = product.image;
    }
    
    const shipping = subtotal > 5000 ? 0 : 200;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;
    
    const order = new Order({
      orderId: generateOrderId(),
      customer: orderData.customer,
      payment: orderData.payment,
      items: orderData.items,
      subtotal,
      shipping,
      tax,
      total,
      status: 'pending'
    });
    
    await order.save();
    return order;
  } catch (error) {
    throw new Error(`Error creating order: ${error.message}`);
  }
};

export const getAllOrders = async (filters = {}) => {
  try {
    const query = {};
    
    if (filters.email) {
      query['customer.email'] = filters.email;
    }
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(filters.limit || 100);
    
    return orders;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
};

export const getOrderById = async (orderId) => {
  try {
    const order = await Order.findOne({ orderId });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (error) {
    throw new Error(`Error fetching order: ${error.message}`);
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );
    
    if (!order) {
      throw new Error('Order not found');
    }
    
    return order;
  } catch (error) {
    throw new Error(`Error updating order status: ${error.message}`);
  }
};
