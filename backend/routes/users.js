const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users (for admin)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('name email role hostel greenCredits')
      .sort({ greenCredits: -1 })
      .limit(50);

    res.json({
      success: true,
      leaderboard: users.map((user, index) => ({
        ...user.toObject(),
        rank: index + 1
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard'
    });
  }
});

module.exports = router;
