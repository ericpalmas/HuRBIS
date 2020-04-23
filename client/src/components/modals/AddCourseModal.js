import React, { Component } from "react";
import { connect } from "react-redux";
import { addCourse } from "../../actions/coursesActions";
import { fetchCourses } from "../../actions/coursesActions";
import { addCourseToHistory } from "../../actions/coursesActions";
import { fetchCoursesOfCollaborator } from "../../actions/coursesActions";
import axios from "axios";

import PropTypes from "prop-types";

import {
  CustomInput,
  Alert,
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Modal,
  Form,
  Input,
} from "reactstrap";

class AddCourseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instructor: false,
      modal: false,
      courseIsPresent: false,
      dateError: false,
      insertADate: false,
      name: "",
      certificationDate: "",
      expirationDate: "",
      instructor: false,
      collaborator_id: this.props.collaborator_id,
      course_id: "",
      corsi: [],
      msg: "Il corso è già presente",
      msg2: "La data di certificazione deve essere minore della scadenza",
      msg3: "Inserire le date",
    };

    axios.get(`/courses`).then((res) => {
      console.log(res.data[0]);
      this.setState({ course_id: res.data[0].id });
    });
  }

  componentDidMount() {
    this.props.fetchCourses();
    this.props.fetchCoursesOfCollaborator(this.props.collaborator_id);
    // this.setState({
    //   course_id: this.state.corsi[0].id,
    // });
    // if (this.props.corsi.length !== 0) {
    //   this.setState({
    //     course_id: this.props.id,
    //   });
    // }

    // this.setState({
    //   corsi: this.props.corsi,
    // });
    // console.log(this.state.corsi);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeCertificationDate = (e) => {
    const date = e.target.value;
    this.setState({
      certificationDate: date,
    });
  };

  onChangeExpirationDate = (e) => {
    const date = e.target.value;
    this.setState({
      expirationDate: date,
    });
  };

  onQualificationSelect = (event) => {
    console.log(event);
    this.setState({
      course_id: event.target.value,
    });
  };

  handleChange = () => {
    this.setState({
      instructor: !this.state.instructor,
    });
    console.log(this.state.instructor);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      instructor: this.state.instructor,
      course_id: this.state.course_id,
      collaborator_id: this.state.collaborator_id,
      certificationDate: this.state.certificationDate,
      expirationDate: this.state.expirationDate,
    };

    var listOfId = [];
    var collaboratorCourses = this.props.collaboratorCourses;
    collaboratorCourses.forEach(function (v) {
      listOfId.push(v.id);
    });

    console.log(newItem);
    var currentdate = new Date();
    var now = Date.parse(
      currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getDate()
    );

    if (newItem.certificationDate || newItem.expirationDate) {
      this.setState({
        insertADate: false,
      });
      var certification_date = Date.parse(newItem.certificationDate);
      var expiration_date = Date.parse(newItem.expirationDate);
      if (certification_date > expiration_date) {
        console.log("la data non va bene");
        this.setState({
          dateError: true,
        });
      } else {
        console.log("la data va bene");
        this.setState({
          dateError: false,
        });
        if (listOfId.includes(parseInt(newItem.course_id))) {
          console.log("il corso è già presente");
          this.setState({
            courseIsPresent: true,
          });
        } else {
          console.log("il corso non è presente");
          this.setState({
            courseIsPresent: false,
          });
          if (now > expiration_date) this.props.addCourseToHistory(newItem);
          else this.props.addCourse(newItem);
          this.toggle();
          window.location.reload();
        }
      }
    } else {
      console.log("specificare un periodo");
      this.setState({
        insertADate: true,
      });
    }
  };

  render() {
    return (
      <div>
        <Button className="ml-5 mt-5 mb-5 mr-2" onClick={this.toggle}>
          Aggiungi corso
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {" "}
            Aggiungi corso di formazione{" "}
          </ModalHeader>
          <ModalBody>
            {this.state.courseIsPresent ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            {this.state.dateError ? (
              <Alert color="danger">{this.state.msg2}</Alert>
            ) : null}
            {this.state.insertADate ? (
              <Alert color="danger">{this.state.msg3}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="text" style={{ marginTop: "0.1rem" }}>
                  Nome corso
                </Label>
                <CustomInput
                  type="select"
                  id="exampleCustomSelect"
                  name="customSelect"
                  onChange={this.onQualificationSelect}
                  value={this.state.value}
                >
                  {this.props.coursesInfos.map(({ id, name }) => (
                    <option value={id}>{name}</option>
                  ))}
                </CustomInput>
                <Label for="text" style={{ marginTop: "2rem" }}>
                  Data di certificazione
                </Label>
                <Input
                  type="date"
                  id="item"
                  onChange={this.onChangeCertificationDate}
                ></Input>
                <Label for="text" style={{ marginTop: "2rem" }}>
                  Data di Scadenza
                </Label>
                <Input
                  type="date"
                  id="item"
                  onChange={this.onChangeExpirationDate}
                ></Input>
                <Label className="ml-4 mt-4">
                  <Input type="checkbox" onChange={this.handleChange} />{" "}
                  Istruttore
                </Label>
                <Button style={{ marginTop: "2rem" }} block>
                  {" "}
                  Aggiungi corso
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
AddCourseModal.propTypes = {
  fetchCourses: PropTypes.func.isRequired,
  fetchCoursesOfCollaborator: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  coursesInfos: state.courses.courses,
  collaboratorCourses: state.courses.coursesOfCollaborator,
});

export default connect(mapStateToProps, {
  addCourse,
  addCourseToHistory,
  fetchCourses,
  fetchCoursesOfCollaborator,
})(AddCourseModal);
