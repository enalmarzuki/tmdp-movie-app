import React, { Component } from "react";

export default class UserHome extends Component {
  state = {
    isLogin: false,
  };
  render() {
    if (!this.state.isLogin) this.props.history.push("/login");
    return <div>asdasdasd</div>;
  }
}
