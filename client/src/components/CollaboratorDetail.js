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
import { addCourseToHistory } from "../actions/coursesActions";
import CollaboratorDetailPDF from "./CollaboratorDetailPDF";
import { renewCourse } from "../actions/coursesActions";
import { deleteCourse } from "../actions/coursesActions";
import { FiX, FiCheck, FiCircle } from "react-icons/fi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { BsCircleFill, BsPersonFill } from "react-icons/bs";

import {
  AiFillCheckSquare,
  AiFillCheckCircle,
  AiFillExclamationCircle,
  AiOutlineExclamationCircle,
  AiFillInfoCircle,
} from "react-icons/ai";

import "jspdf-autotable";

function checkDate(corso) {
  if (corso.instructor) {
    return (
      <BsPersonFill
        className="ml-1 mr-2 mt-1 float-left"
        color="black"
      ></BsPersonFill>
    );
  }
  if (!corso.expiration_date) {
    return (
      <BsCircleFill
        className="ml-1 mr-2 mt-1 float-left"
        color="grey"
      ></BsCircleFill>
    );
  }

  var currentdate = new Date();
  var now = Date.parse(
    currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate()
  );
  var str1 = corso.expiration_date.substr(0, 10);
  var expiration_date = Date.parse(str1);

  var str2 = corso.certification_date.substr(0, 10);
  var certification_date = Date.parse(str2);

  if (certification_date > now) {
    return (
      <BsCircleFill
        className="ml-1 mr-2 mt-1 float-left"
        color="grey"
      ></BsCircleFill>
    );
  }

  var curYear = currentdate.getFullYear();
  var expYear = new Date(expiration_date).getFullYear();

  var differenceBetweenDates = expYear - curYear;

  if (expiration_date < now) {
    return (
      <AiFillCheckCircle
        className="ml-1 mr-2 mt-1 float-left"
        color="blue"
      ></AiFillCheckCircle>
    );
  }
  if (differenceBetweenDates < 1) {
    return (
      <BsCircleFill
        className="ml-1 mr-2 mt-1 float-left border-black"
        color="orange"
      ></BsCircleFill>
    );
  } else {
    return (
      <BsCircleFill
        className="ml-1 mr-2 mt-1 float-left"
        color="green"
      ></BsCircleFill>
    );
  }
}

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
          <td>
            {checkDate(corso)}
            {corso.name}
          </td>
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
    // this.filterArray = this.filterArray.bind(this);
    // this.updateHistory = this.updateHistory.bind(this);

    this.state = {
      collaborator_id: props.match.params.id,

      qualificationCourses: [],
      corsiPassati: [],
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

    axios.get(`/coursesHistory/${this.props.match.params.id}`).then((res) => {
      this.setState({ corsiPassati: res.data });
    });
    axios
      .get(
        `/necessaryCourses/qualificationCourses/${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({ qualificationCourses: res.data });
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

  onDocumentLoad({ numPages }) {
    this.setState({ numPages });
  }

  componentWillReceiveProps() {
    console.log(this.state);
    console.log(this.props);

    const collaborator = this.state.collaborator;
    var qualificationCourses = this.state.qualificationCourses;
    const courses = this.state.courses;
    const addCourseToHistory = this.props.addCourseToHistory;
    const deleteCourse = this.props.deleteCourse;
    const renewCourse = this.props.renewCourse;

    console.log(qualificationCourses);
    var currentdate = new Date();
    var now = Date.parse(
      currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getDate()
    );
    var corsiObbligatori = [];
    qualificationCourses.forEach(function (v) {
      corsiObbligatori.push(v.courses_id);
    });

    courses.forEach(function (v) {
      if (v.expiration_date !== null) {
        var str1 = v.expiration_date.substr(0, 10);
        var expiration_date = Date.parse(str1);
        if (now > expiration_date) {
          console.log("corso storico trovato");
          var newCourse = {
            course_id: v.id,
            certificationDate: v.certification_date.substr(0, 10),
            expirationDate: v.expiration_date.substr(0, 10),
            collaborator_id: parseInt(collaborator.id),
          };
          console.log(newCourse);
          addCourseToHistory(newCourse);
          if (corsiObbligatori.includes(v.id)) {
            console.log("obbligatory");
            const updateCourse = {
              course_id: v.id,
              collaborator_id: parseInt(collaborator.id),
            };
            console.log(updateCourse);
            renewCourse(updateCourse);
          } else {
            console.log("removed");
            const removedCourse = {
              course_id: v.id,
              collaborator_id: parseInt(collaborator.id),
            };
            console.log(removedCourse);
            deleteCourse(removedCourse);
          }
        }
      }
    });
  }

  filterArray = (courses) => {
    console.log(courses);
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
        else if (now > expiration_date) {
          this.state.corsiSvolti.push(courses[i]);
        } else if (now < certification_date)
          this.state.corsiDaSvolgere.push(courses[i]);
      }
    }
    return courses;
  };

  updateHistory = (props, state) => {
    // console.log(props);
    // console.log("ciaoooooooooooooooooo");
    // console.log(state);
    // var currentdate = new Date();
    // var now = Date.parse(
    //   currentdate.getFullYear() +
    //     "-" +
    //     (currentdate.getMonth() + 1) +
    //     "-" +
    //     currentdate.getDate()
    // );
    // var corsiObbligatori = [];
    // this.state.qualificationCourses.forEach(function (v) {
    //   corsiObbligatori.push(v.id);
    // });
    // this.state.courses.forEach(function (v) {
    //   if (v.expiration_date !== null) {
    //     var str1 = v.expiration_date.substr(0, 10);
    //     var expiration_date = Date.parse(str1);
    //     if (now > expiration_date) {
    //       console.log("corso storico trovato");
    //       var newCourse = {
    //         course_id: v.id,
    //         certificationDate: v.certification_date,
    //         expirationDate: v.expiration_date,
    //         collaborator_id: v.collaborator_id,
    //       };
    //       console.log(newCourse);
    //       //props.addCourseToHistory(newCourse);
    //       if (corsiObbligatori.includes(v.id)) {
    //         v.certification_date = null;
    //         v.expiration_date = null;
    //       } else {
    //         const removedCourse = {
    //           course_id: v.id,
    //           collaborator_id: props.match.params.id,
    //         };
    //         //props.deleteCourse(removedCourse);
    //       }
    //     }
    //   }
    // });
  };

  render = () => {
    this.filterArray(this.state.courses);
    // console.log(this.state.corsiInCorso);
    // console.log(this.state.corsiDaSvolgere);
    // console.log(this.state.corsiPassati);
    // console.log(this.state.corsiSvolti);

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
            corsi={this.state.corsiPassati}
            // corsi={this.state.corsiSvolti}
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

        <CollaboratorDetailPDF
          collaborator={this.state.collaborator}
          corsiInCorso={this.state.corsiInCorso}
          corsiDaSvolgere={this.state.corsiDaSvolgere}
          corsiSvolti={this.state.corsiPassati}
        ></CollaboratorDetailPDF>
      </div>
    );
  };
}

CollaboratorDetail.propTypes = {
  fetchCollaboratorInfos: PropTypes.func.isRequired,
  fetchCoursesOfCollaborator: PropTypes.func.isRequired,
  //addCourseToHistory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  collaboratorInfos: state.collaborators.collaboratorInfos,
  coursesOfCollaborator: state.courses.coursesOfCollaborator,
  //addCourseToHistory: state.courses.historyCourses,
});

export default connect(mapStateToProps, {
  fetchCollaboratorInfos,
  fetchCoursesOfCollaborator,
  addCourseToHistory,
  deleteCourse,
  renewCourse,
})(CollaboratorDetail);
