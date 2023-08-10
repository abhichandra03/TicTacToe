import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

const SignUp = ({ setIsAuth }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, fullName, email, username, hashedPassword } =
        res.data;

      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("fullName", fullName);
      cookies.set("email", email);
      cookies.set("username", username);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };
  return (
    <div className="signUp">
      <h1>Let's get to know you better!</h1>
      <label>Sign Up</label>
      <h2>Your name</h2>
      <input
        placeholder="Type your name here"
        onChange={(event) => {
          setUser({ ...user, fullName: event.target.value });
        }}
      ></input>
      <h2>Username</h2>
      <input
        placeholder="Type your username here"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      ></input>
      <h2>Email</h2>
      <input
        placeholder="Type your email here"
        onChange={(event) => {
          setUser({ ...user, email: event.target.value });
        }}
      ></input>
      <h2>Password</h2>
      <input
        placeholder="Type your password here"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      ></input>

      <button onClick={signUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
