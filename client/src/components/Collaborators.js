import React, { Component, Fragment, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Table,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import axios from "axios";
import { fetchCollaboratorsInfos } from "../actions/collaboratosInfosActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import AddCollaboratorModal from "./modals/AddCollaboratorModal";
import RemoveCollaboratorModal from "./modals/RemoveCollaboratorModal";
import { addCourseToHistory } from "../actions/coursesActions";
import { renewCourse } from "../actions/coursesActions";
import { deleteCourse } from "../actions/coursesActions";

class Collaborators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: "",
      search: "",
      dropdownButton: false,
      remove: false,
      courses: [],
      collaborators: [],
      qualificationCourses: [],
      collaboratorInfos: [],
    };

    axios.get(`/collaborators`).then((res) => {
      this.setState({
        collaborators: res.data,
      });
      axios.post("/courses/collaboratorCourses", res.data).then((result) => {
        this.setState({
          courses: result.data,
        });
      });

      axios
        .post("/necessaryCourses/qualificationCourses", res.data)
        .then((result) => {
          this.setState({
            qualificationCourses: result.data,
          });
        });
    });

    axios.get(`/collaboratorsInfos`).then((res) => {
      this.setState({
        collaboratorInfos: res.data,
      });
    });
  }

  toggle = () => {
    this.setState({
      dropdownButton: !this.state.dropdownButton,
    });
  };

  removeElements = () => {
    this.setState({
      remove: !this.state.remove,
    });
    console.log(this.state.remove);
  };

  updateSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  handleChange = (event) => {
    this.setState({ sort: event.target.value });
  };

  updateDate = () => {
    var courses = this.state.courses;
    var collaborators = this.state.collaborators;
    var qualificationCourses = this.state.qualificationCourses;
    //console.log(qualificationCourses);
    if (
      courses.length != 0 &&
      collaborators.length != 0 &&
      qualificationCourses.length != 0
    ) {
      var currentdate = new Date();
      var now = Date.parse(
        currentdate.getFullYear() +
          "-" +
          (currentdate.getMonth() + 1) +
          "-" +
          currentdate.getDate()
      );

      let i = 0;
      courses.forEach(function (v) {
        var collaborator = collaborators[i];
        var corsiObbligatori = [];
        qualificationCourses[i].forEach(function (v) {
          corsiObbligatori.push(v.courses_id);
        });

        console.log(collaborator);
        console.log(corsiObbligatori);

        v.forEach(function (i) {
          if (i.expiration_date !== null) {
            var str1 = i.expiration_date.substr(0, 10);
            var expiration_date = Date.parse(str1);

            if (now > expiration_date) {
              console.log("corso storico trovato");
              var newCourse = {
                course_id: i.id,
                certificationDate: i.certification_date.substr(0, 10),
                expirationDate: i.expiration_date.substr(0, 10),
                collaborator_id: parseInt(collaborator.id),
              };
              console.log(newCourse);
              //addCourseToHistory(newCourse);
              axios.post("/coursesHistory/addCourse", newCourse);

              if (corsiObbligatori.includes(i.id)) {
                console.log("obbligatory");
                const updateCourse = {
                  course_id: i.id,
                  collaborator_id: parseInt(collaborator.id),
                };
                console.log(updateCourse);
                //renewCourse(updateCourse);

                axios.post("/courses/renewCourse", updateCourse);
              } else {
                console.log("removed");
                const removedCourse = {
                  course_id: i.id,
                  collaborator_id: parseInt(collaborator.id),
                };
                console.log(removedCourse);
                //deleteCourse(removedCourse);

                axios.post("/courses/", removedCourse);
              }
            }
          }
        });
        i++;
      });
    }
  };

  render() {
    this.updateDate();
    const collaboratorsInfos = this.state.collaboratorInfos;
    //console.log(collaboratorsInfos);

    const sorted = collaboratorsInfos.sort((a, b) => {
      if (this.state.sort === "asc") return 1 * a.name.localeCompare(b.name);
      else if (this.state.sort === "desc")
        return -1 * a.name.localeCompare(b.name);
      else if (this.state.sort === "ascDate")
        return 1 * a.name.localeCompare(b.min_expiration_date);
      else if (this.state.sort === "descDate")
        return -1 * a.name.localeCompare(b.min_expiration_date);
    });

    return (
      <div>
        <Form inline>
          <FormGroup>
            <Input
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
              type="search"
              name="search"
              id="exampleSearch"
              placeholder=""
            />

            <ButtonDropdown
              isOpen={this.state.dropdownButton}
              toggle={this.toggle}
              className="ml-3"
            >
              <DropdownToggle caret> Ordina per </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  value="asc"
                  onClick={this.handleChange.bind(this)}
                >
                  Ordine alfabetico: crescente
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  value="desc"
                  onClick={this.handleChange.bind(this)}
                >
                  Ordine alfabetico: decrescente
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  value="ascDate"
                  onClick={this.handleChange.bind(this)}
                >
                  {" "}
                  Ordine scadenza: ascendente{" "}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  value="descDate"
                  onClick={this.handleChange.bind(this)}
                >
                  {" "}
                  Ordine scadenza: decrescente{" "}
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </FormGroup>
        </Form>

        <Table hover id="collaboratorsTable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data di nascita</th>
              <th>Qualifica</th>
              <th>Corsi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted
              .filter(
                (collaborator) =>
                  (collaborator.name !== null &&
                    collaborator.name
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())) ||
                  (collaborator.surname !== null &&
                    collaborator.surname
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())) ||
                  (collaborator.qualification !== null &&
                    collaborator.qualification
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())) ||
                  (collaborator.yearOfBirth !== null &&
                    collaborator.yearOfBirth
                      .toString()
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())) ||
                  (collaborator.courses !== null &&
                    collaborator.courses
                      .toString()
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase()))
              )
              .filter((collaborator) => collaborator.removed == "0")
              .map(
                ({
                  id,
                  name,
                  surname,
                  qualification,
                  courses,
                  yearOfBirth,
                  removed,
                }) => (
                  <tr>
                    <td id="tableColumnInfo">
                      <Link to={"/collaborators/" + id}>
                        {name} {surname}
                      </Link>
                    </td>
                    <td id="tableColumnBirthDate">
                      <Link to={"/collaborators/" + id}>
                        {!!yearOfBirth ? yearOfBirth : "      //"}
                      </Link>
                    </td>
                    <td id="tableColumnQualification">
                      <Link to={"/collaborators/" + id}>{qualification}</Link>
                    </td>
                    <td id="tableColumnCourses">
                      <Link to={"/collaborators/" + id}>{courses}</Link>
                    </td>
                    <td>
                      {this.state.remove ? (
                        <RemoveCollaboratorModal
                          collaboratorId={id}
                          collaboratorName={name}
                          collaboratorSurname={surname}
                          className="remove-btn ml-1 mr-1 mt-1"
                          color="danger"
                          size="sm"
                        ></RemoveCollaboratorModal>
                      ) : null}
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </Table>
        <div id="addCourseButton">
          <AddCollaboratorModal className="ml-5 mt-5 mb-5 mr-2 float-left" />
        </div>
        <Button
          className="ml-5 mt-5 mb-5 mr-2 float-left"
          id="removeModal"
          onClick={this.removeElements}
        >
          Rimuovi collaboratore
        </Button>
      </div>
    );
  }
}

Collaborators.propTypes = {
  fetchCollaboratorsInfos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  collaboratorsInfos: state.collaboratorsInfos.collaboratorsInfos,
});

export default connect(mapStateToProps, {
  fetchCollaboratorsInfos,
  addCourseToHistory,
  deleteCourse,
  renewCourse,
})(Collaborators);
