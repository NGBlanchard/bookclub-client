import React from "react";
import { NavLink, Link } from "react-router-dom";
import TokenService from "../../services/token-service.js";
import "./Nav.css";

const Nav = () => {
  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const renderLogoutLink = () => {
    return (
      <div className="nav-logged-in">
        <NavLink onClick={handleLogoutClick} to="/">
          Logout
        </NavLink>
      </div>
    );
  };

  const renderLoginLink = () => {
    return (
      <div className="nav-not-logged-in">
        <NavLink to="/login">Login</NavLink>
      </div>
    );
  };

  return (
    <section className="nav-container">
      <section className="nav">
        <div className="site-nav">
          <h1 className="nav-header">AL:cove</h1>
        </div>
        {TokenService.hasAuthToken() ? (
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/books">Books</Link>
            <Link to="/profile">Profile</Link>
            {TokenService.hasAuthToken() ? renderLogoutLink() : renderLoginLink()}
          </div>
        ) : (
          <div></div>
        )}
      </section>
    </section>
  );
};

export default Nav;
