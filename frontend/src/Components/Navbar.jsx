import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Context";
import { GoMoon } from "react-icons/go";
import { BsSun } from "react-icons/bs";

const Navbar = () => {
  const { userName, setIsAuthenticated } = useAuth();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme={theme}
        style={{ fontFamily: "Barlow", fontSize: "20px" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            {userName}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/post">
                  Post
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Discover
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/friends">
                      Friends
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/people">
                      People
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <span
              style={{
                padding: "5px",
                marginRight: "18px",
                fontSize: "25px",
                cursor: "pointer",
                backgroundColor: "white",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              {theme === "light" ? (
                <GoMoon onClick={toggleTheme} />
              ) : (
                <BsSun onClick={toggleTheme} />
              )}
            </span>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                onClick={handleLogout}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
