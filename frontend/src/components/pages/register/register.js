import React, { useState } from "react";
import { registerValidate } from "../../../utils/validation";
import { useHistory } from "react-router-dom";

export default function Register() {
  //State And Global Variables
  const [error, setError] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPass1] = useState("");
  const [password2, setPass2] = useState("");
  const [cnic, setCnic] = useState();
  const history = useHistory();

  //Form Submit Methond
  const onSubmit = e => {
    e.preventDefault();
    if (checkbox) {
      fetch("/user/register", {
        method: "POST",
        body: JSON.stringify({
          fname,
          lname,
          email,
          cnic,
          password1,
          password2
        }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => res.json())
        .then(out => setError(out));
    }
  };

  return (
    <div className="container">
      <div
        className="card mx-auto shadow-sm bg-white rounded py-5"
        style={{ maxWidth: "30rem" }}
      >
        <div className="card-body">
          <h2 className="card-title text-center mb-2">Register</h2>
          <small className="text-center form-text text-muted mb-5">
            Create your account. Its free and only takes few minutes.
          </small>
          {error !== "" ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
          <form className="needs-validation" method="POST" onSubmit={onSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  onChange={e => setFname(e.target.value)}
                  type="name"
                  id="fname"
                  name="fname"
                  className="form-control"
                  placeholder="First Name"
                  value={fname}
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  onChange={e => setLname(e.target.value)}
                  type="name"
                  id="lname"
                  name="lname"
                  className="form-control"
                  placeholder="Last Name"
                  value={lname}
                />
              </div>
            </div>
            <div className="form-group">
              <input
                onChange={e => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
              />
            </div>
            <div className="form-group">
              <input
                onChange={e => setCnic(e.target.value)}
                type="number"
                id="cnic"
                name="cnic"
                className="form-control"
                placeholder="CNIC"
                value={cnic}
              />
            </div>
            <div className="form-group">
              <input
                onChange={e => setPass1(e.target.value)}
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Create Password"
                value={password1}
              />
            </div>
            <div className="form-group">
              <input
                onChange={e => setPass2(e.target.value)}
                type="password"
                id="password2"
                name="password2"
                className="form-control"
                placeholder="Confirm Password"
                value={password2}
              />
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <input
                onChange={e => setCheckbox(e.target.checked)}
                type="checkbox"
                className={
                  checkbox
                    ? "custom-control-input is-valid"
                    : "custom-control-input is-invalid"
                }
                id="check"
              />
              <label className="custom-control-label" htmlFor="check">
                I accept Terms of Use and Privacy Policy
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
