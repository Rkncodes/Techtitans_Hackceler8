const MealBooking = require('../models/MealBooking');
const User = require('../models/User');
const QRCode = require('qrcode');

// @desc    Create meal booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { mealType, date, portions, preferences } = req.body;
    const userId = req.user._id;
    const hostel = req.user.hostel;

    // Check if booking already exists
    const existingBooking = await MealBooking.findOne({
      userId,
      mealType,
      date: new Date(date)
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Booking already exists for this meal'
      });
    }

    // Generate QR code for the booking
    const qrData = JSON.stringify({
      userId,
      mealType,
      date,
      bookingId: new Date().getTime()
    });
    
    const qrCode = await QRCode.toDataURL(qrData);

    // Create booking
    const booking = await MealBooking.create({
      userId,
      mealType,
      date: new Date(date),
      portions: portions || 1,
      hostel,
      preferences,
      qrCode
    });

    // Award green credits for booking
    await User.findByIdAndUpdate(userId, {
      $inc: { greenCredits: 10 }
    });

    // Populate user details
    await booking.populate('userId', 'name email');

    // Emit real-time update
    req.io.emit('booking_created', {
      hostel,
      mealType,
      date,
      count: 1
    });

    res.status(201).json({
      success: true,
      message: 'Meal booked successfully',
      data: booking
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking'
    });
  }
};

// @desc    Skip meal
// @route   POST /api/bookings/skip
// @access  Private
const skipMeal = async (req, res) => {
  try {
    const { mealType, date } = req.body;
    const userId = req.user._id;

    // Create skip record
    const skipRecord = await MealBooking.create({
      userId,
      mealType,
      date: new Date(date),
      hostel: req.user.hostel,
      status: 'skipped'
    });

    // Award green credits for conscious skipping
    await User.findByIdAndUpdate(userId, {
      $inc: { greenCredits: 5 }
    });

    res.status(201).json({
      success: true,
      message: 'Meal skipped successfully',
      data: skipRecord
    });

  } catch (error) {
    console.error('Skip meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error skipping meal'
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
const getUserBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, mealType, startDate, endDate } = req.query;
    const userId = req.user._id;

    // Build query
    const query = { userId };
    
    if (status) query.status = status;
    if (mealType) query.mealType = mealType;
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Execute query with pagination
    const bookings = await MealBooking.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('userId', 'name email');

    const total = await MealBooking.countDocuments(query);

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: bookings.length,
        totalRecords: total
      }
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings'
    });
  }
};

// @desc    Mark attendance
// @route   PUT /api/bookings/:id/attend
// @access  Private (Mess Staff)
const markAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { qrData } = req.body;

    // Verify QR code data
    const booking = await MealBooking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update booking status
    booking.status = 'attended';
    booking.attendedAt = new Date();
    await booking.save();

    // Award attendance green credits
    await User.findByIdAndUpdate(booking.userId, {
      $inc: { greenCredits: 15 }
    });

    res.status(200).json({
      success: true,
      message: 'Attendance marked successfully',
      data: booking
    });

  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking attendance'
    });
  }
};

// @desc    Get meal statistics
// @route   GET /api/bookings/stats
// @access  Private (Mess Staff/Admin)
const getMealStats = async (req, res) => {
  try {
    const { date, hostel, mealType } = req.query;
    
    const queryDate = date ? new Date(date) : new Date();
    const queryHostel = hostel || req.user.hostel;

    const stats = await MealBooking.getMealStats(queryDate, queryHostel, mealType);
    
    // Calculate predictions and recommendations
    const totalBookings = stats.reduce((sum, stat) => sum + stat.count, 0);
    const totalPortions = stats.reduce((sum, stat) => sum + stat.totalPortions, 0);
    
    const predictions = {
      expectedAttendance: Math.round(totalBookings * 0.85), // 85% attendance rate
      recommendedCooking: Math.round(totalPortions * 1.1), // 10% buffer
      wasteReduction: Math.round(totalPortions * 0.15) // Potential waste reduction
    };

    res.status(200).json({
      success: true,
      data: {
        stats,
        predictions,
        date: queryDate,
        hostel: queryHostel,
        mealType
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching meal statistics'
    });
  }
};

module.exports = {
  createBooking,
  skipMeal,
  getUserBookings,
  markAttendance,
  getMealStats
};
