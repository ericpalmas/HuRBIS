import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import Scrumboard from "./components/Scrumboard";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Collaborators from "./components/Collaborators";
import CollaboratorDetail from "./components/CollaboratorDetail";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar></AppNavbar>
          {/* <Scrumboard /> */}
          <Collaborators />
          {/* <CollaboratorDetail></CollaboratorDetail> */}
        </div>
      </Provider>
    );
  }
}

export default App;
