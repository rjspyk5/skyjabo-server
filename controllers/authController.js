const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../model/userModel");

const register = async (req, res) => {
  const userDetails = req.body;
  const isAlreadyHaveAccount = await findUserByEmail(userDetails.email);
  if (isAlreadyHaveAccount) {
    return res.send({ message: "User already exists" });
  }
  const hashedPass = await bcrypt.hash(userDetails?.password, 10);
  // todo: save into database if ok then send response ok
  const result = await createUser("test", userDetails?.email, hashedPass, 1);
  if (result?._id) {
    return res.send({ message: "User Created Successflly,Now you can login" });
  }
};

module.exports = { register };
