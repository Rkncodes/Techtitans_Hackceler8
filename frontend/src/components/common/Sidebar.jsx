import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  Package,
  Trophy,
  User,
  BarChart3,
  Settings,
  HelpCircle,
  Leaf,
  Calendar,
  Users,
  Sparkles,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      name: 'Book Meals',
      path: '/book-meals',
      icon: Utensils,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Surplus Tracker',
      path: '/surplus',
      icon: Package,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      name: 'Leaderboard',
      path: '/leaderboard',
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      gradient: 'from-gray-500 to-slate-600'
    }
  ];

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/95 backdrop-blur-md border-r-2 border-emerald-200 shadow-2xl z-40 overflow-y-auto"
    >
      <div className="p-6">
        
        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 mb-8 border border-emerald-100 shadow"
        >
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
            >
              {user?.name?.charAt(0) || 'U'}
            </motion.div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                {user?.name || 'User'}
              </h3>
              <p className="text-emerald-700 text-sm font-medium capitalize">
                {user?.role || 'Student'}
              </p>
              <p className="text-gray-600 text-sm">{user?.hostel}</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-xl`
                        : 'text-gray-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 hover:shadow-md'
                    }`
                  }
                >
                  <div className={`p-2 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-white/20' : `${item.bgColor} group-hover:scale-110`
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} />
                  </div>
                  <span className="font-semibold">{item.name}</span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-3 w-2 h-2 bg-white rounded-full"
                    />
                  )}

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </NavLink>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="mt-8 pt-6 border-t-2 border-emerald-200">
          <nav className="space-y-2">
            {[
              { name: 'Settings', path: '/settings', icon: Settings },
              { name: 'Help & Support', path: '/help', icon: HelpCircle }
            ].map((item, index) => {
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </NavLink>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

