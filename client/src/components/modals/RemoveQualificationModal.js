import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchQualificationsInfos } from "../../actions/qualificationsActions";
import { fetchQualificationsOfCollaborator } from "../../actions/qualificationsActions";
import { removeQualificationsFromCollaborator } from "../../actions/qualificationsActions";
import { removeQualification } from "../../actions/qualificationsActions";

import PropTypes from "prop-types";

import {
  CustomInput,
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

class RemoveQualificationModal extends Component {
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

  onSubmit = (e) => {
    e.preventDefault();

    console.log(this.state.listOfId);
    this.props.removeQualification(this.state.listOfId);

    this.toggle();
    window.location.reload();
  };

  filterCompleted = (checked, name) => {
    if (checked === true) {
      this.state.listOfId.push(name);
    } else {
      var index = this.state.listOfId.indexOf(name);
      this.state.listOfId.splice(index, 1);
    }
  };

  render() {
    return (
      <div>
        <Button className="ml-5 mt-5 mb-5 mr-2" onClick={this.toggle}>
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
                  {this.props.qualifications.map(
                    ({ id, name, collaborator, necessary_courses }) => (
                      <FormGroup check>
                        <Input
                          onChange={(e) =>
                            this.filterCompleted(e.target.checked, name)
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

RemoveQualificationModal.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { removeQualification })(
  RemoveQualificationModal
);
