import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import MealBooking from './pages/MealBooking';
import SurplusTracker from './pages/SurplusTracker';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

// Components
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Hooks
import { useAuth } from './hooks/useAuth';

function AppLayout({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex flex-col">
        {children}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-sm text-gray-700">
        <div className="font-medium">© {new Date().getFullYear()} SRM Institute of Science and Technology</div>
        <nav className="flex items-center gap-4">
          <a href="#" className="text-emerald-700 hover:text-emerald-800">Settings</a>
          <a href="#" className="text-emerald-700 hover:text-emerald-800">Help & Support</a>
        </nav>
      </div>
    </footer>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppLayout>
            <Routes>
              {/* Default route to Dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Public Routes */}
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/book-meals" element={
                <ProtectedRoute>
                  <MealBooking />
                </ProtectedRoute>
              } />
              
              <Route path="/surplus" element={
                <ProtectedRoute>
                  <SurplusTracker />
                </ProtectedRoute>
              } />
              
              <Route path="/leaderboard" element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Catch all route - redirect to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppLayout>
          
          {/* Toast Notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#374151',
                fontWeight: '500',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb',
                padding: '12px 16px',
                fontSize: '14px'
              },
              success: {
                style: {
                  background: '#f0fdf4',
                  color: '#15803d',
                  border: '1px solid #bbf7d0'
                },
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#ffffff',
                },
              },
              error: {
                style: {
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca'
                },
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              }
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;






