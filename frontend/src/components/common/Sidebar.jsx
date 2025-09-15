import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home,
  Utensils,
  BarChart3,
  Trophy,
  User,
  Package,
  Truck,
  Users,
  Settings,
  LogOut,
  Calendar,
  Leaf,
  Building2
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getNavigationItems = () => {
    const baseItems = [
      { path: '/dashboard', icon: Home, label: 'Dashboard', roles: ['student', 'mess_staff', 'ngo'] },
      { path: '/profile', icon: User, label: 'My Profile', roles: ['student', 'mess_staff', 'ngo'] }
    ];

    const roleSpecificItems = {
      student: [
        { path: '/book-meals', icon: Utensils, label: 'Book Meals' },
        { path: '/schedule', icon: Calendar, label: 'Meal Schedule' },
        { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
      ],
      mess_staff: [
        { path: '/inventory', icon: Package, label: 'Inventory' },
        { path: '/reports', icon: BarChart3, label: 'Reports' },
        { path: '/surplus', icon: Leaf, label: 'Surplus Food' },
      ],
      ngo: [
        { path: '/collections', icon: Truck, label: 'Food Collection' },
        { path: '/beneficiaries', icon: Users, label: 'Beneficiaries' },
        { path: '/impact', icon: BarChart3, label: 'Impact Report' },
      ]
    };

    const items = [
      ...baseItems.filter(item => item.roles.includes(user?.role)),
      ...(roleSpecificItems[user?.role] || [])
    ];

    items.push({ path: '/settings', icon: Settings, label: 'Settings' });
    
    return items;
  };

  const navigationItems = getNavigationItems();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 shadow-sm z-30 overflow-y-auto">
      <div className="p-4">
        
        {/* User Info Card */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm mr-3">
              <span className="text-white font-bold text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 text-sm truncate">{user?.name}</h3>
              <p className="text-blue-600 text-xs font-medium capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
              <div className="flex items-center mt-1">
                <Building2 className="w-3 h-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">
                  {user?.hostelName || user?.workingHostel || user?.ngoName || 'SRM Campus'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
            Navigation
          </div>
          
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                <span>{item.label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-8 bg-blue-300 rounded-r-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Green Credits Display */}
        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-900">Green Credits</p>
                <p className="text-xs text-green-600">Environmental Impact</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-800">{user?.greenCredits || 0}</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;



