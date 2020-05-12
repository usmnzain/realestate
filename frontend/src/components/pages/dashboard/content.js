import React from "react";
import Advertisements from "./pages/advertisements";
import Appointments from "./pages/appointments";
import Finances from "./pages/finances";
import { Switch, Route } from "react-router-dom";

export default function Content() {
  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
      <Switch>
        <Route path={`/dashboard/advertisements`} component={Advertisements} />
        <Route path={`/dashboard/appointments`} component={Appointments} />
        <Route path={`/dashboard/finances`} component={Finances} />
      </Switch>
    </main>
  );
}
