import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Users, AlertTriangle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Terms = () => {
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FileText,
      content: `By accessing and using the Smart Food Management System at SRM Institute of Science & Technology, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all users, including students, mess staff, and NGO partners.`
    },
    {
      id: 'eligibility',
      title: 'User Eligibility',
      icon: Users,
      content: `The Smart Food Management System is exclusively available to:
      • Current students of SRM Institute with valid SRM ID
      • Authorized mess staff and food service personnel
      • Registered NGO partners with valid credentials
      • Users must provide accurate and complete information during registration`
    },
    {
      id: 'usage',
      title: 'Acceptable Use Policy',
      icon: Shield,
      content: `Users agree to:
      • Use the system only for legitimate food management purposes
      • Provide accurate meal booking information
      • Respect the privacy and data of other users
      • Not engage in any activity that could harm the system's functionality
      • Report any suspected misuse or technical issues promptly`
    },
    {
      id: 'data',
      title: 'Data Collection and Privacy',
      icon: Shield,
      content: `We collect and process the following data:
      • Personal information (name, email, phone number, SRM ID)
      • Meal booking history and preferences
      • Green credits and sustainability metrics
      • Usage analytics to improve system performance
      
      All data is handled in accordance with our Privacy Policy and applicable data protection laws.`
    },
    {
      id: 'bookings',
      title: 'Meal Booking Policy',
      icon: Users,
      content: `Meal booking terms:
      • Bookings must be made at least 2 hours in advance
      • Cancellations are allowed up to 1 hour before meal time
      • No-show policy: Repeated no-shows may result in booking restrictions
      • Green credits are awarded based on actual consumption and waste reduction`
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      content: `SRM Institute and the Smart Food Management System:
      • Are provided "as is" without warranties of any kind
      • Do not guarantee uninterrupted or error-free service
      • Are not liable for any indirect, incidental, or consequential damages
      • Reserve the right to modify or discontinue services with notice`
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/settings"
            className={`inline-flex items-center space-x-2 mb-6 transition-colors duration-300 ${
              isDarkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Settings</span>
          </Link>
          
          <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <FileText className={`w-8 h-8 transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <h1 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Terms & Conditions
            </h1>
            <p className={`text-lg transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Smart Food Management System - SRM Institute
            </p>
            <p className={`text-sm mt-2 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Last updated: September 16, 2025
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-8 transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              } border shadow-sm`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
                }`}>
                  <section.icon className={`w-6 h-6 transition-colors duration-300 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h2 className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h2>
                  <div className={`prose max-w-none transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {section.content.split('\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-3 leading-relaxed whitespace-pre-line">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`mt-12 p-8 rounded-2xl border text-center transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}
        >
          <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Contact Information
          </h3>
          <p className={`mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            For questions about these terms, please contact:
          </p>
          <div className={`space-y-2 text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p>SRM Institute of Science & Technology</p>
            <p>Smart Food Management Team</p>
            <p>Email: foodmanagement@srmist.edu.in</p>
            <p>Phone: +91-44-2741-1000</p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-300">
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              By continuing to use the Smart Food Management System, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms & Conditions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
