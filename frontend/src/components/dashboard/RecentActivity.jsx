import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock
} from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'booking',
      title: 'Meal Booked',
      description: 'Dinner booked for today at 7:00 PM',
      time: '2 minutes ago'
    },
    {
      id: 3,
      type: 'surplus',
      title: 'Surplus Food Available',
      description: 'NGO claimed 3kg rice from B-Block',
      time: '2 hours ago'
    },
    {
      id: 4,
      type: 'milestone',
      title: 'Milestone Reached',
      description: 'Great progress this week',
      time: '3 hours ago'
    },
    {
      id: 5,
      type: 'update',
      title: 'New Milestone',
      description: '100 meals booked this semester',
      time: '5 hours ago'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <span className="text-xs text-gray-600">Last 24 hours</span>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            whileHover={{ y: -1 }}
            className="flex items-start justify-between p-4 rounded-xl border border-gray-200 bg-stone-50"
          >
            <div>
              <div className="font-medium text-gray-900">{activity.title}</div>
              <div className="text-gray-600 text-sm">{activity.description}</div>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {activity.time}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
