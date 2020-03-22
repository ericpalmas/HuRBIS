import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import Scrumboard from "./components/Scrumboard";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Collaborators from "./components/Collaborators";
import CollaboratorDetail from "./components/CollaboratorDetail";
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import Route from "react-router-dom/Route";

// const User = ({ match }) => {
//   return <h1> Welcome {match.params.id} </h1>;
// };

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            {/* <ul>
              <li>
                <NavLink exact activeStyle={{ color: "green" }} to="/home">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink exact activeStyle={{ color: "green" }} to="/about">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink exact activeStyle={{ color: "green" }} to="/user/john">
                  John
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  activeStyle={{ color: "green" }}
                  to="/user/Peter"
                >
                  Peter
                </NavLink>
              </li>
            </ul> */}

            <Route
              path="/"
              strict
              render={() => {
                return (
                  <div>
                    <AppNavbar></AppNavbar>
                  </div>
                );
              }}
            />
            <Route
              path="/"
              exact
              strict
              render={() => {
                return (
                  <div>
                    <Scrumboard />
                  </div>
                );
              }}
            />

            <Route
              path="/collaborators"
              exact
              strict
              render={() => {
                return (
                  <div>
                    <Collaborators></Collaborators>
                  </div>
                );
              }}
            />
            <Route
              path="/collaborators/:id"
              exact
              strict
              component={CollaboratorDetail}
              // render={() => {
              //   return (
              //     <div>
              //       <CollaboratorDetail></CollaboratorDetail>
              //     </div>
              //   );
              // }}
            />

            {/* <Route path="/user/:id" exact strict component={User} /> */}
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
