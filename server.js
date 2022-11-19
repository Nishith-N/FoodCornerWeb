const express = require("express");
const app = express();
const foo = "foo";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var eatngodata=[];
var tasteontruckdata = [];
var maduraijigardata = [];
var cart_check=[];
var manimessdata=[];
var lindadata = [];
app.use(express.static(__dirname)); //to avoid sending static files using res.send file

mongoose.connect(
  "mongodb+srv://nishith:nishith@cluster0.jbk6vzi.mongodb.net/FoodCornerDB"
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
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

const addcartSchema = {
  cart_dish: String,
  cart_price: Number,
};

const cart_details = mongoose.model("cartdets",addcartSchema);
app.post("/cart_det1",function(req,res){
  let cart_insert1 = new cart_details({
    cart_dish: req.body.cart_dish1,
    cart_price: req.body.cart_price1
  });
  cart_insert1.save();
  res.redirect("../Cart/carts.html");

});

app.post("/cart_det2", function (req, res) {
  let cart_insert2 = new cart_details({
    cart_dish: req.body.cart_dish2,
    cart_price: req.body.cart_price2,
  });
  cart_insert2.save();
  res.redirect("../Cart/carts.html");
});

app.get("/cart_display", (req, res) => {
  cart_details.find((err, data) => {
    if (err) {

      return res.status(500).send(err);
    } else {
      console.log(data);
      cart_check=data;
      return res.status(200).send(data);
    }
  });
});

const matchSchema = {
  name: String,
  email: String,
  foodpack: String,
  delexp: String,
  comments: String,
};
const newfeeds = mongoose.model("feedbacks", matchSchema);
app.post("/feedbacks", function (req, res) {
  let insert = new newfeeds({
    name: req.body.name,
    email: req.body.email,
    foodpack: req.body.package_rate,
    delexp: req.body.delivery_rate,
    comments: req.body.text
  });
  insert.save();
  res.redirect("../Review/feedback_details.html");
});


app.get("/feed_details", (req, res) => {
  newfeeds.find((err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {

      return res.status(200).send(data);
    }
  });
});



const nvrestSchema = {
  rest_name: String,
  values: Object,
};
const restaurant_data = mongoose.model("nvcollections", nvrestSchema);


app.post("/eatngo", (req, res) => {
  restaurant_data.findOne({rest_name:"Eat N Go"},(err, data) => {
    eatngodata.push(data);
   res.redirect("../Restaurant/resthome.html");
  });
});



app.post("/cartdel",(req,res)=>{
  var MongoClient = require("mongodb").MongoClient;
  var url =
    "mongodb+srv://nishith:nishith@cluster0.jbk6vzi.mongodb.net/FoodCornerDB";

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("FoodCornerDB");
    dbo.dropCollection("cartdets", function (err, delOK) {
      if(cart_check.length!=0)
      {
        if (delOK) {
          res.redirect("../Login/login.html");
        } else {
          res.redirect("../Outputs/error.html");
        }

      }
      else{
        res.redirect("../Outputs/error.html");
      }
      
    });
  });
});

app.post("/adminchange",(req,res)=> {
  console.log(req.body.adminid);
  newfeeds.find({_id: req.body.adminid}).deleteOne((err,data)=> {
     if (err) {
       return res.status(500).send(err);
     } else {
       console.log(data);
       return res.status(200);
     }
  });
  res.redirect("index.html");
});

app.post("/deletearticle", (req, res) => {
  newBlog
    .find({ title: { $regex: req.body.delArt, $options: "i" } })
    .deleteOne((err, data) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        console.log(data);
        return res.status(200);
      }
    });
});

app.post("/login", (req,res) => {
  newUser.findOne({phoneno:req.body.uid,password: req.body.pwd},(err,data) =>{
    
    if(data!=null)
    {
     
      res.redirect("../Outputs/success.html");
    }
    else
    {
      res.redirect("../Outputs/error.html");
    }
  });

});

app.post("/success",(req,res)=>{
  res.redirect("/");
});

app.post("/tasteontruck", (req, res) => {
  restaurant_data.findOne({ rest_name: "Taste On Truck" }, (err, data) => {
    tasteontruckdata.push(data);
    res.redirect("../Restaurant/resthome.html");
  });
});

app.post("/maduraijigar", (req, res) => {
  restaurant_data.findOne({ rest_name: "Madurai Jigarthanda" }, (err, data) => {
    maduraijigardata.push(data);
    res.redirect("../Restaurant/resthome.html");
  });
});

app.post("/linda", (req, res) => {
  restaurant_data.findOne({ rest_name: "Linda" }, (err, data) => {
    lindadata.push(data);
    res.redirect("../Restaurant/resthome.html");
  });
});

app.post("/manimess", (req, res) => {
  restaurant_data.findOne({ rest_name: "Mani Mess" }, (err, data) => {
    manimessdata.push(data);
    res.redirect("../Restaurant/resthome.html");
  });
});

app.get("/restdetails",(req,res)=>{

  if (eatngodata.length) {
    eatngodata=[];
    restaurant_data.findOne({ rest_name: "Eat N Go" }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        data1 = [data];
        return res.status(200).send(data1);
      }
    });
  } else if (tasteontruckdata.length) {
    tasteontruckdata=[];
    restaurant_data.findOne({ rest_name: "Taste On Truck" }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        data1 = [data];
        return res.status(200).send(data1);
      }
    });
  } else if (maduraijigardata.length) {
    maduraijigardata=[];
    restaurant_data.findOne(
      { rest_name: "Madurai Jigarthanda" },
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        } else {
          data1 = [data];
          return res.status(200).send(data1);
        }
      }
    );
  } else if (lindadata.length) {
    lindadata=[];
    restaurant_data.findOne({ rest_name: "Linda" }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        data1 = [data];
        return res.status(200).send(data1);
      }
    });
  } else if (manimessdata.length) {
    manimessdata=[];
    restaurant_data.findOne({ rest_name: "Mani Mess" }, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        data1 = [data];
        return res.status(200).send(data1);
      }
    });
  }
});






app.listen(3000, function () {
  console.log("server is running on 3000");
});