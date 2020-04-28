const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

// Get single collaborator
Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `select collaborator_has_courses.courses_id from collaborator_has_courses
    where collaborator_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//insert into collaborator_has_courses (collaborator_id, courses_id) values ('1','1');

Router.post("/", (req, res) => {
  const item = req.body;
  var sql = "";
  item.listOfCoursesId.forEach(myFunction);
  function myFunction(value, index, array) {
    //console.log(value.corso);
    sql += `insert into collaborator_has_courses (collaborator_id, courses_id) values ('${item.collaborator_id}','${value}');`;
  }

  //console.log(sql);
  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    //console.log(result);
    console.log(err);
  });
});

module.exports = Router;
