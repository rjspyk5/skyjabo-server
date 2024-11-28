const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const verifyToken = async (req, res, next) => {
  const token = req?.cookie?.token;
  if (!token) {
    return res.status(403).send({ message: "Not Authorized" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "Invalid token or token expired" });
    }
    console.log(decoded);
    req.user = decoded;
    next();
  });
};

const verifyAdmin = async (req, res, next) => {
  if (!req.user.role) {
    return res.status(403).send({ message: "Access denied" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
