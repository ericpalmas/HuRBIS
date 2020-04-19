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

import { fetchCollaboratorsInfos } from "../actions/collaboratosInfosActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import AddCollaboratorModal from "./modals/AddCollaboratorModal";
import RemoveCollaboratorModal from "./modals/RemoveCollaboratorModal";
class Collaborators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      corsiSvolti: [],
      corsiDaSvolgere: [],
      corsiInCorso: [],
      dropdownButton: false,
      remove: false,
    };

    this.setState({ courses: this.props.collaboratorsInfos.courses });
  }

  componentWillMount() {
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

  removeElements = () => {
    this.setState({
      remove: !this.state.remove,
    });
    console.log(this.state.remove);
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
              <th></th>
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
                  <td id="tableColumnQualification">
                    <Link to={"/collaborators/" + id}>{qualification}</Link>
                  </td>
                  <td id="tableColumnCourses">
                    <Link to={"/collaborators/" + id}>{extra_courses}</Link>
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
})(Collaborators);
