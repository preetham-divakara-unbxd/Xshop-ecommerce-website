/**
 * Order Routes
 */
import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

// POST /api/orders - Create new order
router.post('/', orderController.createOrder);

// GET /api/orders - Get all orders (with optional filters)
router.get('/', orderController.getAllOrders);

// GET /api/orders/:orderId - Get order by ID
router.get('/:orderId', orderController.getOrderById);

// PUT /api/orders/:orderId/status - Update order status (admin)
router.put('/:orderId/status', orderController.updateOrderStatus);

export default router;
