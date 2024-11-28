const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: Number },
});
const userCollection = mongoose.model("userCollection", userSchema);

const createUser = async (username, email, password, role) => {
  return await userCollection.create({ username, email, password, role });
};

const findUserByEmail = async (email) => {
  return await userCollection.findOne({ email: email });
};
const findUserById = async (id) => {
  return await userCollection.findById(id);
};

module.exports = { createUser, findUserById, findUserByEmail };
