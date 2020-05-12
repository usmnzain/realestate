import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { store } from "../../../utils/store";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState("");
  const global = useContext(store);
  const { dispatch } = global;
  const history = useHistory();

  const onSubmit = e => {
    e.preventDefault();

    fetch("/user/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(out => {
        if (out.token) {
          localStorage.setItem("auth_token", out.token);
          history.replace("/");
          dispatch({ type: "authenticated" });
        } else setError(out);
      });
  };

  return (
    <div className="container">
      <div
        className="card mx-auto shadow-sm bg-white rounded py-5"
        style={{ maxWidth: "25rem" }}
      >
        <div className="card-body">
          <h2 className="card-title text-center mb-2">Login</h2>
          <small className="text-center form-text text-muted mb-5">
            Login and start placing ads.
          </small>
          {error !== "" ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
          <form method="POST" onSubmit={onSubmit} className="needs-validation">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                value={email}
                id="email"
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                onChange={e => setPassword(e.target.value)}
                name="password"
                value={password}
                id="password"
              />
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input
                onChange={e =>
                  e.target.checked ? setCheckbox(true) : setCheckbox(false)
                }
                type="checkbox"
                className="custom-control-input"
                id="rememberme"
              />
              <label className="custom-control-label" htmlFor="rememberme">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-5">
              Login
            </button>
            <label className="form-text text-center">
              Don't have an account yet? <Link to="/register">Sign up.</Link>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
