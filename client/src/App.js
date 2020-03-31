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
const Route = require("react-router-dom").Route;

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
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

            {/* <Route
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
            /> */}

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
            />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
