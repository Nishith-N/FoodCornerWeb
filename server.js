const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/FoodCornerWeb")
  .then((res) => {
    console.log("Connected to mongodb.");
  })
  .catch((error) => console.log(error));
app.use(express.json());
app.use(express.static("public"));

// Mongoose model
const Todo = require("./models/Todo.js");
app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.get("/api/todo", (req, res) => {
  Todo.find({})
    .then((todos) => {
      res.status(200).json(todos);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
});
app.post("/api/todo", (req, res) => {
  const todo = new Todo({
    ...req.body,
  });
  todo
    .save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
});

app.put('/api/todo', (req, res) => { 
     const todo = { 
          name: req.body.todo, 
          isCompleted: req.body.isCompleted 
     } 
     Todo.findByIdAndUpdate(req.body._id, todo, { new: true }) 
     .then(updatedTodo => { 
          res.json(updatedTodo)
      }) 
      .catch(error => { 
          console.log(err) 
          res.status(400).json({ error: err.message }) 
     }) 
}) 
const PORT = process.env.PORT || 3000 
app.listen(PORT, () => { 
     console.log(`Server running on port ${PORT}`)
 })
