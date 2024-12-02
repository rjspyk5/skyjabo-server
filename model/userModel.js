const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: Number },
  phone: { type: Number },
  photo: { type: String },
});
const userCollection = mongoose.model("userCollection", userSchema);

const createUser = async (username, email, password, role) => {
  return await userCollection.create({ username, email, password, role });
};

const updateUserFromDb = async (id, data) =>
  await userCollection.updateOne({ _id: id }, { $set: data });

const getUserFromDb = async (id) => {
  return await userCollection.findOne(
    { _id: id },
    { email: 1, phone: 1, username: 1 }
  );
};
const findUserByEmail = async (email) => {
  return await userCollection.findOne({ email: email });
};
const findUserById = async (id) => {
  return await userCollection.findById(id);
};

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  getUserFromDb,
  updateUserFromDb,
};
