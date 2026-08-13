import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: true,
    maxLength: [100, 'El título no puede exceder 100 caracteres']
  },
  comment: {
    type: String,
    required: true,
    maxLength: [1000, 'El comentario no puede exceder 1000 caracteres']
  },
  helpful: {
    type: Number,
    default: 0
  },
  unhelpful: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Índice para búsquedas rápidas
reviewSchema.index({ product: 1, user: 1 });
reviewSchema.index({ product: 1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
