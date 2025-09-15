import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Zap, TreePine, Award, Target, Sparkles, Heart } from 'lucide-react';

const ImpactMeter = () => {
  const impactData = {
    foodSaved: 15.8,
    waterSaved: 2847,
    energySaved: 42.3,
    co2Reduced: 39.5,
    treesEquivalent: 1.8
  };

  const CircularProgress = ({ percentage, color, size = 120 }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-4xl font-bold text-gray-900"
          >
            {percentage}%
          </motion.span>
          <span className="text-sm text-gray-600 font-medium">Goal</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-emerald-200">
      <div className="flex items-center mb-8">
        <motion.div 
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mr-4 shadow-xl"
        >
          <Leaf className="w-8 h-8 text-white" />
        </motion.div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Environmental Impact
          </h2>
          <p className="text-gray-600 text-lg">
            Your positive contribution this month 🌍
          </p>
        </div>
      </div>

      {/* Main Impact Meter */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <CircularProgress 
            percentage={78} 
            color="#10b981" 
            size={180}
          />
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="text-5xl font-bold text-gray-900">78%</div>
            <div className="text-sm text-gray-600 font-semibold">Monthly Goal</div>
            <div className="mt-1 flex items-center text-green-600">
              <Sparkles className="w-4 h-4 mr-1" />
              <span className="text-xs font-bold">Excellent!</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02, x: 5 }}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl border-2 border-green-200 shadow-lg cursor-pointer"
        >
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="p-3 bg-green-500 rounded-2xl mr-4 shadow-lg"
            >
              <Leaf className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <div className="font-bold text-green-900 text-lg">Food Saved</div>
              <div className="text-green-700 text-sm">Meals rescued from waste 🍽️</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-700 flex items-center">
              {impactData.foodSaved}kg
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-2"
              >
                ✨
              </motion.span>
            </div>
            <div className="text-green-600 text-sm flex items-center">
              <Target className="w-4 h-4 mr-1" />
              ↑ 15%
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, x: 5 }}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-100 rounded-2xl border-2 border-blue-200 shadow-lg cursor-pointer"
        >
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -10 }}
              className="p-3 bg-blue-500 rounded-2xl mr-4 shadow-lg"
            >
              <Droplets className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <div className="font-bold text-blue-900 text-lg">Water Saved</div>
              <div className="text-blue-700 text-sm">Liters conserved 💧</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-blue-700 flex items-center">
              {impactData.waterSaved}L
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-2"
              >
                💧
              </motion.span>
            </div>
            <div className="text-blue-600 text-sm flex items-center">
              <Droplets className="w-4 h-4 mr-1" />
              ↑ 22%
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, x: 5 }}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-100 rounded-2xl border-2 border-amber-200 shadow-lg cursor-pointer"
        >
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-3 bg-amber-500 rounded-2xl mr-4 shadow-lg"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <div className="font-bold text-amber-900 text-lg">Energy Saved</div>
              <div className="text-amber-700 text-sm">kWh conserved ⚡</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-amber-700 flex items-center">
              {impactData.energySaved}kWh
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                ⚡
              </motion.span>
            </div>
            <div className="text-amber-600 text-sm flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              ↑ 18%
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, x: 5 }}
          className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-100 rounded-2xl border-2 border-emerald-200 shadow-lg cursor-pointer"
        >
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="p-3 bg-emerald-500 rounded-2xl mr-4 shadow-lg"
            >
              <TreePine className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <div className="font-bold text-emerald-900 text-lg">CO₂ Reduced</div>
              <div className="text-emerald-700 text-sm">≈ {impactData.treesEquivalent} trees planted 🌳</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-emerald-700 flex items-center">
              {impactData.co2Reduced}kg
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="ml-2"
              >
                🌍
              </motion.span>
            </div>
            <div className="text-emerald-600 text-sm flex items-center">
              <TreePine className="w-4 h-4 mr-1" />
              ↑ 25%
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievement Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.02, y: -2 }}
        className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-100 rounded-3xl border-2 border-yellow-200 text-center shadow-xl cursor-pointer"
      >
        <div className="flex items-center justify-center mb-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="mr-3"
          >
            <Award className="w-10 h-10 text-yellow-600" />
          </motion.div>
          <span className="font-bold text-yellow-900 text-2xl">Eco Warrior</span>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="ml-3"
          >
            <Sparkles className="w-8 h-8 text-yellow-500" />
          </motion.div>
        </div>
        <p className="text-yellow-700 font-semibold text-lg mb-3">
          You're in the top 15% of sustainable food consumers! 🌟
        </p>
        <div className="flex items-center justify-center space-x-2 mb-3">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-3 h-3 bg-yellow-500 rounded-full"
            />
          ))}
          <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-800">🏆</div>
            <div className="text-yellow-600 text-xs">Champion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-800">🌱</div>
            <div className="text-yellow-600 text-xs">Eco Hero</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-800">💚</div>
            <div className="text-yellow-600 text-xs">Planet Lover</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImpactMeter;

