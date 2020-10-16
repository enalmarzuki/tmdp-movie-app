import React from "react";
import axios from "axios";
import Home from "../Home";
import { RootPath, APIKey } from "../../../services/Config";
import "../../../assets/scss/style.scss";
import "./App.css";
import LandingPage from "../LandingPage";

function App(props) {
  const tesBtn = () => {
    alert("tes button component");
  };
  const login = (e) => {
    let data = {
      username: "marzuki1233",
      password: "enal1233",
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
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <LandingPage />
      {/* <Home /> */}
    </div>
  );

  // return (
  //   <div className="App">
  //     <InputField label="Username" type="text" />
  //     <InputField label="Password" type="password" />
  //     {/* <label htmlFor="username">Username</label> */}
  //     <input type="text" id="username" name="username" />
  //     {/* <label htmlFor="password">Password</label>
  //     <input type="text" id="password" name="password" /> */}
  //     <Button variant="contained" color="primary" onClick={login}>
  //       Hello World
  //     </Button>
  //     {/* <button type="submit" onClick={login}>
  //       Login
  //     </button> */}
  //   </div>
  // );
}

export default App;
