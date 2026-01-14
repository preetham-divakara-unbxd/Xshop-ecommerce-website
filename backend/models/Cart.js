/**
 * Cart Model
 * Note: In a real app, carts would be tied to user sessions/authentication
 * For now, we'll use a sessionId or clientId
 */
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for session lookup
cartSchema.index({ sessionId: 1 });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
