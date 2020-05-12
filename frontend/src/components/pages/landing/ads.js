import React from "react";
import { Link } from "react-router-dom";

export default function Ads({ ads }) {
  return ads.map(item => (
    <div key={item._id} className="col-md-4 mb-5">
      <Link to={`ads/${item._id}`}>
        <div className="card">
          <img
            src="https://placehold.it/500x300"
            className="card-img-top img-fluid"
          />
          <div className="card-body">
            <h3 className="card-title">
              {item.price.toLocaleString("en-PK", {
                style: "currency",
                currency: "PKR",
                minimumFractionDigits: 0
              })}
            </h3>
            <h6 className="card-subtitle mb-2 no-wrap-text">
              {item.area}, {item.city}
            </h6>
            <p className="card-subtitle mb-2 text-muted">
              <span className="mr-4">
                <i className="fas fa-ruler-combined mr-1"></i>
                {item.size} Yd.
              </span>
              <span className="mr-4">
                <i className="fas fa-bed mr-1"></i>
                {item.bed}
              </span>
              <span className="mr-4">
                <i className="fas fa-bath mr-1"></i>
                {item.bath}
              </span>
            </p>
            <p
              style={{ fontWeight: 500 }}
              className="text-primary no-wrap-text"
            >
              {item.title}
            </p>
            <p className="card-text no-wrap-text small">{item.description}</p>
            <p className="card-text mt-4">
              <small className="text-muted">
                {new Date(item.date).toLocaleDateString("en-PK")} at{" "}
                {new Date(item.date).toLocaleTimeString("en-PK")}
              </small>
            </p>
          </div>
        </div>
      </Link>
    </div>
  ));
}
