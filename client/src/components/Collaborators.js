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

import { connect } from "react-redux";
import { fetchCollaboratorsInfos } from "../actions/collaboratosInfosActions";
import { fetchCollaborators } from "../actions/collaboratosActions";
// import { fetchQualifications } from "../actions/qualificationsActions";
// import { fetchCourses } from "../actions/coursesActions";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import AddQualificationModal from "./modals/AddQualificationModal";
class Collaborators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      corsiSvolti: [],
      corsiDaSvolgere: [],
      corsiInCorso: [],
      dropdownButton: false,
    };

    this.setState({ courses: this.props.collaboratorsInfos.courses });
  }

  componentWillMount() {
    this.props.fetchCollaborators();
    // this.props.fetchQualifications();
    // this.props.fetchCourses();
    this.props.fetchCollaboratorsInfos();
  }

  initArray = (array) => {
    for (let i = 0; i < array.size; i++) {
      array[i] = "";
    }
  };

  toggle = () => {
    this.setState({
      dropdownButton: !this.state.dropdownButton,
    });
  };

  render() {
    const collaboratorsInfos = this.props.collaboratorsInfos;
    console.log("infos");
    console.log(collaboratorsInfos);

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

            <ButtonDropdown
              isOpen={this.state.dropdownButton}
              toggle={this.toggle}
              className="ml-3"
            >
              <DropdownToggle caret> Ordina per </DropdownToggle>
              <DropdownMenu>
                <DropdownItem> Scadenza licenza: crescente </DropdownItem>
                <DropdownItem divider />
                <DropdownItem> Scadenza licenza: decrescente</DropdownItem>
                <DropdownItem divider />
                <DropdownItem> Ordine alfabetico </DropdownItem>
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
            </tr>
          </thead>
          <tbody>
            {collaboratorsInfos.map(
              ({
                id,
                name,
                surname,
                qualification,
                necessary_courses,
                extra_courses,
                yearOfBirth,
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
                  <td id="tableColumnInfo">
                    <Link to={"/collaborators/" + id}>{qualification}</Link>
                  </td>
                  <td id="tableColumnCourses">
                    <Link to={"/collaborators/" + id}>{extra_courses}</Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
        <div id="addCourseButton">
          <AddQualificationModal
            // collaborator_id={this.props.match.params.id}
            className="ml-5 mt-5 mb-5 mr-2 float-left"
          />
        </div>
        <Button
          className="ml-5 mt-5 mb-5 mr-2"
          id="removeModal"
          // onClick={this.removeElements}
        >
          Rimuovi collbaboratore
        </Button>
      </div>
    );
  }
}

Collaborators.propTypes = {
  fetchCollaborators: PropTypes.func.isRequired,
  // fetchQualifications: PropTypes.func.isRequired,
  // fetchCourses: PropTypes.func.isRequired,
  fetchCollaboratorsInfos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  collaboratorsInfos: state.collaboratorsInfos.collaboratorsInfos,
  collaborators: state.collaborators.collaborators,
  // qualifications: state.qualifications.qualifications,
  // courses: state.courses.courses,
});

export default connect(mapStateToProps, {
  fetchCollaborators,
  // fetchQualifications,
  fetchCollaboratorsInfos,
})(Collaborators);
