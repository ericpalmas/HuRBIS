const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

// // Get all courses
// Router.get("/", (req, res) => {
//   mysqlConnection.query(
//     "select *  from courses order by collaborator_id;",
//     (err, rows, fields) => {
//       if (!err) {
//         res.send(rows);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// //aggiungi un corso ad un collaboratore
Router.post("/addCourse", (req, res) => {
  const newCourse = req.body;
  const sql =
    `INSERT INTO extra_courses(name, certification_date, expiration_date, obbligatory, collaborator_id) VALUES` +
    ` ('${newCourse.name}', '${newCourse.certificationDate}', '${newCourse.expirationDate}', ${newCourse.obbligatory}, ${newCourse.collaborator_id})`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// // // Delete a collaborator from the dabase
Router.delete("/:id", (req, res) => {
  mysqlConnection.query(
    `DELETE FROM extra_courses WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// // // Get all courses
// Router.get("/informations", (req, res) => {
//   mysqlConnection.query(
//     `SELECT extra_courses.name,
//     group_concat(distinct collaborator.name separator ',') AS collaborator
//     from extra_courses
//     LEFT OUTER JOIN collaborator ON collaborator.id=extra_courses.collaborator_id
//     group by extra_courses.id`,
//     (err, rows, fields) => {
//       if (!err) {
//         res.send(rows);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// Corsi di un collaboratore
Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `select necessary_courses.id, necessary_courses.name, necessary_courses.certification_date, necessary_courses.expiration_date,
    necessary_courses.obbligatory
    from necessary_courses 
    INNER JOIN qualification ON qualification.id=necessary_courses.qualification_id
    INNER JOIN collaborator ON collaborator.id=qualification.collaborator_id
    WHERE collaborator.id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

Router.get("/history/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM training_courses.history_courses
    where collaborator_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

Router.get("/current/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM training_courses.extra_courses
    where collaborator_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

Router.get("/necessary/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT necessary_courses.id, necessary_courses.name, necessary_courses.certification_date, necessary_courses.expiration_date FROM necessary_courses
    INNER JOIN qualification ON qualification.id=necessary_courses.qualification_id
    where qualification.collaborator_id = ${req.params.id}`,
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
