import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  MapPin, 
  Award, 
  Leaf, 
  Settings,
  Camera,
  Edit3,
  Save,
  X,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@srm.edu.in',
    hostel: user?.hostel || 'A-Block',
    phone: user?.phone || '+91 9876543210',
    bio: 'Passionate about sustainable living and reducing food waste. Love to cook and share meals with friends!'
  });

  const stats = [
    { label: 'Meals Booked', value: 42, icon: Target, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Waste Reduced', value: '15.8kg', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' }
  ];

  const achievements = [
    { title: 'Eco Warrior', description: 'Saved 10kg+ food waste', emoji: '🛡️', unlocked: true },
    { title: 'Food Saver', description: 'Attend 50 meals', emoji: '🍽️', unlocked: false }
  ];

  const handleSave = () => {
    updateUser(profileData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Profile 👤</h1>
        <p className="text-gray-600 text-lg">Manage your account and track your sustainability journey</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card - Left Column */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border-2 border-emerald-200"
          >
            {/* Profile Picture */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-5xl">
                    {profileData.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </motion.button>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-4">{profileData.name}</h2>
              <p className="text-emerald-600 font-semibold capitalize">{user?.role || 'Student'}</p>
              <div className="flex items-center justify-center mt-2 text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{profileData.hostel}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-2">About</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  rows={4}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
              )}
            </div>

            {/* Edit Button */}
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center justify-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center justify-center"
                >
                  <Edit3 className="w-5 h-5 mr-2" />
                  Edit Profile
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Main Content - Right Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`${stat.bg} rounded-2xl p-6 text-center shadow-lg border-2 border-opacity-20`}
                >
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm font-semibold">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border-2 border-emerald-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Settings className="w-6 h-6 text-emerald-600 mr-3" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                ) : (
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900 font-medium">{profileData.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                ) : (
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900 font-medium">{profileData.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hostel</label>
                {isEditing ? (
                  <select
                    value={profileData.hostel}
                    onChange={(e) => setProfileData(prev => ({ ...prev, hostel: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  >
                    <option value="A-Block">A-Block</option>
                    <option value="B-Block">B-Block</option>
                    <option value="C-Block">C-Block</option>
                    <option value="D-Block">D-Block</option>
                  </select>
                ) : (
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900 font-medium">{profileData.hostel}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                ) : (
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-900 font-medium">{profileData.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border-2 border-emerald-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Sparkles className="w-6 h-6 text-amber-600 mr-3" />
              Your Achievements
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-5xl p-3 rounded-xl ${
                      achievement.unlocked ? 'bg-white/70' : 'bg-gray-200 grayscale'
                    }`}>
                      {achievement.emoji}
                    </div>
                    
                    {achievement.unlocked && (
                      <div className="bg-green-500 text-white p-1 rounded-full">
                        <Award className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <h4 className={`font-bold text-lg mb-2 ${
                    achievement.unlocked ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {achievement.title}
                  </h4>
                  
                  <p className={`text-sm ${
                    achievement.unlocked ? 'text-gray-700' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>

                  {!achievement.unlocked && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-800">84%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '84%' }}
                          transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                          className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
