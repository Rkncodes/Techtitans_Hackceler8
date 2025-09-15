import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Globe, 
  Save,
  Mail,
  Phone,
  Building2,
  FileText,
  Shield
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, changeLanguage, t, availableLanguages } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveProfile = () => {
    updateUser(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    toast.success(`Language changed to ${availableLanguages.find(l => l.code === langCode)?.nativeName}`);
  };

  const handleThemeToggle = () => {
    toggleTheme();
    toast.success(`Switched to ${isDarkMode ? 'light' : 'dark'} mode`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto p-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-8 mb-8 transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          } border shadow-sm`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <SettingsIcon className={`w-8 h-8 transition-colors duration-300 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <h1 className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {t('settings')}
              </h1>
              <p className={`transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Manage your Smart Food Management profile and preferences
              </p>
            </div>
            <div className={`ml-auto px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
              user?.role === 'student' ? 'bg-blue-100 text-blue-800' :
              user?.role === 'mess_staff' ? 'bg-orange-100 text-orange-800' :
              'bg-green-100 text-green-800'
            }`}>
              {user?.role?.replace('_', ' ').toUpperCase()}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className={`rounded-2xl p-8 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border shadow-sm`}>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <User className={`w-6 h-6 transition-colors duration-300 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <h2 className={`text-xl font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t('profileInformation')}
                  </h2>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isEditing ? t('cancel') : t('edit')}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name Field */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Name
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      } ${isEditing ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'cursor-not-allowed'}`}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      } ${isEditing ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'cursor-not-allowed'}`}
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-300 text-gray-900'
                      } ${isEditing ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'cursor-not-allowed'}`}
                    />
                  </div>
                </div>

                {/* Role Specific Information */}
                {user?.role === 'student' && (
                  <>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        SRM ID
                      </label>
                      <div className="relative">
                        <Building2 className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                        <input
                          type="text"
                          value={user.srmId}
                          disabled
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-gray-400' 
                              : 'bg-gray-100 border-gray-300 text-gray-500'
                          } cursor-not-allowed`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Hostel & Room
                      </label>
                      <input
                        type="text"
                        value={`${user.hostelName} - ${user.roomNumber}`}
                        disabled
                        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-400' 
                            : 'bg-gray-100 border-gray-300 text-gray-500'
                        } cursor-not-allowed`}
                      />
                    </div>
                  </>
                )}
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>{t('save')}</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            
            {/* Appearance Settings */}
            <div className={`rounded-2xl p-6 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border shadow-sm`}>
              <div className="flex items-center space-x-3 mb-4">
                {isDarkMode ? (
                  <Moon className="w-6 h-6 text-purple-400" />
                ) : (
                  <Sun className="w-6 h-6 text-yellow-500" />
                )}
                <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('appearance')}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`font-medium transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {t('darkMode')}
                    </p>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {t('switchToDarkTheme')}
                    </p>
                  </div>
                  <button
                    onClick={handleThemeToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        isDarkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Language Settings */}
            <div className={`rounded-2xl p-6 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border shadow-sm`}>
              <div className="flex items-center space-x-3 mb-4">
                <Globe className={`w-6 h-6 transition-colors duration-300 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {t('languageRegion')}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {t('language')}
                  </label>
                  <div className="space-y-2">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-300 ${
                          language === lang.code
                            ? (isDarkMode 
                                ? 'bg-blue-600 border-blue-500 text-white' 
                                : 'bg-blue-600 border-blue-500 text-white')
                            : (isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                                : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100')
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{lang.nativeName}</span>
                          {language === lang.code && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div className={`rounded-2xl p-6 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            } border shadow-sm`}>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className={`w-6 h-6 transition-colors duration-300 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`} />
                <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Legal & Privacy
                </h3>
              </div>
              
              <div className="space-y-3">
                <Link
                  to="/terms"
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>{t('termsConditions')}</span>
                </Link>
                <Link
                  to="/privacy"
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span>{t('privacyPolicy')}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
