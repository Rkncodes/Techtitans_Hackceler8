import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation data
const translations = {
  en: {
    // Common
    dashboard: 'Dashboard',
    profile: 'My Profile',
    settings: 'Settings',
    signOut: 'Sign Out',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    
    // Dashboard
    welcome: 'Welcome',
    greenCredits: 'Green Credits',
    bookMeals: 'Book Meals',
    viewReports: 'View Reports',
    manageInventory: 'Manage Inventory',
    
    // Settings
    profileInformation: 'Profile Information',
    appearance: 'Appearance',
    darkMode: 'Dark Mode',
    switchToDarkTheme: 'Switch to dark theme',
    languageRegion: 'Language & Region',
    language: 'Language',
    saveAllSettings: 'Save All Settings',
    
    // Languages
    english: 'English',
    hindi: 'Hindi',
    tamil: 'Tamil',
    
    // Food Management
    smartFoodManagement: 'Smart Food Management',
    srmInstitute: 'SRM Institute of Science & Technology',
    mealBooking: 'Meal Booking',
    surplusTracker: 'Surplus Tracker',
    leaderboard: 'Leaderboard',
    
    // Terms
    termsConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy'
  },
  
  hi: {
    // Common
    dashboard: 'डैशबोर्ड',
    profile: 'मेरी प्रोफाइल',
    settings: 'सेटिंग्स',
    signOut: 'साइन आउट',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    
    // Dashboard
    welcome: 'स्वागत',
    greenCredits: 'ग्रीन क्रेडिट्स',
    bookMeals: 'भोजन बुक करें',
    viewReports: 'रिपोर्ट देखें',
    manageInventory: 'इन्वेंटरी प्रबंधन',
    
    // Settings
    profileInformation: 'प्रोफाइल जानकारी',
    appearance: 'रूप',
    darkMode: 'डार्क मोड',
    switchToDarkTheme: 'डार्क थीम पर स्विच करें',
    languageRegion: 'भाषा और क्षेत्र',
    language: 'भाषा',
    saveAllSettings: 'सभी सेटिंग्स सेव करें',
    
    // Languages
    english: 'अंग्रेजी',
    hindi: 'हिंदी',
    tamil: 'तमिल',
    
    // Food Management
    smartFoodManagement: 'स्मार्ट फूड मैनेजमेंट',
    srmInstitute: 'एसआरएम इंस्टीट्यूट ऑफ साइंस एंड टेक्नोलॉजी',
    mealBooking: 'भोजन बुकिंग',
    surplusTracker: 'सरप्लस ट्रैकर',
    leaderboard: 'लीडरबोर्ड',
    
    // Terms
    termsConditions: 'नियम और शर्तें',
    privacyPolicy: 'गोपनीयता नीति'
  },
  
  ta: {
    // Common
    dashboard: 'டாஷ்போர்டு',
    profile: 'எனது சுயவிவரம்',
    settings: 'அமைப்புகள்',
    signOut: 'வெளியேறு',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    edit: 'திருத்து',
    
    // Dashboard
    welcome: 'வரவேற்கிறோம்',
    greenCredits: 'பச்சை கிரெடிட்கள்',
    bookMeals: 'உணவு பதிவு',
    viewReports: 'அறிக்கைகள் பார்',
    manageInventory: 'சரக்கு நிர்வாகம்',
    
    // Settings
    profileInformation: 'சுயவிவர தகவல்',
    appearance: 'தோற்றம்',
    darkMode: 'இருள் பயன்முறை',
    switchToDarkTheme: 'இருள் தீம் மாற்று',
    languageRegion: 'மொழி மற்றும் பகுதி',
    language: 'மொழி',
    saveAllSettings: 'அனைத்து அமைப்புகளையும் சேமி',
    
    // Languages
    english: 'ஆங்கிலம்',
    hindi: 'இந்தி',
    tamil: 'தமிழ்',
    
    // Food Management
    smartFoodManagement: 'ஸ்மார்ட் உணவு மேலாண்மை',
    srmInstitute: 'எஸ்ஆர்எம் அறிவியல் மற்றும் தொழில்நுட்ப கழகம்',
    mealBooking: 'உணவு பதிவு',
    surplusTracker: 'உபரி டிராக்கர்',
    leaderboard: 'லீடர்போர்டு',
    
    // Terms
    termsConditions: 'நிபந்தனைகள்',
    privacyPolicy: 'தனியுரிமை கொள்கை'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || translations.en[key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
