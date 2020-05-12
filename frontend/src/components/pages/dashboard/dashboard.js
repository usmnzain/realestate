import React from "react";
import Sidebar from "./sidebar";
import Content from "./content";
import { Switch, Route, Link } from "react-router-dom";
import Advertisements from "./pages/advertisements";
import Appointments from "./pages/appointments";
import Finances from "./pages/finances";

export default function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}
