const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: Number },
});
const userCollection = mongoose.model("userCollection", userSchema);
