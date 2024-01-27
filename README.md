Date : 24th Jan 2024

### Setup Authentication using Node, Express, Mongo using Mongoose
- We will be using JSON Web Tokens to implement Authentication. They are one way of implementing authentication.

ejs - for views
express - node framework
mongoose - 

app.js

Imports 
const express = require("express");
const mongoose = require("mongoose");

// middleware
app.use(express.static("public")); -> we can serve static files like css in the browser in the public folder,

// view engine
app.set("view engine", "ejs"); -> for our views we are using ejs.

const dbURI =#
  "mongodb+srv://<username>:<passsword>@cluster0.lq9q1p4.mongodb.net/<dbname>
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  // Database connection.

### Lesson 2 : Adding Routes and Controllers for Authentication

- Using an MVC (model, view, controller approach)


/signup - GET - sign up page
/login - GET - login page
/signup - POST - create a new user
/login - POST ->authenticate a current user

extracts routes in separate file, larger the application becomes, its better to keep everything separate.

require the router from express. when we create separate page for this routes we dont say app.get, require the router and then export the router and then we can 
plugin the router into out application.

```
const { Router } = require("express");
const router = Router();
```
Created new instance of Router.add different routes ,

All the route controller files will be kept in different folder in Controller folder to keep the logic seperate and follor the MVC structure.

express json parser middleware -> app.use(express.json) takes any json data coming with request and passes it to javascript object for us and attaches for us
with the request object so that we can use it in our request handlers.

```
app.use(express.json()) 
module.exports.signup_post = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.render("signup");
};
```
Sending this when we submit the forms.

### Lesson 3 : User Model

we will use mongoose. We are going to create Schema, besically we define how these different objects are going to look or different documents are going to look inside the 
database.


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

export const User = mongoose.model("user", userSchema); // The Name should be singular of the Collection. We called our collection Users. Mongoose will look into out database and 
connect it for us.


  User.create({}) -> create an instance of User locally for us and then saved it inside the database.
  User.create({ email, password });  -> This is an asynchronous Task, which will return a promise.


### Lesson 3 : Mongoose Validations
