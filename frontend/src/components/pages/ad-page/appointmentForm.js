import React, { useEffect, useState } from "react";

export default function AppointmentForm({ price }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = e => {
    e.preventDefault();

    fetch("/appointment/create", {
      method: "POST",
      body: JSON.stringify({ name, email, phone }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => console.log("success"))
      .catch(err => console.log(err));
  };
  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">
            {price.toLocaleString("en-PK", {
              style: "currency",
              currency: "PKR",
              minimumFractionDigits: 0
            })}
          </h3>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Contact</h4>
          <form onSubmit={onSubmit} method="POST">
            <div className="form-label-group">
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                name="name"
                className="form-control"
                id="name"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-label-group">
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                name="email"
                className="form-control"
                placeholder="email"
                id="email"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-label-group">
              <input
                onChange={e => setPhone(e.target.value)}
                value={phone}
                type="text"
                placeholder="Phone"
                name="phone"
                className="form-control"
                id="phone"
              />
              <label htmlFor="phone">Phone</label>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
