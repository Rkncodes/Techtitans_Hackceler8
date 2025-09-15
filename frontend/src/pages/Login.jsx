import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Welcome back! 🌱');
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-200 to-green-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-xl animate-pulse-green"
            >
              <Leaf className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2 text-emerald-500" />
            Sign in to your Smart Food Management account
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/50"
        >
          
          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-12 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center text-lg disabled:opacity-70"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Sign In
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </motion.button>

          {/* Demo Accounts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200"
          >
            <p className="text-sm text-gray-700 font-semibold mb-4 text-center flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-500" />
              Demo Accounts:
            </p>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between p-2 bg-white/70 rounded-lg">
                <span className="flex items-center">
                  <span className="text-lg mr-2">👨‍🎓</span>
                  Student:
                </span>
                <code className="bg-white px-2 py-1 rounded text-xs text-emerald-700">student@srm.edu.in</code>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/70 rounded-lg">
                <span className="flex items-center">
                  <span className="text-lg mr-2">🍳</span>
                  Mess Staff:
                </span>
                <code className="bg-white px-2 py-1 rounded text-xs text-emerald-700">mess@srm.edu.in</code>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/70 rounded-lg">
                <span className="flex items-center">
                  <span className="text-lg mr-2">🏢</span>
                  NGO:
                </span>
                <code className="bg-white px-2 py-1 rounded text-xs text-emerald-700">ngo@green.org</code>
              </div>
              <div className="text-center">
                <p className="text-xs text-emerald-600 mt-3 font-semibold">
                  🔑 Password for all: <code className="bg-white px-2 py-1 rounded">demo123</code>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.form>

        {/* Register Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

