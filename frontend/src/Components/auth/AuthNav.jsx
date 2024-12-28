import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineStarBorder } from "react-icons/md";

const AuthNav = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      data-bs-theme="light"
      style={{ fontFamily: "Barlow", fontSize: "20px" }}
    >
      <div className="container">
        <MdOutlineStarBorder className="star" />
        <NavLink className="navbar-brand">Welcome</NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="" className="nav-link" activeclassname="active">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="register"
                className="nav-link"
                activeclassname="active"
              >
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AuthNav;
