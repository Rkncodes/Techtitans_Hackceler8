import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Leaf, 
  Mail, 
  Lock, 
  User,
  MapPin,
  ArrowRight, 
  Sparkles,
  Award,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const { register, isAuthenticated, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    // Student
    hostel: '',
    messName: '',
    raNumber: '',
    // Mess Staff
    messId: '',
    shift: '',
    // NGO
    ngoName: '',
    ngoAddress: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const hostels = ['Shenbagam Girls Mess', 'Kopperundevi M-Block Girls Mess', 'Meenakshi Girls Mess', 'Sannasi Boys Mess', 'JMESS Boys', 'DMESS Boys'];
  const messNames = ['Shenbagam Girls Mess', 'Kopperundevi M-Block Girls Mess', 'Meenakshi Girls Mess', 'Sannasi Boys Mess', 'JMESS Boys', 'DMESS Boys'];
  const shifts = ['Morning', 'Afternoon', 'Evening', 'Night'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }

    if (!formData.name.trim()) {
      toast.error('Please enter your full name!');
      return;
    }

    // Role-based validation
    if (formData.role === 'student') {
      if (!formData.hostel || !formData.messName || !formData.raNumber.trim()) {
        toast.error('Please provide Hostel, Mess Name and RA No.');
        return;
      }
    }
    if (formData.role === 'mess_staff') {
      if (!formData.messId.trim() || !formData.shift) {
        toast.error('Please provide Mess ID and Shift for Mess Staff');
        return;
      }
    }
    if (formData.role === 'ngo') {
      if (!formData.ngoName.trim() || !formData.ngoAddress.trim()) {
        toast.error('Please provide NGO Name and Address');
        return;
      }
    }

    setLoading(true);

    try {
      const result = await register(formData);
      
      if (result.success) {
        toast.success('Account created successfully! Welcome to Smart Food Management! 🌱');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Registration error:', error);
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
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-200 to-green-200 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl"
            >
              <Leaf className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            Join Our Mission
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 mr-2 text-emerald-500" />
            Create your Smart Food Management account
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/50"
        >
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
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
                  placeholder="Enter password (min 6 chars)"
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Role
              </label>
              <div className="relative">
                <Award className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-gray-800"
                >
                  <option value="student">Student</option>
                  <option value="mess_staff">Mess Staff</option>
                  <option value="ngo">NGO Representative</option>
                </select>
              </div>
            </div>
          </div>

          {/* Conditional Fields */}
          {formData.role === 'student' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Hostel</label>
                <select
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select Hostel</option>
                  {hostels.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Mess Name</label>
                <select
                  name="messName"
                  value={formData.messName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select Mess</option>
                  {messNames.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">RA Number</label>
                <input
                  type="text"
                  name="raNumber"
                  value={formData.raNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter RA No."
                />
              </div>
            </div>
          )}

          {formData.role === 'mess_staff' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Mess ID</label>
                <input
                  type="text"
                  name="messId"
                  value={formData.messId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter Mess ID"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Shift</label>
                <select
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select Shift</option>
                  {shifts.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {formData.role === 'ngo' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">NGO Name</label>
                <input
                  type="text"
                  name="ngoName"
                  value={formData.ngoName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter NGO Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">NGO Address</label>
                <input
                  type="text"
                  name="ngoAddress"
                  value={formData.ngoAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter full address"
                />
              </div>
            </div>
          )}

          <div className="mb-8">
            <label className="flex items-start">
              <input 
                type="checkbox" 
                required 
                className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 mt-1 mr-3" 
              />
              <span className="text-sm text-gray-600">
                I agree to the <Link to="/terms" className="text-emerald-600 hover:text-emerald-700 font-semibold underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700 font-semibold underline">Privacy Policy</Link>
              </span>
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center justify-center text-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Create Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200"
          >
            <p className="text-sm text-gray-700 font-semibold mb-4 text-center flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-500" />
              What you'll get:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center p-3 bg-white/70 rounded-xl border border-emerald-200">
                <span className="text-2xl mr-3">🌱</span>
                <span className="font-medium">Earn Green Credits</span>
              </div>
              <div className="flex items-center p-3 bg-white/70 rounded-xl border border-emerald-200">
                <span className="text-2xl mr-3">📱</span>
                <span className="font-medium">Smart Meal Booking</span>
              </div>
              <div className="flex items-center p-3 bg-white/70 rounded-xl border border-emerald-200">
                <span className="text-2xl mr-3">🏆</span>
                <span className="font-medium">Compete & Win Rewards</span>
              </div>
            </div>
          </motion.div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;



