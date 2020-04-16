// INSERT INTO necessary_courses (name, certification_date, expiration_date, qualification_id) VALUES
// ('Prova','2014-07-08','2016-08-09', (SELECT qualification.id FROM qualification WHERE qualification.collaborator_id = 1));

const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");
const risnovaConnection = require("../config/risnovaConnection");

Router.post("/addCourse", (req, res) => {
  const newCourse = req.body;
  const sql = `INSERT INTO necessary_courses (name, certification_date, expiration_date, qualification_id) VALUES 
    ('${newCourse.name}','${newCourse.certificationDate}','${newCourse.expirationDate}', (SELECT qualification.id FROM qualification WHERE qualification.collaborator_id = ${newCourse.collaborator_id}));`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

Router.delete("/:id", (req, res) => {
  mysqlConnection.query(
    `DELETE FROM necessary_courses WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// modifica corso necessario
Router.post("/modifyNecessaryCourse/:id", (req, res) => {
  const newCourse = req.body;
  console.log(newCourse);

  const sql = `UPDATE necessary_courses SET name='${newCourse.name}', certification_date = '${newCourse.certificationDate}', expiration_date = '${newCourse.expirationDate}' WHERE id = '${req.params.id}'`;

  console.log(sql);
  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// // modifica da necessario a corrente
Router.post("/modifyFromNecessaryToCurrent/:id", (req, res) => {
  const newCourse = req.body;
  console.log(newCourse);

  const sql = `insert into extra_courses (name, certification_date, expiration_date, collaborator_id)
  VALUES ('${newCourse.name}', '${newCourse.certificationDate}', '${newCourse.expirationDate}', '${newCourse.collaborator_id}');
  DELETE FROM necessary_courses WHERE id = '${req.params.id}';`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// modifica da necessario a storico
Router.post("/modifyFromNecessaryToHistory/:id", (req, res) => {
  const newCourse = req.body;
  console.log(newCourse);

  const sql = `insert into history_courses (name, certification_date, expiration_date, collaborator_id)
  VALUES ('${newCourse.name}', '${newCourse.certificationDate}', '${newCourse.expirationDate}', '${newCourse.collaborator_id}');
  DELETE FROM necessary_courses WHERE id = '${req.params.id}' ;`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

module.exports = Router;
