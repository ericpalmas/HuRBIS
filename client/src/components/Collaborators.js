import React, { Component, Fragment, useState } from "react";
import axios from "axios";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table
} from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function useHttpListCall(url) {
  const [list, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(url)
      .then(function(response) {
        setData(response.data);
      })
      .catch(function(error) {
        setError(error);
      });
  }, [url]);
  return { list, error };
}

const Collab = ({ collaborators }) => (
  <Fragment>
    {/* <tr id="collaboratorTableItem" hrref="#">
      <td>Mario Rossi</td>
      <td>Paramedico</td>
      <td> corso 1, corso 2, corso 3</td>
    </tr> */}

    {collaborators.map(collaborator => (
      <tr key={collaborator.id} id="collaboratorTableItem">
        <td>{collaborator.name}</td>
        <td>{collaborator.surname}</td>
        {/* <td>{corso.dataScadenza}</td>
        <td>{corso.descrizione}</td> */}
      </tr>
    ))}
  </Fragment>
);

function Collaborators() {
  const [dropdownOpen, setOpen] = useState(false);
  const { list } = useHttpListCall("/collaborators");
  console.log(list);

  const toggle = () => setOpen(!dropdownOpen);
  return (
    <Form inline>
      <FormGroup>
        <Button id="searchButton">Cerca</Button>
        <Input type="search" name="search" id="exampleSearch" placeholder="" />
      </FormGroup>

      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="ml-4 ">
        <DropdownToggle caret>Ordina per: </DropdownToggle>
        <DropdownMenu>
          <DropdownItem> Ordine alfabetico </DropdownItem>
          <DropdownItem divider />
          <DropdownItem> Scadenza corsi: crescente</DropdownItem>
          <DropdownItem divider />
          <DropdownItem> Scadenza corsi: decrescente</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>

      <Table id="collaboratorsTable">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Funzione</th>
            <th>Corsi in svolgimento</th>
          </tr>
        </thead>

        <tbody>{/* <Collab collaborators={list} /> */}</tbody>
      </Table>
    </Form>
  );
}

export default Collaborators;
