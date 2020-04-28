import React, { Component, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Tbl from "./Tbl";
import axios from "axios";
import { fetchMinCertifications } from "../actions/coursesActions";

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaboratorInfos: [],
      courses: [],
      minCertifications: [],
      certificationsHistory: [],
    };

    axios.get(`/courses`).then((res) => {
      axios.post("/collaboratorCertifications", res.data).then((result) => {
        this.setState({
          minCertifications: result.data,
        });
      });
      axios.post("/coursesHistory", res.data).then((result) => {
        this.setState({
          certificationsHistory: result.data,
        });
      });
    });

    axios.get(`/courses`).then((res) => {
      this.setState({
        courses: res.data,
      });

      columns = [];

      columns.push({ title: "Qualifica" });
      columns.push({ title: "Cognome" });
      columns.push({ title: "Nome" });
      columns.push({ title: "Anno nascita." });

      for (let i = 0; i < res.data.length; i++) {
        columns.push({ title: res.data[i].name });
      }
    });

    axios.get(`/collaboratorCertifications/infos`).then((res) => {
      this.setState({
        collaboratorInfos: res.data,
      });
    });
  }

  filterArray = (certifications, infos, historyCertifications) => {
    if (certifications.length != 0 && historyCertifications.length != 0) {
      console.log("numero certificatzioni: " + certifications.length);
      console.log(certifications);

      console.log(
        "numero certificatzioni storiche: " + historyCertifications.length
      );
      console.log(historyCertifications);

      var firstStep = [];
      for (let i = 0; i < certifications.length; i++) {
        firstStep["" + i] = [];
      }
      for (let i = 0; i < certifications.length; i++) {
        var prevId = -1;
        var current = certifications[i];
        for (let j = 0; j < current.length; j++) {
          if (current[j].id != prevId) {
            firstStep[i].push(current[j]);
            prevId = current[j].id;
          } else {
            if (current[j].min_certification != null)
              firstStep[i][firstStep[i].length - 1] = current[j];
          }
        }
      }
      console.log("certifications after firststep");
      console.log(firstStep);

      var step = [];
      for (let i = 0; i < historyCertifications.length; i++) {
        step["" + i] = [];
      }
      for (let i = 0; i < historyCertifications.length; i++) {
        var oldId = -1;
        var current = historyCertifications[i];

        for (let j = 0; j < current.length; j++) {
          if (current[j].collaborator_id != oldId) {
            step[i].push(current[j]);
            oldId = current[j].collaborator_id;
          } else {
            if (current[j].certification_date != null)
              step[i][step[i].length - 1] = current[j];
          }
        }
      }
      console.log("history after step");
      console.log(step);

      // var secondStep = [];
      // for (let i = 0; i < historyCertifications.length; i++) {
      //   secondStep["" + i] = [];
      // }
      // for (let i = 0; i < historyCertifications.length; i++) {
      //   var prevId = -1;
      //   var current = historyCertifications[i];
      //   for (let j = 0; j < current.length; j++) {
      //     if (current[j].id != prevId) {
      //       secondStep[i].push(current[j]);
      //       prevId = current[j].id;
      //     } else {
      //       secondStep[i][secondStep[i].length - 1] = current[j];
      //     }
      //   }
      // }
      //console.log(secondStep);

      for (let k = 0; k < infos.length; k++) {
        datii["" + k] = [];
        if (infos[k].qualification == null) datii[k].push("");
        else datii[k].push(infos[k].qualification);

        if (infos[k].surname == null) datii[k].push("");
        else datii[k].push(infos[k].surname);

        if (infos[k].name == null) datii[k].push("");
        else datii[k].push(infos[k].name);

        if (infos[k].yearOfBirth == null) datii[k].push("");
        else datii[k].push(infos[k].yearOfBirth);

        for (let i = 0; i < firstStep.length; i++) {
          var current = firstStep[i];
          var currentHistory = step[i];

          if (current[k].min_certification == null) {
            if (currentHistory[k].certification_date == null) {
              datii[k].push("");
            } else {
              datii[k].push(currentHistory[k].certification_date.substr(0, 10));
            }

            //datii[k].push("");
          } else {
            datii[k].push(current[k].min_certification.substr(0, 10));
          }
        }
      }
    }

    //console.log(datii);
  };

  render() {
    //console.log(this.state.certificationsHistory);
    this.filterArray(
      this.state.minCertifications,
      this.state.collaboratorInfos,
      this.state.certificationsHistory
    );

    return (
      <div>
        {(datii.length != 0) & (columns.length != 0) ? (
          <Tbl header={columns} data={datii}></Tbl>
        ) : (
          " "
        )}
      </div>
    );
  }
}

var datii = [];

var columns = [];

Summary.propTypes = {
  fetchMinCertifications: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  fetchMinCertifications,
})(Summary);
