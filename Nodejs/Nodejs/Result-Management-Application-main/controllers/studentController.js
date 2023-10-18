//importing student model
/*
const Student = require('../models/student');

const student_login_get = (req, res) => {
       res.render("student/login");
    };

const student_login_post = async (req, res) => {

        const Sturoll = req.body.roll;   
        const individualStudent = await Student.findOne({roll : Sturoll});    
        if(!individualStudent){
          res.render("student/login", {
            error : "Login with correct roll number"
          })
        }      
        res.render("student/view", { one : individualStudent});
    };

//exporting student controller functions
module.exports={
    student_login_get,
    student_login_post
}

*/


const mysql = require("mysql2");
const Student = require("../models/student"); // Import your Student model if needed

// Create MySQL connection pool
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nodejs", // Assuming your database name is "nodejs"
});

const student_login_get = (req, res) => {
    res.render("student/login");
};

const student_login_post = async (req, res) => {

  const rollnum = req.body.Rollnum;
  const dob = req.body.DOB;
  console.log(dob)
  db.query("SELECT * FROM student WHERE Rollnum = ? AND DOB= ?", [rollnum,dob], (error, results) => {
      if (error) {
          console.error("MySQL Error:", error);
          res.status(500).render("error", { error: "An error occurred" });
      } else {
          const individualStudent = results[0]; // Access the first element of the results array
          if (!individualStudent) {
              res.render("student/login", {
                  error: "Login with correct roll number"
              });
          } else {
              res.render("student/view", { student: individualStudent });
          }
      }
  });
};

// Export the student controller functions
module.exports = {
    student_login_get,
    student_login_post
};