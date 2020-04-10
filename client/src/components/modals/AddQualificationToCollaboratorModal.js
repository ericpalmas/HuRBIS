import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchQualificationsInfos } from "../../actions/qualificationsActions";
import { addQualificationToCollaborator } from "../../actions/qualificationsActions";

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

class AddQualificationToCollaboratorModal extends Component {
  state = {
    modal: false,
    name: "",
    qualificationSelected: "",
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

  onClickAndFetch = () => {
    this.props.fetchQualificationsInfos();
    // console.log(this.props.qualificationsInfos);

    this.toggle();
  };

  onQualificationSelect = (event) => {
    console.log(event);
    this.setState({
      qualificationSelected: event.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: this.state.qualificationSelected,
      collaborator_id: this.props.collaborator_id,
    };

    this.props.addQualificationToCollaborator(newItem);

    //Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button className="ml-5 mt-5 mb-5 mr-2" onClick={this.onClickAndFetch}>
          Aggiungi qualifica
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Aggiungi qualifica </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="exampleCustomSelect">Assegna una qualifica</Label>
                <CustomInput
                  type="select"
                  id="exampleCustomSelect"
                  name="customSelect"
                  onChange={this.onQualificationSelect}
                  value={this.state.value}
                >
                  {this.props.qualificationsInfos.map(
                    ({ id, name, collaborator, necessary_courses }) => (
                      <option>{name}</option>
                    )
                  )}
                </CustomInput>
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

AddQualificationToCollaboratorModal.propTypes = {
  fetchQualificationsInfos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  qualificationsInfos: state.qualifications.qualifications,
});

export default connect(mapStateToProps, {
  fetchQualificationsInfos,
  addQualificationToCollaborator,
})(AddQualificationToCollaboratorModal);
