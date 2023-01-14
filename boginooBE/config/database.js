const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to DataBase");
  } catch (error) {
  }
};

module.exports = connect;