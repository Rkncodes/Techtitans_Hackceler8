const User = require('../models/User');
const SurplusFood = require('../models/SurplusFood');

// @desc    Get NGO profile and verification status
// @route   GET /api/ngo/profile
// @access  Private (NGO)
const getNGOProfile = async (req, res) => {
  try {
    const ngo = await User.findById(req.user._id);
    
    // Get NGO statistics
    const stats = await Promise.all([
      SurplusFood.countDocuments({ assignedNGO: req.user._id, status: 'collected' }),
      SurplusFood.aggregate([
        { $match: { assignedNGO: req.user._id, status: 'collected' } },
        { $group: { _id: null, totalQuantity: { $sum: '$quantity' } } }
      ]),
      SurplusFood.countDocuments({ assignedNGO: req.user._id, status: 'claimed' })
    ]);

    const [totalCollections, quantityData, pendingCollections] = stats;
    const totalQuantity = quantityData?.totalQuantity || 0;

    res.status(200).json({
      success: true,
      data: {
        profile: ngo,
        stats: {
          totalCollections,
          totalQuantityCollected: Math.round(totalQuantity * 10) / 10,
          pendingCollections,
          estimatedImpact: Math.round(totalQuantity * 2.5 * 10) / 10 // CO2 saved
        }
      }
    });

  } catch (error) {
    console.error('Get NGO profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching NGO profile'
    });
  }
};

// @desc    Update NGO details
// @route   PUT /api/ngo/profile
// @access  Private (NGO)
const updateNGOProfile = async (req, res) => {
  try {
    const { name, phone, ngoDetails } = req.body;
    
    const updatedNGO = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        phone,
        ngoDetails: {
          ...req.user.ngoDetails,
          ...ngoDetails
        }
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedNGO
    });

  } catch (error) {
    console.error('Update NGO profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
};

// @desc    Get nearby surplus food
// @route   GET /api/ngo/nearby-surplus
// @access  Private (NGO)
const getNearbySurplus = async (req, res) => {
  try {
    const { radius = 10, lat, lng } = req.query;

    // For now, we'll return all available surplus
    // In production, implement geolocation-based filtering
    const surplus = await SurplusFood.find({
      status: 'available',
      expiryTime: { $gt: new Date() }
    })
    .populate('loggedBy', 'name hostel')
    .sort({ createdAt: -1 })
    .limit(20);

    res.status(200).json({
      success: true,
      data: surplus
    });

  } catch (error) {
    console.error('Get nearby surplus error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching nearby surplus'
    });
  }
};

module.exports = {
  getNGOProfile,
  updateNGOProfile,
  getNearbySurplus
};
