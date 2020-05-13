import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { fetchQualificationsInfos } from "../../actions/qualificationsActions";
import { addQualificationToCollaborator } from "../../actions/qualificationsActions";
import { addCoursesToCollaborator } from "../../actions/coursesActions";

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
} from "reactstrap";

class AddQualificationToCollaboratorModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qualificationAlreadyExist: false,
      qualificationOfCollaborator: [],
      coursesAndQualifications: [],
      qualifications: [],
      defaultValue: "",
      courses: [],
      necessary_courses: [],
      modal: false,
      name: "",
      qualification_id: "",
      obbligatory: false,
      collaborator_id: this.props.collaborator_id,
      msg: "Il collaboratore possiede già questa qualifica",
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onClickAndFetch = () => {
    axios
      .get("/collaboratorCourses/" + this.props.collaborator_id)
      .then((res) => {
        this.setState({
          courses: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/necessaryCourses")
      .then((res) => {
        this.setState({
          coursesAndQualifications: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/qualifications/" + this.props.collaborator_id)
      .then((res) => {
        this.setState({
          qualificationOfCollaborator: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      qualification_id: this.state.defaultValue,
    });

    this.toggle();
  };

  onQualificationSelect = (event) => {
    this.setState({
      qualification_id: event.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      qualification_id: this.state.qualification_id,
      collaborator_id: this.props.collaborator_id,
    };
    console.log(newItem);

    console.log(this.state.coursesAndQualifications);
    console.log(this.state.courses);

    var corsi = [];
    this.state.coursesAndQualifications.forEach(function (v) {
      if (v.qualification_id.toString() === newItem.qualification_id.toString())
        corsi.push(v.courses_id);
    });
    //corsi necessari per quella qualifica
    console.log(corsi);

    var collaboratorCourses = [];
    this.state.courses.forEach(function (v) {
      collaboratorCourses.push(v.courses_id);
    });
    console.log(collaboratorCourses);

    let difference = corsi.filter((x) => !collaboratorCourses.includes(x));
    console.log(difference);

    var collaboratorQualifications = [];
    this.state.qualificationOfCollaborator.forEach(function (v) {
      collaboratorQualifications.push(v.id);
    });
    console.log(collaboratorQualifications);
    if (
      collaboratorQualifications.includes(parseInt(newItem.qualification_id))
    ) {
      this.setState({
        qualificationAlreadyExist: true,
      });
    } else {
      this.setState({
        qualificationAlreadyExist: false,
      });

      console.log(difference.length);
      if (difference.length !== 0) {
        this.props.addQualificationToCollaborator(newItem);
        var item = {
          collaborator_id: newItem.collaborator_id,
          listOfCoursesId: difference,
        };

        //this.props.addCoursesToCollaborator(item);

        axios.post("/collaboratorCourses", item).catch((error) => {
          console.log(error);
        });
      }

      this.toggle();
      //window.location.reload();
    }
  };

  componentDidMount() {
    axios
      .get(`/qualifications`)
      .then((res) => {
        if (res.data.length !== 0) {
          this.setState({
            qualifications: res.data,
            defaultValue: res.data[0].id,
            qualification_id: res.data[0].id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // console.log(this.state.qualifications);
    return (
      <div>
        <Button className="ml-5 mt-5 mb-5 mr-2" onClick={this.onClickAndFetch}>
          Aggiungi qualifica
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Aggiungi qualifica </ModalHeader>
          <ModalBody>
            {this.state.qualificationAlreadyExist ? (
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
                  defaultValue={this.state.value}
                >
                  {this.state.qualifications.map(({ id, name }) => (
                    <option value={id}>{name}</option>
                  ))}
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
  addCoursesToCollaborator,
})(AddQualificationToCollaboratorModal);
