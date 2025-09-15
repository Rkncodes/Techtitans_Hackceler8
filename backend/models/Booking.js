const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
    required: [true, 'Meal is required']
  },
  status: {
    type: String,
    enum: ['booked', 'attended', 'missed', 'cancelled'],
    default: 'booked'
  },
  qrCode: {
    type: String,
    unique: true
  },
  attendedAt: {
    type: Date,
    default: null
  },
  creditsEarned: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Generate QR code before saving
bookingSchema.pre('save', function(next) {
  if (this.isNew) {
    this.qrCode = `QR-${this._id}-${Date.now()}`;
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
