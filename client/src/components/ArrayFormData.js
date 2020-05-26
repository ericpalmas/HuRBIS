import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import { addNewQualification } from "../actions/qualificationsActions";

//import PropTypes from "prop-types";

import {
  Alert,
  Button,
  FormGroup,
  Label,
  Input,
  Form,
  CustomInput,
} from "reactstrap";

const ArrayFormData = (props) => {
  const [inputFields, setInputFields] = useState([
    { corso: props.courses[0].id },
  ]);

  const [inputVal, setInputVal] = useState("");

  const [toggleState, setToggleState] = useState(false);

  const [multipleId, setMultipleId] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    var newQualification = {
      name: inputVal,
      listOfId: inputFields,
    };

    if (inputVal === "") {
      setToggleState(true);
    } else {
      setToggleState(false);
      var checkArray = [];
      newQualification.listOfId.forEach(function (v) {
        checkArray.push(parseInt(v.corso));
      });
      if (hasDuplicates(checkArray)) {
        setMultipleId(true);
      } else {
        setMultipleId(false);
        props.addNewQualification(newQualification);
      }
    }
  };

  const hasDuplicates = (array) => {
    return new Set(array).size !== array.length;
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].corso = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ corso: props.courses[0].id });
    setInputFields(values);
  };

  const handleRemoveLastFields = () => {
    const values = [...inputFields];
    values.splice(inputFields.length - 1, 1);
    setInputFields(values);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {toggleState ? (
          <Alert color="danger">Inserire il nome della qualifica</Alert>
        ) : null}
        {multipleId ? (
          <Alert color="danger">Non inserire corsi duplicati</Alert>
        ) : null}
        <Label for="item">Nome qualifica</Label>
        <Input
          type="text"
          name="name"
          id="item"
          className="mb-2"
          placeholder="Nome del corso"
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
              <CustomInput
                type="select"
                id="exampleCustomSelect"
                name="customSelect"
                placeholder="Nome del corso"
                onChange={(event) => handleInputChange(index, event)}
              >
                {props.courses.map(({ id, name }) => (
                  <option value={id}>{name}</option>
                ))}
              </CustomInput>
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

ArrayFormData.propTypes = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addNewQualification })(ArrayFormData);
