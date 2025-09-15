const SurplusFood = require('../models/SurplusFood');
const User = require('../models/User');
const MealBooking = require('../models/MealBooking');
const { sendWeeklyReport } = require('./emailService');

// Clean up expired surplus food
const cleanupExpiredSurplus = async () => {
  try {
    const now = new Date();
    
    // Update expired surplus to 'expired' status
    const result = await SurplusFood.updateMany(
      {
        status: { $in: ['available', 'claimed'] },
        expiryTime: { $lt: now }
      },
      {
        $set: { status: 'expired' }
      }
    );

    console.log(`🧹 Cleaned up ${result.modifiedCount} expired surplus items`);
    
    return result.modifiedCount;
  } catch (error) {
    console.error('Surplus cleanup error:', error);
    return 0;
  }
};

// Update user streaks
const updateUserStreaks = async () => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    
    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    // Find users who attended meals yesterday
    const attendedBookings = await MealBooking.find({
      date: {
        $gte: yesterday,
        $lte: endOfYesterday
      },
      status: 'attended'
    }).populate('userId');

    const attendedUserIds = [...new Set(attendedBookings.map(booking => booking.userId._id.toString()))];

    // Update streaks for users who attended
    await User.updateMany(
      { _id: { $in: attendedUserIds } },
      { $inc: { streak: 1 } }
    );

    // Reset streaks for users who didn't attend and had bookings
    const allBookings = await MealBooking.find({
      date: {
        $gte: yesterday,
        $lte: endOfYesterday
      },
      status: { $in: ['booked', 'no_show'] }
    });

    const noShowUserIds = allBookings
      .filter(booking => booking.status === 'no_show' || booking.status === 'booked')
      .map(booking => booking.userId.toString());

    const nonAttendedUserIds = [...new Set(noShowUserIds)]
      .filter(userId => !attendedUserIds.includes(userId));

    if (nonAttendedUserIds.length > 0) {
      await User.updateMany(
        { _id: { $in: nonAttendedUserIds } },
        { $set: { streak: 0 } }
      );
    }

    console.log(`🔥 Updated streaks: ${attendedUserIds.length} increased, ${nonAttendedUserIds.length} reset`);
    
    return {
      increased: attendedUserIds.length,
      reset: nonAttendedUserIds.length
    };
  } catch (error) {
    console.error('Streak update error:', error);
    return { increased: 0, reset: 0 };
  }
};

// Generate and send weekly reports
const generateWeeklyReports = async () => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const users = await User.find({
      isActive: true,
      role: 'student'
    });

    let reportsSent = 0;

    for (const user of users) {
      // Calculate weekly stats
      const weeklyBookings = await MealBooking.find({
        userId: user._id,
        createdAt: { $gte: oneWeekAgo },
        status: 'attended'
      });

      const stats = {
        mealsAttended: weeklyBookings.length,
        greenCredits: weeklyBookings.length * 15, // Approximate credits earned
        attendanceRate: Math.round((weeklyBookings.length / 21) * 100) // 3 meals * 7 days
      };

      // Send weekly report email
      const result = await sendWeeklyReport(user.email, stats);
      
      if (result.success) {
        reportsSent++;
      }

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`📊 Sent ${reportsSent} weekly reports`);
    return reportsSent;
  } catch (error) {
    console.error('Weekly report generation error:', error);
    return 0;
  }
};

// Mark no-show bookings
const markNoShowBookings = async () => {
  try {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

    // Find bookings that should have been attended but weren't
    const result = await MealBooking.updateMany(
      {
        status: 'booked',
        date: { $lte: twoHoursAgo }
      },
      {
        $set: { status: 'no_show' }
      }
    );

    console.log(`❌ Marked ${result.modifiedCount} bookings as no-show`);
    return result.modifiedCount;
  } catch (error) {
    console.error('No-show marking error:', error);
    return 0;
  }
};

module.exports = {
  cleanupExpiredSurplus,
  updateUserStreaks,
  generateWeeklyReports,
  markNoShowBookings
};
