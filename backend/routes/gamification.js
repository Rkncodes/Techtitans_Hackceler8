const express = require('express');
const {
  getLeaderboard,
  getUserAchievements,
  getUserStats
} = require('../controllers/gamificationController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/gamification/leaderboard
router.get('/leaderboard', auth, getLeaderboard);

// @route   GET /api/gamification/achievements
router.get('/achievements', auth, getUserAchievements);

// @route   GET /api/gamification/stats
router.get('/stats', auth, getUserStats);

module.exports = router;
