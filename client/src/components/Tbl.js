import React, { Component } from "react";
import axios from "axios";
import "../css/jquery.datatables.css";
const $ = require("jquery");
$.DataTable = require("datatables.net");

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

    this.$el = $(this.el);

    $(document).ready(function () {
      $("#example").DataTable({
        columnDefs: [
          {
            targets: [2],
            visible: true,
            searchable: false,
          },
          {
            targets: [3],
            visible: true,
          },
        ],
      });
    });

    this.$el.DataTable({
      data: this.state.dati,
      columns: this.state.header,
      // columns: [
      //   { title: "Qualifica" },
      //   { title: "Cognome" },
      //   { title: "Nome" },
      //   { title: "Anno nascita." },
      //   { title: "Corso 1" },
      //   { title: "Corso 2" },
      //   { title: "Corso 3" },
      //   { title: "Corso 4" },
      //   { title: "Corso 5" },
      // ],
    });

    // $("th").click(function () {
    //   console.log(this.);
    // });

    // $("td").click(function () {
    //   var col = $(this).parent().children().index($(this));
    //   var row = $(this).parent().parent().children().index($(this).parent());
    //   alert("Row: " + row + ", Column: " + col);
    // });

    // $("th").click(function () {
    //   var col = $(this).parent().children().index($(this));
    //   $("td:nth-child(" + col + ")").hide();
    // });
  }

  //   componentWillUnmount() {
  //     this.$el.DataTable.destroy(true);
  //   }

  render() {
    return (
      <div id="SummaryTable" className="ml-5 mt-5 w-75">
        <table
          onClick={this.removeColumn}
          className="display"
          width="100%"
          ref={(el) => (this.el = el)}
        ></table>
      </div>
    );
  }
}
