import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import { store } from "../../utils/store";

export default function Header() {
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("auth_token");
  const global = useContext(store);
  const { auth } = global.state;

  const onLogout = () => {
    const { dispatch } = global;
    dispatch({ type: "not authenticated" });
    localStorage.removeItem("auth_token");
  };
  useEffect(() => {
    if (auth) {
      const { user } = decode(token);
      setUsername(user.first_name);
    }
  }, []);

  return (
    <div className="mb-4">
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary shadow pr-5">
        <Link className="navbar-brand" to="/">
          <strong>Real Estate Agency</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                About
              </Link>
            </li>
            {!auth && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {!auth && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            )}
            {auth && (
              <li className="nav-item dropdown mr-5">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {username}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link onClick={onLogout} className="dropdown-item" to="/">
                    Logout
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
