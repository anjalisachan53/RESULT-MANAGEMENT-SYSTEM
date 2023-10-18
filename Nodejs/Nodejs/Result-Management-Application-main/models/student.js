
/*
const mongoose = require("mongoose")
// schema represents the structure of a particular document
// Each schema maps to a MongoDB collection
const { Schema } = mongoose;

//Student schema
const studentSchema = new Schema({
  roll: {
    type : Number,
    unique : true
  } ,
  name: String,     
  dob:{
    type:Date
  } ,
  score:Number 
});

//exporting the model
// A model defines a programming interface for interacting with the database (read, insert, update, etc).
module.exports = mongoose.model("Student", studentSchema)

*/


const express = require("express");
const router = express.Router();
const studentSchema = require("../models/student");

// Example route to create a student
router.post("/create", (req, res) => {
  const newStudent = {
    Rollnum: req.body.Rollnum,
    Name: req.body.Name,
    DOB: req.body.DOB,
    Score: req.body.Score,
  };

  studentSchema.create(newStudent, (error, result) => {
    if (error) {
      res.status(500).json({ error: "An error occurred" });
    } else {
      res.status(200).json({ message: "Student created successfully" });
    }
  });
});

// Add other routes as needed

module.exports = router;
