const mongoose = require('mongoose');

const wasteDataSchema = new mongoose.Schema({
  hostel: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'snacks', 'dinner'],
    required: true
  },
  totalCooked: {
    type: Number,
    required: true
  },
  totalServed: {
    type: Number,
    required: true
  },
  plateWaste: {
    type: Number,
    default: 0
  },
  bulkWaste: {
    type: Number,
    default: 0
  },
  surplusDistributed: {
    type: Number,
    default: 0
  },
  loggedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: String
}, {
  timestamps: true
});

wasteDataSchema.index({ hostel: 1, date: 1, mealType: 1 });

module.exports = mongoose.model('WasteData', wasteDataSchema);
