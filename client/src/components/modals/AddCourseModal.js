import React, { Component } from "react";
import { connect } from "react-redux";
import { addCourse } from "../../actions/coursesActions";
import { addCourseToHistory } from "../../actions/coursesActions";
import { addCourseToNecessary } from "../../actions/coursesActions";
import PropTypes from "prop-types";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container,
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
    obbligatory: false,
    collaborator_id: this.props.collaborator_id,
    msg: null,
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

    const newItem = {
      name: this.state.name,
      certificationDate: this.state.certificationDate,
      expirationDate: this.state.expirationDate,
      obbligatory: this.state.obbligatory,
      collaborator_id: this.state.collaborator_id,
    };

    console.log("nuovo corso");
    console.log(newItem);

    var currentdate = new Date();
    var now = Date.parse(
      currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1) +
        "-" +
        currentdate.getDate()
    );

    var expiration_date = Date.parse(newItem.expirationDate);
    var certification_date = Date.parse(newItem.certificationDate);

    if (certification_date <= now && expiration_date >= now)
      this.props.addCourse(newItem);
    else if (now > expiration_date) this.props.addCourseToHistory(newItem);
    else if (now < certification_date) this.props.addCourseToNecessary(newItem);

    //Close modal
    this.toggle();
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
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Nome corso</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Nome del corso"
                  onChange={this.onChange}
                ></Input>
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

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, {
  addCourse,
  addCourseToHistory,
  addCourseToNecessary,
})(AddCourseModal);
