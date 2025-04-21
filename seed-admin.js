// Script to create an admin user for testing

const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

// Connect to MongoDB
console.log(`Connecting to MongoDB at ${dbURI}...`);
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Load models
require('./app_api/models/users');
const User = mongoose.model('User');

// Admin user data
const adminUser = {
  name: 'Admin',
  email: 'admin@example.com',
  password: 'Password123!'
};

// Create admin user
async function seedAdminUser() {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: adminUser.email });
    
    if (existingUser) {
      console.log(`Admin user already exists with email: ${adminUser.email}`);
    } else {
      // Create new user
      const user = new User();
      user.name = adminUser.name;
      user.email = adminUser.email;
      user.setPassword(adminUser.password);
      
      await user.save();
      console.log(`Admin user created with email: ${adminUser.email}`);
    }
    
    // Verify by checking the database
    const users = await User.find({});
    console.log(`Total users in database: ${users.length}`);
    
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
  } catch (err) {
    console.error('Error seeding admin user:', err);
    mongoose.disconnect();
    process.exit(1);
  }
}

// Run the seeding
seedAdminUser(); 