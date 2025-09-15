const express = require('express');
const Meal = require('../models/Meal');
const router = express.Router();

// Get all meals
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    let query = { isActive: true };
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      query.date = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const meals = await Meal.find(query).sort({ date: 1, name: 1 });

    res.json({
      success: true,
      meals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch meals'
    });
  }
});

// Create meal (for admin/mess staff)
router.post('/', async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();

    res.status(201).json({
      success: true,
      message: 'Meal created successfully',
      meal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create meal'
    });
  }
});

module.exports = router;
