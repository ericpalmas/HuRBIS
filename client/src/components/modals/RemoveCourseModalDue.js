import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteCourseFromDatabase } from "../../actions/coursesActions";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class RemoveCourseModalDue extends Component {
  static propTypes = {
    courses: PropTypes.object.isRequired,
  };
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
    console.log(id);
    if (id !== undefined) {
      this.props.deleteCourseFromDatabase(id);
    }
    this.toggle();
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
            Sei sicuro di voler rimuovere {this.props.course_name}?
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.onDeleteClick.bind(this, this.props.course_id)}
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
  courses: state.courses,
});

export default connect(mapStateToProps, {
  deleteCourseFromDatabase,
})(RemoveCourseModalDue);
