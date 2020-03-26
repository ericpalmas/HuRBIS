import React, { Component } from "react";
import { Label, Table, Button, Container } from "reactstrap";
import axios from "axios";
import AddCourseModal from "./AddCourseModal";

const Corso = ({ corsi }) => (
  <Table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Data inizio corso</th>
        <th>Data fine corso </th>
        <th>Descrizione</th>
      </tr>
    </thead>
    {corsi.map(corso => (
      <tbody key={corso.id}>
        <tr id="collaboratorTableItem">
          <td>{corso.nomeCorso}</td>
          <td>{corso.dataInizio}</td>
          <td>{corso.dataScadenza}</td>
          <td>{corso.descrizione}</td>
        </tr>
      </tbody>
    ))}
  </Table>
);

// function elaborateData(str) {
//   const res = str.split(",");
//   const uniqueNames = Array.from(new Set(res));
//   console.log(uniqueNames);
//   return uniqueNames;
// }

class CollaboratorDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collaborator: {},
      courses: {}
    };

    axios
      .get(`/collaborators/infos/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ collaborator: res.data[0] });
      });

    axios.get(`/courses/${this.props.match.params.id}`).then(res => {
      this.setState({ courses: res.data });
    });
  }

  render() {
    console.log(this.state.collaborator.courses);
    console.log(this.state.courses);
    return (
      <div className="ml-5">
        <Label className="ml-5 mr-5">
          <h6> Nome collaboratore: </h6>
          {this.state.collaborator.name} {this.state.collaborator.surname}
        </Label>
        <Label className="ml-5 mr-5">
          <h6> Formazione: </h6>
          {this.state.collaborator.qualification}
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi svolti: </h6>
          <br></br>
          {/* <Corso corsi={this.state.corsiSvolti} /> */}
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi in svolgimento: </h6>
          <br></br>
          {/* <Corso corsi={this.state.corsiInCorso} /> */}
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi da svolgere: </h6>
          <br></br>
          {/* <Corso corsi={this.state.corsiDaSvolgere} /> */}
        </Label>
        <br></br>
        <AddCourseModal
          collaborator_id={this.props.match.params.id}
          className="ml-5 mt-5 mb-5 mr-2"
        />
        {/* <Button className="ml-5 mt-5 mb-5 mr-2"> Aggiungi corso </Button> */}
        <Button className="ml-5 mt-5 mb-5 mr-2"> Rimuovi corso </Button>
      </div>
    );
  }
}

export default CollaboratorDetail;
