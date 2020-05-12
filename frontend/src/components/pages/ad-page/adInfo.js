import React from "react";

export default function AdInfo({ ad }) {
  console.log(ad);
  return (
    <div>
      <div className="mb-4">
        <div id="imgcarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#imgcarousel"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#imgcarousel" data-slide-to="1"></li>
            <li data-target="#imgcarousel" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="adpage-img" src="https://placehold.it/500x300" />
            </div>
            <div className="carousel-item">
              <img className="adpage-img" src="https://placehold.it/500x300" />
            </div>
            <div className="carousel-item">
              <img className="adpage-img" src="https://placehold.it/500x300" />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#imgcarousel"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#imgcarousel"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Details</h5>
          <div className="row">
            <div className="col-sm-6">
              <table className="table table-sm table-borderless table-striped">
                <tbody>
                  <tr>
                    <td>Type</td>
                    <td>{ad.type.name}</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>
                      {ad.area}, {ad.city}
                    </td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>Rs. {ad.price}</td>
                  </tr>
                  <tr>
                    <td>Purpose</td>
                    <td>For {ad.purpose.name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-sm-6">
              <table className="table table-sm table-borderless table-striped">
                <tbody>
                  <tr>
                    <td>Size</td>
                    <td>{ad.size} yards</td>
                  </tr>
                  <tr>
                    <td>Bed</td>
                    <td>{ad.bed}</td>
                  </tr>
                  <tr>
                    <td>Bath</td>
                    <td>{ad.bath}</td>
                  </tr>
                  <tr>
                    <td>Added</td>
                    <td>{ad.date}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <hr></hr>
          <div>
            <h5 className="card-title">Description</h5>
            <p>{ad.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
