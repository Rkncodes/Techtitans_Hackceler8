import React from 'react';
import { useAuth } from '../hooks/useAuth';
import StudentDashboard from './dashboards/StudentDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import NGODashboard from './dashboards/NGODashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'mess_staff':
      return <StaffDashboard />;
    case 'ngo':
      return <NGODashboard />;
    default:
      return <StudentDashboard />;
  }
};

export default Dashboard;



