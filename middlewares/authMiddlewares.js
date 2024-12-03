const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(403).send({ message: "Not Authorized" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "Invalid token or token expired" });
    }
    req.user = decoded;

    next();
  });
};
const isLogin = async (req, res, next) => {
  const token = req?.cookies?.token;

  if (!token) {
    return res.send({ isLogin: 1 });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  const roleValue = req.user.role === 0 ? true : false;
  if (!roleValue) {
    return res.status(403).send({ message: "Access denied" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin, isLogin };
