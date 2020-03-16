const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

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

// Get single collaborator
Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM collaborator WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Add a collaborator to the database
Router.post("/", (req, res) => {
  const newCollaborator = {
    id: req.body.id,
    name: req.body.name,
    surname: req.body.surname
  };
  const sqlInstruction = "INSERT INTO collaborator SET ?";
  const query = mysqlConnection.query(
    sqlInstruction,
    newCollaborator,
    (err, result, rows) => {
      if (err) throw err;
      console.log(result);
    }
  );
});

// Delete a collaborator from the dabase
Router.delete("/:id", (req, res) => {
  mysqlConnection.query(
    `DELETE FROM collaborator WHERE id = ${req.params.id}`,
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
