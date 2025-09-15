import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown,
  Leaf,
  TrendingUp,
  Users,
  Star,
  Flame,
  Target,
  Gift,
  Calendar,
  Check
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Leaderboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('weekly');
  const [category, setCategory] = useState('overall');

  const leaderboardData = {
    weekly: [
      { id: 1, name: 'Priya Sharma', hostel: 'Shenbagam Girls Mess', credits: 450, rank: 1, avatar: 'PS', wasteReduced: 3.2, badges: ['🏆', '🌟', '🔥'] },
      { id: 2, name: 'Rahul Kumar', hostel: 'Sannasi Boys Mess', credits: 420, rank: 2, avatar: 'RK', wasteReduced: 2.8, badges: ['🥈', '⚡'] },
      { id: 3, name: 'Sneha Reddy', hostel: 'Meenakshi Girls Mess', credits: 380, rank: 3, avatar: 'SR', wasteReduced: 2.5, badges: ['🥉', '🌱'] },
      { id: 4, name: 'Amit Patel', hostel: 'JMESS Boys', credits: 350, rank: 4, avatar: 'AP', wasteReduced: 2.2, badges: ['⭐'] },
      { id: 5, name: 'Karthik Raj', hostel: 'DMESS Boys', credits: 320, rank: 5, avatar: 'KR', wasteReduced: 2.0, badges: ['🌿'] },
      { id: 6, name: 'Anita Singh', hostel: 'Kopperundevi M-Block Girls Mess', credits: 300, rank: 6, avatar: 'AS', wasteReduced: 1.9, badges: ['💚'] },
      { id: 7, name: 'Vikram Gupta', hostel: 'Sannasi Boys Mess', credits: 280, rank: 7, avatar: 'VG', wasteReduced: 1.7, badges: ['🎯'] },
      { id: 8, name: 'Deepika Nair', hostel: 'Shenbagam Girls Mess', credits: 260, rank: 8, avatar: 'DN', wasteReduced: 1.5, badges: ['✨'] },
      { id: 9, name: 'Suresh Menon', hostel: 'JMESS Boys', credits: 240, rank: 9, avatar: 'SM', wasteReduced: 1.4, badges: ['🌟'] },
      { id: 10, name: 'Ravi Sharma', hostel: 'DMESS Boys', credits: 220, rank: 10, avatar: 'RS', wasteReduced: 1.2, badges: ['🏅'] },
      { id: 12, name: user?.name || 'You', hostel: user?.hostel || 'Shenbagam Girls Mess', credits: 580, rank: 12, avatar: user?.name?.charAt(0) || 'Y', wasteReduced: 2.1, badges: ['🌱', '⚡'], isCurrentUser: true }
    ]
  };

  const achievements = [
    { 
      id: 1, 
      title: 'Eco Warrior', 
      description: 'Saved 10kg+ food waste', 
      icon: '🛡️', 
      unlocked: true,
      progress: 100,
      color: 'from-success-400 to-success-500'
    },
    { 
      id: 2, 
      title: 'Streak Master', 
      description: '7-day booking streak', 
      icon: '🔥', 
      unlocked: true,
      progress: 100,
      color: 'from-orange-400 to-orange-500'
    },
    { 
      id: 3, 
      title: 'Green Champion', 
      description: '500+ green credits', 
      icon: '🏆', 
      unlocked: true,
      progress: 100,
      color: 'from-primary-400 to-primary-500'
    },
    { 
      id: 4, 
      title: 'Food Saver', 
      description: 'Attend 50 meals', 
      icon: '🍽️', 
      unlocked: false,
      progress: 84,
      color: 'from-accent-400 to-accent-500'
    },
    { 
      id: 5, 
      title: 'Community Hero', 
      description: 'Help 5 surplus redistributions', 
      icon: '🤝', 
      unlocked: false,
      progress: 60,
      color: 'from-blue-400 to-blue-500'
    },
    { 
      id: 6, 
      title: 'Consistency King', 
      description: '30-day active streak', 
      icon: '👑', 
      unlocked: false,
      progress: 40,
      color: 'from-purple-400 to-purple-500'
    }
  ];

  const tabs = [
    { id: 'weekly', label: 'This Week', icon: Calendar },
    { id: 'monthly', label: 'This Month', icon: Trophy },
    { id: 'alltime', label: 'All Time', icon: Crown }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-yellow-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">•</span>;
    }
  };

  const getRankColor = (rank, isCurrentUser = false) => {
    if (isCurrentUser) return 'bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-300';
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300';
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  const currentData = leaderboardData[activeTab] || leaderboardData.weekly;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 font-heading mb-2">
          🏆 Leaderboard
        </h1>
        <p className="text-gray-600 text-lg">
          Compete with fellow eco-warriors and climb the sustainability rankings
        </p>
      </motion.div>

      {/* User's Current Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Star className="w-6 h-6 mr-3 text-yellow-300" />
            Your Performance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">Weekly</div>
              <div className="text-primary-200 font-semibold">Category</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 mb-1">2.1kg</div>
              <div className="text-primary-200 font-semibold">Waste Reduced</div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <Trophy className="w-full h-full transform rotate-12" />
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm flex items-center transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center items-end space-x-4 mb-8"
      >
        {/* Second Place */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 mb-4 border-2 border-gray-300 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              {currentData[1]?.avatar}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{currentData[1]?.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{currentData[1]?.hostel}</p>
            <div className="text-2xl font-bold text-gray-700">{currentData[1]?.credits}</div>
            <div className="text-gray-500 text-sm">credits</div>
          </div>
          <div className="h-20 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg flex items-center justify-center">
            <Medal className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* First Place */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 mb-4 border-2 border-yellow-400 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 relative">
              {currentData[0]?.avatar}
              <Crown className="w-6 h-6 absolute -top-2 -right-1 text-yellow-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{currentData[0]?.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{currentData[0]?.hostel}</p>
            <div className="text-3xl font-bold text-yellow-700">{currentData[0]?.credits}</div>
            <div className="text-yellow-600 text-sm font-semibold">credits</div>
            <div className="flex justify-center mt-2 space-x-1">
              {currentData[0]?.badges.map((badge, i) => (
                <span key={i} className="text-lg">{badge}</span>
              ))}
            </div>
          </div>
          <div className="h-28 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Third Place */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 mb-4 border-2 border-orange-300 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
              {currentData[2]?.avatar}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{currentData[2]?.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{currentData[2]?.hostel}</p>
            <div className="text-2xl font-bold text-orange-700">{currentData[2]?.credits}</div>
            <div className="text-orange-600 text-sm">credits</div>
          </div>
          <div className="h-16 bg-gradient-to-t from-orange-300 to-orange-400 rounded-t-lg flex items-center justify-center">
            <Award className="w-7 h-7 text-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 font-heading flex items-center">
            <Users className="w-6 h-6 text-primary-600 mr-3" />
            Full Rankings
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {currentData.map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${getRankColor(participant.rank, participant.isCurrentUser)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(participant.rank)}
                  </div>

                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                    participant.isCurrentUser 
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600' 
                      : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }`}>
                    {participant.avatar}
                  </div>

                  {/* User Info */}
                  <div>
                    <h3 className={`font-bold ${participant.isCurrentUser ? 'text-primary-900' : 'text-gray-900'}`}>
                      {participant.name}
                      {participant.isCurrentUser && <span className="ml-2 text-primary-600">(You)</span>}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{participant.hostel}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-right">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{participant.credits}</div>
                    <div className="text-gray-600 text-sm">Credits</div>
                  </div>
                  
                  <div>
                    <div className="font-bold text-gray-900">{participant.wasteReduced}kg</div>
                    <div className="text-gray-600 text-sm">Reduced</div>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex space-x-1">
                    {participant.badges.map((badge, i) => (
                      <span key={i} className="text-lg">{badge}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-900 font-heading mb-6 flex items-center">
          <Gift className="w-6 h-6 text-accent-600 mr-3" />
          Your Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-success-50 to-success-100 border-success-200 shadow-sm'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-4xl p-3 rounded-xl ${
                  achievement.unlocked ? 'bg-white/70' : 'bg-gray-200 grayscale'
                }`}>
                  {achievement.icon}
                </div>
                
                {achievement.unlocked && (
                  <div className="bg-success-500 text-white p-1 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              <h3 className={`font-bold text-lg mb-2 ${
                achievement.unlocked ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {achievement.title}
              </h3>
              
              <p className={`text-sm mb-4 ${
                achievement.unlocked ? 'text-gray-700' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>

              {!achievement.unlocked && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-800">{achievement.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${achievement.progress}%` }}
                      transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                      className={`bg-gradient-to-r ${achievement.color} h-2 rounded-full`}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
