// import React, { Component } from "react";
// import { Tbl } from "./Tbl";

// class Summary extends Component {
//   render() {
//     return (
//       <div>
//         <Tbl data={this.dataSet}></Tbl>
//       </div>
//     );
//   }
//   dataSet = [
//     [
//       "Tiger Nixon",
//       "System Architect",
//       "Edinburgh",
//       "5421",
//       "2011/04/25",
//       "$320,800",
//     ],
//     [
//       "Garrett Winters",
//       "Accountant",
//       "Tokyo",
//       "8422",
//       "2011/07/25",
//       "$170,750",
//     ],
//     [
//       "Ashton Cox",
//       "Junior Technical Author",
//       "San Francisco",
//       "1562",
//       "2009/01/12",
//       "$86,000",
//     ],
//     [
//       "Cedric Kelly",
//       "Senior Javascript Developer",
//       "Edinburgh",
//       "6224",
//       "2012/03/29",
//       "$433,060",
//     ],
//     ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
//     [
//       "Brielle Williamson",
//       "Integration Specialist",
//       "New York",
//       "4804",
//       "2012/12/02",
//       "$372,000",
//     ],
//     [
//       "Herrod Chandler",
//       "Sales Assistant",
//       "San Francisco",
//       "9608",
//       "2012/08/06",
//       "$137,500",
//     ],
//     [
//       "Rhona Davidson",
//       "Integration Specialist",
//       "Tokyo",
//       "6200",
//       "2010/10/14",
//       "$327,900",
//     ],
//     [
//       "Colleen Hurst",
//       "Javascript Developer",
//       "San Francisco",
//       "2360",
//       "2009/09/15",
//       "$205,500",
//     ],
//     [
//       "Sonya Frost",
//       "Software Engineer",
//       "Edinburgh",
//       "1667",
//       "2008/12/13",
//       "$103,600",
//     ],
//     [
//       "Jena Gaines",
//       "Office Manager",
//       "London",
//       "3814",
//       "2008/12/19",
//       "$90,560",
//     ],
//     [
//       "Quinn Flynn",
//       "Support Lead",
//       "Edinburgh",
//       "9497",
//       "2013/03/03",
//       "$342,000",
//     ],
//     [
//       "Charde Marshall",
//       "Regional Director",
//       "San Francisco",
//       "6741",
//       "2008/10/16",
//       "$470,600",
//     ],
//     [
//       "Haley Kennedy",
//       "Senior Marketing Designer",
//       "London",
//       "3597",
//       "2012/12/18",
//       "$313,500",
//     ],
//     [
//       "Tatyana Fitzpatrick",
//       "Regional Director",
//       "London",
//       "1965",
//       "2010/03/17",
//       "$385,750",
//     ],
//     [
//       "Michael Silva",
//       "Marketing Designer",
//       "London",
//       "1581",
//       "2012/11/27",
//       "$198,500",
//     ],
//     [
//       "Paul Byrd",
//       "Chief Financial Officer (CFO)",
//       "New York",
//       "3059",
//       "2010/06/09",
//       "$725,000",
//     ],
//     [
//       "Gloria Little",
//       "Systems Administrator",
//       "New York",
//       "1721",
//       "2009/04/10",
//       "$237,500",
//     ],
//     [
//       "Bradley Greer",
//       "Software Engineer",
//       "London",
//       "2558",
//       "2012/10/13",
//       "$132,000",
//     ],
//     [
//       "Dai Rios",
//       "Personnel Lead",
//       "Edinburgh",
//       "2290",
//       "2012/09/26",
//       "$217,500",
//     ],
//     [
//       "Jenette Caldwell",
//       "Development Lead",
//       "New York",
//       "1937",
//       "2011/09/03",
//       "$345,000",
//     ],
//     [
//       "Yuri Berry",
//       "Chief Marketing Officer (CMO)",
//       "New York",
//       "6154",
//       "2009/06/25",
//       "$675,000",
//     ],
//     [
//       "Caesar Vance",
//       "Pre-Sales Support",
//       "New York",
//       "8330",
//       "2011/12/12",
//       "$106,450",
//     ],
//     [
//       "Doris Wilder",
//       "Sales Assistant",
//       "Sydney",
//       "3023",
//       "2010/09/20",
//       "$85,600",
//     ],
//     [
//       "Angelica Ramos",
//       "Chief Executive Officer (CEO)",
//       "London",
//       "5797",
//       "2009/10/09",
//       "$1,200,000",
//     ],
//     ["Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575"],
//     [
//       "Jennifer Chang",
//       "Regional Director",
//       "Singapore",
//       "9239",
//       "2010/11/14",
//       "$357,650",
//     ],
//     [
//       "Brenden Wagner",
//       "Software Engineer",
//       "San Francisco",
//       "1314",
//       "2011/06/07",
//       "$206,850",
//     ],
//     [
//       "Fiona Green",
//       "Chief Operating Officer (COO)",
//       "San Francisco",
//       "2947",
//       "2010/03/11",
//       "$850,000",
//     ],
//     [
//       "Shou Itou",
//       "Regional Marketing",
//       "Tokyo",
//       "8899",
//       "2011/08/14",
//       "$163,000",
//     ],
//     [
//       "Michelle House",
//       "Integration Specialist",
//       "Sydney",
//       "2769",
//       "2011/06/02",
//       "$95,400",
//     ],
//     ["Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500"],
//     [
//       "Prescott Bartlett",
//       "Technical Author",
//       "London",
//       "3606",
//       "2011/05/07",
//       "$145,000",
//     ],
//     [
//       "Gavin Cortez",
//       "Team Leader",
//       "San Francisco",
//       "2860",
//       "2008/10/26",
//       "$235,500",
//     ],
//     [
//       "Martena Mccray",
//       "Post-Sales support",
//       "Edinburgh",
//       "8240",
//       "2011/03/09",
//       "$324,050",
//     ],
//     [
//       "Unity Butler",
//       "Marketing Designer",
//       "San Francisco",
//       "5384",
//       "2009/12/09",
//       "$85,675",
//     ],
//   ];
// }

// export default Summary;

// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import ReactTable from "react-table";

// class Summary extends Component {
//   id = "tabella";
//   data = [
//     { username: "Meera", status: "Approved" },
//     { username: "Foo", status: "Failed" },
//     { username: "Bar", status: "Approved" },
//   ];
//   state = {
//     columns: [
//       { Header: "Name", accessor: "username", show: true },
//       {
//         Header: "Status",
//         accessor: "status",
//         show: true,
//         Cell: (props) => {
//           return <span className="number">{props.value}</span>;
//         },
//       },
//     ],
//   };

//   toggleColumn = (changeEvent) => {
//     const { name } = changeEvent.target;

//     this.setState((state) => {
//       const columns = state.columns.map((column) => {
//         if (column.Header === name) {
//           column.show = !column.show;
//           return column;
//         } else {
//           return column;
//         }
//       });
//       return { columns };
//     });
//   };

//   render() {
//     return (
//       <div>
//         <h2>Click on the checkboxes to Show/Hide Rows</h2>

//         {this.state.columns.map((column, index) => (
//           <Checkbox
//             key={column.Header}
//             label={column.Header}
//             onCheckboxChange={this.toggleColumn}
//           />
//         ))}
//         <ReactTable data={this.data} columns={this.state.columns} />
//       </div>
//     );
//   }
// }

// const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
//   <div>
//     <label>
//       <input
//         type="checkbox"
//         name={label}
//         checked={isSelected}
//         onChange={onCheckboxChange}
//         className="form-check-input"
//       />
//       {label}
//     </label>
//   </div>
// );

// export default Summary;

import React, { Component } from "react";
import { render } from "react-dom";
import { connect } from "react-redux";
import { fetchCoursesInformations } from "../actions/coursesActions";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

import {
  CustomInput,
  Alert,
  Button,
  Table,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Modal,
  Form,
  Input,
} from "reactstrap";

var tableData = [
  {
    _id: "5de8d7",
    name: "Oneill Chang",
    company: "TINGLES",
    email: "oneillchang@tingles.com",
    phone: "+1 (826) 583-3110",
  },
  {
    _id: "5de8d5",
    name: "Rogers Davis",
    company: "ENTALITY",
    email: "rogersdavis@entality.com",
    phone: "+1 (918) 571-2672",
  },
  {
    _id: "8d05243",
    name: "Barlow Alford",
    company: "BRISTO",
    email: "barlowalford@bristo.com",
    phone: "+1 (855) 527-2874",
  },
  {
    _id: "6f5b6",
    name: "Hopper Cote",
    company: "BEZAL",
    email: "hoppercote@bezal.com",
    phone: "+1 (968) 565-2872",
  },
];

var tableHeader = {
  Qual: "ID",
  Surname: "Name",
  Name: "Company",
  email: "Email",
  phone: "Phone",
};

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      indexesToHide: [],
    };
  }

  componentDidMount() {
    this.setState({
      data: tableData,
    });
  }

  hide(indexToHide) {
    this.setState({
      indexesToHide: this.state.indexesToHide.concat(indexToHide),
    });
  }

  render() {
    let header = Object.entries(tableHeader).map((headerData, index) => {
      if (!this.state.indexesToHide.includes(index))
        return (
          <td>
            {" "}
            <div class="float-left">
              {headerData[1]} <br />{" "}
            </div>
            <Button
              color="secondary"
              size="sm"
              onClick={() => this.hide(index)}
              id="hideButton"
              className="float-right"
            >
              {" "}
              <FaTrashAlt />{" "}
            </Button>
          </td>
        );
    });

    return (
      <Table id="summaryTable" bordered striped>
        <thead>
          <tr id="collaboratorTableItem">{header}</tr>
        </thead>
        <tbody>
          {this.state.data.map((item, index) => {
            let data = Object.entries(item).map((itemData, index) => {
              if (!this.state.indexesToHide.includes(index))
                return <td> {itemData[1]} </td>;
            });

            return <tr> {data} </tr>;
          })}
        </tbody>
      </Table>
    );
  }
}

Summary.propTypes = {
  fetchCoursesInformations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  coursesInfos: state.courses.coursesInfos,
});

export default connect(mapStateToProps, {
  fetchCoursesInformations,
})(Summary);

render(<Summary />, document.getElementById("root"));
