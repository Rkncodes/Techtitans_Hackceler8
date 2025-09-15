import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

// Actions
const authActions = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER'
};

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case authActions.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case authActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    
    case authActions.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    
    case authActions.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case authActions.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case authActions.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        dispatch({
          type: authActions.LOGIN_SUCCESS,
          payload: user
        });
      } else {
        dispatch({ type: authActions.SET_LOADING, payload: false });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      dispatch({ type: authActions.SET_LOADING, payload: false });
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: authActions.SET_LOADING, payload: true });
      dispatch({ type: authActions.CLEAR_ERROR });

      // For now, we'll simulate the registration since backend might not be ready
      console.log('Registration data:', userData);

      // Simulate API call
      const response = await simulateAPICall('/api/auth/register', userData);
      
      if (response.success) {
        const { user, token } = response.data;
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user));
        
        dispatch({
          type: authActions.LOGIN_SUCCESS,
          payload: user
        });
        
        return { success: true };
      } else {
        dispatch({
          type: authActions.SET_ERROR,
          payload: response.message
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Registration failed:', error);
      dispatch({
        type: authActions.SET_ERROR,
        payload: 'Registration failed. Please try again.'
      });
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: authActions.SET_LOADING, payload: true });
      dispatch({ type: authActions.CLEAR_ERROR });

      // Simulate API call
      const response = await simulateAPICall('/api/auth/login', { email, password });
      
      if (response.success) {
        const { user, token } = response.data;
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(user));
        
        dispatch({
          type: authActions.LOGIN_SUCCESS,
          payload: user
        });
        
        return { success: true };
      } else {
        dispatch({
          type: authActions.SET_ERROR,
          payload: response.message
        });
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Login failed:', error);
      dispatch({
        type: authActions.SET_ERROR,
        payload: 'Login failed. Please try again.'
      });
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    dispatch({ type: authActions.LOGOUT });
    toast.success('Logged out successfully!');
  };

  // Update user function
  const updateUser = (updatedData) => {
    try {
      const updatedUser = { ...state.user, ...updatedData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      dispatch({
        type: authActions.UPDATE_USER,
        payload: updatedData
      });
      return { success: true };
    } catch (error) {
      console.error('Failed to update user:', error);
      return { success: false, message: 'Failed to update user data' };
    }
  };

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    register,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Simulate API call function (replace with real API calls when backend is ready)
const simulateAPICall = async (endpoint, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (endpoint === '/api/auth/register') {
        // Simulate successful registration
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          greenCredits: 0,
          createdAt: new Date().toISOString(),
          
          // Role-specific data
          ...(data.role === 'student' && {
            srmId: data.srmId,
            hostelName: data.hostelName,
            roomNumber: data.roomNumber,
            department: data.department,
            year: data.year
          }),
          
          ...(data.role === 'mess_staff' && {
            staffId: data.staffId,
            workingHostel: data.workingHostel,
            designation: data.designation,
            shift: data.shift
          }),
          
          ...(data.role === 'ngo' && {
            ngoName: data.ngoName,
            ngoRegistrationNumber: data.ngoRegistrationNumber,
            contactPersonName: data.contactPersonName,
            ngoType: data.ngoType,
            serviceAreas: data.serviceAreas,
            ngoAddress: data.ngoAddress
          })
        };
        
        resolve({
          success: true,
          data: {
            user,
            token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9)
          }
        });
      } else if (endpoint === '/api/auth/login') {
        // Check demo credentials
        const demoUsers = [
          {
            email: 'student@srm.edu.in',
            password: 'demo123',
            user: {
              id: 'student_1',
              name: 'Akshara Kumari',
              email: 'student@srm.edu.in',
              phone: '+91 9876543210',
              role: 'student',
              srmId: 'RA2111003010123',
              hostelName: 'A-Block',
              roomNumber: '205',
              department: 'Computer Science',
              year: '2nd Year',
              greenCredits: 580,
              createdAt: new Date().toISOString()
            }
          },
          {
            email: 'mess@srm.edu.in',
            password: 'demo123',
            user: {
              id: 'staff_1',
              name: 'Ramesh Kumar',
              email: 'mess@srm.edu.in',
              phone: '+91 9876543211',
              role: 'mess_staff',
              staffId: 'STAFF001234',
              workingHostel: 'A-Block',
              designation: 'Mess Manager',
              shift: 'Full Day',
              greenCredits: 0,
              createdAt: new Date().toISOString()
            }
          },
          {
            email: 'ngo@green.org',
            password: 'demo123',
            user: {
              id: 'ngo_1',
              name: 'Priya Sharma',
              email: 'ngo@green.org',
              phone: '+91 9876543212',
              role: 'ngo',
              ngoName: 'Green Earth Foundation',
              ngoRegistrationNumber: 'NGO/2023/001234',
              contactPersonName: 'Priya Sharma',
              ngoType: 'Food Distribution',
              serviceAreas: 'Chennai',
              greenCredits: 0,
              createdAt: new Date().toISOString()
            }
          }
        ];
        
        const validUser = demoUsers.find(u => u.email === data.email && u.password === data.password);
        
        if (validUser) {
          resolve({
            success: true,
            data: {
              user: validUser.user,
              token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9)
            }
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid email or password'
          });
        }
      }
    }, 1500); // Simulate network delay
  });
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;




