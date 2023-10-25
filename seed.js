require('dotenv').config(); // Load environment variables from .env
const { default: mongoose } = require("mongoose");
const seedData = require("./seedData");
const User = require('./src/models/user.model');


async function seed() {
  const mongoDB = process.env.MONGODB_URI;
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    User.insertMany(seedData)
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}
  
seed().catch((err) => console.error(err));
