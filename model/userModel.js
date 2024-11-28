const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: Number },
});
const userCollection = mongoose.model("userCollection", userSchema);

const createUser = async (email, pass) => {
  userCollection.crea;
};
