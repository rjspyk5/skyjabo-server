const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../model/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const userDetails = req.body;
  const isUser = await findUserByEmail(userDetails.email);
  if (isUser) {
    return res.send({ message: "User already exists" });
  }
  const hashedPass = await bcrypt.hash(userDetails?.password, 10);

  const result = await createUser("test", userDetails?.email, hashedPass, 1);
  if (result?._id) {
    return res.send({ message: "User Created Successflly,Now you can login" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // chechking valid user or not
  const isUser = await findUserByEmail(email);
  if (!isUser) {
    return res.send({ message: "Couldn't find any account with this email" });
  }
  // check password
  const isMatchedPassword = await bcrypt.compare(password, isUser.password);
  if (!isMatchedPassword) {
    return res.send({ message: "Password didn't match,try again" });
  }
  // create token
  const token = jwt.sign(
    {
      userId: isUser._id,
      role: isUser.role,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "7d" }
  );
  // sending token and response to frontend
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ message: "Login Successfull" });
};
module.exports = { register, login };
