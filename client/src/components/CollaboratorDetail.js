import React, { Component, Fragment } from "react";
import { Label, Table, Button, Container } from "reactstrap";
import axios from "axios";
import AddCourseModal from "./modals/AddCourseModal";
import RemoveCourseModal from "./modals/RemoveCourseModal";
import EditCourseModal from "./modals/EditCourseModal";

const Corso = ({ corsi, elem }) => (
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
          <td>{!!corso.name ? corso.name : "whatever you want"}</td>
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
                className="remove-btn ml-1 mr-1 mt-1"
                color="danger"
                size="sm"
              ></RemoveCourseModal>
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
      currentCourses: [],
      necessaryCourses: [],
      historyCourses: [],
      remove: false,
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

    axios.get(`/courses/current/${this.props.match.params.id}`).then((res) => {
      this.setState({ currentCourses: res.data });
    });
    axios.get(`/courses/history/${this.props.match.params.id}`).then((res) => {
      this.setState({ historyCourses: res.data });
    });
    axios
      .get(`/courses/necessary/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ necessaryCourses: res.data });
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
      if (courses[i].expiration_date === null) {
        this.state.corsiDaSvolgere.push(courses[i]);
      } else {
        var str1 = courses[i].expiration_date.substr(0, 10);
        var expiration_date = Date.parse(str1);

        var str2 = courses[i].certification_date.substr(0, 10);
        var certification_date = Date.parse(str2);

        if (certification_date <= now && expiration_date >= now)
          this.state.corsiInCorso.push(courses[i]);
        else this.state.corsiSvolti.push(courses[i]);
      }
    }
    return courses;
  };

  update = () => {
    let deleteDuplicates = this.state.courses.filter(
      (ele, ind) =>
        ind === this.state.courses.findIndex((elem) => elem.name === ele.name)
    );
    this.filterArray(deleteDuplicates);
  };

  render() {
    this.update();
    console.log(this.state.currentCourses);
    // console.log(this.state.collaborator);
    // console.log("Corsi svolti");
    // console.log(this.state.corsiSvolti);
    // console.log("Corsi in corso");
    // console.log(this.state.corsiInCorso);
    // console.log("Corsi da svolgere");
    // console.log(this.state.corsiDaSvolgere);

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
          <Corso corsi={this.state.corsiInCorso} elem={this} />
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi da svolgere: </h6>
          <br></br>
          <Corso corsi={this.state.corsiDaSvolgere} elem={this} />
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi svolti: </h6>
          <br></br>
          <Corso corsi={this.state.corsiSvolti} elem={this} />
        </Label>
        <br></br>
        <div id="addCourseButton">
          <AddCourseModal
            collaborator_id={this.props.match.params.id}
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

export default CollaboratorDetail;
