const express = require('express');
const {
  getNGOProfile,
  updateNGOProfile,
  getNearbySurplus
} = require('../controllers/ngoController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/ngo/profile
router.get('/profile', auth, authorize('ngo'), getNGOProfile);

// @route   PUT /api/ngo/profile
router.put('/profile', auth, authorize('ngo'), updateNGOProfile);

// @route   GET /api/ngo/nearby-surplus
router.get('/nearby-surplus', auth, authorize('ngo'), getNearbySurplus);

module.exports = router;
