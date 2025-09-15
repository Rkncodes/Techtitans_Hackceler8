import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const DashboardStats = ({ title, value, change, icon, bgColor, borderColor }) => {
  const isPositive = change && change.startsWith('+');
  
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      className={`${bgColor} rounded-3xl p-6 shadow-xl border-2 ${borderColor} backdrop-blur-sm cursor-pointer transition-all duration-300 hover:shadow-2xl relative overflow-hidden`}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"
        animate={{ 
          background: [
            'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)',
            'linear-gradient(135deg, rgba(255,255,255,0.2), transparent)',
            'linear-gradient(135deg, rgba(255,255,255,0.1), transparent)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="p-4 bg-white/80 rounded-2xl shadow-lg backdrop-blur-sm"
          >
            {icon}
          </motion.div>
          {change && (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className={`text-sm font-bold px-3 py-2 rounded-full shadow-md flex items-center ${
                isPositive 
                  ? 'text-green-700 bg-green-100/90 border-2 border-green-200' 
                  : 'text-red-700 bg-red-100/90 border-2 border-red-200'
              }`}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {change}
            </motion.div>
          )}
        </div>
        
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 mb-2"
          >
            {value}
          </motion.h3>
          <p className="text-gray-700 font-semibold text-lg">
            {title}
          </p>
        </div>
        
        {/* Progress Animation */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          className="h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent mt-4 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default DashboardStats;

