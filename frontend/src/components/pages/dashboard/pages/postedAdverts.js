import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Spinner from "../../../../utils/spinner";
import Alert from "../../../../utils/alert";
import decode from "jwt-decode";

export default function PostedAdverts() {
  const [ads, setAds] = useState([]);
  const [response, setResponse] = useState(false);
  const match = useRouteMatch();

  // const onDelete = (id, e) => {
  //   fetch(`/property/delete/ad/${id}`)
  //     .then(res => res.json())
  //     .then(out => {
  //       if (out.success) {
  //         fetch("/property/ads")
  //           .then(res => res.json())
  //           .then(out => setAds(out))
  //           .then(() => setResponse(true));
  //       }
  //     });
  // };

  const onSold = (id, price) => {
    const token = localStorage.getItem("auth_token");
    const { user } = decode(token);
    fetch(`/finance/sold`, {
      method: "POST",
      body: JSON.stringify({ id, agent: user._id, price }),
      headers: { "Content-Type": "application/json" }
    });
    fetch(`/property/markassold/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }).then(() => {
      console.log("refreshing");
      fetch("/property/ads")
        .then(res => res.json())
        .then(out => setAds(out));
    });
  };

  useEffect(() => {
    fetch("/property/ads")
      .then(res => res.json())
      .then(out => setAds(out))
      .then(() => setResponse(true));
  }, []);

  if (!ads.length && !response) return <Spinner />;
  if (response && !ads.length)
    return <Alert msg="Created ads will be shown here." />;
  return (
    <div className="row">
      {ads.map(item => (
        <div key={item._id} className="col-lg-3">
          <div className="card">
            <Link to={`/ads/${item._id}`}>
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
                <p className="card-subtitle mb-2 text-muted small ">
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
                  style={{
                    fontWeight: 500
                  }}
                  className="text-primary no-wrap-text"
                >
                  {item.title}
                </p>
                <p className="card-text no-wrap-text small">
                  {item.description}
                </p>
                <p className="card-text mt-4">
                  <small className="text-muted">
                    {new Date(item.date).toLocaleDateString("en-PK")} at{" "}
                    {new Date(item.date).toLocaleTimeString("en-PK")}
                  </small>
                </p>
              </div>
            </Link>
            <div className="card-footer">
              <div className="row">
                <div className="col">
                  <button
                    disabled={item.status}
                    onClick={() => onSold(item._id, item.price)}
                    className="btn btn-primary btn-block btn-sm"
                  >
                    Mark as sold
                  </button>
                </div>
                {/* <div className="col">
                  <Link
                    to={`${match.url}/edit/${item._id}`}
                    className="btn btn-secondary btn-sm btn-block"
                  >
                    <i className="fas fa-edit mr-1"></i>Edit
                  </Link>
                </div>
                <div className="col">
                  <button
                    onClick={e => onDelete(item._id, e)}
                    className="btn btn-danger btn-sm btn-block"
                  >
                    <i className="fas fa-trash mr-1"></i>Delete
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
