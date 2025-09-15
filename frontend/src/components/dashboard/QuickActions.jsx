import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Utensils, 
  Package, 
  Trophy, 
  Calendar,
  Plus,
  ArrowRight,
  Clock,
  Users,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Book Today\'s Meals',
      description: 'Reserve your spot for upcoming meals',
      icon: Utensils,
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-100',
      borderColor: 'border-emerald-200',
      link: '/book-meals',
      badge: '3 Available',
      badgeColor: 'bg-emerald-500',
      emoji: '🍽️'
    },
    {
      title: 'Log Surplus Food',
      description: 'Report extra food for redistribution',
      icon: Package,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
      borderColor: 'border-amber-200',
      link: '/surplus',
      badge: 'Urgent',
      badgeColor: 'bg-orange-500',
      emoji: '📦'
    },
    {
      title: 'View Leaderboard',
      description: 'Check your ranking and achievements',
      icon: Trophy,
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-100',
      borderColor: 'border-purple-200',
      link: '/leaderboard',
      badge: 'Rank #12',
      badgeColor: 'bg-purple-500',
      emoji: '🏆'
    },
    {
      title: 'Today\'s Schedule',
      description: 'See all meal times and bookings',
      icon: Calendar,
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      borderColor: 'border-blue-200',
      link: '/schedule',
      badge: '4 Meals',
      badgeColor: 'bg-blue-500',
      emoji: '📅'
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-emerald-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="mr-3"
            >
              <Sparkles className="w-8 h-8 text-emerald-600" />
            </motion.div>
            Quick Actions
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Fast access to your most-used features ⚡
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-all duration-200 shadow-md"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-2" />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
              className="group"
            >
              <Link
                to={action.link}
                className={`block p-6 rounded-3xl border-2 ${action.bgColor} ${action.borderColor} hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <Icon className="w-full h-full transform rotate-12" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-4 bg-gradient-to-br ${action.color} rounded-2xl text-white shadow-xl`}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>
                    
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 ${action.badgeColor} text-white rounded-full text-sm font-bold shadow-lg flex items-center`}
                    >
                      <span className="text-lg mr-1">{action.emoji}</span>
                      {action.badge}
                    </motion.span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 text-xl mb-3">
                    {action.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700">
                    <Zap className="w-4 h-4 mr-1" />
                    <span>Get Started</span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

