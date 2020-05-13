const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

Router.get("/:id", (req, res) => {
  var sql = `select collaborator_has_courses.courses_id from collaborator_has_courses
  where collaborator_id = ${req.params.id}`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

Router.post("/", (req, res) => {
  console.log("dentroooooooooooooooooooooooooooo");

  const item = req.body;
  console.log(item);
  var sql = "";
  item.listOfCoursesId.forEach(myFunction);
  function myFunction(value, index, array) {
    sql += `insert into collaborator_has_courses (collaborator_id, courses_id) values ('${item.collaborator_id}','${value}');`;
  }

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(err);
  });
});

module.exports = Router;
