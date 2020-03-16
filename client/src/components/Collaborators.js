import React, { Component, Fragment, useState } from "react";
import { Button, Form, FormGroup, Input, Table } from "reactstrap";
import { connect } from "react-redux";
import { fetchCollaborators } from "../actions/collaboratosActions";
import PropTypes from "prop-types";

export class Collaborators extends Component {
  componentWillMount() {
    this.props.fetchCollaborators();
  }

  render() {
    const collaborators = this.props.collaborators;

    console.log(collaborators);
    return (
      <Form inline>
        <FormGroup>
          <Button id="searchButton">Cerca</Button>
          <Input
            type="search"
            name="search"
            id="exampleSearch"
            placeholder=""
          />
        </FormGroup>

        {/* dropdown bar da fare in futuro */}

        <Table id="collaboratorsTable">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Qualifica</th>
              <th>Corsi in svolgimento</th>
            </tr>
          </thead>
          <tbody>
            {collaborators.map(collaborator => (
              <tr key={collaborator.id} id="collaboratorTableItem">
                <td>
                  {" "}
                  {collaborator.name} {collaborator.surname}{" "}
                </td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>{" "}
        </Table>
      </Form>
    );
  }
}

Collaborators.propTypes = {
  fetchCollaborators: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  collaborators: state.collaborators.collaborators
});

export default connect(mapStateToProps, { fetchCollaborators })(Collaborators);
