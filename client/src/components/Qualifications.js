import React, { Component } from "react";
import {
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
import { BrowserRouter as Router, Link } from "react-router-dom";
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

  handleChange = (event) => {
    this.setState({ sort: event.target.value });
  };

  render() {
    const qualifications = this.props.qualificationsInfos;

    const sorted = qualifications.sort((a, b) => {
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
              <th>Collaboratori</th>
              <th>Corsi</th>
            </tr>
          </thead>
          <tbody>
            {sorted

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
          <AddQualificationModal className="ml-5 mt-5 mb-5 mr-2 float-left" />
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
