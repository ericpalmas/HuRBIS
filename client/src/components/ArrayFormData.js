import React, { useState, Fragment } from "react";

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
  ListGroupItem
} from "reactstrap";

const ArrayFormData = () => {
  const [inputFields, setInputFields] = useState([{ firstName: "" }]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].firstName = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: "" });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <Input
                type="text"
                name="name"
                id="ArrayField"
                className="box box--small"
                placeholder="Nome del corso"
                onChange={event => handleInputChange(index, event)}
                inline
              ></Input>
              <Button
                id="addRemoveButton"
                className="btn btn-link"
                type="button"
                onClick={() => handleRemoveFields(index)}
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
            </Fragment>
          ))}
        </FormGroup>

        <div className="submit-button">
          <button
            className="btn btn-primary mr-2"
            type="submit"
            onSubmit={handleSubmit}
          >
            Save
          </button>
        </div>
      </Form>
    </>
  );
};

export default ArrayFormData;
