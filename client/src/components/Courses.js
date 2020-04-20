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
import AddNewCourseModal from "./modals/AddNewCourseModal";
import RemoveCourseModalDue from "./modals/RemoveCourseModalDue";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      remove: false,
      coursesInformations: [],
      dropdownButton: false,
    };
  }

  componentDidMount() {
    this.props.fetchCoursesInformations();
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
  };

  updateSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  render() {
    const courses = this.props.coursesInfos;
    console.log(courses);
    console.log(this.state.search);
    return (
      <div>
        <Form inline>
          <FormGroup>
            {/* <Button id="searchButton">Cerca</Button> */}
            <Input
              // className="ml-6"
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

        <Table hover id="collaboratorsTable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Costo unitario</th>
              <th>Collaboratori</th>
              <th>Qualifiche</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses
              .filter(
                (course) =>
                  (course.name !== null &&
                    course.name
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())) ||
                  (course.cost !== null &&
                    course.cost
                      .toString()
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())) ||
                  (course.collaborator !== null &&
                    course.collaborator
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase())) ||
                  (course.qualification !== null &&
                    course.qualification
                      .toLowerCase()
                      .includes(this.state.search.toLowerCase()))
              )
              .map(({ id, name, cost, collaborator, qualification }) => (
                <tr>
                  <td>
                    <Link>{name}</Link>
                  </td>
                  <td>
                    <Link>{cost}</Link>
                  </td>
                  <td>
                    <Link>{collaborator}</Link>
                  </td>
                  <td>
                    <Link>{qualification}</Link>
                  </td>
                  <td>
                    {this.state.remove ? (
                      <RemoveCourseModalDue
                        course_id={id}
                        course_name={name}
                        className="remove-btn ml-1 mr-1 mt-1"
                        color="danger"
                        size="sm"
                      ></RemoveCourseModalDue>
                    ) : null}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <div id="addCourseButton">
          <AddNewCourseModal
            // collaborator_id={this.props.match.params.id}
            className="ml-5 mt-5 mb-5 mr-2 float-left"
          />
        </div>
        <Button
          className="ml-5 mt-5 mb-5 mr-2"
          id="removeModal"
          onClick={this.removeElements}
        >
          Rimuovi corso
        </Button>
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
