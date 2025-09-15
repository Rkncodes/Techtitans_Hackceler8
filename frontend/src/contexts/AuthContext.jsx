import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
        // Optionally verify token with backend
        verifyToken(savedToken);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    setLoading(false);
  }, []);

  // Verify token with backend
  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        // Token is invalid, clear storage
        logout();
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Don't logout on network error, keep using saved data
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      
      // Fallback to demo accounts if backend is not running
      if (error.message.includes('fetch')) {
        return handleDemoLogin(email, password);
      }
      
      return { 
        success: false, 
        message: 'Connection failed. Make sure backend is running!' 
      };
    }
  };

  // Fallback demo login when backend is not available
  const handleDemoLogin = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check demo accounts
      if (password !== 'demo123') {
        throw new Error('Invalid credentials. Use password: demo123');
      }

      let mockUser = {
        id: 'demo-' + Date.now(),
        email: email,
        greenCredits: 580
      };

      // Set user data based on email
      if (email === 'student@srm.edu.in') {
        mockUser = { ...mockUser, name: 'John Doe', role: 'student', hostel: 'A-Block' };
      } else if (email === 'mess@srm.edu.in') {
        mockUser = { ...mockUser, name: 'Mess Manager', role: 'mess_staff', hostel: 'A-Block' };
      } else if (email === 'ngo@green.org') {
        mockUser = { ...mockUser, name: 'Green NGO', role: 'ngo', hostel: 'External' };
      } else {
        mockUser = { ...mockUser, name: email.split('@')[0], role: 'student', hostel: 'A-Block' };
      }
      
      setUser(mockUser);
      setToken('demo-token-123');
      localStorage.setItem('token', 'demo-token-123');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setLoading(false);
      
      // Fallback to demo registration if backend is not running
      if (error.message.includes('fetch')) {
        return handleDemoRegistration(userData);
      }
      
      return { 
        success: false, 
        message: 'Connection failed. Make sure backend is running!' 
      };
    }
  };

  // Fallback demo registration when backend is not available
  const handleDemoRegistration = async (userData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockUser = {
        id: 'demo-' + Date.now(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'student',
        hostel: userData.hostel,
        greenCredits: 50 // Welcome bonus
      };
      
      setUser(mockUser);
      setToken('demo-token-123');
      localStorage.setItem('token', 'demo-token-123');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Registration failed' 
      };
    }
  };

  // API helper function
  const apiCall = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const data = await apiCall('/auth/me');
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      return null;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      const data = await apiCall('/auth/update', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      if (data.success) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      }
      
      return { success: false, message: data.message };
    } catch (error) {
      console.error('Failed to update profile:', error);
      // Fallback to local update if backend is not available
      updateUser(updates);
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser) => {
    const newUser = { ...user, ...updatedUser };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Check if backend is available
  const checkBackendStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/test`);
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    updateUserProfile,
    fetchUserProfile,
    apiCall,
    checkBackendStatus,
    isAuthenticated: !!user,
    isDemo: token?.startsWith('demo-')
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};



