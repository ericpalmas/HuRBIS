const express = require("express");
const bodyparser = require("body-parser");
const CollaboratorRoutes = require("./routes/collaborators");
const QualificationsRoutes = require("./routes/qualifications");
const CoursesRoutes = require("./routes/courses");
const CollaboratorsInfosRoutes = require("./routes/collaboratorsPersonalData");
const CoursesInfosRoutes = require("./routes/coursesIinformations");
const collaboratorHistoryCoursesRoutes = require("./routes/historyCourses");
const necessaryCoursesRoutes = require("./routes/necessaryCourses");
const datesRoutes = require("./routes/calendarDates");
const collaboratorCoursesRoutes = require("./routes/collaboratorCourses");
const collaboratorCertificationsRoutes = require("./routes/collaboratorCertifications");

const app = express();

app.use(bodyparser.json());

app.use("/collaborators", CollaboratorRoutes);
app.use("/qualifications", QualificationsRoutes);
app.use("/courses", CoursesRoutes);
app.use("/collaboratorsInfos", CollaboratorsInfosRoutes);
app.use("/coursesInformations", CoursesInfosRoutes);
app.use("/coursesHistory", collaboratorHistoryCoursesRoutes);
app.use("/necessaryCourses", necessaryCoursesRoutes);
app.use("/dates", datesRoutes);
app.use("/collaboratorCourses", collaboratorCoursesRoutes);
app.use("/collaboratorCertifications", collaboratorCertificationsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port 5000"));

// // Server static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// const port = process.env.PORT || 5000;

// app.listen(port, () => console.log("Server started on port 5000"));
