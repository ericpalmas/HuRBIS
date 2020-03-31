const express = require("express");
const bodyparser = require("body-parser");
const CollaboratorRoutes = require("./routes/collaborators");
const QualificationsRoutes = require("./routes/qualifications");
const CoursesRoutes = require("./routes/courses");
const CollaboratorsInfosRoutes = require("./routes/collaboratorsPersonalData");

const app = express();

app.use(bodyparser.json());

app.use("/collaborators", CollaboratorRoutes);
app.use("/qualifications", QualificationsRoutes);
app.use("/courses", CoursesRoutes);
app.use("/collaboratorsInfos", CollaboratorsInfosRoutes);

app.listen(5000, () => `Server running on port 5000`);
