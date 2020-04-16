const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

// Get all courses
Router.get("/", (req, res) => {
  mysqlConnection.query(
    `SELECT courses.name, courses.cost,
    group_concat(distinct collaborator.name, " ", collaborator.surname separator ', ') AS collaborator,
    group_concat(distinct qualification.name separator ', ') AS qualification
    from courses
    LEFT OUTER JOIN collaborator_has_courses ON collaborator_has_courses.courses_id = courses.id
    LEFT OUTER JOIN collaborator ON collaborator.id = collaborator_has_courses.collaborator_id
    LEFT OUTER JOIN courses_has_qualification ON courses_has_qualification.courses_id = courses.id
    LEFT OUTER JOIN qualification ON qualification.id = courses_has_qualification.qualification_id
    group by courses.id`,
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
