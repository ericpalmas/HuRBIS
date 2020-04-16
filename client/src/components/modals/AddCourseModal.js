import React, { Component } from "react";
import { connect } from "react-redux";
import { addCourse } from "../../actions/coursesActions";
import { fetchCourses } from "../../actions/coursesActions";
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
  state = {
    modal: false,
    name: "",
    certificationDate: "",
    expirationDate: "",
    instructor: false,
    collaborator_id: this.props.collaborator_id,
    course_id: "1",
    msg: null,
  };

  componentDidMount() {
    this.props.fetchCourses();
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

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      course_id: this.state.course_id,
      collaborator_id: this.state.collaborator_id,
      certificationDate: this.state.certificationDate,
      expirationDate: this.state.expirationDate,
      instructor: this.state.instructor,
    };
    console.log("nuovo corso");
    console.log(newItem);

    ///////////
    //inserire un controllo per i corsi duplicati
    //faccio una fetch tramite course id e collaborator id e faccio il controllo
    ///////////////

    this.props.addCourse(newItem);

    //Close modal
    this.toggle();
  };

  render() {
    console.log(this.props.coursesInfos);
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
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
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
};
const mapStateToProps = (state) => ({
  coursesInfos: state.courses.courses,
});

export default connect(mapStateToProps, {
  addCourse,
  fetchCourses,
})(AddCourseModal);
