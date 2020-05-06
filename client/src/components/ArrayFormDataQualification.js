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
  CustomInput,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const ArrayFormDataQualification = (props) => {
  const [inputVal, setInputVal] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("qualificationName", inputVal);

    const newQualification = {
      name: inputVal,
    };

    console.log(newQualification);

    //props.addNewQualification(newQualification);
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    var value = [...inputVal];
    value = event.target.value;
    setInputVal(value);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <CustomInput
            type="select"
            id="exampleCustomSelect"
            name="customSelect"
            placeholder="Nome del corso"
            onChange={(event) => handleInputChange(event)}
          >
            {props.qualifications.map(({ id, name }) => (
              <option value={id}>{name}</option>
            ))}
          </CustomInput>
        </FormGroup>

        <Button onSubmit={handleSubmit} style={{ marginTop: "2rem" }} block>
          {" "}
          Aggiungi qualifica
        </Button>
      </Form>
    </>
  );
};

ArrayFormDataQualification.propTypes = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addNewQualification })(
  ArrayFormDataQualification
);
