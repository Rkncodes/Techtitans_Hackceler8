import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, 
  Clock, 
  Users, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  MapPin,
  Star,
  Heart,
  Leaf,
  QrCode,
  Plus,
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const MealBooking = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookedMeals, setBookedMeals] = useState(['lunch']);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const meals = [
    {
      id: 'breakfast',
      name: 'Breakfast',
      time: '7:00 - 9:00 AM',
      location: 'A-Block Mess Hall',
      capacity: 150,
      booked: 87,
      menu: ['Idli Sambar', 'Upma', 'Poha', 'Coffee/Tea', 'Fruits'],
      price: 45,
      credits: 15,
      emoji: '🌅',
      color: 'from-orange-400 to-amber-500',
      bgColor: 'from-orange-50 to-amber-100',
      borderColor: 'border-orange-200'
    },
    {
      id: 'lunch',
      name: 'Lunch',
      time: '12:00 - 2:00 PM',
      location: 'A-Block Mess Hall',
      capacity: 200,
      booked: 156,
      menu: ['Rice', 'Dal', 'Vegetable Curry', 'Chapati', 'Salad', 'Buttermilk'],
      price: 65,
      credits: 25,
      emoji: '🍽️',
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-100',
      borderColor: 'border-emerald-200'
    },
    {
      id: 'snacks',
      name: 'Evening Snacks',
      time: '4:00 - 6:00 PM',
      location: 'A-Block Mess Hall',
      capacity: 100,
      booked: 45,
      menu: ['Samosa', 'Bhel Puri', 'Tea/Coffee', 'Biscuits'],
      price: 25,
      credits: 10,
      emoji: '☕',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-100',
      borderColor: 'border-blue-200'
    },
    {
      id: 'dinner',
      name: 'Dinner',
      time: '7:00 - 9:00 PM',
      location: 'A-Block Mess Hall',
      capacity: 180,
      booked: 123,
      menu: ['Rice/Chapati', 'Dal', 'Vegetable', 'Curry', 'Raita', 'Sweet'],
      price: 55,
      credits: 20,
      emoji: '🌙',
      color: 'from-purple-400 to-violet-500',
      bgColor: 'from-purple-50 to-violet-100',
      borderColor: 'border-purple-200'
    }
  ];

  const handleBookMeal = (mealId) => {
    if (bookedMeals.includes(mealId)) {
      setBookedMeals(bookedMeals.filter(id => id !== mealId));
      toast.success('Meal booking cancelled! 🚫');
    } else {
      setBookedMeals([...bookedMeals, mealId]);
      toast.success('Meal booked successfully! 🎉');
    }
  };

  const showQR = (meal) => {
    setSelectedMeal(meal);
    setShowQRCode(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mr-3"
          >
            🍽️
          </motion.span>
          Meal Booking
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="ml-3"
          >
            ✨
          </motion.span>
        </h1>
        <p className="text-gray-600 text-xl">
          Book your meals in advance to reduce food waste and earn green credits!
        </p>
      </motion.div>

      {/* Date Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-emerald-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="w-8 h-8 text-emerald-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Select Date</h2>
              <p className="text-gray-600">Choose when you want to dine</p>
            </div>
          </div>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            className="px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-lg font-semibold"
          />
        </div>
      </motion.div>

      {/* Meals Grid */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {meals.map((meal, index) => {
          const isBooked = bookedMeals.includes(meal.id);
          const occupancyPercentage = (meal.booked / meal.capacity) * 100;
          const isAlmostFull = occupancyPercentage > 80;
          
          return (
            <motion.div
              key={meal.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-gradient-to-br ${meal.bgColor} rounded-3xl p-8 border-2 ${meal.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <Utensils className="w-full h-full transform rotate-12" />
              </div>

              <div className="relative z-10">
                {/* Meal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`p-4 bg-gradient-to-br ${meal.color} rounded-3xl mr-4 shadow-lg`}>
                      <span className="text-3xl">{meal.emoji}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">{meal.name}</h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="font-semibold">{meal.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  {isBooked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500 text-white p-2 rounded-full shadow-lg"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.div>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-700 font-medium">{meal.location}</span>
                </div>

                {/* Capacity */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-semibold flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Capacity
                    </span>
                    <span className={`font-bold ${isAlmostFull ? 'text-red-600' : 'text-green-600'}`}>
                      {meal.booked}/{meal.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${occupancyPercentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-3 rounded-full ${
                        isAlmostFull ? 'bg-gradient-to-r from-red-400 to-red-600' : 'bg-gradient-to-r from-green-400 to-green-600'
                      }`}
                    />
                  </div>
                  {isAlmostFull && (
                    <div className="flex items-center mt-2 text-red-600 text-sm font-medium">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Almost full! Book quickly
                    </div>
                  )}
                </div>

                {/* Menu */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Today's Menu
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {meal.menu.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="bg-white/60 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 border border-white/50"
                      >
                        • {item}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Price & Credits */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">₹{meal.price}</div>
                    <div className="text-gray-600 text-sm">Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                      +{meal.credits}
                      <Leaf className="w-5 h-5 ml-1" />
                    </div>
                    <div className="text-gray-600 text-sm">Green Credits</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBookMeal(meal.id)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 shadow-lg ${
                      isBooked
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : `bg-gradient-to-r ${meal.color} hover:opacity-90 text-white`
                    }`}
                  >
                    {isBooked ? (
                      <span className="flex items-center justify-center">
                        Cancel Booking
                        <CheckCircle className="w-5 h-5 ml-2" />
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Book Meal
                        <Plus className="w-5 h-5 ml-2" />
                      </span>
                    )}
                  </motion.button>

                  {isBooked && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => showQR(meal)}
                      className="w-full py-3 px-6 bg-white border-2 border-gray-300 rounded-2xl font-semibold text-gray-700 hover:border-emerald-400 hover:text-emerald-700 transition-all duration-200 flex items-center justify-center"
                    >
                      <QrCode className="w-5 h-5 mr-2" />
                      Show QR Code
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-2 flex items-center">
              <Award className="w-8 h-8 mr-3" />
              Booking Summary
            </h3>
            <p className="text-emerald-100 text-lg">
              You have {bookedMeals.length} meal{bookedMeals.length !== 1 ? 's' : ''} booked for {new Date(selectedDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-yellow-300 mb-2 flex items-center">
              +{bookedMeals.length * 20}
              <Sparkles className="w-8 h-8 ml-2" />
            </div>
            <div className="text-emerald-200 font-semibold">Green Credits</div>
          </div>
        </div>
      </motion.div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRCode && selectedMeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowQRCode(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center">
                <QrCode className="w-6 h-6 mr-2 text-emerald-600" />
                QR Code - {selectedMeal.name}
              </h3>
              
              <div className="bg-gray-100 rounded-2xl p-8 mb-6 text-center">
                <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-gray-200">
                  <div className="text-6xl">📱</div>
                </div>
                <p className="text-gray-600 font-medium">
                  Show this QR code at the mess counter
                </p>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  <strong>Time:</strong> {selectedMeal.time}<br/>
                  <strong>Location:</strong> {selectedMeal.location}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowQRCode(false)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MealBooking;

