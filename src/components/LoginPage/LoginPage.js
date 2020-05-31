import React, { useState } from "react";
import Nav from "../Nav/Nav";
import ApiService from "../../services/api-service";
import TokenService from "../../services/token-service";
import "./Login.css";

const Login = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    error: null,
  });

///////////////////////////////////////////////
  const handleUsernameChange = (e) => {
    formHandler("username", e.target.value);
  };

  const handlePasswordChange = (e) => {
    formHandler("password", e.target.value);
  };
  const formHandler = (input, value) => {
    setFormState({ ...formState, [input]: value });
  };
////////////////////////////////////////////////
  const onLoginSuccess = () => {
    const { location, history } = props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formState;
    ApiService.postLogin({
      username,
      password,
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.setUser(res.user)
        onLoginSuccess();
      })
      .catch((res) => {
        formHandler("error", res.error);
      });
  };

  const { error } = formState;
  return (
    <>
      <Nav />
      <section className="login-page">
        <section className="form">
          <center>
            {/* <img className="login-logo" src={Logo} alt="umap logo" /> */}
          </center>
          <span role="alert">{error && <p className="red">{error}</p>}</span>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              className="cname"
              placeholder="username"
              value={formState.username}
              onChange={(e) => handleUsernameChange(e)}
            />
            <input
              type="password"
              className="cpwd"
              placeholder="password"
              value={formState.password}
              onChange={(e) => handlePasswordChange(e)}
            />
            <button type="submit" className="clogin">
              Login
            </button>
          </form>
        </section>
      </section>
    </>
  );
};

export default Login;
