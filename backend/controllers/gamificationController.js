const User = require('../models/User');
const MealBooking = require('../models/MealBooking');
const SurplusFood = require('../models/SurplusFood');

// @desc    Get leaderboard
// @route   GET /api/gamification/leaderboard
// @access  Private
const getLeaderboard = async (req, res) => {
  try {
    const { hostel, period = 'month', limit = 50 } = req.query;

    // Calculate date range based on period
    let startDate;
    const endDate = new Date();

    switch (period) {
      case 'week':
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(endDate.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Build query
    const matchQuery = {
      isActive: true,
      role: { $in: ['student', 'ngo'] }
    };

    if (hostel) matchQuery.hostel = hostel;

    // Get users with green credits and additional stats
    const leaderboard = await User.aggregate([
      { $match: matchQuery },
      {
        $lookup: {
          from: 'mealbookings',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$userId', '$$userId'] },
                    { $gte: ['$createdAt', startDate] },
                    { $lte: ['$createdAt', endDate] },
                    { $eq: ['$status', 'attended'] }
                  ]
                }
              }
            }
          ],
          as: 'attendedBookings'
        }
      },
      {
        $lookup: {
          from: 'surplusfoods',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$assignedNGO', '$$userId'] },
                    { $gte: ['$createdAt', startDate] },
                    { $lte: ['$createdAt', endDate] },
                    { $eq: ['$status', 'collected'] }
                  ]
                }
              }
            }
          ],
          as: 'collectedSurplus'
        }
      },
      {
        $addFields: {
          mealsAttended: { $size: '$attendedBookings' },
          surplusCollected: { $size: '$collectedSurplus' },
          totalImpact: {
            $add: [
              { $multiply: [{ $size: '$attendedBookings' }, 10] },
              { $multiply: [{ $size: '$collectedSurplus' }, 25] }
            ]
          }
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          role: 1,
          hostel: 1,
          greenCredits: 1,
          streak: 1,
          mealsAttended: 1,
          surplusCollected: 1,
          totalImpact: 1
        }
      },
      { $sort: { greenCredits: -1, totalImpact: -1 } },
      { $limit: parseInt(limit) }
    ]);

    // Add rank to each user
    const leaderboardWithRank = leaderboard.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    res.status(200).json({
      success: true,
      data: leaderboardWithRank,
      period,
      hostel,
      generatedAt: new Date()
    });

  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard'
    });
  }
};

// @desc    Get user achievements
// @route   GET /api/gamification/achievements
// @access  Private
const getUserAchievements = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user stats
    const user = await User.findById(userId);
    const totalBookings = await MealBooking.countDocuments({ 
      userId, 
      status: 'attended' 
    });
    const totalSurplusCollected = await SurplusFood.countDocuments({
      assignedNGO: userId,
      status: 'collected'
    });

    // Define achievements
    const achievements = [
      {
        id: 'first_booking',
        title: 'First Booking',
        description: 'Made your first meal booking',
        icon: '🍽️',
        unlocked: totalBookings >= 1,
        progress: Math.min(totalBookings, 1),
        target: 1,
        credits: 10
      },
      {
        id: 'regular_eater',
        title: 'Regular Eater',
        description: 'Attended 10 meals',
        icon: '🥗',
        unlocked: totalBookings >= 10,
        progress: Math.min(totalBookings, 10),
        target: 10,
        credits: 50
      },
      {
        id: 'food_warrior',
        title: 'Food Warrior',
        description: 'Attended 50 meals',
        icon: '🛡️',
        unlocked: totalBookings >= 50,
        progress: Math.min(totalBookings, 50),
        target: 50,
        credits: 200
      },
      {
        id: 'streak_master',
        title: 'Streak Master',
        description: 'Maintain 7-day booking streak',
        icon: '🔥',
        unlocked: user.streak >= 7,
        progress: Math.min(user.streak, 7),
        target: 7,
        credits: 100
      },
      {
        id: 'eco_hero',
        title: 'Eco Hero',
        description: 'Collected 5 surplus meals',
        icon: '🌱',
        unlocked: totalSurplusCollected >= 5,
        progress: Math.min(totalSurplusCollected, 5),
        target: 5,
        credits: 150
      }
    ];

    // Calculate total achievement credits
    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const totalAchievementCredits = unlockedAchievements.reduce((sum, a) => sum + a.credits, 0);

    res.status(200).json({
      success: true,
      data: {
        achievements,
        stats: {
          totalAchievements: achievements.length,
          unlockedAchievements: unlockedAchievements.length,
          totalCredits: user.greenCredits,
          achievementCredits: totalAchievementCredits,
          completionPercentage: Math.round((unlockedAchievements.length / achievements.length) * 100)
        }
      }
    });

  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching achievements'
    });
  }
};

// @desc    Get user stats
// @route   GET /api/gamification/stats
// @access  Private
const getUserStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    // Calculate various statistics
    const stats = await Promise.all([
      MealBooking.countDocuments({ userId, status: 'attended' }),
      MealBooking.countDocuments({ userId, status: 'booked' }),
      MealBooking.countDocuments({ userId, status: 'skipped' }),
      MealBooking.countDocuments({ userId, status: 'no_show' }),
      SurplusFood.countDocuments({ assignedNGO: userId, status: 'collected' }),
      
      // Get this week's bookings
      MealBooking.countDocuments({
        userId,
        status: 'attended',
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 7))
        }
      }),

      // Calculate waste reduction impact
      MealBooking.aggregate([
        { $match: { userId, status: 'attended' } },
        { $group: { _id: null, totalPortions: { $sum: '$portions' } } }
      ])
    ]);

    const [
      totalAttended,
      totalBooked,
      totalSkipped,
      totalNoShow,
      totalSurplusCollected,
      weeklyAttendance,
      wasteImpact
    ] = stats;

    // Calculate attendance rate
    const totalMeals = totalAttended + totalNoShow;
    const attendanceRate = totalMeals > 0 ? Math.round((totalAttended / totalMeals) * 100) : 0;

    // Estimate environmental impact
    const avgFoodWastePerMeal = 0.1; // kg
    const wasteReduced = (wasteImpact?.totalPortions || 0) * avgFoodWastePerMeal;
    const co2Saved = wasteReduced * 2.5; // kg CO2 per kg food

    res.status(200).json({
      success: true,
      data: {
        user: {
          name: user.name,
          greenCredits: user.greenCredits,
          streak: user.streak,
          rank: await calculateUserRank(userId)
        },
        mealStats: {
          totalAttended,
          totalBooked,
          totalSkipped,
          totalNoShow,
          attendanceRate,
          weeklyAttendance
        },
        impactStats: {
          totalSurplusCollected,
          wasteReduced: Math.round(wasteReduced * 10) / 10,
          co2Saved: Math.round(co2Saved * 10) / 10,
          treesEquivalent: Math.round(co2Saved / 21.77) // Average CO2 absorbed by tree per year
        }
      }
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics'
    });
  }
};

// Helper function to calculate user rank
const calculateUserRank = async (userId) => {
  try {
    const user = await User.findById(userId);
    const higherRankedUsers = await User.countDocuments({
      greenCredits: { $gt: user.greenCredits },
      role: user.role,
      ...(user.hostel && { hostel: user.hostel })
    });
    
    return higherRankedUsers + 1;
  } catch (error) {
    return null;
  }
};

module.exports = {
  getLeaderboard,
  getUserAchievements,
  getUserStats
};
