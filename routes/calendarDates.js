const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");
const risnovaConnection = require("../config/risnovaConnection");

// Get all courses
Router.get("/", (req, res) => {
  mysqlConnection.query(
    `SELECT collaborator.name, collaborator.surname, collaborator_has_courses.collaborator_id, collaborator_has_courses.courses_id ,
    courses.name as courseName, collaborator_has_courses.certification_date, collaborator_has_courses.expiration_date
    FROM collaborator_has_courses
    LEFT OUTER JOIN collaborator ON collaborator.id = collaborator_has_courses.collaborator_id
    LEFT OUTER JOIN courses ON courses.id = collaborator_has_courses.courses_id`,
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
