import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "../../../config/Redux/action";

// Style
import "./Login.scss";
import FormLogin from "../../../components/molecules/Form/Login";

class Login extends Component {
  state = {
    username: "",
    password: "",
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
      <div className="container login-container">
        <div className="row justify-content-center">
          <FormLogin userLogin={this.props.userLogin} />
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
