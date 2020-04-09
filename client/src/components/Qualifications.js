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
import { fetchQualificationsInformations } from "../actions/qualificationsActions";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import AddQualificationModal from "./modals/AddQualificationModal";

class Qualifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qualificationsInformations: [],
      dropdownButton: false,
    };
  }

  componentDidMount() {
    this.props.fetchQualificationsInformations();
    this.setState({
      qualificationsInformations: this.props.qualificationsInfos,
    });
  }

  toggle = () => {
    this.setState({
      dropdownButton: !this.state.dropdownButton,
    });
  };

  render() {
    console.log("Qualifiche");
    const qualifications = this.state.qualificationsInformations;
    console.log(qualifications);
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
              <th>Collaboratori</th>
              <th>Corsi</th>
            </tr>
          </thead>
          <tbody>
            {qualifications.map(
              ({ id, name, collaborator, necessary_courses }) => (
                <tr>
                  <td id="tableColumnInfo">
                    <Link>{name}</Link>
                  </td>
                  <td id="tableColumnInfo">
                    <Link>{collaborator}</Link>
                  </td>
                  <td id="tableColumnCourses">
                    {/* <Link to={"/collaborators/" + id}> {courses}</Link> */}
                    <Link> {necessary_courses}</Link>
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
          Rimuovi qualifica
        </Button>
      </div>
    );
  }
}

Qualifications.propTypes = {
  fetchQualificationsInformations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  qualificationsInfos: state.qualificationsInfos.qualificationsInfos,
});

export default connect(mapStateToProps, {
  fetchQualificationsInformations,
})(Qualifications);
