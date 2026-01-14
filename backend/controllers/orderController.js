/**
 * Order Controller
 * Handles HTTP requests for order operations
 */
import * as orderService from '../services/orderService.js';

export const createOrder = async (req, res) => {
  try {
    const { customer, payment, items } = req.body;
    
    if (!customer || !payment || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Customer, payment, and items are required'
      });
    }
    
    const order = await orderService.createOrder(req.body);
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const filters = {
      email: req.query.email,
      status: req.query.status,
      limit: req.query.limit ? parseInt(req.query.limit) : undefined
    };
    
    const orders = await orderService.getAllOrders(filters);
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.orderId);
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }
    
    const order = await orderService.updateOrderStatus(req.params.orderId, status);
    res.json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
