const bcrypt = require("bcrypt");
const register = async (req, res) => {
  const userDetails = req.body;
  //todo: chcek previous account first if have account then back false or true
  // todo: bycrypt pass
  const hashedPass = await bcrypt.hash(userDetails?.password, 10);
  // todo: save into database if ok then send response ok
  res.send({ result: hashedPass });
};

module.exports = { register };
