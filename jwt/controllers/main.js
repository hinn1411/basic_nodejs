const jwt = require("jsonwebtoken");
const {BadRequestError} = require("../errors/index");

// mongo validator
// Joi package
// validate in controller
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // just for demo, normally provided by db
  const id = new Date().getDate();
  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log(token);
  return res.status(200).json({ message: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNum = Math.floor(Math.random() * 100);
  return res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNum}`,
  });
  // console.log(`token = ${token}`);
};

module.exports = {
  dashboard,
  login,
};
