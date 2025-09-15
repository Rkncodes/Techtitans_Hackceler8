import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Package, 
  Utensils,
  Gift,
  TrendingUp,
  Users,
  Sparkles,
  Award,
  Zap
} from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'booking',
      title: 'Meal Booked',
      description: 'Dinner booked for today at 7:00 PM',
      time: '2 minutes ago',
      icon: Utensils,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-gradient-to-br from-emerald-100 to-teal-100',
      status: 'completed',
      emoji: '🍽️'
    },
    {
      id: 2,
      type: 'credits',
      title: 'Green Credits Earned',
      description: '+25 credits for attending lunch',
      time: '1 hour ago',
      icon: Gift,
      iconColor: 'text-green-600',
      iconBg: 'bg-gradient-to-br from-green-100 to-emerald-100',
      status: 'success',
      emoji: '🌱'
    },
    {
      id: 3,
      type: 'surplus',
      title: 'Surplus Food Available',
      description: 'NGO claimed 3kg rice from B-Block',
      time: '2 hours ago',
      icon: Package,
      iconColor: 'text-amber-600',
      iconBg: 'bg-gradient-to-br from-amber-100 to-orange-100',
      status: 'info',
      emoji: '📦'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Rank Updated',
      description: 'Moved up 2 positions to #12',
      time: '3 hours ago',
      icon: TrendingUp,
      iconColor: 'text-purple-600',
      iconBg: 'bg-gradient-to-br from-purple-100 to-violet-100',
      status: 'success',
      emoji: '🚀'
    },
    {
      id: 5,
      type: 'social',
      title: 'New Milestone',
      description: '100 meals booked this semester!',
      time: '5 hours ago',
      icon: Users,
      iconColor: 'text-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-100 to-indigo-100',
      status: 'milestone',
      emoji: '🎉'
    }
  ];

  const getStatusIndicator = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'info':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-emerald-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Clock className="w-8 h-8 text-blue-600 mr-3" />
            Recent Activity
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Your latest actions and updates 📊
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-all duration-200 shadow-md"
        >
          View All
        </motion.button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-emerald-200 shadow-sm hover:shadow-lg"
            >
              {/* Icon */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`p-3 ${activity.iconBg} rounded-2xl flex-shrink-0 shadow-lg border border-white/50`}
              >
                <Icon className={`w-6 h-6 ${activity.iconColor}`} />
              </motion.div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center">
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="text-2xl mr-2"
                    >
                      {activity.emoji}
                    </motion.span>
                    {activity.title}
                  </h3>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    {getStatusIndicator(activity.status)}
                  </motion.div>
                </div>
                
                <p className="text-gray-600 mb-3 leading-relaxed">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {activity.time}
                  </span>
                  
                  {/* Activity Type Badge */}
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                      activity.type === 'booking' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                      activity.type === 'credits' ? 'bg-green-100 text-green-700 border border-green-200' :
                      activity.type === 'surplus' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      activity.type === 'achievement' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                      'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {activity.type}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-100 rounded-3xl border-2 border-emerald-200 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="mr-3"
            >
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </motion.div>
            <span className="text-gray-700 font-semibold text-lg">Today's Activity 🎯</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-700 font-semibold">5 Actions</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="text-gray-700 font-semibold">+65 Credits</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-gray-700 font-semibold">Top 15%</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RecentActivity;
