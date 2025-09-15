import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package,
  Clock,
  MapPin,
  Camera,
  Plus,
  Filter,
  Search,
  AlertTriangle,
  CheckCircle,
  Users,
  Truck,
  QrCode,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const SurplusTracker = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('available');
  const [showLogForm, setShowLogForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [surplusItems, setSurplusItems] = useState([
    {
      id: 1,
      mealType: 'lunch',
      quantity: 5.2,
      foodItems: ['Steamed Rice', 'Dal Tadka', 'Mix Veg Sabzi', 'Chapati'],
      hostel: 'A-Block',
      loggedBy: 'Mess Staff',
      loggedAt: '2 hours ago',
      expiryTime: '4 hours',
      status: 'available',
      photos: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300'],
      quality: 'excellent'
    },
    {
      id: 2,
      mealType: 'breakfast',
      quantity: 3.8,
      foodItems: ['Poha', 'Idli', 'Upma'],
      hostel: 'B-Block',
      loggedBy: 'Mess Staff',
      loggedAt: '4 hours ago',
      expiryTime: '2 hours',
      status: 'claimed',
      claimedBy: 'Green Earth NGO',
      photos: ['https://images.unsplash.com/photo-1574484284002-952d92456975?w=300'],
      quality: 'good'
    },
    {
      id: 3,
      mealType: 'dinner',
      quantity: 2.1,
      foodItems: ['Roti', 'Aloo Gobi', 'Dal Fry'],
      hostel: 'C-Block',
      loggedBy: 'Mess Staff',
      loggedAt: '6 hours ago',
      expiryTime: 'Expired',
      status: 'collected',
      claimedBy: 'Hope Foundation',
      photos: ['https://images.unsplash.com/photo-1555939594-58e637e7aa7e?w=300'],
      quality: 'fair'
    }
  ]);

  const [logForm, setLogForm] = useState({
    mealType: 'lunch',
    quantity: '',
    foodItems: '',
    expiryTime: '',
    notes: '',
    photos: []
  });

  const tabs = [
    { id: 'available', label: 'Available', count: surplusItems.filter(s => s.status === 'available').length },
    { id: 'claimed', label: 'Claimed', count: surplusItems.filter(s => s.status === 'claimed').length },
    { id: 'collected', label: 'Collected', count: surplusItems.filter(s => s.status === 'collected').length }
  ];

  const filteredItems = surplusItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.status === activeTab;
    const matchesFilter = filter === 'all' || item.mealType === filter;
    const matchesSearch = item.foodItems.some(food => 
      food.toLowerCase().includes(searchTerm.toLowerCase())
    ) || item.hostel.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesFilter && matchesSearch;
  });

  const handleClaimSurplus = async (itemId) => {
    try {
      setSurplusItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, status: 'claimed', claimedBy: 'Green Earth NGO' }
          : item
      ));
      toast.success('Surplus food claimed successfully! 📦');
    } catch (error) {
      toast.error('Failed to claim surplus food');
    }
  };

  const handleLogSurplus = async (formData) => {
    try {
      const newItem = {
        id: Date.now(),
        ...formData,
        foodItems: formData.foodItems.split(',').map(item => item.trim()),
        hostel: user?.hostel || 'A-Block',
        loggedBy: user?.name || 'Mess Staff',
        loggedAt: 'Just now',
        status: 'available',
        photos: ['https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300'],
        quality: 'good'
      };
      
      setSurplusItems(prev => [newItem, ...prev]);
      setShowLogForm(false);
      setLogForm({
        mealType: 'lunch',
        quantity: '',
        foodItems: '',
        expiryTime: '',
        notes: '',
        photos: []
      });
      toast.success('Surplus food logged successfully! 🌱');
    } catch (error) {
      toast.error('Failed to log surplus food');
    }
  };

  const SurplusCard = ({ item }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'available':
          return 'bg-success-100 text-success-700 border-success-200';
        case 'claimed':
          return 'bg-warning-100 text-warning-700 border-warning-200';
        case 'collected':
          return 'bg-gray-100 text-gray-700 border-gray-200';
        default:
          return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };

    const getExpiryColor = (expiryTime) => {
      if (expiryTime === 'Expired') return 'text-error-600';
      const hours = parseInt(expiryTime);
      if (hours <= 2) return 'text-error-600';
      if (hours <= 4) return 'text-warning-600';
      return 'text-success-600';
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl text-white mr-4">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg capitalize">
                {item.mealType} Surplus
              </h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{item.hostel}</span>
              </div>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(item.status)}`}>
            {item.status}
          </div>
        </div>

        {/* Food Image */}
        {item.photos && item.photos.length > 0 && (
          <div className="mb-4">
            <img
              src={item.photos[0]}
              alt="Surplus food"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        )}

        {/* Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Quantity:</span>
            <span className="font-bold text-gray-900">{item.quantity}kg</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Quality:</span>
            <span className={`font-semibold capitalize ${
              item.quality === 'excellent' ? 'text-success-600' :
              item.quality === 'good' ? 'text-primary-600' :
              'text-warning-600'
            }`}>
              {item.quality}
            </span>
          </div>
        </div>

        {/* Food Items */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Food Items:</h4>
          <div className="flex flex-wrap gap-2">
            {item.foodItems.map((food, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-200"
              >
                {food}
              </span>
            ))}
          </div>
        </div>

        {/* Time Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>Logged {item.loggedAt}</span>
          </div>
          
          <div className={`flex items-center text-sm font-semibold ${getExpiryColor(item.expiryTime)}`}>
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span>
              {item.expiryTime === 'Expired' ? 'Expired' : `${item.expiryTime} left`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {item.status === 'available' && user?.role === 'ngo' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClaimSurplus(item.id)}
              className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
            >
              <Truck className="w-5 h-5 mr-2" />
              Claim for Pickup
            </motion.button>
          )}
          
          {item.status === 'claimed' && (
            <div className="flex-1 bg-warning-100 text-warning-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 mr-2" />
              Claimed by {item.claimedBy}
            </div>
          )}
          
          {item.status === 'collected' && (
            <div className="flex-1 bg-success-100 text-success-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Collected by {item.claimedBy}
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <QrCode className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const LogSurplusModal = () => (
    <AnimatePresence>
      {showLogForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLogForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 font-heading">
                Log Surplus Food
              </h2>
              <button
                onClick={() => setShowLogForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleLogSurplus(logForm);
            }} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meal Type
                </label>
                <select
                  value={logForm.mealType}
                  onChange={(e) => setLogForm(prev => ({ ...prev, mealType: e.target.value }))}
                  className="input-field"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="snacks">Evening Snacks</option>
                  <option value="dinner">Dinner</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={logForm.quantity}
                  onChange={(e) => setLogForm(prev => ({ ...prev, quantity: e.target.value }))}
                  className="input-field"
                  placeholder="Enter quantity in kg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Food Items (comma separated)
                </label>
                <input
                  type="text"
                  value={logForm.foodItems}
                  onChange={(e) => setLogForm(prev => ({ ...prev, foodItems: e.target.value }))}
                  className="input-field"
                  placeholder="Rice, Dal, Sabji, Roti"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry Time (hours)
                </label>
                <input
                  type="number"
                  value={logForm.expiryTime}
                  onChange={(e) => setLogForm(prev => ({ ...prev, expiryTime: e.target.value }))}
                  className="input-field"
                  placeholder="How many hours until expiry?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={logForm.notes}
                  onChange={(e) => setLogForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="input-field"
                  rows={3}
                  placeholder="Any special instructions or notes..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload photos</p>
                  <p className="text-gray-400 text-sm">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowLogForm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3"
                >
                  Log Surplus
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-heading mb-2">
            Surplus Food Tracker 📦
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and redistribute surplus food efficiently
          </p>
        </div>
        
        {(user?.role === 'mess_staff' || user?.role === 'admin') && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLogForm(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Log Surplus
          </motion.button>
        )}
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-2xl p-6 border border-success-200">
          <div className="text-3xl font-bold text-success-700 mb-1">24.1kg</div>
          <div className="text-success-600 font-semibold">Total Available</div>
        </div>
        
        <div className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-2xl p-6 border border-warning-200">
          <div className="text-3xl font-bold text-warning-700 mb-1">8.3kg</div>
          <div className="text-warning-600 font-semibold">Being Claimed</div>
        </div>
        
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
          <div className="text-3xl font-bold text-primary-700 mb-1">Value Saved</div>
          <div className="text-primary-600 font-semibold">Free Provided</div>
        </div>
        
        <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border border-accent-200">
          <div className="text-3xl font-bold text-accent-700 mb-1">12</div>
          <div className="text-accent-600 font-semibold">NGOs Active</div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search food items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Meals</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="snacks">Snacks</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Surplus Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <SurplusCard item={item} />
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No surplus food found
          </h3>
          <p className="text-gray-500">
            {activeTab === 'available' 
              ? 'No surplus food available at the moment'
              : `No ${activeTab} surplus items`}
          </p>
        </motion.div>
      )}

      {/* Log Surplus Modal */}
      <LogSurplusModal />
    </div>
  );
};

export default SurplusTracker;

