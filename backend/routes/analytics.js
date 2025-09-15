const express = require('express');
const {
  getDashboardAnalytics,
  getPredictiveAnalytics
} = require('../controllers/analyticsController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics/dashboard
router.get('/dashboard', auth, authorize('mess_staff', 'admin'), getDashboardAnalytics);

// @route   GET /api/analytics/predictions
router.get('/predictions', auth, authorize('mess_staff', 'admin'), getPredictiveAnalytics);

module.exports = router;
