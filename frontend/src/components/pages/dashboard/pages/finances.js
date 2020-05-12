import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Finances() {
  const [soldProperty, setSoldProperty] = useState([]);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    fetch("/finance/all")
      .then(res => res.json())
      .then(out => setSoldProperty(out))
      .then(() => setResponse(true))
      .catch(err => console.log(err));
  }, []);

  if (!soldProperty.length && !response)
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  if (response && !soldProperty.length)
    return (
      <div className="alert alert-warning" role="alert">
        <strong>No records found.</strong> Sold properties will be shown here.
      </div>
    );
  return (
    <main>
      <div className="mb-5">
        <h1>Finance</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Agent</th>
            <th>Price</th>
            <th>Commission</th>
          </tr>
        </thead>
        <tbody>
          {soldProperty.map(item => (
            <tr key={item.property_id}>
              <td>
                <Link to={`/ads/${item.property._id}`}>
                  {item.property.title}
                </Link>
              </td>
              <td>{`${item.agent.first_name} ${item.agent.last_name}`}</td>
              <td>{item.price}</td>
              <td>{item.commission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
