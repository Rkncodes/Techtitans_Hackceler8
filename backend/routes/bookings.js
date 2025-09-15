const express = require('express');
const Booking = require('../models/Booking');
const Meal = require('../models/Meal');
const User = require('../models/User');
const router = express.Router();

// Create empty route files for now
router.get('/', (req, res) => {
  res.json({ message: 'Bookings endpoint - coming soon!' });
});

module.exports = router;

