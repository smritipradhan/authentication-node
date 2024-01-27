const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email must is provided"], // Custom Error Message
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please neter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password must is provided"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
