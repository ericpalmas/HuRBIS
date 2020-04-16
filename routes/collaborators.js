const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../config/connection");
const risnovaConnection = require("../config/risnovaConnection");

// Get all collaborators
Router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * from collaborator", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// Get single collaborator
Router.get("/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM collaborator WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Add a collaborator to the database
Router.post("/", (req, res) => {
  const newCollaborator = req.body;
  console.log(newCollaborator);
  const sql =
    `INSERT INTO collaborator(name, surname, yearOfBirth) VALUES` +
    `('${newCollaborator.name}', '${newCollaborator.surname}', '${newCollaborator.yearOfBirth}')`;

  mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});

// Delete a collaborator from the dabase
Router.delete("/:id", (req, res) => {
  mysqlConnection.query(
    `DELETE FROM collaborator WHERE id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// // Get all collaborators from risnova
// Router.get("/collaboratorsInfo", (req, res) => {
//   risnovaConnection.query("SELECT [Id],[ResName],[ResName2],[StartValidity],[EndValidity],[Enabled],[RecStatus]" +
// ",[RecVerGuid],[RecDetails],[InsertTimestamp],[UpdateTimestamp],[DeleteTimestamp],[InsertDbId],[UpdateDbId]" +
// ",[DeleteDbId],[Author],[ResType],[ResName],[ResName2],[ResCode],[BornDate],[Gender],[Category],[Description]" +
// ",[Department],[Phone],[Email],[Web],[Color],[Image],[Note],[ResDetailsType],[ResDetails],[ResText],[Priority]"+
// ",[SortPriority],[Exclusive],[Flags],[StartValidityAdjStr],[AvgActiveTime],[AvgActiveTimeModel],[Balance]"+
// ",[BalanceDate],[ResContext],[Reference1],[Reference2],[AttResItemId1],[AttResItemId2],[UserId],[ACL]"+
// ",[NotifyInfo],[CustomText1],[CustomText2],[CustomText3],[CustomText4],[CustomText5],[CustomNumber1Str]"+
// ",[CustomNumber2Str],[CustomNumber3Str],[CustomNumber4Str],[CustomNumber5Str],[CustomId1],[CustomId2]" +
// ",[CustomId3],[CustomId4],[CustomId5],[ShortName],[Status],[Origin],[Degree],[Function],[Division],[Area]"+
// ",[Service],[Office],[Position],[SvcPlace],[OccCoeff],[Supervisor],[Insurance],[MedInfo],[SecInfo],[Equipment]"+
// ",[Skills],[Address],[ComDev1],[ComDev2],[ComDev3],[ComDev4],[ComDev5],[CustomBits1Str],[CustomText6],[CustomText7]"+
// ",[CustomText8],[CustomText9],[CustomText10],[CustomValue1Str],[CustomValue2Str],[CustomValue3Str]"+
// ",[CustomValue4Str],[CustomValue5Str],[CustomValue6Str],[CustomValue7Str],[CustomValue8Str],[CustomValue9Str]"+
// ",[CustomValue10Str],[EdLim],[Vis],[Flags2] FROM [RSuiteTreValli].[dbo].[AttResItem] where ResContext = 2"+
// "and [Enabled] = 1 and RecStatus = 0   ", (err, rows, fields) => {
//     if (!err) {
//       res.send(rows);
//     } else {
//       console.log(err);
//     }
//   });
// });

// Get infos of one collaborator
Router.get("/infos/:id", (req, res) => {
  console.log("sono quaaaaaaaa");
  console.log(req.params.id);
  mysqlConnection.query(
    `SELECT collaborator.id, collaborator.name, collaborator.surname,
    group_concat(distinct qualification.name separator ',') AS qualification
    from collaborator
    LEFT OUTER JOIN qualification_has_collaborator ON qualification_has_collaborator.collaborator_id = collaborator.id
    LEFT OUTER JOIN qualification ON qualification_has_collaborator.qualification_id = qualification.id
    WHERE collaborator.id = ${req.params.id}
    GROUP BY collaborator.id`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;
