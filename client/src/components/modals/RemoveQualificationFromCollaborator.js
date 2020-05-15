import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchQualificationsInfos } from "../../actions/qualificationsActions";
import { fetchQualificationsOfCollaborator } from "../../actions/qualificationsActions";
import { removeQualificationsFromCollaborator } from "../../actions/qualificationsActions";

import PropTypes from "prop-types";

import {
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

class RemoveQualificationFromCollaborator extends Component {
  state = {
    modal: false,
    qualificationsInformations: null,
    collaborator_id: this.props.collaborator_id,
    msg: null,
    listOfId: [],
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

  onClickAndFetch = () => {
    this.props.fetchQualificationsInfos();
    this.state.listOfId = [];
    this.setState({
      qualificationsInformations: this.props.qualificationsInfos,
    });
    this.toggle();
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.listOfId);
    const item = {
      qualifications_id: this.state.listOfId,
      collaborator_id: this.props.collaborator_id,
    };
    this.props.removeQualificationsFromCollaborator(item);
    this.toggle();
  };

  componentWillMount() {
    this.props.fetchQualificationsOfCollaborator(this.props.collaborator_id);
  }

  filterCompleted = (checked, id) => {
    if (checked === true) {
      this.state.listOfId.push(id);
    } else {
      var index = this.state.listOfId.indexOf(id);
      this.state.listOfId.splice(index, 1);
    }
  };

  render() {
    return (
      <div>
        <Button className="ml-5 mt-5 mb-5 mr-2" onClick={this.onClickAndFetch}>
          Rimuovi qualifica
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Rimuovi qualifica </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="exampleCustomSelect">
                  Seleziona le qualifiche da rimuovere
                </Label>
                <div>
                  {this.props.qualificationOfCollaborator.map(
                    ({ id, name, collaborator, necessary_courses }) => (
                      <FormGroup check>
                        <Input
                          onChange={(e) =>
                            this.filterCompleted(e.target.checked, id)
                          }
                          type="checkbox"
                          name="check"
                          id="exampleCheck"
                        />
                        <Label for="exampleCheck">{name}</Label>
                      </FormGroup>
                    )
                  )}
                </div>
                <Button color="primary" className="mt-4 mr-2 float-left">
                  Continua
                </Button>
                <Button
                  color="secondary"
                  className="mt-4 mr-2 float-left"
                  onClick={this.toggle}
                >
                  Annulla
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

RemoveQualificationFromCollaborator.propTypes = {
  fetchQualificationsInfos: PropTypes.func.isRequired,
  fetchQualificationsOfCollaborator: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  qualificationsInfos: state.qualifications.qualifications,
  qualificationOfCollaborator: state.qualifications.collaboratorQualifications,
});

export default connect(mapStateToProps, {
  fetchQualificationsInfos,
  fetchQualificationsOfCollaborator,
  removeQualificationsFromCollaborator,
})(RemoveQualificationFromCollaborator);
