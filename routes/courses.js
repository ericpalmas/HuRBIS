const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");

// // Get all courses
Router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * FROM courses;", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// //aggiungi un corso ad un collaboratore
Router.post("/addCourse", (req, res) => {
  const newCourse = req.body;
  console.log(newCourse);

  const sql = ` INSERT INTO collaborator_has_courses(collaborator_id, courses_id, certification_date, expiration_date, instructor) 
  VALUES ('${newCourse.collaborator_id}', '${newCourse.course_id}', '${newCourse.certificationDate}', '${newCourse.expirationDate}', ${newCourse.instructor});`;
  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// //aggiungi un corso ad un collaboratore
Router.post("/addNewCourse", (req, res) => {
  const newCourse = req.body;
  console.log(newCourse);

  const sql = `INSERT INTO courses (name) VALUES ('${newCourse.name}');`;

  mysqlConnection.query(sql, newCourse, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

Router.post("/", (req, res) => {
  console.log(req.body);
  const removedCourse = req.body;

  mysqlConnection.query(
    `DELETE FROM collaborator_has_courses WHERE collaborator_id='${removedCourse.collaborator_id}' and courses_id='${removedCourse.course_id}';`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Corsi di un collaboratore
Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT courses.id, courses.name, courses.name,collaborator_has_courses.certification_date, collaborator_has_courses.expiration_date,  collaborator_has_courses.instructor
    FROM collaborator_has_courses 
    LEFT OUTER JOIN courses ON courses.id = collaborator_has_courses.courses_id
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

// Delete a collaborator from the dabase
Router.delete("/:id", (req, res) => {
  mysqlConnection.query(
    `UPDATE courses SET removed='1' WHERE id='${req.params.id}'`,
    // `DELETE FROM courses WHERE id = '${req.params.id}'`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// modifica un corso in corso
Router.post("/modifyCourse", (req, res) => {
  const newCourse = req.body;

  console.log(newCourse);
  const sql = `UPDATE collaborator_has_courses SET certification_date='${newCourse.certificationDate}', expiration_date='${newCourse.expirationDate}', instructor=${newCourse.instructor} WHERE collaborator_id='${newCourse.collaborator_id}' and courses_id='${newCourse.course_id}';`;
  console.log(sql);

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// modifica un corso in corso
Router.post("/renewCourse", (req, res) => {
  const course = req.body;

  console.log(course);
  const sql = `UPDATE collaborator_has_courses SET certification_date=null, expiration_date=null WHERE collaborator_id='${course.collaborator_id}' and courses_id='${course.course_id}';`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// Corsi di un collaboratore
Router.get("/minCertificationDate/:id", (req, res) => {
  console.log(req.body);
  mysqlConnection.query(
    `select DISTINCT (t.id), t.name, t.min_certification from
    ((SELECT collaborator.id, collaborator.name, min(collaborator_has_courses.certification_date) as min_certification FROM collaborator
    left outer join collaborator_has_courses on collaborator_has_courses.collaborator_id = collaborator.id
    where collaborator_has_courses.courses_id = '${req.params.id}' and collaborator.removed = 0
    group by id)
    union
    (SELECT collaborator.id, collaborator.name, null as min_certification FROM collaborator
    left outer join collaborator_has_courses on collaborator_has_courses.collaborator_id = collaborator.id
    where collaborator.removed = 0
    group by id) ) as t
    order by id`,
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
