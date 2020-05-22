const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

Router.post("/addCourse", (req, res) => {
  const newCourse = req.body;

  console.log(newCourse);

  const sql =
    `INSERT INTO history_courses(name, certification_date, expiration_date, collaborator_id, course_id, cost) VALUES` +
    `((select courses.name from courses where courses.id=${newCourse.course_id}), '${newCourse.certificationDate}',  '${newCourse.expirationDate}', ${newCourse.collaborator_id}, ${newCourse.course_id}, ${newCourse.cost})`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
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

Router.post("/", (req, res) => {
  var list = req.body;

  var sql = "";
  list.forEach(myFunction);
  function myFunction(value, index, array) {
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
