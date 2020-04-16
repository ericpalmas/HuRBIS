import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { modifyCourse } from "../../actions/coursesActions";
import {
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Modal,
  Form,
  Input,
} from "reactstrap";

class EditCourseModal extends Component {
  static propTypes = {
    courses: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      name: this.props.course.name,
      certificationDate: this.props.course.certification_date,
      expirationDate: this.props.course.expiration_date,
      collaborator_id: this.props.collaborator_id,
      course_id: this.props.course.id,
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

  onSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      name: this.state.name,
      certificationDate: this.state.certificationDate.substr(0, 10),
      expirationDate: this.state.expirationDate.substr(0, 10),
      collaborator_id: this.state.collaborator_id,
      course_id: this.state.course_id,
    };

    this.props.modifyCourse(newCourse);

    //Close modal
    this.toggle();
  };

  render() {
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
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Nome corso</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder={this.state.name ? this.state.name : ""}
                  onChange={this.onChange}
                ></Input>
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
})(EditCourseModal);