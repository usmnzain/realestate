import React, { useEffect } from "react";
import NewAdvert from "./newAdvert";
import PostedAdverts from "./postedAdverts";
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import EditAdvert from "./editAdvert";

export default function Advertisements() {
  const match = useRouteMatch();
  return (
    <main>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom">
        <h1 className="h2">Advertisements</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Link to={`${match.url}/new`} className="btn btn-primary">
            <i className="fas fa-plus mr-2"></i>
            New
          </Link>
        </div>
      </div>

      <Switch>
        <Route path={`${match.path}/new`} component={NewAdvert} />
        <Route path={`${match.path}/edit/:id`} component={EditAdvert} />
        <Route path={`${match.path}`} component={PostedAdverts} />
      </Switch>
    </main>
  );
}
