const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");
const risnovaConnection = require("../config/risnovaConnection");

Router.post("/addCourse", (req, res) => {
  const newCourse = req.body;
  console.log(newCourse);

  //   INSERT INTO history_courses(name, certification_date, expiration_date, collaborator_id, course_id) VALUES
  // ((select courses.name from courses where courses.id='2'), '2017-02-02', '2018-02-02', 1, 2)
  const sql =
    `INSERT INTO history_courses(name, certification_date, expiration_date, collaborator_id, course_id) VALUES` +
    ` ((select courses.name from courses where courses.id=${newCourse.course_id}), '${newCourse.certificationDate}', '${newCourse.expirationDate}', ${newCourse.collaborator_id}, ${newCourse.course_id})`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// Get all courses
Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM history_courses 
    where history_courses.collaborator_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Router.post("/", (req, res) => {
//   var courses = req.body;
//   console.log(courses);
//   var sql = "";
//   courses.forEach(myFunction);
//   function myFunction(value, index, array) {
//     console.log(value.name);
//     sql += `(SELECT collaborator.id as collaborator_id, collaborator.name, history_courses.name as course_id, max(history_courses.certification_date) as max_certification FROM collaborator
//     left outer join history_courses on history_courses.collaborator_id = collaborator.id
//     where history_courses.name = '${value.name}' and collaborator.removed = 0
//     group by collaborator.id)`;
//     if (courses.length - 1 != index) {
//       sql += `union all`;
//     }
//   }

//   mysqlConnection.query(sql, (err, result) => {
//     if (err) throw err;
//     else res.send(result);
//     console.log(result);
//   });
// });

Router.post("/", (req, res) => {
  var list = req.body;
  console.log(list);

  var sql = "";
  list.forEach(myFunction);
  function myFunction(value, index, array) {
    console.log(value.id);
    sql += `(select t.collaborator_id, t.collaborator_name, t.certification_date from
      ((select collaborator.id as collaborator_id, collaborator.name as collaborator_name,  max(history_courses.certification_date) as certification_date from collaborator
      left outer join history_courses on history_courses.collaborator_id = collaborator.id
      where history_courses.course_id ='${value.id}' and  collaborator.removed='0'
      group by collaborator.id)
      union all
      (select collaborator.id as collaborator_id, collaborator.name as collaborator_name,  null as certification_date from collaborator
      left outer join history_courses on history_courses.collaborator_id = collaborator.id
      where collaborator.removed = '0'
      group by collaborator.id) ) as t 
      order by t.collaborator_id);`;
  }

  mysqlConnection.query(sql, function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = Router;
