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
      qualificationsInformations: [],
      dropdownButton: false,
    };
  }

  componentDidMount() {
    this.props.fetchQualificationsInfos();
    // this.setState({
    //   qualificationsInformations: this.props.qualificationsInfos,
    // });
  }

  toggle = () => {
    this.setState({
      dropdownButton: !this.state.dropdownButton,
    });
  };

  render() {
    console.log("Qualifiche");
    const qualifications = this.props.qualificationsInfos;
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
            {qualifications.map(({ id, name, collaborator, courses }) => (
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
