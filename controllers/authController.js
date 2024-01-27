module.exports.signup_get = (req, res) => {
  console.log("jeje");
  res.render("signup"); // return the signup view.
};

module.exports.signup_post = (req, res) => {
  const { email, password } = req.body;
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

module.exports.login_post = (req, res) => {
  res.render("login");
};
