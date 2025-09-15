import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  User, 
  Search, 
  Settings,
  LogOut,
  Award
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      title: 'New surplus food available',
      message: '5kg rice available at A-Block mess',
      time: '5 minutes ago',
      type: 'surplus',
      unread: true,
      emoji: '📦'
    },
    {
      id: 3,
      title: 'Meal reminder',
      message: 'Don\'t forget your dinner booking at 7 PM',
      time: '2 hours ago',
      type: 'reminder',
      unread: false,
      emoji: '🔔'
    }
  ]);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      {/* Prominent SRM banner */}
      <div className="w-full bg-stone-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="p-1 rounded-md border border-gray-200 bg-white">
                <img src="/srm-logo.png" alt="SRM Institute of Science and Technology" className="h-10 w-auto" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-800">SRM Institute of Science and Technology</h1>
                <p className="text-xs text-gray-600">An SRM Student Initiative</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
                />
              </div>
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-300"
                >
                  <Bell className="w-5 h-5 text-emerald-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -6 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                        <p className="text-xs text-gray-500">{unreadCount} unread</p>
                      </div>
                      <div className="space-y-1">
                        {notifications.map((n) => (
                          <div key={n.id} className={`px-4 py-3 ${n.unread ? 'bg-stone-50' : ''}`}>
                            <div className="text-sm font-medium text-gray-800">{n.title}</div>
                            <div className="text-sm text-gray-600">{n.message}</div>
                            <div className="text-xs text-gray-400 mt-1">{n.time}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile Menu */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 p-2 bg-white rounded-md hover:bg-gray-50 transition-colors border border-gray-300"
                >
                  <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="text-left hidden md:block">
                    <p className="font-semibold text-gray-900 text-sm">{user?.name || 'User'}</p>
                    <p className="text-xs text-gray-600 capitalize flex items-center">
                      <Award className="w-3 h-3 mr-1" />
                      {user?.role || 'Student'}
                    </p>
                  </div>
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98, y: -6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -6 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-600">{user?.email}</p>
                      </div>
                      <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4 mr-3 text-emerald-700" />
                        Profile Settings
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50">
                        <Settings className="w-4 h-4 mr-3 text-emerald-700" />
                        Preferences
                      </button>
                      <hr className="my-2" />
                      <button onClick={logout} className="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

