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
    };

    axios.get(`/courses`).then((res) => {
      axios.post("/collaboratorCertifications", res.data).then((result) => {
        this.setState({
          minCertifications: result.data,
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

  filterArray = (certifications, infos) => {
    var firstStep = [];
    for (let i = 0; i < certifications.length; i++) {
      firstStep["" + i] = [];
    }

    var size;
    for (let i = 0; i < certifications.length; i++) {
      var prevId = -1;
      var current = certifications[i];
      size = 0;
      for (let j = 0; j < current.length; j++) {
        if (current[j].id != prevId) {
          firstStep[i].push(current[j]);
          prevId = current[j].id;
          size++;
        } else {
          firstStep[i][firstStep[i].length - 1] = current[j];
        }
      }
    }
    //console.log(firstStep);

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
        if (current[k].min_certification == null) datii[k].push("");
        else {
          datii[k].push(current[k].min_certification.substr(0, 10));
        }
      }
    }

    //console.log(datii);
  };

  render() {
    this.filterArray(
      this.state.minCertifications,
      this.state.collaboratorInfos
    );

    return (
      <div>
        <Tbl header={columns} data={datii}></Tbl>
      </div>
    );
  }
}

var datii = [{}];

var columns = [{}];

Summary.propTypes = {
  fetchMinCertifications: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  fetchMinCertifications,
})(Summary);
