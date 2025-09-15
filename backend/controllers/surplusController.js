const SurplusFood = require('../models/SurplusFood');
const User = require('../models/User');
const QRCode = require('qrcode');
const cloudinary = require('../config/cloudinary');

// @desc    Log surplus food
// @route   POST /api/surplus
// @access  Private (Mess Staff)
const logSurplus = async (req, res) => {
  try {
    const {
      mealType,
      quantity,
      unit,
      foodItems,
      expiryTime,
      notes,
      quality,
      estimatedValue
    } = req.body;

    const loggedBy = req.user._id;
    const hostel = req.user.hostel;

    // Handle photo uploads
    let photoUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'surplus-food',
          resource_type: 'image'
        });
        photoUrls.push(result.secure_url);
      }
    }

    // Generate QR code for surplus tracking
    const qrData = JSON.stringify({
      type: 'surplus',
      mealType,
      quantity,
      timestamp: new Date().toISOString(),
      hostel
    });
    
    const qrCode = await QRCode.toDataURL(qrData);

    // Create surplus record
    const surplus = await SurplusFood.create({
      mealType,
      hostel,
      quantity,
      unit: unit || 'kg',
      foodItems,
      expiryTime: new Date(expiryTime),
      photos: photoUrls,
      loggedBy,
      qrCode,
      notes,
      quality: quality || 'good',
      estimatedValue
    });

    // Populate logged by user
    await surplus.populate('loggedBy', 'name role');

    // Emit real-time notification to NGOs
    req.io.emit('new_surplus', {
      id: surplus._id,
      mealType,
      quantity,
      hostel,
      expiryTime,
      photos: photoUrls.slice(0, 1), // Send only first photo for notification
      estimatedValue
    });

    // Send SMS notifications to nearby NGOs (implement based on location)
    // await notifyNearbyNGOs(surplus);

    res.status(201).json({
      success: true,
      message: 'Surplus food logged successfully',
      data: surplus
    });

  } catch (error) {
    console.error('Log surplus error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging surplus food'
    });
  }
};

// @desc    Get available surplus
// @route   GET /api/surplus/available
// @access  Private
const getAvailableSurplus = async (req, res) => {
  try {
    const { page = 1, limit = 10, mealType, hostel } = req.query;

    // Build query for available surplus
    const query = {
      status: 'available',
      expiryTime: { $gt: new Date() }
    };

    if (mealType) query.mealType = mealType;
    if (hostel) query.hostel = hostel;

    const surplus = await SurplusFood.find(query)
      .populate('loggedBy', 'name hostel')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SurplusFood.countDocuments(query);

    res.status(200).json({
      success: true,
      data: surplus,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: surplus.length,
        totalRecords: total
      }
    });

  } catch (error) {
    console.error('Get available surplus error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching available surplus'
    });
  }
};

// @desc    Claim surplus food
// @route   PUT /api/surplus/:id/claim
// @access  Private (NGO)
const claimSurplus = async (req, res) => {
  try {
    const { id } = req.params;
    const ngoId = req.user._id;

    // Find available surplus
    const surplus = await SurplusFood.findOne({
      _id: id,
      status: 'available',
      expiryTime: { $gt: new Date() }
    });

    if (!surplus) {
      return res.status(404).json({
        success: false,
        message: 'Surplus not available or expired'
      });
    }

    // Update surplus status
    surplus.status = 'claimed';
    surplus.assignedNGO = ngoId;
    surplus.claimedAt = new Date();
    await surplus.save();

    // Populate NGO details
    await surplus.populate('assignedNGO', 'name ngoDetails.organizationName phone');

    // Notify mess staff about claim
    req.io.to(`hostel_${surplus.hostel}`).emit('surplus_claimed', {
      surplusId: surplus._id,
      ngo: surplus.assignedNGO.ngoDetails.organizationName,
      claimedAt: surplus.claimedAt
    });

    res.status(200).json({
      success: true,
      message: 'Surplus food claimed successfully',
      data: surplus
    });

  } catch (error) {
    console.error('Claim surplus error:', error);
    res.status(500).json({
      success: false,
      message: 'Error claiming surplus food'
    });
  }
};

// @desc    Confirm collection
// @route   PUT /api/surplus/:id/collect
// @access  Private (NGO)
const confirmCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { qrData, collectionNotes } = req.body;
    const ngoId = req.user._id;

    // Find claimed surplus
    const surplus = await SurplusFood.findOne({
      _id: id,
      status: 'claimed',
      assignedNGO: ngoId
    });

    if (!surplus) {
      return res.status(404).json({
        success: false,
        message: 'Surplus not found or not claimed by you'
      });
    }

    // Verify QR code (basic verification)
    // In production, implement proper QR verification

    // Update surplus status
    surplus.status = 'collected';
    surplus.collectedAt = new Date();
    if (collectionNotes) surplus.notes += `\nCollection: ${collectionNotes}`;
    await surplus.save();

    // Award green credits to NGO
    await User.findByIdAndUpdate(ngoId, {
      $inc: { greenCredits: 25 }
    });

    // Notify mess staff about collection
    req.io.to(`hostel_${surplus.hostel}`).emit('surplus_collected', {
      surplusId: surplus._id,
      collectedAt: surplus.collectedAt
    });

    res.status(200).json({
      success: true,
      message: 'Collection confirmed successfully',
      data: surplus
    });

  } catch (error) {
    console.error('Confirm collection error:', error);
    res.status(500).json({
      success: false,
      message: 'Error confirming collection'
    });
  }
};

// @desc    Get NGO claimed items
// @route   GET /api/surplus/my-claims
// @access  Private (NGO)
const getMyClaims = async (req, res) => {
  try {
    const ngoId = req.user._id;
    const { status, page = 1, limit = 10 } = req.query;

    const query = { assignedNGO: ngoId };
    if (status) query.status = status;

    const claims = await SurplusFood.find(query)
      .populate('loggedBy', 'name hostel')
      .sort({ claimedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await SurplusFood.countDocuments(query);

    res.status(200).json({
      success: true,
      data: claims,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: claims.length,
        totalRecords: total
      }
    });

  } catch (error) {
    console.error('Get claims error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching claimed items'
    });
  }
};

module.exports = {
  logSurplus,
  getAvailableSurplus,
  claimSurplus,
  confirmCollection,
  getMyClaims
};
