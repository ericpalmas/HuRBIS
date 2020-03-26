import React, { Component } from "react";
import { connect } from "react-redux";
import { addCourse } from "../actions/coursesActions";
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
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Modal,
  Form,
  Input
} from "reactstrap";

//const {v4:uuidv4} = require('uuid');

class AddCourseModal extends Component {
  state = {
    modal: false,
    name: "",
    certificationDate: "",
    expirationDate: "",
    obbligatory: false,
    collaborator_id: this.props.collaborator_id
  };

  //   static propTypes = {
  //     isAuthenticated: PropTypes.bool
  //   };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeCertificationDate = e => {
    const date = e.target.value;
    this.setState({
      certificationDate: date
    });
  };

  onChangeExpirationDate = e => {
    const date = e.target.value;
    this.setState({
      expirationDate: date
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      //id: uuidv4(),
      name: this.state.name,
      certificationDate: this.state.certificationDate,
      expirationDate: this.state.expirationDate,
      obbligatory: this.state.obbligatory,
      collaborator_id: this.state.collaborator_id
    };

    console.log(newItem);
    //Add item via addItem action
    this.props.addCourse(newItem);
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
                  // name="name"
                  id="item"
                  onChange={this.onChangeCertificationDate}
                ></Input>
                <Label for="text" style={{ marginTop: "2rem" }}>
                  Data di Scadenza
                </Label>
                <Input
                  type="date"
                  // name="name"
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

const mapStateToProps = state => ({
  course: state.course
});

export default connect(mapStateToProps, { addCourse })(AddCourseModal);
// export default AddCourseModal;