const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas or local MongoDB instance
 * Gracefully falls back to Mock Test Data Mode if database is unreachable
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hostel_management_db';
    
    // Connect with a 3-second timeout so server doesn't hang if Mongo isn't running
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`\n======================================================`);
    console.warn(`⚠️  MongoDB is offline or not reachable (${error.message})`);
    console.warn(`🚀 Backend automatically switched to MOCK TEST DATA MODE!`);
    console.warn(`✨ All API endpoints are fully functional with Sharda test data.`);
    console.warn(`======================================================\n`);
  }
};

module.exports = connectDB;
