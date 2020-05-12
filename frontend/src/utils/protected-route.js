import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "../utils/store";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const global = useContext(store);
  const { auth } = global.state;
  console.log(auth);
  return (
    <Route
      {...rest}
      render={props =>
        auth || typeof auth === "undefined" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
}
