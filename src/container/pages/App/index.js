import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "../LandingPage";
import Home from "../Login";
import UserHome from "../UserHome";
import DetailMovie from "../DetailMovie";
import DetailPerson from "../DetailPerson";

import "../../../assets/scss/style.scss";
import "./App.scss";
import { Provider } from "react-redux";
import { store } from "../../../config/Redux/store";
import Footer from "../../../components/molecules/Footer";

export default class index extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={Home} />
            <Route path="/home-user" component={UserHome} />
            <Route path="/detail-movie/:id" component={DetailMovie} />
            <Route path="/detail-person/:id" component={DetailPerson} />
          </Router>
          <Footer />
        </div>
      </Provider>
    );
  }
}
