import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";
import { modifyCourseDue } from "../../actions/coursesActions";

import {
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Modal,
  Form,
  Input,
  Alert,
} from "reactstrap";

class EditCourseModalDue extends Component {
  static propTypes = {
    courses: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      course_id: this.props.course_id,
      course_name: this.props.course_name,
      course_cost: this.props.course_cost,
      msg: "Inserire il nome del corso",
      msg2: "Errore nell'inserimento del costo",
      insertName: false,
      insertCost: false,
    };
    this.begin = this.begin.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      course_name: this.props.course_name,
      course_cost: this.props.course_cost,
    });
  };

  begin() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeName = (e) => {
    this.setState({
      course_name: e.target.value,
    });
  };

  onChangeCost = (e) => {
    this.setState({
      course_cost: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    var course = {
      id: this.state.course_id,
      name: this.state.course_name,
      cost: this.state.course_cost,
    };

    if (this.state.course_cost !== null) {
      course.cost = course.cost.toString().replace(",", ".");
    }

    if (course.name === "") {
      this.setState({
        insertName: true,
      });
    } else {
      this.setState({
        insertName: false,
      });

      if (isNaN(Number(course.cost)) && this.state.course_cost !== "") {
        this.setState({
          insertCost: true,
        });
      } else {
        if (course.cost === "") course.cost = null;
        this.setState({
          insertCost: false,
        });
        this.props.modifyCourseDue(course);
        this.toggle();
      }
    }
  };

  render() {
    return (
      <div>
        <Button
          className="ml-1 mr-1 mt-1"
          color="info"
          size="sm"
          onClick={this.toggle}
        >
          <FaEdit />
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}> Modifica corso </ModalHeader>
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
                  defaultValue={this.state.course_name}
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
                  defaultValue={this.state.course_cost}
                ></Input>

                <Button style={{ marginTop: "4rem" }} block>
                  {" "}
                  Modifica corso
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

EditCourseModalDue.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { modifyCourseDue })(
  EditCourseModalDue
);
