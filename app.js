const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { authGuard, checkUser } = require("./middleware/authGuard");

const app = express();

// middleware
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser());

// database connection
const dbURI =
  "mongodb+srv://smritipradhan545:<password>@cluster0.lq9q1p4.mongodb.net/node-auth";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", authGuard, (req, res) => res.render("smoothies"));
app.use(authRoutes);
