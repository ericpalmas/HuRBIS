import React, { Component } from "react";
import DataTable from "datatables.net";
import Jzip from "jszip";
import "datatables.net-buttons/js/buttons.colVis";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.flash";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons-dt";
import "datatables.net-dt";

require("datatables.net-dt");
require("datatables.net-buttons-dt");
require("datatables.net-buttons/js/dataTables.buttons.min");
require("datatables.net-buttons/js/buttons.html5.min");

const $ = require("jquery");
const jzip = Jzip;
window.JSZip = jzip;
$.DataTable = DataTable;

export default class Tbl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      minCertifications: [],
      dati: this.props.data,
      header: this.props.header,
    };
  }

  componentDidMount() {
    console.log(this.state);

    console.log(this.state.dati);
    console.log(this.state.header);

    $("#example").DataTable({
      data: this.state.dati,
      columns: this.state.header,
      dom: "Bfrtip",
      language: { search: "", searchPlaceholder: " Cerca" },

      buttons: [
        {
          extend: "excel",
          text: "Esporta excel",
          exportOptions: {
            columns: ":visible",
          },
        },
        {
          extend: "colvis",
          text: "Nascondi colonne",
        },
      ],
    });
  }

  render() {
    return (
      <div id="SummaryTable" className="ml-5 mt-5 w-75">
        <table
          hover
          id="example"
          class="ui celled table"
          className="display"
          width="100%"
          ref={(el) => (this.el = el)}
        ></table>
      </div>
    );
  }
}
