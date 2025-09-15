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
  QrCode,
  Plus,
  ArrowRight
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
      location: 'Shenbagam Girls Mess',
      capacity: 150,
      booked: 87,
      menu: ['Idli & Sambar', 'Medu Vada', 'Upma', 'Poha', 'Masala Dosa', 'Coconut Chutney', 'Filter Coffee/Tea', 'Seasonal Fruits']
    },
    {
      id: 'lunch',
      name: 'Lunch',
      time: '12:00 - 2:00 PM',
      location: 'Kopperundevi M-Block Girls Mess',
      capacity: 200,
      booked: 156,
      menu: ['Steamed Rice', 'Dal Tadka', 'Paneer Butter Masala', 'Mix Veg Sabzi', 'Chapati/Phulka', 'Curd & Raita', 'Papad & Pickle', 'Salad']
    },
    {
      id: 'snacks',
      name: 'Evening Snacks',
      time: '4:00 - 6:00 PM',
      location: 'Meenakshi Girls Mess',
      capacity: 100,
      booked: 45,
      menu: ['Samosa', 'Veg Puff', 'Bhel Puri', 'Chaat (Sev/Papdi)', 'Masala Chai/Tea', 'Coffee', 'Biscuits']
    },
    {
      id: 'dinner',
      name: 'Dinner',
      time: '7:00 - 9:00 PM',
      location: 'Sannasi Boys Mess',
      capacity: 180,
      booked: 123,
      menu: ['Jeera Rice', 'Dal Fry', 'Chicken Curry / Chole Masala (veg)', 'Aloo Gobi', 'Chapati', 'Onion Cucumber Salad', 'Raita', 'Gulab Jamun']
    }
  ];

  const handleBookMeal = (mealId) => {
    if (bookedMeals.includes(mealId)) {
      setBookedMeals(bookedMeals.filter(id => id !== mealId));
      toast.success('Meal booking cancelled');
    } else {
      setBookedMeals([...bookedMeals, mealId]);
      toast.success('Meal booked successfully');
    }
  };

  const showQR = (meal) => {
    setSelectedMeal(meal);
    setShowQRCode(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-gray-900 shadow-sm">
        <h1 className="text-3xl font-semibold text-center">Meal Booking</h1>
        <p className="text-gray-600 text-center mt-2">Book meals in advance to reduce waste and ensure availability</p>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-emerald-700" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Select Date</h2>
              <p className="text-gray-600 text-sm">Choose when you want to dine</p>
            </div>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
          />
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meals.map((meal) => {
          const isBooked = bookedMeals.includes(meal.id);
          const occupancyPercentage = Math.round((meal.booked / meal.capacity) * 100);
          const isAlmostFull = occupancyPercentage > 80;

          return (
            <div
              key={meal.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
            >
              {/* Meal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-emerald-700 text-white rounded-lg mr-3">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{meal.name}</h3>
                    <div className="flex items-center text-gray-600 mt-0.5 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{meal.time}</span>
                    </div>
                  </div>
                </div>
                {isBooked && (
                  <div className="bg-emerald-600 text-white p-2 rounded-full">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center mb-4 text-sm">
                <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-gray-700 font-medium">{meal.location}</span>
              </div>

              {/* Capacity */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-700 font-medium flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Capacity
                  </span>
                  <span className={`font-semibold ${isAlmostFull ? 'text-red-600' : 'text-emerald-700'}`}>
                    {meal.booked}/{meal.capacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${isAlmostFull ? 'bg-red-500' : 'bg-emerald-600'}`}
                    style={{ width: `${occupancyPercentage}%` }}
                  />
                </div>
                {isAlmostFull && (
                  <div className="flex items-center mt-2 text-red-600 text-xs font-medium">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Almost full — book soon
                  </div>
                )}
              </div>

              {/* Menu */}
              <div className="mb-5">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                  <Star className="w-4 h-4 mr-2 text-amber-600" />
                  Today's Menu
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {meal.menu.map((item, i) => (
                    <div
                      key={i}
                      className="bg-stone-50 px-3 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-200"
                    >
                      • {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleBookMeal(meal.id)}
                  className={`w-full py-3 px-5 rounded-lg font-semibold transition-colors ${
                    isBooked ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  {isBooked ? 'Cancel Booking' : 'Book Meal'}
                </button>

                {isBooked && (
                  <button
                    onClick={() => showQR(meal)}
                    className="w-full py-3 px-5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:border-emerald-500 hover:text-emerald-800 transition-colors flex items-center justify-center"
                  >
                    <QrCode className="w-5 h-5 mr-2" />
                    Show QR Code
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Booking Summary</h3>
            <p className="text-gray-600 text-sm mt-1">
              {bookedMeals.length} meal{bookedMeals.length !== 1 ? 's' : ''} booked for {new Date(selectedDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <button
              className="inline-flex items-center bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg font-medium"
            >
              Proceed <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

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
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <h3 className="text-lg font-semibold text-center mb-4 flex items-center justify-center">
                <QrCode className="w-5 h-5 mr-2 text-emerald-700" />
                QR Code — {selectedMeal.name}
              </h3>
              
              <div className="bg-gray-100 rounded-xl p-6 mb-4 text-center">
                <div className="w-40 h-40 bg-white rounded-md mx-auto mb-3 flex items-center justify-center border border-gray-200">
                  <div className="text-4xl">📱</div>
                </div>
                <p className="text-gray-600 text-sm">
                  Show this QR code at the mess counter
                </p>
              </div>

              <div className="text-center text-sm text-gray-700 mb-4">
                <strong>Time:</strong> {selectedMeal.time}<br/>
                <strong>Location:</strong> {selectedMeal.location}
              </div>
              
              <button
                onClick={() => setShowQRCode(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-lg font-medium w-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MealBooking;

