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
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchCoursesInformations } from "../actions/coursesActions";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AddNewCourseModal from "./modals/AddNewCourseModal";
import RemoveCourseModalDue from "./modals/RemoveCourseModalDue";
import EditCourseModalDue from "./modals/EditCourseModalDue";

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      remove: false,
      modify: false,
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

  modifyElements = () => {
    this.setState({
      modify: !this.state.modify,
    });
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
    const courses = this.props.coursesInfos;

    const sorted = courses.sort((a, b) => {
      if (this.state.sort === "asc") return 1 * a.name.localeCompare(b.name);
      else if (this.state.sort === "desc")
        return -1 * a.name.localeCompare(b.name);
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
              </DropdownMenu>
            </ButtonDropdown>
          </FormGroup>
        </Form>

        <Table hover id="collaboratorsTable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Costo</th>
              <th>Collaboratori</th>
              <th>Qualifiche</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted
              .filter(
                (course) =>
                  (course.name !== null &&
                    course.name
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
              .map(({ id, name, collaborator, qualification, cost }) => (
                <tr>
                  <td id="tableColumnInfo">
                    <Link>{name}</Link>
                  </td>

                  <td id="tableColumnInfo">
                    <Link>{!!cost ? cost + " CHF" : ""}</Link>
                  </td>
                  <td>
                    <Link>{collaborator}</Link>
                  </td>
                  <td id="tableColumnInfo">
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

                    {this.state.modify ? (
                      <EditCourseModalDue
                        course_id={id}
                        course_name={name}
                        course_cost={cost}
                        className="remove-btn ml-1 mr-1 mt-1"
                        color="danger"
                        size="sm"
                      ></EditCourseModalDue>
                    ) : null}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <div id="addCourseButton">
          <AddNewCourseModal className="ml-5 mt-5 mb-5 mr-2 float-left" />
        </div>
        <Button
          className="ml-5 mt-5 mb-5 mr-2"
          id="removeModal"
          onClick={this.removeElements}
        >
          Rimuovi corso
        </Button>
        <Button
          className="ml-5 mt-5 mb-5 mr-2"
          id="removeModal"
          onClick={this.modifyElements}
        >
          Modifica corso
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
