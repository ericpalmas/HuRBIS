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

app.listen(5000, () => `Server running on port 5000`);
