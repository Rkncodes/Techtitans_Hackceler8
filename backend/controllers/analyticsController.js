const MealBooking = require('../models/MealBooking');
const SurplusFood = require('../models/SurplusFood');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private (Admin/Mess Staff)
const getDashboardAnalytics = async (req, res) => {
  try {
    const { hostel, startDate, endDate } = req.query;
    
    // Default to current month if no dates provided
    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate ? new Date(endDate) : new Date();

    const matchQuery = {
      createdAt: { $gte: start, $lte: end }
    };

    if (hostel) matchQuery.hostel = hostel;

    // Get comprehensive analytics
    const analytics = await Promise.all([
      // Meal booking statistics
      MealBooking.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalPortions: { $sum: '$portions' }
          }
        }
      ]),

      // Surplus food statistics
      SurplusFood.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
            totalQuantity: { $sum: '$quantity' },
            avgQuantity: { $avg: '$quantity' }
          }
        }
      ]),

      // Daily trend analysis
      MealBooking.aggregate([
        { $match: matchQuery },
        {
          $group: {
            _id: {
              date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
              mealType: '$mealType'
            },
            bookings: { $sum: 1 },
            attended: {
              $sum: { $cond: [{ $eq: ['$status', 'attended'] }, 1, 0] }
            }
          }
        },
        { $sort: { '_id.date': 1 } }
      ]),

      // Waste reduction metrics
      MealBooking.aggregate([
        { $match: { ...matchQuery, status: 'attended' } },
        {
          $lookup: {
            from: 'feedbacks',
            localField: '_id',
            foreignField: 'bookingId',
            as: 'feedback'
          }
        },
        {
          $group: {
            _id: null,
            totalMeals: { $sum: 1 },
            avgWasteLevel: {
              $avg: {
                $switch: {
                  branches: [
                    { case: { $eq: [{ $arrayElemAt: ['$feedback.foodWasted', 0] }, 'none'] }, then: 0 },
                    { case: { $eq: [{ $arrayElemAt: ['$feedback.foodWasted', 0] }, 'little'] }, then: 0.25 },
                    { case: { $eq: [{ $arrayElemAt: ['$feedback.foodWasted', 0] }, 'half'] }, then: 0.5 },
                    { case: { $eq: [{ $arrayElemAt: ['$feedback.foodWasted', 0] }, 'most'] }, then: 0.75 },
                    { case: { $eq: [{ $arrayElemAt: ['$feedback.foodWasted', 0] }, 'all'] }, then: 1 }
                  ],
                  default: 0.3
                }
              }
            }
          }
        }
      ])
    ]);

    const [bookingStats, surplusStats, dailyTrends, wasteMetrics] = analytics;

    // Calculate key metrics
    const totalBookings = bookingStats.reduce((sum, stat) => sum + stat.count, 0);
    const attendedBookings = bookingStats.find(s => s._id === 'attended')?.count || 0;
    const attendanceRate = totalBookings > 0 ? Math.round((attendedBookings / totalBookings) * 100) : 0;

    const totalSurplus = surplusStats.reduce((sum, stat) => sum + stat.totalQuantity, 0);
    const collectedSurplus = surplusStats.find(s => s._id === 'collected')?.totalQuantity || 0;
    const surplusUtilization = totalSurplus > 0 ? Math.round((collectedSurplus / totalSurplus) * 100) : 0;

    const estimatedWasteReduced = attendedBookings * 0.1 * (1 - (wasteMetrics?.avgWasteLevel || 0.3));

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalBookings,
          attendanceRate,
          totalSurplus: Math.round(totalSurplus * 10) / 10,
          surplusUtilization,
          wasteReduced: Math.round(estimatedWasteReduced * 10) / 10,
          co2Saved: Math.round(estimatedWasteReduced * 2.5 * 10) / 10
        },
        bookingStats,
        surplusStats,
        dailyTrends,
        period: { start, end }
      }
    });

  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard analytics'
    });
  }
};

// @desc    Get predictive analytics
// @route   GET /api/analytics/predictions
// @access  Private (Mess Staff/Admin)
const getPredictiveAnalytics = async (req, res) => {
  try {
    const { date, mealType, hostel } = req.query;
    
    const targetDate = date ? new Date(date) : new Date();
    const dayOfWeek = targetDate.getDay();
    const hour = targetDate.getHours();

    // Historical data for the same day of week and meal type
    const historicalData = await MealBooking.aggregate([
      {
        $match: {
          mealType: mealType || 'lunch',
          hostel: hostel || req.user.hostel,
          createdAt: {
            $gte: new Date(targetDate.getTime() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: '$date' },
            status: '$status'
          },
          count: { $sum: 1 },
          avgPortions: { $avg: '$portions' }
        }
      }
    ]);

    // Calculate prediction based on historical patterns
    const relevantHistory = historicalData.filter(d => d._id.dayOfWeek === dayOfWeek + 1);
    const totalBookings = relevantHistory.reduce((sum, h) => sum + h.count, 0);
    const attendedBookings = relevantHistory.find(h => h._id.status === 'attended')?.count || 0;
    
    const prediction = {
      expectedBookings: Math.round(totalBookings * 1.05), // 5% growth assumption
      expectedAttendance: Math.round(attendedBookings * 0.85), // 85% attendance rate
      recommendedCooking: Math.round(attendedBookings * 1.1), // 10% buffer
      confidence: totalBookings > 10 ? 'high' : totalBookings > 5 ? 'medium' : 'low'
    };

    res.status(200).json({
      success: true,
      data: {
        prediction,
        historical: relevantHistory,
        factors: {
          dayOfWeek,
          weatherImpact: 0.05, // Placeholder
          eventImpact: 0.1 // Placeholder
        }
      }
    });

  } catch (error) {
    console.error('Predictive analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating predictions'
    });
  }
};

module.exports = {
  getDashboardAnalytics,
  getPredictiveAnalytics
};
