import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewCourse } from "../../actions/coursesActions";
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

class AddNewCourseModal extends Component {
  state = {
    modal: false,
    name: "",
    surname: "",
    yearOfBirth: "",
    msg: "Inserire il nome del corso",
    insertName: false,
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

  onSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      name: this.state.name,
    };

    console.log("nuovo corso");
    console.log(newCourse);

    if (newCourse.name === "") {
      this.setState({
        insertName: true,
      });
    } else {
      this.setState({
        insertName: false,
      });
      this.props.addNewCourse(newCourse);
      this.toggle();
      window.location.reload();
    }
  };

  render() {
    return (
      <div>
        <Button className="ml-5 mt-5 mb-5 mr-2" onClick={this.toggle}>
          Aggiungi corso
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Aggiungi nuovo corso </ModalHeader>
          <ModalBody>
            {this.state.insertName ? (
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addNewCourse })(AddNewCourseModal);
