const mongoose = require("mongoose");
require("dotenv").config();
const connectDb = async () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
module.exports = connectDb;
