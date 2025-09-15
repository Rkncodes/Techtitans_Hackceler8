import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  TrendingUp, 
  Calendar,
  Award,
  Clock
} from 'lucide-react';

import DashboardStats from '../components/dashboard/DashboardStats';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const role = user?.role || 'student';
  const [stats] = useState({
    mealsBooked: 42,
    wasteReduced: 15.8,
    ngosServed: 5,
    pendingNgoRequests: 2
  });

  const [todaySchedule] = useState([
    { 
      meal: 'Breakfast', 
      time: '7:00 - 9:00 AM', 
      status: 'completed', 
      booked: true
    },
    { 
      meal: 'Lunch', 
      time: '12:00 - 2:00 PM', 
      status: 'booked', 
      booked: true
    },
    { 
      meal: 'Snacks', 
      time: '4:00 - 6:00 PM', 
      status: 'available', 
      booked: false
    },
    { 
      meal: 'Dinner', 
      time: '7:00 - 9:00 PM', 
      status: 'available', 
      booked: false
    },
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const upcomingMeals = todaySchedule.filter(m => m.status !== 'completed').slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-gray-900 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">
              {role === 'student' && `Welcome back, ${user?.name?.split(' ')[0] || 'Student'}`}
              {role === 'mess_staff' && `Mess Staff Dashboard`}
              {role === 'ngo' && `NGO Dashboard`}
            </h1>
            <p className="text-gray-700">
              {role === 'student' && (<span>You've helped reduce <span className="font-semibold">{stats.wasteReduced}kg</span> of food waste this month.</span>)}
              {role === 'mess_staff' && `Monitor bookings, manage surplus, and coordinate pickups.`}
              {role === 'ngo' && `Track available surplus and coordinate campus pickups.`}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-stone-50 rounded-xl p-3 border border-gray-200 text-sm text-gray-700">
              <div className="flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-700 mr-2" />
                Community-focused initiative
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats (role-aware) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {role === 'student' && (
          <>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Meals Booked" value={stats.mealsBooked} change="" icon={<Utensils className="w-8 h-8 text-emerald-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Waste Reduced" value={`${stats.wasteReduced}kg`} change="" icon={<TrendingUp className="w-8 h-8 text-emerald-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardStats title="NGOs Supported" value={stats.ngosServed} change="" icon={<Calendar className="w-8 h-8 text-emerald-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Pending NGO Requests" value={stats.pendingNgoRequests} change="" icon={<Calendar className="w-8 h-8 text-amber-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
          </>
        )}
        {role === 'mess_staff' && (
          <>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Today Bookings" value={128} change="" icon={<Utensils className="w-8 h-8 text-emerald-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Surplus Logged" value={`12.4kg`} change="" icon={<TrendingUp className="w-8 h-8 text-emerald-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Pickup Requests" value={3} change="" icon={<Calendar className="w-8 h-8 text-amber-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Active NGOs" value={6} change="" icon={<Calendar className="w-8 h-8 text-emerald-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
          </>
        )}
        {role === 'ngo' && (
          <>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Available Surplus" value={`18.7kg`} change="" icon={<TrendingUp className="w-8 h-8 text-emerald-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Pending Pickups" value={2} change="" icon={<Calendar className="w-8 h-8 text-amber-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Completed This Week" value={7} change="" icon={<Utensils className="w-8 h-8 text-emerald-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DashboardStats title="Campuses Connected" value={3} change="" icon={<Calendar className="w-8 h-8 text-emerald-700" />} bgColor="bg-stone-50" borderColor="border-gray-200" />
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Role-specific main content */}
      {role === 'student' && (
        <>
          {/* Full-width: Today's Schedule and Upcoming Meals side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 text-emerald-700 mr-2" />
                  <h2 className="text-2xl font-semibold text-gray-900">Today's Schedule</h2>
                </div>
                <span className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {todaySchedule.map((meal) => (
                  <div key={meal.meal} className={`p-4 rounded-xl border bg-white ${meal.status === 'completed' ? 'border-emerald-200' : meal.status === 'booked' ? 'border-blue-200' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{meal.meal}</h3>
                      <div className={`w-3 h-3 rounded-full ${meal.status === 'completed' ? 'bg-emerald-600' : meal.status === 'booked' ? 'bg-blue-600' : 'bg-gray-400'}`} />
                    </div>
                    <div className="flex items-center text-gray-700 mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-medium">{meal.time}</span>
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${meal.status === 'completed' ? 'text-emerald-800 bg-emerald-100' : meal.status === 'booked' ? 'text-blue-800 bg-blue-100' : 'text-gray-700 bg-gray-100'}`}>
                      {meal.status === 'completed' && 'Completed'}
                      {meal.status === 'booked' && 'Booked'}
                      {meal.status === 'available' && 'Available'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Meals */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Calendar className="w-6 h-6 text-emerald-700 mr-2" />
                  <h2 className="text-2xl font-semibold text-gray-900">Upcoming Meals</h2>
                </div>
                <span className="text-sm text-gray-600 font-medium">Today</span>
              </div>
              <div className="space-y-4">
                {upcomingMeals.map((meal) => (
                  <div key={meal.meal} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white">
                    <div>
                      <div className="font-medium text-gray-900">{meal.meal}</div>
                      <div className="text-gray-600 text-sm flex items-center"><Clock className="w-3 h-3 mr-1" />{meal.time}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${meal.booked ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-stone-50 text-gray-700 border border-gray-200'}`}>
                      {meal.booked ? 'Booked' : 'Available'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Supporting content below */}
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <RecentActivity />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        </>
      )}

      {role === 'mess_staff' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Surplus Overview</h2>
              <p className="text-gray-600 text-sm">Log surplus quickly in Surplus Tracker and monitor pickup requests.</p>
            </div>
            <QuickActions />
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <RecentActivity />
            </div>
          </div>
        </div>
      )}

      {role === 'ngo' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Surplus Near You</h2>
              <p className="text-gray-600 text-sm">Use Surplus Tracker to claim items and coordinate pickups with mess staff.</p>
            </div>
            <QuickActions />
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <RecentActivity />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;



