const mongoose = require('mongoose');
require('dotenv').config();
const { UserModel } = require('../src/models/User');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const email = 'admin@example.com';
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    const user = await UserModel.create('admin', email, 'StrongPass123!', 'admin');
    console.log('Seeded admin:', user.toJSON());
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
