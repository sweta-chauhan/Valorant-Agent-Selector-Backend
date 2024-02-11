require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || `mongodb://localhost:27017/valorant`;
const connect = async () => {
  try {
    const url = mongoURI;
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

const close = async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error.message);
  }
};

module.exports = { connect, close };
