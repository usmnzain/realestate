import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/spinner";
import Alert from "../../../utils/alert";
import Ads from "./ads";
import bg from "../../../images/bg.jpg";

export default function Landing() {
  const [ads, setAds] = useState([]);
  const [query, setQuery] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setSpinner(true);
    fetch("/property/landingads")
      .then(res => res.json())
      .then(out => setAds(out))
      .then(() => setSpinner(false));
  }, []);

  const onSearch = () => {
    setSpinner(true);
    fetch(`/search/term/${query}`)
      .then(res => res.json())
      .then(out => {
        setAds(out);
        if (!out.length) {
          setAlert(true);
          setSpinner(false);
        } else {
          setSpinner(false);
          setAlert(false);
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="bg-img-container ">
        <img src={bg} alg="bg" />
      </div>
      <div className="container">
        <h1
          style={{ color: "white" }}
          className="text-center mb-4 mt-2 display-5"
        >
          Real Estate Agency
        </h1>
        <div style={{ marginBottom: "10em" }} className="row">
          <div className="col">
            <div className="input-group mb-3">
              <input
                onChange={e => setQuery(e.target.value)}
                value={query}
                type="search"
                className="form-control"
                placeholder="Location"
              />
              <div className="input-group-append">
                <button
                  onClick={onSearch}
                  className="btn btn-primary"
                  type="button"
                >
                  <i className="fas fa-search mr-1"></i>
                  FIND
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {alert ? <Alert msg="Please check back later." /> : null}
          </div>
        </div>
        <div className="col">
          <div className="row">{spinner ? <Spinner /> : <Ads ads={ads} />}</div>
        </div>
      </div>
    </div>
  );
}
