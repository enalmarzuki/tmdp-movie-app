import React, { useState } from "react";
import Button from "../../../../components/atoms/Button";

export default function FormLogin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (e) => {
    e.target.id === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const login = async () => {
    let data = {
      username: username,
      password: password,
    };
    await props.userLogin(data);
  };

  return (
    <div className="col-md-5">
      <div className="form-wrapper">
        <div className="form-group">
          <h1 className="text-white mb-4">Login</h1>
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input
            type="email"
            className="form-control py-4"
            id="username"
            placeholder="Enter email"
            onChange={handleInput}
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
            onChange={handleInput}
          />
        </div>
        <Button
          type="button"
          className="btn btn-primary w-100 mt-2"
          onClick={login}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
