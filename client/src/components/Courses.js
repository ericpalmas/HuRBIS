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
import { fetchCoursesInformations } from "../actions/coursesActions";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import AddQualificationModal from "./modals/AddQualificationModal";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coursesInformations: [],
      dropdownButton: false,
    };
  }

  componentDidMount() {
    this.props.fetchCoursesInformations();

    this.setState({
      coursesInformations: this.props.coursesInfos,
    });
  }

  toggle = () => {
    this.setState({
      dropdownButton: !this.state.dropdownButton,
    });
  };

  render() {
    const courses = this.state.coursesInformations;
    console.log(courses);
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
            </tr>
          </thead>
          <tbody>
            {courses.map(({ id, name, collaborator, collabId }) => (
              <tr>
                <td>
                  <Link>{name}</Link>
                </td>
                <td>
                  <Link>{collaborator}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* <div id="addCourseButton">
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
          Rimuovi corso
        </Button> */}
      </div>
    );
  }
}

Courses.propTypes = {
  fetchCoursesInformations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  coursesInfos: state.courses.coursesInfos,
});

export default connect(mapStateToProps, {
  fetchCoursesInformations,
})(Courses);
