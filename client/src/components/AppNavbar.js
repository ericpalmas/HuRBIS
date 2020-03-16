import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Container
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
//import LoginModal from "./auth/LoginModal";
//import RegisterModal from "./auth/RegisterModal";
//import Logout from "./auth/Logout";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar light expand="sm" className="mb-5" id="navbar">
          <Container className="ml-1">
            <NavbarBrand href="/">
              {/* <img src={logo} style={{ width: 90 }} /> */}
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-1 mr-5 mt-2 border-left" navbar>
                <NavItem>
                  <NavLink unset onClick={this.props.logout} href="#">
                    Home
                  </NavLink>
                </NavItem>
              </Nav>

              <Nav className="ml-1 mr-5 mt-2 border-left" navbar>
                <NavItem>
                  <NavLink onClick={this.props.logout} href="#">
                    Collaboratori
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
