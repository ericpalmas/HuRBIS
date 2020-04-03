const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

// Get all qualifications
Router.get("/", (req, res) => {
  mysqlConnection.query(
    "select * from qualification order by collaborator_id;",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Get all qualifications
Router.get("/informations", (req, res) => {
  mysqlConnection.query(
    `SELECT qualification.id, qualification.name,
     group_concat(distinct collaborator.name separator ',' ) AS nome,
     group_concat(distinct collaborator.surname separator ',' ) AS cognome,
     group_concat(distinct courses.name separator ',' ) AS courses
     from qualification
     INNER JOIN collaborator ON collaborator.id = qualification.collaborator_id
     INNER JOIN courses ON courses.collaborator_id = qualification.collaborator_id
     group by qualification.id`,

    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;
