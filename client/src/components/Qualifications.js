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
import PropTypes from "prop-types";
import { fetchQualificationsInfos } from "../actions/qualificationsActions";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import AddQualificationModal from "./modals/AddQualificationModal";
import RemoveQualificationModal from "./modals/RemoveQualificationModal";
class Qualifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      qualificationsInformations: [],
      dropdownButton: false,
    };
  }

  componentDidMount() {
    this.props.fetchQualificationsInfos();
  }

  toggle = () => {
    this.setState({
      dropdownButton: !this.state.dropdownButton,
    });
  };

  updateSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  render() {
    console.log("Qualifiche");
    const qualifications = this.props.qualificationsInfos;
    console.log(qualifications);
    console.log(this.state.search);
    return (
      <div>
        <Form inline>
          <FormGroup>
            {/* <Button id="searchButton">Cerca</Button> */}
            <Input
              // className="ml-4"
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
                <DropdownItem> Scadenza licenza: crescente </DropdownItem>
                <DropdownItem divider />
                <DropdownItem> Scadenza licenza: decrescente</DropdownItem>
                <DropdownItem divider />
                <DropdownItem> Ordine alfabetico </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </FormGroup>
        </Form>

        {/* <div>
          {collaboratorsInfos
            .filter((collaborator) =>
              collaborator.name.includes(this.state.search)
            )
            .map((filteredPerson) => (
              <li>{filteredPerson.name}</li>
            ))}
        </div> */}

        <Table hover id="collaboratorsTable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Collaboratori</th>
              <th>Corsi</th>
            </tr>
          </thead>
          <tbody>
            {qualifications
              .filter(
                (qualification) =>
                  (qualification.name !== null &&
                    qualification.name
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())) ||
                  (qualification.collaborator !== null &&
                    qualification.collaborator
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())) ||
                  (qualification.courses !== null &&
                    qualification.courses
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase()))
              )
              .map(({ id, name, collaborator, courses }) => (
                <tr>
                  <td id="tableColumnInfo">
                    <Link>{name}</Link>
                  </td>
                  <td id="tableColumnInfo">
                    <Link>{collaborator}</Link>
                  </td>
                  <td id="tableColumnCourses">
                    <Link> {courses}</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div id="addCourseButton">
          <AddQualificationModal
            // collaborator_id={this.props.match.params.id}
            className="ml-5 mt-5 mb-5 mr-2 float-left"
          />
        </div>
        <RemoveQualificationModal
          className="ml-5 mt-5 mb-5 mr-2"
          id="removeModal"
          qualifications={this.props.qualificationsInfos}
        ></RemoveQualificationModal>
      </div>
    );
  }
}

Qualifications.propTypes = {
  fetchQualificationsInfos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  qualificationsInfos: state.qualifications.qualifications,
});

export default connect(mapStateToProps, {
  fetchQualificationsInfos,
})(Qualifications);
