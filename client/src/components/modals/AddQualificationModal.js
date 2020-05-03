import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../actions/coursesActions";

import PropTypes from "prop-types";

import {
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Modal,
  Form,
} from "reactstrap";
import ArrayFormData from "../ArrayFormData";

class AddQualificationModal extends Component {
  state = {
    modal: false,
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
    this.props.fetchCourses();
  }

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    console.log(this.state.courses);
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
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                {this.props.coursesInfos.length !== 0 ? (
                  <ArrayFormData
                    courses={this.props.coursesInfos}
                  ></ArrayFormData>
                ) : (
                  ""
                )}
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

AddQualificationModal.propTypes = {
  fetchCourses: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  coursesInfos: state.courses.courses,
});

export default connect(mapStateToProps, { fetchCourses })(
  AddQualificationModal
);
