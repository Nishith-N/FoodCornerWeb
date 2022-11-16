

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); //to avoid sending static files using res.send file

mongoose.connect(
  "mongodb+srv://nishith:nishith@cluster0.jbk6vzi.mongodb.net/FoodCornerDB"
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/mens.html", function (req, res) {
  res.sendFile(__dirname + "/mens.html");
});

const userSchema = {
  fname: String,
  lname: String,
  address: String,
  password: String,
  city: String,
  state: String,
  zip: String,
  email: String,
  phoneno: String,

};
const newUser = mongoose.model("logins", userSchema);
app.post("/register", function (req, res) {
  let insert = new newUser({
    fname: req.body.fname,
    lname: req.body.lname,
    address: req.body.address1,
    password: req.body.pwd,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.myInput,
    phoneno: req.body.phone
  });
  insert.save();
  res.redirect("/");
});

const matchSchema = {
  logo1: String,
  logo2: String,
  name1: String,
  name2: String,
  league: String,
  date: String,
  time: String,
  venue: String,
};
const match = mongoose.model("match", matchSchema);
app.get("/load", (req, res) => {
  match.find((err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
});
app.listen(3000, function () {
  console.log("server is running on 3000");
});