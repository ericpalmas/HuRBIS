import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Collaborators from "./components/Collaborators";
import CollaboratorDetail from "./components/CollaboratorDetail";
import { BrowserRouter as Router } from "react-router-dom";
import Qualifications from "./components/Qualifications";
import Courses from "./components/Courses";
import Summary from "./components/Summary";
import SummaryCalendar from "./components/SummaryCalendar";
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

            <Route
              path="/"
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
              path="/qualifications"
              exact
              strict
              render={() => {
                return (
                  <div>
                    <Qualifications></Qualifications>
                  </div>
                );
              }}
            />

            <Route
              path="/courses"
              exact
              strict
              render={() => {
                return (
                  <div>
                    <Courses></Courses>
                  </div>
                );
              }}
            />

            <Route
              path="/summary"
              exact
              strict
              render={() => {
                return (
                  <div>
                    <Summary></Summary>
                  </div>
                );
              }}
            />

            <Route
              path="/calendar"
              exact
              strict
              render={() => {
                return (
                  <div>
                    <SummaryCalendar></SummaryCalendar>
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
            />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
