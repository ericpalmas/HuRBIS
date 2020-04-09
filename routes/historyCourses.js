const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");
const risnovaConnection = require("../config/risnovaConnection");

Router.post("/addCourse", (req, res) => {
  const newCourse = req.body;
  const sql =
    `INSERT INTO history_courses(name, certification_date, expiration_date, obbligatory, collaborator_id) VALUES` +
    ` ('${newCourse.name}', '${newCourse.certificationDate}', '${newCourse.expirationDate}', ${newCourse.obbligatory}, ${newCourse.collaborator_id})`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

Router.delete("/:id", (req, res) => {
  mysqlConnection.query(
    `DELETE FROM history_courses WHERE id = ${req.params.id}`,
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
