const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");
const risnovaConnection = require("../config/risnovaConnection");

Router.post("/addCourse", (req, res) => {
  const newCourse = req.body;
  console.log(newCourse);
  const sql =
    `INSERT INTO history_courses(name, certification_date, expiration_date, collaborator_id) VALUES` +
    ` ( (select courses.name from courses where courses.id=${newCourse.course_id}), '${newCourse.certificationDate}', '${newCourse.expirationDate}', ${newCourse.collaborator_id})`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// Router.delete("/:id", (req, res) => {
//   mysqlConnection.query(
//     `DELETE FROM history_courses WHERE id = ${req.params.id}`,
//     (err, rows, fields) => {
//       if (!err) {
//         res.send(rows);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// // modifica corso storico
// Router.post("/modifyHistoryCourse/:id", (req, res) => {
//   const newCourse = req.body;
//   console.log(newCourse);

//   const sql = `UPDATE history_courses SET name='${newCourse.name}', certification_date = '${newCourse.certificationDate}', expiration_date = '${newCourse.expirationDate}' WHERE id ='${req.params.id}'`;

//   console.log(sql);
//   mysqlConnection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// });

// // modifica da storico a corrente
// Router.post("/modifyFromHistoryToCurrent/:id", (req, res) => {
//   const newCourse = req.body;
//   console.log(newCourse);

//   const sql = `insert into extra_courses (name, certification_date, expiration_date, collaborator_id)
//   VALUES ('${newCourse.name}', '${newCourse.certificationDate}', '${newCourse.expirationDate}', '${newCourse.collaborator_id}');
//   DELETE FROM history_courses WHERE id = '${req.params.id}';`;

//   mysqlConnection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// });

// // // modifica da storico a necessario
// Router.post("/modifyFromHistoryToNecessary/:id", (req, res) => {
//   const newCourse = req.body;
//   console.log(newCourse);

//   const sql = `insert into necessary_courses (name, certification_date, expiration_date, qualification_id)
//   VALUES ('${newCourse.name}', '${newCourse.certificationDate}', '${newCourse.expirationDate}', (select id from qualification where collaborator_id = '${newCourse.collaborator_id}'));
//   DELETE FROM history_courses WHERE id = '${req.params.id}' ;`;

//   mysqlConnection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });
// });

module.exports = Router;
