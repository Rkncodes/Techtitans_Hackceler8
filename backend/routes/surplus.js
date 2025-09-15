const express = require('express');
const router = express.Router();

// Create empty route file for now
router.get('/', (req, res) => {
  res.json({ message: 'Surplus endpoint - coming soon!' });
});

module.exports = router;
