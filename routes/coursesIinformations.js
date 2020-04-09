const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

// Get all courses
Router.get("/", (req, res) => {
  mysqlConnection.query(
    `SELECT extra_courses.name,
    group_concat(distinct collaborator.name separator ', ') AS collaborator
    from extra_courses
    LEFT OUTER JOIN collaborator ON collaborator.id=extra_courses.collaborator_id
    group by extra_courses.name`,
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
