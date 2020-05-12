import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdInfo from "./adInfo";
import AppointmentForm from "./appointmentForm";

export default function AdPage() {
  const params = useParams();
  const [ad, setAd] = useState(null);
  useEffect(() => {
    fetch(`/property/info/${params.id}`)
      .then(res => res.json())
      .then(out => setAd(out))
      .catch(err => console.log(err));
  }, []);

  if (ad === null)
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  return (
    <div className="container">
      <h1>{ad.title}</h1>
      <hr></hr>
      <div className="row">
        <div className="col-md-8">
          <AdInfo ad={ad} />
        </div>
        <div className="col-md-4">
          <AppointmentForm price={ad.price} />
        </div>
      </div>
    </div>
  );
}
