const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");
const risnovaConnection = require("../config/risnovaConnection");

// Get all collaborators infos
Router.get("/", (req, res) => {
  mysqlConnection.query(
    "SELECT collaborator.id, collaborator.name, collaborator.surname," +
      " group_concat(distinct courses.name separator ',') AS courses," +
      " group_concat(distinct qualification.name separator ',') AS qualification" +
      " from collaborator" +
      " INNER JOIN courses ON courses.collaborator_id=collaborator.id" +
      " INNER JOIN qualification ON qualification.collaborator_id=collaborator.id group by collaborator.id",

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
