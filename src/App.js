import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ProfileList from "./components/ProfileList";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import ProfileForm from "./components/ProfileForm";
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={ProfileList} />
          <Route path="/profile/:id" component={EditProfile} />
        </div>
      </Router>
    );
  }
}

export default App;
