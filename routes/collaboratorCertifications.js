const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

Router.post("/", (req, res) => {
  var list = req.body;

  var sql = "";
  list.forEach(myFunction);
  function myFunction(value, index, array) {
    sql += `(select DISTINCT (t.id), t.name, t.course_name, t.min_certification from
    ((SELECT collaborator.id, collaborator.name, courses.name as course_name, min(collaborator_has_courses.certification_date) as min_certification FROM collaborator
    left outer join collaborator_has_courses on collaborator_has_courses.collaborator_id = collaborator.id
    left outer join courses on courses.id = collaborator_has_courses.courses_id
    where collaborator_has_courses.courses_id = '${value.id}' and collaborator.removed = 0
    group by collaborator.id)
    union
    (SELECT collaborator.id, collaborator.name, courses.name as course_name, null as min_certification FROM collaborator
    left outer join collaborator_has_courses on collaborator_has_courses.collaborator_id = collaborator.id
	  left outer join courses on courses.id = collaborator_has_courses.courses_id
    where collaborator.removed = 0
    group by collaborator.id) ) as t
    order by id);`;
  }

  mysqlConnection.query(sql, function (error, results, fields) {
    if (error) throw error;
    else res.send(results);
  });
});

// Get infos of one collaborator
Router.get("/infos", (req, res) => {
  var sql = `SELECT  group_concat(distinct qualification.name separator ',') AS qualification,
  collaborator.surname, collaborator.name, collaborator.yearOfBirth
  from collaborator
  LEFT OUTER JOIN qualification_has_collaborator ON qualification_has_collaborator.collaborator_id = collaborator.id
  LEFT OUTER JOIN qualification ON qualification_has_collaborator.qualification_id = qualification.id
  where collaborator.removed = 0
  GROUP BY collaborator.id`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

module.exports = Router;
