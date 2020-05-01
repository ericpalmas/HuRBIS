const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

// Get all qualifications
Router.get("/", (req, res) => {
  mysqlConnection.query(
    `SELECT qualification.id, qualification.name,
    group_concat(distinct collaborator.name  , " ",collaborator.surname separator ', ') AS collaborator,
    group_concat(distinct courses.name separator ', ') AS courses
    FROM qualification
    LEFT OUTER JOIN qualification_has_collaborator ON qualification_has_collaborator.qualification_id = qualification.id
    LEFT OUTER JOIN collaborator ON collaborator.id = qualification_has_collaborator.collaborator_id
    LEFT OUTER JOIN courses_has_qualification ON courses_has_qualification.qualification_id = qualification.id
    LEFT OUTER JOIN courses ON courses.id = courses_has_qualification.courses_id
    group by qualification.id`,

    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

Router.get("/allQualification", (req, res) => {
  mysqlConnection.query(
    `SELECT qualification.id, qualification.name from qualification`,

    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//aggiungi i corsi necessari di una qualifica
Router.post("/addQualification", (req, res) => {
  const newQualification = req.body;
  var sql = `INSERT INTO qualification (name) VALUES ('${newQualification.name}');`;
  newQualification.listOfId.forEach(myFunction);
  function myFunction(value, index, array) {
    console.log(value.corso);
    sql += `INSERT INTO courses_has_qualification (qualification_id, courses_id) VALUES ( (SELECT MAX(id)  FROM qualification), '${value.corso}');`;
  }

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log(err);
  });
});

// //aggiungi una qualifica ad un collaboratore
Router.post("/addQualificationToCollaborator", (req, res) => {
  const newQualification = req.body;
  console.log(newQualification);

  const sql = `insert into qualification_has_collaborator (qualification_id, collaborator_id) 
  values ("${newQualification.qualification_id}","${newQualification.collaborator_id}")`;

  mysqlConnection.query(sql, newQualification, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

Router.post("/removeQualifications", (req, res) => {
  const listOfId = req.body;
  //console.log(listOfId);
  var sql = ``;
  listOfId.qualifications_id.forEach(myFunction);
  function myFunction(value, index, array) {
    sql += `DELETE FROM qualification_has_collaborator WHERE qualification_id='${value}' and collaborator_id='${listOfId.collaborator_id}';`;
  }

  console.log(sql);
  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `select qualification.id, qualification.name from qualification_has_collaborator 
    INNER JOIN qualification ON qualification_has_collaborator.qualification_id = qualification.id
    where qualification_has_collaborator.collaborator_id = ${req.params.id}`,
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

Router.post("/removeQualificationsAndCourses", (req, res) => {
  qualifications = req.body;
  var sql = "DELETE FROM qualification WHERE qualification.name IN (";
  qualifications.forEach(myFunction);
  function myFunction(value, index, array) {
    sql += `'` + value + `'`;
    if (index !== qualifications.length - 1) sql += ",";
  }
  sql += ")";

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// Router.get("collaboratorId/:id", (req, res) => {
//   mysqlConnection.query(
//     `select qualification.collaborator_id from qualification where qualification.id = ${req.params.id}`,
//     (err, rows, fields) => {
//       if (!err) {
//         res.send(rows);
//         console.log(rows);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

module.exports = Router;
