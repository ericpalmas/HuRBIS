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

// Get single course
Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM courses WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Add a course to the database
Router.post("/", (req, res) => {
  const newCollaborator = {
    id: req.body.id,
    name: req.body.name,
    surname: req.body.surname
  };
  const sqlInstruction = "INSERT INTO courses SET ?";
  const query = mysqlConnection.query(
    sqlInstruction,
    newCollaborator,
    (err, result, rows) => {
      if (err) throw err;
      console.log(result);
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

// Delete a collaborator from the dabase
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

// Corsi già svolti da un collaboratore
Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM courses WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Corsi in svolgimento da un collaboratore

// Corsi ancora da svolgere da un collaboratore

module.exports = Router;
