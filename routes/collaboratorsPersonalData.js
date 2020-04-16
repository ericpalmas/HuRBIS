const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");
const risnovaConnection = require("../config/risnovaConnection");

// Get all collaborators infos
Router.get("/", (req, res) => {
  mysqlConnection.query(
    `SELECT collaborator.id, collaborator.name, collaborator.surname, collaborator.yearOfBirth,
    group_concat(distinct qualification.name separator ', ') AS qualification,
    group_concat(distinct courses.name separator ', ') AS courses
    from collaborator
    LEFT OUTER JOIN collaborator_has_courses ON collaborator_has_courses.collaborator_id = collaborator.id
    LEFT OUTER JOIN courses ON courses.id = collaborator_has_courses.courses_id
    LEFT OUTER JOIN qualification_has_collaborator ON qualification_has_collaborator.collaborator_id = collaborator.id
    LEFT OUTER JOIN qualification ON qualification.id = qualification_has_collaborator.qualification_id
    group by collaborator.id`,

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
