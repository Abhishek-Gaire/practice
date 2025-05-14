const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Could not connect to MONGODB");
    console.error(error);
  }
}

module.exports = connectToDB;