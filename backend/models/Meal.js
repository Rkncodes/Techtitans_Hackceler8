const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Meal name is required'],
    enum: ['breakfast', 'lunch', 'snacks', 'dinner']
  },
  date: {
    type: Date,
    required: [true, 'Meal date is required']
  },
  time: {
    start: { type: String, required: true },
    end: { type: String, required: true }
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    default: 'A-Block Mess Hall'
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1']
  },
  booked: {
    type: Number,
    default: 0
  },
  menu: [{
    type: String,
    required: true
  }],
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  credits: {
    type: Number,
    required: [true, 'Credits are required'],
    min: [0, 'Credits cannot be negative']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for availability
mealSchema.virtual('isAvailable').get(function() {
  return this.booked < this.capacity && this.isActive;
});

// Virtual for occupancy percentage
mealSchema.virtual('occupancyPercentage').get(function() {
  return Math.round((this.booked / this.capacity) * 100);
});

module.exports = mongoose.model('Meal', mealSchema);
