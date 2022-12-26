import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

const Login = ({ setIsAuth }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const cookies = new Cookies();

  const login = () => {
    Axios.post("http://localhost:3001/login", { username, password }).then(
      (res) => {
        const { token, userId, fullName, email, username } = res.data;

        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("fullName", fullName);
        cookies.set("email", email);
        cookies.set("username", username);
        setIsAuth(true);
      }
    );
  };
  return (
    <div className="login">
      <label>Login</label>
      <h2>Username</h2>
      <input
        placeholder="Type your username here"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></input>
      <h2>Password</h2>
      <input
        placeholder="Type your password here"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      ></input>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
