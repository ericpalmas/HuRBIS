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
      sort: "",
      search: "",
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

  render() {
    const collaboratorsInfos = this.props.collaboratorsInfos;

    console.log(collaboratorsInfos);

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
})(Collaborators);
