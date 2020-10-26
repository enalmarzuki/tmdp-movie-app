import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../../config/Redux/action";

// Style
import "./Login.scss";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  login = async () => {
    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    await this.props.userLogin(data);
  };

  static getDerivedStateFromProps(props, state) {
    if (props.isLogin && props.sessionId !== "") {
      props.history.push("/");
    }
    return null;
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div className="row  w-50">
          <div className="col-md-9">
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    sessionId: state.sessionId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (data) => dispatch(userLogin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
