/**
 * Wishlist Model
 * Note: In a real app, wishlists would be tied to user authentication
 * For now, we'll use a sessionId or clientId
 */
import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for session lookup
wishlistSchema.index({ sessionId: 1 });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
