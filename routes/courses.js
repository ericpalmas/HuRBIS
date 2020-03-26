const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

// Get all courses
Router.get("/", (req, res) => {
  mysqlConnection.query(
    "select *  from courses order by collaborator_id;",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//aggiungi un corso ad un collaboratore
Router.post("/addCourse", (req, res) => {
  const newCourse = req.body;
  const sql =
    `INSERT INTO courses(name, certification_date, expiration_date, obbligatory, collaborator_id) VALUES` +
    ` ('${newCourse.name}', '${newCourse.certificationDate}', '${newCourse.expirationDate}', ${newCourse.obbligatory}, ${newCourse.collaborator_id})`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// // Delete a collaborator from the dabase
Router.delete("/:id", (req, res) => {
  mysqlConnection.query(
    `DELETE FROM courses WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Corsi di un collaboratore
Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `select * from courses WHERE collaborator_id = ${req.params.id}`,
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
