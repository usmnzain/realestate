import React from "react";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import Advertisements from "./pages/advertisements";
import Appointments from "./pages/appointments";
import Finances from "./pages/finances";

export default function Sidebar() {
  const match = useRouteMatch();
  return (
    <div>
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to={`${match.url}/advertisements`}
              >
                <i className="fas fa-home mr-2"></i>
                Advertisements <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to={`${match.url}/appointments`}
              >
                <i className="fas fa-calendar-check mr-2"></i>
                Appointments
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to={`${match.url}/finances`}
              >
                <i className="fas fa-coins mr-2"></i>
                Finances
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
