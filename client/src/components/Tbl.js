import React, { Component } from "react";

import "../css/jquery.datatables.css";
const $ = require("jquery");
$.DataTable = require("datatables.net");

export class Tbl extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log(this.el);
    this.$el = $(this.el);
    this.$el.DataTable({
      data: this.props.data,
      columnDefs: [
        {
          targets: [0],
          visible: true,
          searchable: false,
        },
        {
          targets: [1],
          visible: true,
        },
        {
          targets: [2],
          visible: false,
          searchable: false,
        },
        {
          targets: [3],
          visible: true,
        },
        {
          targets: [4],
          visible: false,
          searchable: false,
        },
        {
          targets: [5],
          visible: true,
        },
      ],
      columns: [
        { title: "Name" },
        { title: "Position" },
        { title: "Office" },
        { title: "Extn." },
        { title: "Start date" },
        { title: "Salary" },
      ],
    });

    // $("th").click(function () {
    //   console.log(this.);
    // });

    $("td").click(function () {
      var col = $(this).parent().children().index($(this));
      var row = $(this).parent().parent().children().index($(this).parent());
      alert("Row: " + row + ", Column: " + col);
    });

    $("th").click(function () {
      var col = $(this).parent().children().index($(this));
      $("td:nth-child(" + col + ")").hide();
    });
  }

  //   componentWillUnmount() {
  //     this.$el.DataTable.destroy(true);
  //   }

  render() {
    return (
      <div id="SummaryTable">
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
