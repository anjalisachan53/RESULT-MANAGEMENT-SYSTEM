const express = require("express");
//express app
const mysql = require("mysql2");
const app = express();

const port = 3003;
/*
const mongoose = require('mongoose'); //to connect to mongodb

//connect to mongodb and listen to requests
mongoose.connect("mongodb+srv://Nitin:GTQfE6gxsdfRHAKR@cluster0.wojttxl.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected"));
*/

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodejs",
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL2:", err);
  } else {
    console.log("Connected to MySQL2");
  }
});

//register view engine
app.set('view engine', 'ejs');
//middleware and static files
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

//teacher and student routes
const teachRoutes = require("./routes/teacherRoutes")
const studRoutes = require("./routes/studentRoutes")
app.use("/teacher",teachRoutes);
app.use("/student",studRoutes);

//routes
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
