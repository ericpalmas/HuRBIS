import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <Navbar light expand="sm" className="mb-5" id="navbar">
          <Container className="ml-1">
            <NavbarBrand href="/collaborators">
              <img style={{ width: 90 }} src={require("../Logo.PNG")} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-2 mr-5 mt-2 pl-2 border-left" navbar>
                <NavItem>
                  {" "}
                  <NavLink
                    exact
                    style={{ color: "grey" }}
                    activeStyle={{ color: "DodgerBlue" }}
                    to="/collaborators"
                  >
                    Collaboratori
                  </NavLink>
                </NavItem>
              </Nav>

              <Nav className="ml-2 mr-5 mt-2 pl-2 border-left" navbar>
                <NavItem>
                  {" "}
                  <NavLink
                    exact
                    style={{ color: "grey" }}
                    activeStyle={{ color: "DodgerBlue" }}
                    to="/qualifications"
                  >
                    Qualifiche
                  </NavLink>
                </NavItem>
              </Nav>

              <Nav className="ml-2 mr-5 mt-2 pl-2 border-left" navbar>
                <NavItem>
                  {" "}
                  <NavLink
                    exact
                    style={{ color: "grey" }}
                    activeStyle={{ color: "DodgerBlue" }}
                    to="/courses"
                  >
                    Corsi
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-2 mr-5 mt-2 pl-2 border-left" navbar>
                <NavItem>
                  {" "}
                  <NavLink
                    exact
                    style={{ color: "grey" }}
                    activeStyle={{ color: "DodgerBlue" }}
                    to="/summary"
                  >
                    Riepilogo
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-2 mr-5 mt-2 pl-2 border-left" navbar>
                <NavItem>
                  {" "}
                  <NavLink
                    exact
                    style={{ color: "grey" }}
                    activeStyle={{ color: "DodgerBlue" }}
                    to="/calendar"
                  >
                    Calendario
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
