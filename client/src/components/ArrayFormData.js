import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { addCourse } from "../actions/coursesActions";
import PropTypes from "prop-types";

import {
  Alert,
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Modal,
  Input,
  Form,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const ArrayFormData = () => {
  const [inputFields, setInputFields] = useState([{ corso: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].corso = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ corso: "" });
    setInputFields(values);
  };

  // const handleRemoveFields = index => {
  //   const values = [...inputFields];
  //   values.splice(index, 1);
  //   setInputFields(values);
  // };

  const handleRemoveLastFields = () => {
    const values = [...inputFields];
    values.splice(inputFields.length - 1, 1);
    setInputFields(values);
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label inline for="item">
          Corsi necessari
        </Label>
        <Button
          id="addRemoveButton"
          className="btn btn-link"
          type="button"
          onClick={() => handleRemoveLastFields()}
          inline
        >
          -
        </Button>
        <Button
          id="addRemoveButton"
          className="btn btn-link"
          type="button"
          onClick={() => handleAddFields()}
          inline
        >
          +
        </Button>
        <FormGroup>
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <Input
                type="text"
                name="name"
                id="ArrayField"
                className="box box--small mb-2"
                placeholder="Nome del corso"
                onChange={(event) => handleInputChange(index, event)}
                inline
              ></Input>
            </Fragment>
          ))}
        </FormGroup>

        <Button onSubmit={handleSubmit} style={{ marginTop: "2rem" }} block>
          {" "}
          Aggiungi qualifica
        </Button>
      </Form>
    </>
  );
};

export default ArrayFormData;

// const mapStateToProps = state => ({
//   course: state.course
// });

// export default connect(mapStateToProps, { addCourse })(AddQualificationModal);
