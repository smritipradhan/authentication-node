const cookie = require("cookie-parser");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60; //store max age->3 days. expects in seconds

const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  if (err.code === 11000) {
    errors.email = "Email  already exists.";
  }

  if (err.message.includes("user validation failed")) {
    // Check if something failed
    Object.values(err.errors).forEach((properties) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  // Incorrect Email
  if (err.message === "Incorrect Email!!") {
    errors.email = "Email  does not Exist";
  }

  // Incorrect Password
  if (err.message === "Incorrect Password!!") {
    errors.password = "Password  does not Exist";
  }

  return errors;
};
// ------------ GNERATE JSON WEB TOKEN ------------
const generateJSONToken = (id) => {
  // id will be used for generating the JSON Web Token.Sign method to sign our JWT
  return jwt.sign({ id }, "secret-key", {
    expiresIn: maxAge,
  }); // Donot publish in repositories
};

// ------------ SIGNUP GET CALL ------------
module.exports.signup_get = (req, res) => {
  res.render("signup"); // return the signup view.
};

// ------------ SIGNUP POST CALL ------------
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = generateJSONToken(user._id); // Generate the Token
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// ------------ LOGIN GET CALL ------------
module.exports.login_get = (req, res) => {
  res.render("login");
};

// ------------ LOGIN POST CALL ------------
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    // We will try to login
    const user = await User.login(email, password);
    const token = generateJSONToken(user._id); // Generate the Token
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  //Delete the JST token, we cant delete but we can replace with blank and small expiry time with 1 ms
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
