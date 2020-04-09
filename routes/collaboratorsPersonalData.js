const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");
const risnovaConnection = require("../config/risnovaConnection");

// Get all collaborators infos
Router.get("/", (req, res) => {
  mysqlConnection.query(
    `SELECT collaborator.id, collaborator.name, collaborator.surname, collaborator.yearOfBirth,
    group_concat(distinct qualification.name separator ', ') AS qualification,
    group_concat(distinct extra_courses.name separator ', ') AS extra_courses,
    group_concat(distinct necessary_courses.name separator ',') AS necessary_courses
    from collaborator
    LEFT OUTER JOIN extra_courses ON extra_courses.collaborator_id=collaborator.id
    LEFT OUTER JOIN qualification ON qualification.collaborator_id=collaborator.id 
    LEFT OUTER JOIN necessary_courses ON necessary_courses.qualification_id=qualification.id
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
