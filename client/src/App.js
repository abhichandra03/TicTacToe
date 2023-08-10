import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";
import { Chat } from "stream-chat-react";

function App() {
  const api_key = "sd4ca37t84sx";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const [signUpShown, setsignUpShown] = useState(false);
  const [loginShown, setLoginShown] = useState(false);

  const handleSignUp = () => {
    setsignUpShown(true);
  };
  const handleLogin = () => {
    setLoginShown(true);
  };

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("fullName");
    cookies.remove("email");
    cookies.remove("username");
    cookies.remove("hashedPassword");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          fullname: cookies.get("fullname"),
          email: cookies.get("email"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        console.log(user);
        setIsAuth(true);
      });
  }

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button className="logOut" onClick={logOut}>
            Logout
          </button>
        </Chat>
      ) : (
        <>
          {signUpShown ? <SignUp setIsAuth={setIsAuth} /> : ""}
          {loginShown ? <Login setIsAuth={setIsAuth} /> : ""}
          {!loginShown && !signUpShown ? (
            <div className="intro">
              <h2>Multiplayer</h2>
              <h1>Tic Tac Toe</h1>
              <div className="buttons">

              <button className="regiBtn" onClick={handleSignUp}>
                {" "}
                Sign Up
              </button>
              <button className="logBtn" onClick={handleLogin}>
                {" "}
                Login
              </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default App;
