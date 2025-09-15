import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Calendar, BarChart3, Activity, Target, Award, Leaf, TrendingUp } from 'lucide-react';

const WasteChart = () => {
  const [chartType, setChartType] = useState('bar');
  
  const data = [
    { name: 'Mon', reduced: 2.4, saved: 1.8, target: 3.0 },
    { name: 'Tue', reduced: 1.8, saved: 2.2, target: 3.0 },
    { name: 'Wed', reduced: 3.2, saved: 2.8, target: 3.0 },
    { name: 'Thu', reduced: 2.1, saved: 1.9, target: 3.0 },
    { name: 'Fri', reduced: 2.8, saved: 2.4, target: 3.0 },
    { name: 'Sat', reduced: 1.5, saved: 1.2, target: 3.0 },
    { name: 'Sun', reduced: 2.6, saved: 2.0, target: 3.0 },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-emerald-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <TrendingDown className="w-8 h-8 text-green-600 mr-3" />
            Waste Reduction Trends
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Your weekly impact on food waste reduction 📈
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType('bar')}
            className={`p-3 rounded-xl transition-all duration-200 ${
              chartType === 'bar' ? 'bg-emerald-100 text-emerald-700 shadow-md border-2 border-emerald-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType('line')}
            className={`p-3 rounded-xl transition-all duration-200 ${
              chartType === 'line' ? 'bg-emerald-100 text-emerald-700 shadow-md border-2 border-emerald-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Activity className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType('area')}
            className={`p-3 rounded-xl transition-all duration-200 ${
              chartType === 'area' ? 'bg-emerald-100 text-emerald-700 shadow-md border-2 border-emerald-300' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Calendar className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Chart Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl border-2 border-green-200 text-center shadow-lg"
        >
          <div className="text-5xl font-bold text-green-700 mb-2 flex items-center justify-center">
            16.4kg
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-2"
            >
              🌱
            </motion.div>
          </div>
          <div className="text-green-600 font-semibold mb-2">Total Reduced</div>
          <div className="flex items-center justify-center">
            <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600 text-sm font-bold">↑ 15%</span>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="p-6 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl border-2 border-blue-200 text-center shadow-lg"
        >
          <div className="text-5xl font-bold text-blue-700 mb-2 flex items-center justify-center">
            14.3kg
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="ml-2"
            >
              ♻️
            </motion.div>
          </div>
          <div className="text-blue-600 font-semibold mb-2">Food Saved</div>
          <div className="flex items-center justify-center">
            <Award className="w-4 h-4 text-blue-600 mr-1" />
            <span className="text-blue-600 text-sm font-bold">↑ 12%</span>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="p-6 bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl border-2 border-amber-200 text-center shadow-lg"
        >
          <div className="text-5xl font-bold text-amber-700 mb-2 flex items-center justify-center">
            78%
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              🎯
            </motion.div>
          </div>
          <div className="text-amber-600 font-semibold mb-2">Target Met</div>
          <div className="flex items-center justify-center">
            <Target className="w-4 h-4 text-amber-600 mr-1" />
            <span className="text-amber-600 text-sm font-bold">↑ 8%</span>
          </div>
        </motion.div>
      </div>

      {/* Beautiful Visual Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-80 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-3xl border-2 border-gray-200 p-6"
      >
        <div className="h-full flex items-end justify-between space-x-2">
          {data.map((day, index) => (
            <div key={day.name} className="flex-1 flex flex-col items-center">
              {/* Bar Chart Visualization */}
              <div className="w-full flex flex-col items-center mb-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.reduced / 3.5) * 100}%` }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="w-8 bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-t-lg mb-1 shadow-lg relative"
                  style={{ minHeight: '10px' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.saved / 3.5) * 100}%` }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                  className="w-6 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg shadow-lg"
                  style={{ minHeight: '8px' }}
                />
              </div>
              
              <span className="text-sm font-bold text-gray-700">{day.name}</span>
              <span className="text-xs text-emerald-600 font-semibold">{day.reduced}kg</span>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded mr-2"></div>
            <span className="text-sm font-semibold text-gray-700">Waste Reduced</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded mr-2"></div>
            <span className="text-sm font-semibold text-gray-700">Food Saved</span>
          </div>
        </div>
      </motion.div>

      {/* Weekly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-100 rounded-2xl border-2 border-emerald-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mr-3"
            >
              <Leaf className="w-6 h-6 text-emerald-600" />
            </motion.div>
            <div>
              <h3 className="font-bold text-emerald-800 text-lg">Weekly Performance 🌟</h3>
              <p className="text-emerald-600 text-sm">You're doing amazing! Keep it up!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald-700 flex items-center">
              📊 A+
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                ⭐
              </motion.div>
            </div>
            <div className="text-emerald-600 text-sm font-semibold">Eco Grade</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WasteChart;



