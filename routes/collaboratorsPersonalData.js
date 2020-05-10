const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

// Get all collaborators infos
Router.get("/", (req, res) => {
  var sql = `SELECT collaborator.id, collaborator.name, collaborator.surname, collaborator.yearOfBirth, collaborator.removed, min(if(courses.removed=0, expiration_date, null)) as min_expiration_date,
  group_concat(distinct qualification.name separator ', ') AS qualification,
  GROUP_CONCAT(distinct IF(courses.removed=0 and CURDATE() > collaborator_has_courses.certification_date and CURDATE() < collaborator_has_courses.expiration_date,  courses.name, null) SEPARATOR ', ')  as courses
  from collaborator
  LEFT OUTER JOIN collaborator_has_courses ON collaborator_has_courses.collaborator_id = collaborator.id
  LEFT OUTER JOIN courses ON courses.id = collaborator_has_courses.courses_id
  LEFT OUTER JOIN qualification_has_collaborator ON qualification_has_collaborator.collaborator_id = collaborator.id
  LEFT OUTER JOIN qualification ON qualification.id = qualification_has_collaborator.qualification_id
  group by collaborator.id`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

// Get all courses
Router.get("/allDates", (req, res) => {
  var sql = `SELECT collaborator.name, collaborator.surname, collaborator_has_courses.collaborator_id, collaborator_has_courses.courses_id ,
  courses.name as courseName, collaborator_has_courses.certification_date, collaborator_has_courses.expiration_date
  FROM collaborator_has_courses
  LEFT OUTER JOIN collaborator ON collaborator.id = collaborator_has_courses.collaborator_id
  LEFT OUTER JOIN courses ON courses.id = collaborator_has_courses.courses_id
  where courses.removed = 0`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

Router.get("/collaborators", (req, res) => {
  var sql = `SELECT qualification.name as qualName, collaborator.name, collaborator.surname, collaborator.yearOfBirth, collaborator.removed,
  group_concat(distinct courses.id separator ', ') AS courses
  from collaborator
  LEFT OUTER JOIN collaborator_has_courses ON collaborator_has_courses.collaborator_id = collaborator.id
  LEFT OUTER JOIN courses ON courses.id = collaborator_has_courses.courses_id
  LEFT OUTER JOIN qualification_has_collaborator ON qualification_has_collaborator.collaborator_id = collaborator.id
  LEFT OUTER JOIN qualification ON qualification.id = qualification_has_collaborator.qualification_id
  group by collaborator.id`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

module.exports = Router;
