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
  CheckCircle,
  Building2,
  IdCard,
  Hash,
  Phone,
  Calendar,
  BookOpen,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const { register, isAuthenticated, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    // Common fields (matching User model)
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'student',
    
    // Student-specific fields (matching User model)
    srmId: '',
    hostelName: '',
    roomNumber: '',
    department: '',
    year: '',
    
    // Staff-specific fields (matching User model)
    staffId: '',
    workingHostel: '',
    designation: '',
    shift: '',
    
    // NGO-specific fields (matching User model)
    ngoName: '',
    ngoRegistrationNumber: '',
    contactPersonName: '',
    ngoType: '',
    serviceAreas: '',
    // Address fields for NGO
    street: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const hostels = ['A-Block', 'B-Block', 'C-Block', 'D-Block', 'E-Block', 'F-Block'];
  const departments = [
    'Computer Science', 
    'Information Technology', 
    'Electronics', 
    'Mechanical', 
    'Civil', 
    'Electrical', 
    'Biotechnology', 
    'Chemical'
  ];
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const designations = [
    'Mess Manager', 
    'Kitchen Head', 
    'Cook', 
    'Helper', 
    'Cleaner', 
    'Supervisor', 
    'Store Keeper'
  ];
  const shifts = ['Morning', 'Evening', 'Full Day', 'Night'];
  const ngoTypes = [
    'Food Distribution', 
    'Hunger Relief', 
    'Community Kitchen', 
    'Food Bank', 
    'Charity Organization', 
    'Welfare Society'
  ];
  const serviceAreas = ['Chennai', 'Kattankulathur', 'Chengalpattu', 'Tambaram', 'Other'];

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

    // Role-specific validation
    if (formData.role === 'student') {
      if (!formData.srmId.startsWith('RA')) {
        toast.error('SRM ID must start with "RA"!');
        return;
      }
      if (!formData.srmId || !formData.hostelName || !formData.roomNumber || !formData.department || !formData.year) {
        toast.error('Please fill all student details!');
        return;
      }
    }

    if (formData.role === 'mess_staff') {
      if (!formData.staffId || !formData.workingHostel || !formData.designation || !formData.shift) {
        toast.error('Please fill all staff details!');
        return;
      }
    }

    if (formData.role === 'ngo') {
      if (!formData.ngoName || !formData.ngoRegistrationNumber || !formData.contactPersonName || !formData.street || !formData.city || !formData.state || !formData.pincode) {
        toast.error('Please fill all NGO details including address!');
        return;
      }
    }

    setLoading(true);

    try {
      // Prepare data for submission (matching User model)
      let submitData = { ...formData };
      
      // Remove confirmPassword as it's not needed for the API
      delete submitData.confirmPassword;
      
      // For NGO, format address properly as per User model
      if (formData.role === 'ngo') {
        submitData.ngoAddress = {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        };
        
        // Remove individual address fields
        delete submitData.street;
        delete submitData.city;
        delete submitData.state;
        delete submitData.pincode;
      }

      const result = await register(submitData);
      
      if (result.success) {
        toast.success('🎉 Account created successfully! Welcome to Smart Food Management!');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center items-center space-x-3 mb-6">
            <img 
              src="/srm-logo.png" 
              alt="SRM Institute" 
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl hidden items-center justify-center shadow-md"
              style={{display: 'none'}}
            >
              <Leaf className="w-6 h-6 text-white" />
            </div>
            
            <div className="text-left">
              <h1 className="text-xl font-bold text-gray-900 font-heading">Smart Food Management</h1>
              <p className="text-sm text-gray-600">SRM Institute of Science & Technology</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 font-heading mb-2">
            Join SRM's Mission
          </h2>
          <p className="text-gray-600">
            Create your account and be part of the sustainable food management initiative
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-8">
            
            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Select Your Role
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === 'student'
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-gray-50 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl mb-2">👨‍🎓</div>
                    <div className="font-semibold text-gray-900">Student</div>
                    <div className="text-xs text-gray-600 mt-1">SRM University Student</div>
                  </div>
                </motion.label>

                <motion.label
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === 'mess_staff'
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-gray-200 bg-gray-50 hover:border-orange-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="mess_staff"
                    checked={formData.role === 'mess_staff'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl mb-2">👨‍🍳</div>
                    <div className="font-semibold text-gray-900">Mess Staff</div>
                    <div className="text-xs text-gray-600 mt-1">Food Service Staff</div>
                  </div>
                </motion.label>

                <motion.label
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.role === 'ngo'
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-gray-50 hover:border-green-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="ngo"
                    checked={formData.role === 'ngo'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏢</div>
                    <div className="font-semibold text-gray-900">NGO Partner</div>
                    <div className="text-xs text-gray-600 mt-1">NGO Representative</div>
                  </div>
                </motion.label>
              </div>
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter password (min 6 chars)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Student-specific Fields */}
            {formData.role === 'student' && (
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Student Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">SRM ID</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                      <input
                        type="text"
                        name="srmId"
                        value={formData.srmId}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="e.g., RA2111003010XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Room Number</label>
                    <div className="relative">
                      <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                      <input
                        type="text"
                        name="roomNumber"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="e.g., 101, A-205"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hostel Block</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                      <select
                        name="hostelName"
                        value={formData.hostelName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="">Select Hostel</option>
                        {hostels.map(hostel => (
                          <option key={hostel} value={hostel}>{hostel}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Year of Study</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500" />
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        <option value="">Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Staff-specific Fields */}
            {formData.role === 'mess_staff' && (
              <div className="mb-8 p-6 bg-orange-50 rounded-xl border border-orange-200">
                <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Staff Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Staff ID</label>
                    <div className="relative">
                      <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
                      <input
                        type="text"
                        name="staffId"
                        value={formData.staffId}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="e.g., STAFF001234"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Working Hostel</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
                      <select
                        name="workingHostel"
                        value={formData.workingHostel}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      >
                        <option value="">Select Work Location</option>
                        {hostels.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                        <option value="Central Kitchen">Central Kitchen</option>
                        <option value="Main Canteen">Main Canteen</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      >
                        <option value="">Select Designation</option>
                        {designations.map(designation => (
                          <option key={designation} value={designation}>{designation}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Work Shift</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
                      <select
                        name="shift"
                        value={formData.shift}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      >
                        <option value="">Select Shift</option>
                        {shifts.map(shift => (
                          <option key={shift} value={shift}>{shift}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* NGO-specific Fields */}
            {formData.role === 'ngo' && (
              <div className="mb-8 p-6 bg-green-50 rounded-xl border border-green-200">
                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  NGO Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">NGO Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                      <input
                        type="text"
                        name="ngoName"
                        value={formData.ngoName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="e.g., Green Earth Foundation"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Number</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                      <input
                        type="text"
                        name="ngoRegistrationNumber"
                        value={formData.ngoRegistrationNumber}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="e.g., NGO/2023/001234"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                      <input
                        type="text"
                        name="contactPersonName"
                        value={formData.contactPersonName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="Authorized representative"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">NGO Type</label>
                    <div className="relative">
                      <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                      <select
                        name="ngoType"
                        value={formData.ngoType}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      >
                        <option value="">Select NGO Type</option>
                        {ngoTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Areas</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                    <select
                      name="serviceAreas"
                      value={formData.serviceAreas}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    >
                      <option value="">Select Service Area</option>
                      {serviceAreas.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address Fields */}
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-green-800">Address Information</h4>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                      placeholder="Enter street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="State"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="mb-8">
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  required 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 mt-1 mr-3" 
                />
                <span className="text-sm text-gray-600">
                  I agree to the <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-semibold underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold underline">Privacy Policy</Link>. I confirm that all information provided is accurate.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Create Account
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl border border-blue-200"
            >
              <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
                What you'll get with your account:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                {formData.role === 'student' && (
                  <>
                    <div className="flex items-center p-3 bg-white/70 rounded-lg border border-blue-100">
                      <span className="text-lg mr-3">🌱</span>
                      <span className="font-medium text-gray-700">Earn Green Credits</span>
                    </div>
                    <div className="flex items-center p-3 bg-white/70 rounded-lg border border-blue-100">
                      <span className="text-lg mr-3">📱</span>
                      <span className="font-medium text-gray-700">Smart Meal Booking</span>
                    </div>
                    <div className="flex items-center p-3 bg-white/70 rounded-lg border border-blue-100">
                      <span className="text-lg mr-3">🏆</span>
                      <span className="font-medium text-gray-700">Campus Leaderboard</span>
                    </div>
                  </>
                )}
                
                {formData.role === 'mess_staff' && (
                  <>
                    <div className="flex items-center p-3 bg-white/70 rounded-lg border border-orange-100">
                      <span className="text-lg mr-3">📊</span>
                      <span className="font-medium text-gray-700">Inventory Management</span>
                    </div>
                    <div className="flex items-center p-3 bg-white/70 rounded-lg border border-orange-100">
                      <span className="text-lg mr-3">📈</span>
                      <span className="font-medium text-gray-700">Waste Analytics</span>
                    </div>
                    <div className="flex items-center p-3 bg-white/70 rounded-lg border border-orange-100">
                      <span className="text-lg mr-3">🎯</span>
                      <span className="font-medium text-gray-700">Efficiency Tracking</span>
                    </div>
                  </>
                )}

                {formData.role === 'ngo' && (
                  <>
                    <div className="flex items-center p-3 bg-white/70 rounded-lg border border-green-100">
                      <span className="text-lg mr-3">🤝</span>
                      <span className="font-medium text-gray-700">Surplus Food Access</span>
                    </div>
                    <div className="flex items-center p-3 bg-white/70 rounded-lg border border-green-100">
                      <span className="text-lg mr-3">🚚</span>
                      <span className="font-medium text-gray-700">Collection Scheduling</span>
                    </div>
                    <div className="flex items-center p-3 bg-white/70 rounded-lg border border-green-100">
                      <span className="text-lg mr-3">📋</span>
                      <span className="font-medium text-gray-700">Impact Reports</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </form>
        </motion.div>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;







