import React, { Component, Fragment, useState } from "react";
import { Button, Form, FormGroup, Input, Table } from "reactstrap";
import { connect } from "react-redux";
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
  }

  initArray = array => {
    for (let i = 0; i < array.size; i++) {
      array[i] = "";
    }
  };

  createListOfQualifications = (array, qualifications) => {
    let prevId = 0;

    for (let i = 0; i < qualifications.length; i++) {
      // console.log(
      //   prevId +
      //     " " +
      //     qualifications[i].collaborator_id +
      //     " " +
      //     qualifications[i].name
      // );
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
    const courses = this.props.courses;
    let prevQualification = 0;
    let prevCourse = 0;

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

        <table>
          <td>
            <div id="collaboratorTable1" class="col-xs-6">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Nome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collaborators.map(({ id, name, surname }) => (
                      <tr key={id} id="collaboratorTableItem1">
                        <td id="riga">
                          <NavLink
                            exact
                            activeStyle={{ color: "grey" }}
                            to={"/collaborators/" + id}
                          >
                            {name} {surname}
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
          <td>
            <div id="collaboratorTable" class="col-xs-6">
              <div class="table-responsive">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>Qualifica</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formattedQualifications.map(value => (
                      <tr>
                        <td id="riga">
                          <NavLink
                            exact
                            activeStyle={{ color: "grey" }}
                            to="/collaborators/:id"
                          >
                            {value}
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </table>
      </div>
    );
  }
}

Collaborators.propTypes = {
  fetchCollaborators: PropTypes.func.isRequired,
  fetchQualifications: PropTypes.func.isRequired,
  fetchCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  collaborators: state.collaborators.collaborators,
  qualifications: state.qualifications.qualifications,
  courses: state.courses.courses
});

export default connect(mapStateToProps, {
  fetchCollaborators,
  fetchQualifications,
  fetchCourses
})(Collaborators);
