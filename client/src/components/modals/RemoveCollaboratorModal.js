import React, { Component } from "react";
import { connect } from "react-redux";
//import PropTypes from "prop-types";
import { deleteCollaborator } from "../../actions/collaboratosActions";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class RemoveCollaboratorModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onDeleteClick = (id) => {
    this.props.deleteCollaborator(id);
    this.toggle();
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Button
          className="remove-btn ml-1 mr-1 mt-1"
          color="danger"
          size="sm"
          onClick={this.toggle}
        >
          &times;
        </Button>
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Rimozione corso di formazione
          </ModalHeader>
          <ModalBody>
            Sei sicuro di voler rimuovere {this.props.collaboratorName}{" "}
            {this.props.collaboratorSurname}?
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.onDeleteClick.bind(this, this.props.collaboratorId)}
            >
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

const mapStateToProps = (state) => ({
  //   courses: state.courses,
});

export default connect(mapStateToProps, {
  deleteCollaborator,
})(RemoveCollaboratorModal);
