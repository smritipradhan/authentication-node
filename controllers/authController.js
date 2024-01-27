const User = require("../models/User");

module.exports.signup_get = (req, res) => {
  console.log("jeje");
  res.render("signup"); // return the signup view.
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send("Error !! , User not created", err);
  }
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_post = (req, res) => {
  res.render("login");
};
