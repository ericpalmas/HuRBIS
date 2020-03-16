const express = require("express");
const bodyparser = require("body-parser");
const CollaboratorRoutes = require("./routes/collaborators");
const QualificationsRoutes = require("./routes/qualifications");
const app = express();

app.use(bodyparser.json());
app.use("/collaborators", CollaboratorRoutes);
app.use("/qualifications", QualificationsRoutes);

app.listen(5000, () => `Server running on port 5000`);
