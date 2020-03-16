import React, { Component, Fragment } from "react";

import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  CardHeader
} from "reactstrap";

const card = (
  <Fragment>
    <Card className="mr-3 ml-3" id="card">
      <Card id="field">
        <CardHeader className="small"> Nome </CardHeader>
        <CardBody className="small"> Mario Rossi</CardBody>
      </Card>

      <Card id="field">
        <CardHeader className="small"> Formazione </CardHeader>
        <CardBody className="small"> Medico </CardBody>
      </Card>

      <Card id="field">
        <CardHeader className="small"> Corsi in corso </CardHeader>
        <CardBody className="small"> Nome corso 1, Nome corso 2 </CardBody>
      </Card>

      <Card id="field">
        <CardHeader className="small"> Corsi svolti </CardHeader>
        <CardBody className="small">
          {" "}
          Nome corso 1, Nome corso 2, Nome corso 3, Nome corso 4{" "}
        </CardBody>
      </Card>
    </Card>
  </Fragment>
);

class Scrumboard extends Component {
  render() {
    return (
      <div>
        <Card
          color="light"
          className="mr-4 ml-4 pt-4 pb-4 sm-10"
          id="cardContainer"
        >
          <CardGroup>
            {card}
            {card}
            {card}
            {card}
          </CardGroup>
        </Card>
      </div>
    );
  }
}

export default Scrumboard;
