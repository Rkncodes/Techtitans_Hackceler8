import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access if allowedRoles is specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <a
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;


