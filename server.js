const express = require("express");
const bodyparser = require("body-parser");
const CollaboratorRoutes = require("./routes/collaborators");
const QualificationsRoutes = require("./routes/qualifications");
const CoursesRoutes = require("./routes/courses");
const app = express();

app.use(bodyparser.json());
app.use("/collaborators", CollaboratorRoutes);
app.use("/qualifications", QualificationsRoutes);
app.use("/courses", CoursesRoutes);

app.listen(5000, () => `Server running on port 5000`);
