import React, { Component } from "react";
import axios from "axios";
import { RootPath, APIKey } from "../../../services/Config";

import "./Home.scss";

export default class index extends Component {
  state = {
    username: "",
    password: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    console.log("state => ", this.state);
  };

  login = (e) => {
    let data = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .get(`${RootPath}/authentication/token/new?api_key=${APIKey}`)
      .then((res) => {
        const request_token = res.data.request_token;
        data.request_token = request_token;
        console.log("data => ", data);

        axios({
          method: "post",
          url: `${RootPath}/authentication/token/validate_with_login?api_key=${APIKey}`,
          data: data,
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => {
            console.log(res.data);
            if (res.data.success === true) {
              this.props.history.push("/home-user");
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="container">
        <div className="row  w-50">
          <div className="col-md-9">
            {/* <form> */}
            {/* <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  @
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username""
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="username" className="text-white">
                Username
              </label>
              <input
                type="email"
                className="form-control py-4"
                id="username"
                placeholder="Enter email"
                onChange={this.handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                type="password"
                className="form-control py-4"
                id="password"
                placeholder="Password"
                onChange={this.handleInput}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              onClick={this.login}
            >
              Login
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}
