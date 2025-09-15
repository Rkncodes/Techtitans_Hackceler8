const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/meals', require('./routes/meals'));
app.use('/api/surplus', require('./routes/surplus'));
app.use('/api/bookings', require('./routes/bookings'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working! 🌱', timestamp: new Date() });
});

// Health/base routes
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'smart-food-backend' });
});
app.get('/api', (req, res) => {
  res.json({ status: 'ok', routes: ['/api/auth', '/api/users', '/api/meals', '/api/surplus', '/api/bookings'] });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
  console.log('📊 Database:', mongoose.connection.name);
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`📱 Frontend should connect to: http://localhost:${PORT}/api`);
});
