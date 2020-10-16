import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "../LandingPage";
import Home from "../Home";
import UserHome from "../UserHome";

import "../../../assets/scss/style.scss";
import "./App.scss";

export default class index extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={Home} />
          <Route path="/home-user" component={UserHome} />
        </Router>
      </div>
    );
  }
}
