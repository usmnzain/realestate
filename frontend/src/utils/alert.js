import React from "react";

export default function Alert({ msg }) {
  return (
    <div className="alert alert-warning" role="alert">
      <strong>No ads found.</strong> {msg}
    </div>
  );
}
