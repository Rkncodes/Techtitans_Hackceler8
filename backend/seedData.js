const mongoose = require('mongoose');
const User = require('./models/User');
const Meal = require('./models/Meal');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Meal.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create sample users
    const sampleUsers = [
      {
        name: 'John Doe',
        email: 'student@srm.edu.in',
        password: 'demo123',
        role: 'student',
        hostel: 'A-Block',
        greenCredits: 580
      },
      {
        name: 'Mess Manager',
        email: 'mess@srm.edu.in',
        password: 'demo123',
        role: 'mess_staff',
        hostel: 'A-Block',
        greenCredits: 200
      },
      {
        name: 'Green NGO Representative',
        email: 'ngo@green.org',
        password: 'demo123',
        role: 'ngo',
        greenCredits: 150
      },
      {
        name: 'Alice Smith',
        email: 'alice@srm.edu.in',
        password: 'demo123',
        role: 'student',
        hostel: 'B-Block',
        greenCredits: 450
      },
      {
        name: 'Bob Wilson',
        email: 'bob@srm.edu.in',
        password: 'demo123',
        role: 'student',
        hostel: 'C-Block',
        greenCredits: 320
      }
    ];

    const users = await User.create(sampleUsers);
    console.log('👥 Created sample users:', users.length);

    // Create sample meals for today and tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sampleMeals = [
      // Today's meals
      {
        name: 'breakfast',
        date: today,
        time: { start: '07:00', end: '09:00' },
        location: 'A-Block Mess Hall',
        capacity: 150,
        booked: 87,
        menu: ['Idli Sambar', 'Upma', 'Poha', 'Coffee/Tea', 'Fruits'],
        price: 45,
        credits: 15
      },
      {
        name: 'lunch',
        date: today,
        time: { start: '12:00', end: '14:00' },
        location: 'A-Block Mess Hall',
        capacity: 200,
        booked: 156,
        menu: ['Rice', 'Dal', 'Vegetable Curry', 'Chapati', 'Salad', 'Buttermilk'],
        price: 65,
        credits: 25
      },
      {
        name: 'snacks',
        date: today,
        time: { start: '16:00', end: '18:00' },
        location: 'A-Block Mess Hall',
        capacity: 100,
        booked: 45,
        menu: ['Samosa', 'Bhel Puri', 'Tea/Coffee', 'Biscuits'],
        price: 25,
        credits: 10
      },
      {
        name: 'dinner',
        date: today,
        time: { start: '19:00', end: '21:00' },
        location: 'A-Block Mess Hall',
        capacity: 180,
        booked: 123,
        menu: ['Rice/Chapati', 'Dal', 'Vegetable', 'Curry', 'Raita', 'Sweet'],
        price: 55,
        credits: 20
      },
      // Tomorrow's meals
      {
        name: 'breakfast',
        date: tomorrow,
        time: { start: '07:00', end: '09:00' },
        location: 'A-Block Mess Hall',
        capacity: 150,
        booked: 23,
        menu: ['Dosa', 'Coconut Chutney', 'Sambar', 'Tea/Coffee'],
        price: 45,
        credits: 15
      },
      {
        name: 'lunch',
        date: tomorrow,
        time: { start: '12:00', end: '14:00' },
        location: 'A-Block Mess Hall',
        capacity: 200,
        booked: 67,
        menu: ['Biryani', 'Raita', 'Pickle', 'Papad', 'Sweet'],
        price: 75,
        credits: 30
      }
    ];

    const meals = await Meal.create(sampleMeals);
    console.log('🍽️ Created sample meals:', meals.length);

    console.log('🎉 Sample data created successfully!');
    console.log('📊 Check your MongoDB Compass to see the data');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
