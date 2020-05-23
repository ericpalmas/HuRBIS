const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

Router.get("/", (req, res) => {
  var sql = "SELECT * FROM courses where courses.removed = 0;";

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

// aggiungi nuovo corso
Router.post("/addCourse", (req, res) => {
  const newCourse = req.body;
  const sql = ` INSERT INTO collaborator_has_courses(collaborator_id, courses_id, certification_date, expiration_date, instructor) 
  VALUES ('${newCourse.collaborator_id}', '${newCourse.course_id}', '${newCourse.certificationDate}', '${newCourse.expirationDate}', ${newCourse.instructor});`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
  });
});

// //aggiungi un corso ad un collaboratore
Router.post("/addNewCourse", (req, res) => {
  const newCourse = req.body;
  //const sql = `INSERT INTO courses (name) VALUES ('${newCourse.name}');`;
  const sql = `INSERT INTO courses (name,cost) VALUES ('${newCourse.name}', ${newCourse.cost});`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
  });
});

Router.post("/", (req, res) => {
  const removedCourse = req.body;

  var sql = `DELETE FROM collaborator_has_courses WHERE collaborator_id='${removedCourse.collaborator_id}' and courses_id='${removedCourse.course_id}';`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

// Corsi di un collaboratore
Router.get("/:id", (req, res) => {
  var sql = `SELECT courses.id, courses.name, courses.cost, collaborator_has_courses.certification_date, collaborator_has_courses.expiration_date,  collaborator_has_courses.instructor
  FROM collaborator_has_courses 
  LEFT OUTER JOIN courses ON courses.id = collaborator_has_courses.courses_id
  where collaborator_id = ${req.params.id} and courses.removed = 0`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

// Delete a collaborator from the dabase
Router.delete("/:id", (req, res) => {
  var sql = `UPDATE courses SET removed='1' WHERE id='${req.params.id}'`;
  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(err);
  });
});

Router.post("/modifyCourse", (req, res) => {
  const newCourse = req.body;
  const sql = `UPDATE collaborator_has_courses SET certification_date='${newCourse.certificationDate}', expiration_date='${newCourse.expirationDate}', instructor=${newCourse.instructor} WHERE collaborator_id='${newCourse.collaborator_id}' and courses_id='${newCourse.course_id}';`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(err);
  });
});

// modifica un corso in corso
Router.post("/renewCourse", (req, res) => {
  const course = req.body;
  const sql = `UPDATE collaborator_has_courses SET certification_date=null, expiration_date=null WHERE collaborator_id='${course.collaborator_id}' and courses_id='${course.course_id}';`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
    console.log(err);
  });
});

Router.post("/collaboratorCourses", (req, res) => {
  var list = req.body;
  var sql = "";
  list.forEach(myFunction);
  function myFunction(value, index, array) {
    sql += `SELECT courses.id, courses.name, courses.cost, collaborator_has_courses.certification_date, collaborator_has_courses.expiration_date,  collaborator_has_courses.instructor
    FROM collaborator_has_courses 
    LEFT OUTER JOIN courses ON courses.id = collaborator_has_courses.courses_id
    where collaborator_id = '${value.id}';`;
  }

  mysqlConnection.query(sql, function (error, results, fields) {
    if (error) throw error;
    else res.send(results);
  });
});

Router.get("/minCertificationDate/:id", (req, res) => {
  var sql = `select DISTINCT (t.id), t.name, t.min_certification from
  ((SELECT collaborator.id, collaborator.name, min(collaborator_has_courses.certification_date) as min_certification FROM collaborator
  left outer join collaborator_has_courses on collaborator_has_courses.collaborator_id = collaborator.id
  where collaborator_has_courses.courses_id = '${req.params.id}' and collaborator.removed = 0
  group by id)
  union
  (SELECT collaborator.id, collaborator.name, null as min_certification FROM collaborator
  left outer join collaborator_has_courses on collaborator_has_courses.collaborator_id = collaborator.id
  where collaborator.removed = 0
  group by id) ) as t
  order by id`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

// costo di un corso
Router.get("/cost/:id", (req, res) => {
  var sql = `SELECT cost FROM training_courses.courses where id = ${req.params.id}`;
  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

module.exports = Router;
