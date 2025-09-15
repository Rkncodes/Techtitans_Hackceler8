import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Utensils, 
  Package, 
  Trophy, 
  Calendar,
  ArrowRight,
  Zap
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Book Today\'s Meals',
      description: 'Reserve your spot for upcoming meals',
      icon: Utensils,
      color: 'from-emerald-700 to-emerald-800',
      bgColor: 'bg-stone-50',
      borderColor: 'border-gray-200',
      link: '/book-meals',
      badge: '3 Available',
      badgeColor: 'bg-emerald-700'
    },
    {
      title: 'Log Surplus Food',
      description: 'Report extra food for redistribution',
      icon: Package,
      color: 'from-amber-700 to-amber-800',
      bgColor: 'bg-stone-50',
      borderColor: 'border-gray-200',
      link: '/surplus',
      badge: 'Urgent',
      badgeColor: 'bg-amber-700'
    },
    {
      title: 'View Leaderboard',
      description: 'Check your ranking and achievements',
      icon: Trophy,
      color: 'from-stone-700 to-stone-800',
      bgColor: 'bg-stone-50',
      borderColor: 'border-gray-200',
      link: '/leaderboard',
      badge: 'Live',
      badgeColor: 'bg-stone-700'
    },
    {
      title: 'Today\'s Schedule',
      description: 'See all meal times and bookings',
      icon: Calendar,
      color: 'from-blue-700 to-blue-800',
      bgColor: 'bg-stone-50',
      borderColor: 'border-gray-200',
      link: '/schedule',
      badge: '4 Meals',
      badgeColor: 'bg-blue-700'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-gray-600 mt-1 text-sm">
            Fast access to core features
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <Link
                to={action.link}
                className={`block p-6 rounded-xl border ${action.bgColor} ${action.borderColor} hover:shadow-md transition-all duration-200 relative overflow-hidden`}
              >
                {/* Accent strip */}
                <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${action.color}`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${action.color} rounded-lg text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2 py-0.5 ${action.badgeColor} text-white rounded-full text-xs font-medium`}
                    >
                      {action.badge}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">
                    {action.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {action.description}
                  </p>
                  
                  <div className="flex items-center text-emerald-800 font-medium">
                    <Zap className="w-4 h-4 mr-1" />
                    <span>Get Started</span>
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

