import React, { useState } from "react";
import Nav from "../Nav/Nav";
import ApiService from "../../services/api-service";
import TokenService from "../../services/token-service";
import Logo from '../../img/logo.png'
import Loading from '../Loading/Loading';
import "./Login.css";

const Login = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    error: null,
  });
  const [ loaded, setLoaded ] = useState(true)

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
    const destination = (location.state || {}).from || "/dashboard";
    history.push(destination);
  };

  const handleSubmit = async (e) => {
    setLoaded(false)
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
        console.log(res)
        // formHandler("error", res.error);
      });
      setLoaded(true)
  };

  const { error } = formState;
  
  return (
    <>
      <Nav />
      {!loaded ? (<Loading />) : <div></div>}
      <section className="login-page">
        <section className="form">
        <h1 className="login-title">Alcove Reads</h1>
          <center>
            <img className="login-logo" src={Logo} alt="app logo" />
          </center>
          <span role="alert">{error && <p className="red">{error}</p>}</span>
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
