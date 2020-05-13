const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

Router.post("/addNecessaryCourses/:id", (req, res) => {
  const listOfId = req.body;
  var sql = `INSERT INTO collaborator_has_courses (collaborator_id, course_id) VALUES `;
  listOfId.forEach(myFunction);
  function myFunction(value, index, array) {
    sql += `( '${req.params.id}', '${value}');`;
    if (index != listOfId.length - 1) sql += ",";
  }

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
  });
});

Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT courses_has_qualification.courses_id from courses_has_qualification
    where courses_has_qualification.qualification_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

Router.post("/qualificationCourses", (req, res) => {
  var list = req.body;
  var sql = "";
  list.forEach(myFunction);
  function myFunction(value, index, array) {
    sql += `SELECT courses_has_qualification.courses_id FROM qualification_has_collaborator
    inner  join qualification on qualification.id = qualification_has_collaborator.qualification_id
    inner join courses_has_qualification on courses_has_qualification.qualification_id = qualification.id
    where qualification_has_collaborator.collaborator_id = '${value.id}';`;
  }

  mysqlConnection.query(sql, function (error, results, fields) {
    if (error) throw error;

    res.send(results);
  });
});

Router.get("/qualificationCourses/:id", (req, res) => {
  // list.forEach(myFunction);
  // function myFunction(value, index, array) {
  var sql = `SELECT courses_has_qualification.courses_id FROM qualification_has_collaborator
    inner  join qualification on qualification.id = qualification_has_collaborator.qualification_id
    inner join courses_has_qualification on courses_has_qualification.qualification_id = qualification.id
    where qualification_has_collaborator.collaborator_id = '${req.params.id}';`;
  // }

  mysqlConnection.query(sql, function (error, results, fields) {
    if (error) throw error;

    res.send(results);
  });
});

Router.get("/", (req, res) => {
  mysqlConnection.query(
    `SELECT * from courses_has_qualification`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;
