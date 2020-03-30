import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class RemoveCourseModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onSubmit = e => {
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
    // //Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}></Button>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Rimozione di un corso</ModalHeader>
          <ModalBody>Sei sicuro di voler rimuovere questo corso?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onSubmit}>
              Continua
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Annulla
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RemoveCourseModal;
