const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MealBooking'
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'snacks', 'dinner'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  hostel: {
    type: String,
    required: true
  },
  ratings: {
    taste: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    quantity: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    freshness: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    overall: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    }
  },
  foodWasted: {
    type: String,
    enum: ['none', 'little', 'half', 'most', 'all'],
    required: true
  },
  wasteReason: {
    type: String,
    enum: ['too_much', 'bad_taste', 'cold_food', 'not_fresh', 'allergic', 'other']
  },
  comments: String,
  suggestions: String
}, {
  timestamps: true
});

feedbackSchema.index({ userId: 1, date: 1, mealType: 1 });
feedbackSchema.index({ hostel: 1, date: 1 });

module.exports = mongoose.model('Feedback', feedbackSchema);
