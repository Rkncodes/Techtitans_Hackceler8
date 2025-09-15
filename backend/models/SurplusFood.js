const mongoose = require('mongoose');

const surplusFoodSchema = new mongoose.Schema({
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'snacks', 'dinner'],
    required: true
  },
  hostel: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.1
  },
  unit: {
    type: String,
    enum: ['kg', 'portions', 'liters'],
    default: 'kg'
  },
  foodItems: [{
    name: String,
    quantity: Number,
    vegetarian: Boolean
  }],
  expiryTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'collected', 'expired'],
    default: 'available'
  },
  photos: [String],
  loggedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedNGO: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  claimedAt: Date,
  collectedAt: Date,
  qrCode: String,
  notes: String,
  quality: {
    type: String,
    enum: ['excellent', 'good', 'fair'],
    default: 'good'
  },
  estimatedValue: Number,
  collectionInstructions: String
}, {
  timestamps: true
});

// Index for efficient queries
surplusFoodSchema.index({ status: 1, expiryTime: 1 });
surplusFoodSchema.index({ hostel: 1, createdAt: -1 });
surplusFoodSchema.index({ assignedNGO: 1, status: 1 });

// Auto-expire surplus food
surplusFoodSchema.methods.checkExpiry = function() {
  if (new Date() > this.expiryTime && this.status === 'available') {
    this.status = 'expired';
    return this.save();
  }
};

module.exports = mongoose.model('SurplusFood', surplusFoodSchema);
