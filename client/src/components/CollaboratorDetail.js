import React, { Component } from "react";
import { Label, Table, Button } from "reactstrap";

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

export class CollaboratorDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Mario Rossi",
      formazione: "Paramedico",
      corsiSvolti: [
        {
          id: "2f3rweraf",
          nomeCorso: "Corso 1",
          dataInizio: "01/02/2019",
          dataScadenza: "01/12/2020",
          descrizione: "Descrizione del corso"
        },
        {
          id: "t4gf3rtgf",
          nomeCorso: "Corso 2",
          dataInizio: "07/04/2019",
          dataScadenza: "01/04/2020",
          descrizione: "Descrizione del corso"
        },
        {
          id: "rfergrf",
          nomeCorso: "Corso 3",
          dataInizio: "05/11/2019",
          dataScadenza: "01/01/2020",
          descrizione: "Descrizione del corso"
        }
      ],
      corsiInCorso: [
        {
          id: "ferwgfergf3",
          nomeCorso: "Corso 1",
          dataInizio: "01/02/2019",
          dataScadenza: "01/02/2020",
          descrizione: "Descrizione del corso"
        }
      ],
      corsiDaSvolgere: [
        {
          id: "32r24rf43",
          nomeCorso: "Corso 1",
          descrizione: "Descrizione del corso"
        }
      ]
    };
  }

  render() {
    const name = this.state.name;
    const formazione = this.state.formazione;
    return (
      <div className="ml-5">
        <Label className="ml-5 mr-5">
          <h6> Nome collaboratore: </h6>
          {name}
        </Label>
        <Label className="ml-5 mr-5">
          <h6> Formazione: </h6>
          {formazione}
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi svolti: </h6>
          <br></br>
          <Corso corsi={this.state.corsiSvolti} />
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi in svolgimento: </h6>
          <br></br>
          <Corso corsi={this.state.corsiInCorso} />
        </Label>
        <br></br>
        <Label className="ml-5 mr-5 mt-5">
          <h6> Corsi da svolgere: </h6>
          <br></br>
          <Corso corsi={this.state.corsiDaSvolgere} />
        </Label>
        <br></br>
        <Button className="ml-5 mt-5 mb-5 mr-2"> Aggiungi corso </Button>
        <Button className="ml-5 mt-5 mb-5 mr-2"> Rimuovi corso </Button>
      </div>
    );
  }
}

export default CollaboratorDetail;
