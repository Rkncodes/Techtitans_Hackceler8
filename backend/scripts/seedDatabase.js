const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const MealBooking = require('../models/MealBooking');

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database');

    // Clear existing data
    await User.deleteMany({});
    await MealBooking.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      name: 'System Administrator',
      email: 'admin@srm.edu.in',
      password: adminPassword,
      role: 'admin',
      isActive: true,
      greenCredits: 1000
    });
    console.log('Admin user created');

    // Create sample mess staff
    const messStaffPassword = await bcrypt.hash('mess123', 12);
    const messStaff = await User.create({
      name: 'Mess Manager',
      email: 'mess@srm.edu.in',
      password: messStaffPassword,
      role: 'mess_staff',
      hostel: 'A-Block',
      isActive: true,
      greenCredits: 500
    });
    console.log('Mess staff user created');

    // Create sample NGO
    const ngoPassword = await bcrypt.hash('ngo123', 12);
    const ngo = await User.create({
      name: 'Green Earth NGO',
      email: 'contact@greenearth.org',
      password: ngoPassword,
      role: 'ngo',
      phone: '9876543210',
      ngoDetails: {
        organizationName: 'Green Earth Foundation',
        registrationNumber: 'NGO123456',
        address: 'Chennai, Tamil Nadu',
        verified: true
      },
      isActive: true,
      greenCredits: 300
    });
    console.log('NGO user created');

    // Create sample students
    const studentPassword = await bcrypt.hash('student123', 12);
    const students = [];
    
    const hostels = ['A-Block', 'B-Block', 'C-Block', 'D-Block'];
    const names = ['Rahul Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Karthik Raj'];

    for (let i = 0; i < 5; i++) {
      const student = await User.create({
        name: names[i],
        email: `student${i + 1}@srm.edu.in`,
        password: studentPassword,
        role: 'student',
        hostel: hostels[i % hostels.length],
        phone: `987654321${i}`,
        preferences: {
          vegetarian: i % 2 === 0,
          allergies: i === 2 ? ['nuts', 'dairy'] : [],
          notificationsEnabled: true
        },
        greenCredits: Math.floor(Math.random() * 200) + 50,
        streak: Math.floor(Math.random() * 10),
        isActive: true
      });
      students.push(student);
    }
    console.log('Sample students created');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📧 Login credentials:');
    console.log('Admin: admin@srm.edu.in / admin123');
    console.log('Mess Staff: mess@srm.edu.in / mess123');
    console.log('NGO: contact@greenearth.org / ngo123');
    console.log('Students: student1@srm.edu.in to student5@srm.edu.in / student123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
