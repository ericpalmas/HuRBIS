import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { addCourse } from "../../actions/coursesActions";
import PropTypes from "prop-types";

import {
  Alert,
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Modal,
  Input,
  Form,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import ArrayFormData from "../ArrayFormData";

class AddQualificationModal extends Component {
  state = {
    modal: false,
    msg: null,
    listOfCourses: [],
    coursesNumber: 0,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value !== null) {
    }
  };

  componentDidMount() {
    this.state.listOfCourses.push(" ");
  }

  onSubmit = (e) => {
    e.preventDefault();

    // const newItem = {
    //   name: this.state.name,
    //   certificationDate: this.state.certificationDate,
    //   expirationDate: this.state.expirationDate,
    //   obbligatory: this.state.obbligatory,
    //   collaborator_id: this.state.collaborator_id
    // };

    // console.log(newItem);
    // this.props.addCourse(newItem);
    //Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button className="ml-5 mt-5 mb-5 mr-2" onClick={this.toggle}>
          Aggiungi qualifica
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {" "}
            Aggiungi nuova qualifica{" "}
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Nome qualifica</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  className="mb-2"
                  placeholder="Nome del corso"
                  onChange={this.onChange}
                ></Input>
                <ArrayFormData></ArrayFormData>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   course: state.course
// });

// export default connect(mapStateToProps, { addCourse })(AddQualificationModal);

export default AddQualificationModal;
