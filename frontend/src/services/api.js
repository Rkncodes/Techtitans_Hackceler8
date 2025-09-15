import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// New API calls for bookings

// Fetch bookings for a user on a date
api.getBookings = ({ userId, date }) => {
  return api.get('/bookings', { params: { userId, date } });
};

// Create a booking
api.createBooking = ({ userId, mealId, date }) => {
  return api.post('/bookings', { userId, mealId, date });
};

// Cancel a booking
api.cancelBooking = ({ userId, mealId, date }) => {
  return api.delete('/bookings/cancel', { data: { userId, mealId, date } });
};

export default api;


