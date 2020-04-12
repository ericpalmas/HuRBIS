import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { addCourse } from "../actions/coursesActions";
import { addNewQualification } from "../actions/qualificationsActions";
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

const ArrayFormData = (props) => {
  //const [inputFields, setInputFields] = useState([{ corso: "" }]);
  const [inputFields, setInputFields] = useState([{ corso: "" }]);
  //const [qualificationName, setQualificationName] = useState({ name: "" });
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
    console.log("qualificationName", inputVal);
    const newQualification = {
      name: inputVal,
      listOfId: inputFields,
    };

    props.addNewQualification(newQualification);
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
        <Label for="item">Nome qualifica</Label>
        <Input
          type="text"
          name="name"
          id="item"
          className="mb-2"
          placeholder="Nome del corso"
          // onChange={(event) => changeName(event)}

          value={inputVal}
          onChange={(event) => setInputVal(event.target.value)}
        ></Input>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addNewQualification })(ArrayFormData);
