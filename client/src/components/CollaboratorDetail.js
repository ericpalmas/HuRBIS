import React, { Component, Fragment } from "react";
import { Label, Table, Button, Container } from "reactstrap";
import axios from "axios";
import AddCourseModal from "./modals/AddCourseModal";
import RemoveCourseModal from "./modals/RemoveCourseModal";
import EditCourseModal from "./modals/EditCourseModal";
import AddQualificationToCollaboratorModal from "./modals/AddQualificationToCollaboratorModal";
import RemoveQualificationFromCollaborator from "./modals/RemoveQualificationFromCollaborator";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchCoursesOfCollaborator } from "../actions/coursesActions";
import { fetchCollaboratorInfos } from "../actions/collaboratosActions";

const Corso = ({ corsi, elem, collaborator_id }) => (
  <Table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Data inizio licenza</th>
        <th>Data di scadenza della certificazione </th>
      </tr>
    </thead>
    {corsi.map((corso) => (
      <tbody key={corso.id}>
        <tr id="collaboratorTableItem">
          <td>{corso.name}</td>
          <td>
            {!!corso.certification_date
              ? corso.certification_date.substr(0, 10)
              : "      //"}
          </td>

          <td>
            {!!corso.expiration_date
              ? corso.expiration_date.substr(0, 10)
              : "      //"}
          </td>
          <td>
            {elem.state.remove ? (
              <RemoveCourseModal
                course={corso}
                collaborator_id={collaborator_id}
                className="remove-btn ml-1 mr-1 mt-1"
                color="danger"
                size="sm"
              ></RemoveCourseModal>
            ) : null}

            {elem.state.modify ? (
              <EditCourseModal
                course={corso}
                collaborator_id={collaborator_id}
                className="remove-btn ml-1 mr-1 mt-1"
                color="danger"
                size="sm"
              ></EditCourseModal>
            ) : null}
          </td>
        </tr>
      </tbody>
    ))}
  </Table>
);

class CollaboratorDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remove: false,
      modify: false,
      collaborator: {},
      courses: [],
      corsiSvolti: [],
      corsiDaSvolgere: [],
      corsiInCorso: [],
      show: false,
    };

    axios
      .get(`/collaborators/infos/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ collaborator: res.data[0] });
      });
    axios.get(`/courses/${this.props.match.params.id}`).then((res) => {
      this.setState({ courses: res.data });
    });
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  removeElements = () => {
    this.setState({
      remove: !this.state.remove,
      modify: false,
    });
  };

  modifyElements = () => {
    this.setState({
      modify: !this.state.modify,
      remove: false,
    });
  };

  filterArray = (courses) => {
    var currentdate = new Date();
    var now = Date.parse(
      currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getDate()
    );
    this.state.corsiDaSvolgere = [];
    this.state.corsiInCorso = [];
    this.state.corsiSvolti = [];
    for (let i = 0; i < courses.length; i++) {
      if (
        courses[i].expiration_date === null ||
        courses[i].certification_date === null
      ) {
        this.state.corsiDaSvolgere.push(courses[i]);
      } else {
        var str1 = courses[i].expiration_date.substr(0, 10);
        var expiration_date = Date.parse(str1);

        var str2 = courses[i].certification_date.substr(0, 10);
        var certification_date = Date.parse(str2);

        if (certification_date <= now && expiration_date >= now)
          this.state.corsiInCorso.push(courses[i]);
        else if (now > expiration_date) this.state.corsiSvolti.push(courses[i]);
        else if (now < certification_date)
          this.state.corsiDaSvolgere.push(courses[i]);
      }
    }
    return courses;
  };

  render() {
    this.filterArray(this.state.courses);
    return (
      <div className="ml-5">
        <Label className="ml-5 mr-5">
          <h6> Nome collaboratore: </h6>
          {this.state.collaborator.name} {this.state.collaborator.surname}
        </Label>
        <Label className="ml-5 mr-5">
          <h6> Formazione: </h6>
          {this.state.collaborator.qualification}
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi in svolgimento: </h6>
          <br></br>
          <Corso
            corsi={this.state.corsiInCorso}
            elem={this}
            collaborator_id={this.props.match.params.id}
          />
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi da svolgere: </h6>
          <br></br>
          <Corso
            corsi={this.state.corsiDaSvolgere}
            elem={this}
            collaborator_id={this.props.match.params.id}
          />
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi svolti: </h6>
          <br></br>
          <Corso
            corsi={this.state.corsiSvolti}
            elem={this}
            collaborator_id={this.props.match.params.id}
          />
        </Label>
        <br></br>
        <div id="addCourseButton">
          <AddCourseModal
            id="removeModal"
            collaborator_id={this.props.match.params.id}
            className="ml-5 mt-5 mb-5 mr-2 float-left"
          />
        </div>
        <div id="addCourseButton">
          <AddQualificationToCollaboratorModal
            id="removeModal"
            className="ml-5 mt-5 mb-5 mr-2 float-left"
            collaborator_id={this.props.match.params.id}
          ></AddQualificationToCollaboratorModal>
        </div>
        <div id="addCourseButton">
          <Button
            className="ml-5 mt-5 mb-5 mr-2 float-left"
            id="removeModal"
            onClick={this.removeElements}
          >
            Rimuovi corso
          </Button>
        </div>
        <div id="addCourseButton">
          <Button
            className="ml-5 mt-5 mb-5 mr-2 float-left"
            onClick={this.modifyElements}
          >
            Modifica corso
          </Button>
        </div>
        <div id="addCourseButton">
          <RemoveQualificationFromCollaborator
            collaborator_id={this.props.match.params.id}
          ></RemoveQualificationFromCollaborator>
        </div>
      </div>
    );
  }
}

CollaboratorDetail.propTypes = {
  fetchCollaboratorInfos: PropTypes.func.isRequired,
  fetchCoursesOfCollaborator: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  collaboratorInfos: state.collaborators.collaboratorInfos,
  coursesOfCollaborator: state.courses.coursesOfCollaborator,
});

export default connect(mapStateToProps, {
  fetchCollaboratorInfos,
  fetchCoursesOfCollaborator,
})(CollaboratorDetail);
