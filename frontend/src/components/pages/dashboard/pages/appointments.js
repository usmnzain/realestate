import React, { useEffect, useState } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetch("/appointment/all")
      .then(res => res.json())
      .then(out => setAppointments(out))
      .catch(err => console.log(err));
  }, []);

  if (!appointments.length)
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  return (
    <main>
      <div className="mb-5">
        <h1>Appointments</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Agent</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{`${item.agent.first_name} ${item.agent.last_name}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
