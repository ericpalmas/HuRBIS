const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");
const risnovaConnection = require("../config/risnovaConnection");

// Get all collaborators
Router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * from collaborator", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// // Get single collaborator
// Router.get("/:id", (req, res) => {
//   mysqlConnection.query(
//     `SELECT * FROM collaborator WHERE id = ${req.params.id}`,
//     (err, rows, fields) => {
//       if (!err) {
//         res.send(rows);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// Add a collaborator to the database
Router.post("/", (req, res) => {
  const newCollaborator = req.body;
  console.log(newCollaborator);
  const sql =
    `INSERT INTO collaborator(name, surname, yearOfBirth) VALUES` +
    `('${newCollaborator.name}', '${newCollaborator.surname}', '${newCollaborator.yearOfBirth}')`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// Delete a collaborator from the dabase
Router.delete("/:id", (req, res) => {
  mysqlConnection.query(
    `UPDATE collaborator SET removed='1' WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Get infos of one collaborator
Router.get("/infos/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT collaborator.id, collaborator.name, collaborator.surname,
    group_concat(distinct qualification.name separator ',') AS qualification
    from collaborator
    LEFT OUTER JOIN qualification_has_collaborator ON qualification_has_collaborator.collaborator_id = collaborator.id
    LEFT OUTER JOIN qualification ON qualification_has_collaborator.qualification_id = qualification.id
    WHERE collaborator.id = ${req.params.id}
    GROUP BY collaborator.id`,
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
