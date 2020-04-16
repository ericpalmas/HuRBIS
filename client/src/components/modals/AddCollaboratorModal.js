import React, { Component } from "react";
import { connect } from "react-redux";
import { addCollaborator } from "../../actions/collaboratosActions";
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

class AddCollaboratorModal extends Component {
  state = {
    modal: false,
    name: "",
    surname: "",
    yearOfBirth: "",
    msg: null,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeSurname = (e) => {
    this.setState({
      surname: e.target.value,
    });
  };

  onChangeYearOfBirth = (e) => {
    this.setState({
      yearOfBirth: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newCollaborator = {
      name: this.state.name,
      surname: this.state.surname,
      yearOfBirth: this.state.yearOfBirth,
    };

    console.log("nuovo collaboratore");
    console.log(newCollaborator);
    this.props.addCollaborator(newCollaborator);

    //Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button className="ml-5 mt-5 mb-5 mr-2" onClick={this.toggle}>
          Aggiungi collaboratore
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {" "}
            Aggiungi nuovo collaboratore{" "}
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Nome</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Nome"
                  onChange={this.onChangeName}
                ></Input>
                <Label for="item">Cognome</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Cognome"
                  onChange={this.onChangeSurname}
                ></Input>
                <Label for="item">Anno di nascita</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Anno di nascita"
                  onChange={this.onChangeYearOfBirth}
                ></Input>
                <Button style={{ marginTop: "2rem" }} block>
                  {" "}
                  Aggiungi collaboratore
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addCollaborator })(
  AddCollaboratorModal
);
