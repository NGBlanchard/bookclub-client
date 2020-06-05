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
        <NavLink onClick={handleLogoutClick} to="/" className="nav-link">
          Logout
        </NavLink>
      </div>
    );
  };

  const renderLoginLink = () => {
    return (
      <div className="nav-not-logged-in">
        <NavLink to="/login" className="nav-link">Login</NavLink>
      </div>
    );
  };

  return (
    <section className="nav-container">
      <section className="nav">
        <div className="site-nav">
          <h1 className="nav-header">Alcove Reads</h1>
        </div>
        {TokenService.hasAuthToken() ? (
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/books" className="nav-link">Books</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
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
