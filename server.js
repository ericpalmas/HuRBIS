const express = require("express");
const bodyparser = require("body-parser");
const CollaboratorRoutes = require("./routes/collaborators");
const mysqlConnection = require("./config/connection");
const app = express();

app.use(bodyparser.json());
app.use("/collaborators", CollaboratorRoutes);

app.listen(5000, () => `Server running on port 5000`);
