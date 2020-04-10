const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

// Get all qualifications
Router.get("/", (req, res) => {
  mysqlConnection.query(
    `SELECT qualification.id, qualification.name,
    group_concat(distinct collaborator.name  , " ",collaborator.surname separator ', ') AS collaborator,
    group_concat(distinct necessary_courses.name separator ', ') AS necessary_courses
    FROM qualification
    LEFT OUTER JOIN collaborator ON collaborator.id=qualification.collaborator_id
    LEFT OUTER join necessary_courses ON necessary_courses.qualification_id=qualification.id
    group by qualification.name`,

    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// //aggiungi un corso ad un collaboratore
Router.post("/addQualification", (req, res) => {
  ////////////aggiungere ciclo for per aggiungere i corsi necessari
  const newCourse = req.body;
  const sql = `BEGIN;
    INSERT INTO qualification (name) VALUES('nome della qualifica');
    INSERT INTO necessary_courses (qualification_id, name) VALUES`;

  for (let i = 0; i < req.body.lenght; i++) {
    sql += `(LAST_INSERT_ID(),'${req.body[i].name}')`;
  }

  sql += `;COMMIT;`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// //aggiungi un corso ad un collaboratore
Router.post("/addQualificationToCollaborator", (req, res) => {
  const newQualification = req.body;

  console.log(newQualification);
  const sql = `insert into qualification(qualification.name, qualification.collaborator_id) values
  ("${newQualification.name}", ${newQualification.collaborator_id})`;

  mysqlConnection.query(sql, newQualification, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `select qualification.id, qualification.name, qualification.collaborator_id from qualification
    where qualification.collaborator_id = ${req.params.id}`,
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
