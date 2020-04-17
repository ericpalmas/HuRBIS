import React, { Component, Fragment } from "react";
import { Label, Table, Button, Container } from "reactstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

class CollaboratorDetailPDF extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  generatePDF = () => {
    console.log(this.props.collaborator);

    // new document in jspdfS
    var doc = new jsPDF("p", "pt");

    var imgData =
      "data:image/png;base64,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";

    doc.addImage(imgData, "JPEG", 50, 40, 80, 50);

    var y = 120;

    doc.setFontStyle("Arial");
    doc.setFontSize(18);
    doc.setFontType("bold");
    doc.text(50, y, "Scheda collaboratore ");

    y += 40;
    doc.setFontSize(14);
    doc.setFontType("bold");
    doc.text(50, y, "Nome: ");

    doc.setFontType("normal");
    doc.text(
      95,
      y,
      this.props.collaborator.name + " " + this.props.collaborator.surname
    );

    doc.setFontType("bold");
    doc.text(260, y, "Formazione: ");

    doc.setFontType("normal");
    doc.text(340, y, this.props.collaborator.qualification);

    y += 60;
    doc.setFontSize(11);
    doc.setFontStyle("Arial");
    doc.text(50, y, "Corsi in corso ");

    var columns = [
      { title: "Name", dataKey: "Name" },
      { title: "Data inzio licenza", dataKey: "DataInzioLicenza" },
      {
        title: "Data scadenza certificazione",
        dataKey: "DataScadenzaCertificazione",
      },
    ];

    // corsi in corso
    var rowsCorsiInCorso = [];
    for (let i = 0; i < this.props.corsiInCorso.length; i++) {
      const corso = {
        Name: this.props.corsiInCorso[i].name,
        DataInzioLicenza: this.props.corsiInCorso[i].certification_date.substr(
          0,
          10
        ),
        DataScadenzaCertificazione: this.props.corsiInCorso[
          i
        ].expiration_date.substr(0, 10),
      };
      rowsCorsiInCorso.push(corso);
    }
    doc.autoTable(columns, rowsCorsiInCorso, {
      startY: doc.autoTableEndPosY() + y + 10,
      margin: { horizontal: 50 },
      styles: { overflow: "linebreak" },
      bodyStyles: { valign: "top" },
      columnStyles: { email: { columnWidth: "wrap" } },
      theme: "striped",
    });

    doc.text("Corsi da svolgere", 50, doc.autoTable.previous.finalY + 50);

    // corsi da svolgere
    var rowsCorsiDaSvolgere = [];
    for (let i = 0; i < this.props.corsiDaSvolgere.length; i++) {
      const corso = {
        Name: this.props.corsiDaSvolgere[i].name,
        DataInzioLicenza: this.props.corsiDaSvolgere[i].certification_date,
        DataScadenzaCertificazione: this.props.corsiDaSvolgere[i]
          .expiration_date,
      };
      rowsCorsiDaSvolgere.push(corso);
    }
    doc.autoTable(columns, rowsCorsiDaSvolgere, {
      startY: doc.autoTableEndPosY() + 60,
      margin: { horizontal: 50 },
      styles: { overflow: "linebreak" },
      bodyStyles: { valign: "top" },
      columnStyles: { email: { columnWidth: "wrap" } },
      theme: "striped",
    });

    doc.text("Corsi svolti", 50, doc.autoTable.previous.finalY + 50);

    // corsi svolti
    var rowsCorsiSvolti = [];
    for (let i = 0; i < this.props.corsiSvolti.length; i++) {
      const corso = {
        Name: this.props.corsiSvolti[i].name,
        DataInzioLicenza: this.props.corsiSvolti[i].certification_date.substr(
          0,
          10
        ),
        DataScadenzaCertificazione: this.props.corsiSvolti[
          i
        ].expiration_date.substr(0, 10),
      };
      rowsCorsiSvolti.push(corso);
    }
    doc.autoTable(columns, rowsCorsiSvolti, {
      startY: doc.autoTableEndPosY() + 60,
      margin: { horizontal: 50 },
      styles: { overflow: "linebreak" },
      bodyStyles: { valign: "top" },
      columnStyles: { email: { columnWidth: "wrap" } },
      theme: "striped",
    });

    // save the pdf document
    doc.save("generated.pdf");
  };

  render() {
    return (
      <div id="addCourseButton">
        <Button
          className="ml-5 mt-5 mb-5 mr-2 float-left"
          onClick={this.generatePDF}
        >
          Scarica scheda collaboratore
        </Button>
      </div>
    );
  }
}

export default CollaboratorDetailPDF;
