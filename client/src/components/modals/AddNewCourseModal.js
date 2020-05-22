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
    cost: "",
    msg: "Inserire il nome del corso",
    msg2: "Errore nell'inserimento del costo",
    insertName: false,
    insertCost: false,
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

  onChangeCost = (e) => {
    this.setState({
      cost: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    var newCourse = {
      name: this.state.name,
      cost: this.state.cost.replace(",", "."),
    };

    if (newCourse.name === "") {
      this.setState({
        insertName: true,
      });
    } else {
      this.setState({
        insertName: false,
      });
      if (
        isNaN(parseFloat(this.state.cost.replace(",", "."))) &&
        this.state.cost !== ""
      ) {
        this.setState({
          insertCost: true,
        });
      } else {
        if (newCourse.cost === "") newCourse.cost = null;
        this.setState({
          insertCost: false,
        });
        this.props.addNewCourse(newCourse);
        this.toggle();
      }
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

            {this.state.insertCost ? (
              <Alert color="danger">{this.state.msg2}</Alert>
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

                <Label className="mt-3" for="item">
                  Costo
                </Label>
                <br></br>
                <Label className="float-left mt-2 mr-2" for="item">
                  CHF
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="0.00"
                  onChange={this.onChangeCost}
                  className="float-left mb-2 mt-1 w-25"
                ></Input>

                <Button style={{ marginTop: "4rem" }} block>
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
