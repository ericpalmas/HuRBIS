import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { modifyCourse } from "../../actions/coursesActions";
import { deleteCourse } from "../../actions/coursesActions";
import { addCourseToHistory } from "../../actions/coursesActions";
import {
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Modal,
  Form,
  Input,
  Alert,
} from "reactstrap";

class EditCourseModal extends Component {
  static propTypes = {
    courses: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      cost: "",
      instructor: this.props.course.instructor,
      modal: false,
      name: this.props.course.name,
      certificationDate: this.props.course.certification_date,
      expirationDate: this.props.course.expiration_date,
      collaborator_id: this.props.collaborator_id,
      course_id: this.props.course.id,
      dateError: false,
      insertADate: false,
      msg2: "La data di certificazione deve essere minore della scadenza",
      msg3: "Inserire le date",
    };
    this.begin = this.begin.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  begin() {
    this.setState({
      modal: !this.state.modal,
    });
  }

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

  componentDidMount() {
    axios
      .get(`/courses/cost/${this.state.course_id}`)
      .then((res) => {
        console.log(res);
        if (res.data.length !== 0) this.setState({ cost: res.data[0] });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      name: this.state.name,
      certificationDate: this.state.certificationDate.substr(0, 10),
      expirationDate: this.state.expirationDate.substr(0, 10),
      collaborator_id: this.state.collaborator_id,
      course_id: this.state.course_id,
      instructor: this.state.instructor,
    };

    var newItem = {
      cost: this.state.cost,
      instructor: this.state.instructor,
      course_id: this.state.course_id,
      collaborator_id: this.state.collaborator_id,
      certificationDate: this.state.certificationDate.substr(0, 10),
      expirationDate: this.state.expirationDate.substr(0, 10),
    };

    console.log(newItem);

    const removedCourse = {
      course_id: this.state.course_id,
      collaborator_id: this.state.collaborator_id,
    };

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
        var currentdate = new Date();
        var now = Date.parse(
          currentdate.getFullYear() +
            "-" +
            (currentdate.getMonth() + 1) +
            "-" +
            currentdate.getDate()
        );
        var expiration_date = Date.parse(newItem.expirationDate);

        if (now > expiration_date) {
          this.props.deleteCourse(removedCourse);
          this.props.addCourseToHistory(newItem);
        } else {
          this.props.modifyCourse(newCourse);
        }

        this.toggle();
      }
    } else {
      console.log("specificare un periodo");
      this.setState({
        insertADate: true,
      });
    }

    // if (newCourse.certificationDate || newCourse.expirationDate) {
    //   var currentdate = new Date();
    //   var now = Date.parse(
    //     currentdate.getFullYear() +
    //       "-" +
    //       (currentdate.getMonth() + 1) +
    //       "-" +
    //       currentdate.getDate()
    //   );
    //   var expiration_date = Date.parse(newItem.expirationDate);

    //   if (now > expiration_date) {
    //     this.props.deleteCourse(removedCourse);
    //     this.props.addCourseToHistory(newItem);
    //   } else {
    //     this.props.modifyCourse(newCourse);
    //   }
    // }

    // this.toggle();
  };

  handleChange = () => {
    this.setState({
      instructor: !this.state.instructor,
    });
  };

  render() {
    console.log(this.state.cost);
    return (
      <div>
        <Button
          className="ml-1 mr-1 mt-1"
          color="info"
          size="sm"
          onClick={this.toggle}
        >
          <FaEdit />
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {" "}
            Modifica corso di formazione{" "}
          </ModalHeader>
          <ModalBody>
            {this.state.dateError ? (
              <Alert color="danger">{this.state.msg2}</Alert>
            ) : null}
            {this.state.insertADate ? (
              <Alert color="danger">{this.state.msg3}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Nome corso: </Label>
                <Label type="text" name="name" id="item" className="ml-2">
                  {this.state.name}
                </Label>
                <br></br>
                <Label for="text" style={{ marginTop: "2rem" }}>
                  Data di certificazione
                </Label>
                <Input
                  type="date"
                  id="item"
                  onChange={this.onChangeCertificationDate}
                  value={
                    this.state.certificationDate
                      ? this.state.certificationDate.substr(0, 10)
                      : ""
                  }
                ></Input>
                <Label for="text" style={{ marginTop: "2rem" }}>
                  Data di Scadenza
                </Label>
                <Input
                  type="date"
                  id="item"
                  onChange={this.onChangeExpirationDate}
                  value={
                    this.state.expirationDate
                      ? this.state.expirationDate.substr(0, 10)
                      : ""
                  }
                ></Input>
                <Label className="ml-4 mt-4">
                  {this.state.instructor ? (
                    <Input
                      checked
                      type="checkbox"
                      onChange={this.handleChange}
                    />
                  ) : (
                    <Input type="checkbox" onChange={this.handleChange} />
                  )}
                  Istruttore
                </Label>
                <Button style={{ marginTop: "2rem" }} block>
                  {" "}
                  Modifica corso
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

EditCourseModal.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  modifyCourse,
  addCourseToHistory,
  deleteCourse,
})(EditCourseModal);
