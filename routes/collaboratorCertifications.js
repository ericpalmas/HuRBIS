const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

Router.post("/", (req, res) => {
  var list = req.body;
  //   console.log(list);

  var sql = "";
  list.forEach(myFunction);
  function myFunction(value, index, array) {
    console.log(value.id);
    sql += `(select DISTINCT (t.id), t.name, t.min_certification from
    ((SELECT collaborator.id, collaborator.name, min(collaborator_has_courses.certification_date) as min_certification FROM collaborator
    left outer join collaborator_has_courses on collaborator_has_courses.collaborator_id = collaborator.id
    where collaborator_has_courses.courses_id = '${value.id}' and collaborator.removed = 0
    group by id)
    union
    (SELECT collaborator.id, collaborator.name, null as min_certification FROM collaborator
    left outer join collaborator_has_courses on collaborator_has_courses.collaborator_id = collaborator.id
    where collaborator.removed = 0
    group by id) ) as t
    order by id);`;
  }

  mysqlConnection.query(sql, function (error, results, fields) {
    if (error) throw error;
    // `results` is an array with one element for every statement in the query:
    // console.log(results);
    res.send(results);
  });
});

// Get infos of one collaborator
Router.get("/infos", (req, res) => {
  mysqlConnection.query(
    `SELECT  group_concat(distinct qualification.name separator ',') AS qualification,
      collaborator.surname, collaborator.name, collaborator.yearOfBirth
      from collaborator
      LEFT OUTER JOIN qualification_has_collaborator ON qualification_has_collaborator.collaborator_id = collaborator.id
      LEFT OUTER JOIN qualification ON qualification_has_collaborator.qualification_id = qualification.id
      where collaborator.removed = 0
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
