import React, { Component, Fragment, useState } from "react";
import { Button, Form, FormGroup, Input, Table } from "reactstrap";
import { connect } from "react-redux";
import { fetchCollaboratorsInfos } from "../actions/collaboratosInfosActions";
import { fetchCollaborators } from "../actions/collaboratosActions";
import { fetchQualifications } from "../actions/qualificationsActions";
import { fetchCourses } from "../actions/coursesActions";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";

class Collaborators extends Component {
  componentWillMount() {
    this.props.fetchCollaborators();
    this.props.fetchQualifications();
    this.props.fetchCourses();
    this.props.fetchCollaboratorsInfos();
  }

  initArray = array => {
    for (let i = 0; i < array.size; i++) {
      array[i] = "";
    }
  };

  handleClick = () => {
    Router.transitionTo("/collaborators");
  };

  createListOfQualifications = (array, qualifications) => {
    let prevId = 0;
    for (let i = 0; i < qualifications.length; i++) {
      if (prevId === qualifications[i].collaborator_id) {
        array[prevId] += qualifications[i].name + " ";
      } else {
        prevId++;
        array[prevId] += qualifications[i].name + " ";
      }
    }
    return array;
  };

  render() {
    const collaborators = this.props.collaborators;
    const qualifications = this.props.qualifications;
    const collaboratorsInfos = this.props.collaboratorsInfos;
    const courses = this.props.courses;

    console.log(collaboratorsInfos);

    var formattedQualifications = new Array(collaborators.length).fill("");
    {
      this.createListOfQualifications(formattedQualifications, qualifications);
    }

    var formattedCourses = new Array(collaborators.length).fill("");
    {
      this.createListOfQualifications(formattedCourses, courses);
    }

    return (
      <div>
        <Form inline>
          <FormGroup>
            <Button id="searchButton">Cerca</Button>
            <Input
              type="search"
              name="search"
              id="exampleSearch"
              placeholder=""
            />
          </FormGroup>
        </Form>

        <Table hover id="collaboratorsTable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Qualifica</th>
              <th>Corsi</th>
            </tr>
          </thead>
          <tbody>
            {collaboratorsInfos.map(
              ({ id, name, surname, qualification, courses }) => (
                <tr>
                  <td>
                    <Link to={"/collaborators/" + id}>
                      {name} {surname}
                    </Link>
                  </td>
                  <td>
                    <Link to={"/collaborators/" + id}>{qualification}</Link>
                  </td>
                  <td>
                    <Link to={"/collaborators/" + id}>{courses}</Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

Collaborators.propTypes = {
  fetchCollaborators: PropTypes.func.isRequired,
  fetchQualifications: PropTypes.func.isRequired,
  fetchCourses: PropTypes.func.isRequired,
  fetchCollaboratorsInfos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  collaboratorsInfos: state.collaboratorsInfos.collaboratorsInfos,
  collaborators: state.collaborators.collaborators,
  qualifications: state.qualifications.qualifications,
  courses: state.courses.courses
});

export default connect(mapStateToProps, {
  fetchCollaborators,
  fetchQualifications,
  fetchCourses,
  fetchCollaboratorsInfos
})(Collaborators);
