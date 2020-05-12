import React, { useState, useEffect, createRef } from "react";
import { useParams, useHistory } from "react-router-dom";

export default function EditAdvert() {
  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [bed, setBed] = useState(0);
  const [bath, setBath] = useState(0);
  const [size, setSize] = useState(0);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`/property/info/${params.id}`)
      .then(res => res.json())
      .then(out => {
        setId(out._id);
        setTitle(out.title);
        setArea(out.area);
        setCity(out.city);
        setPrice(out.price);
        setPurpose(out.purpose);
        setBath(out.bath);
        setBed(out.bed);
        setSize(out.size);
        setType(out.type);
        setStatus(out.status);
        setDescription(out.description);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const onSold = () => {
    setStatus(true);
    fetch(`/finance/sold`, {
      method: "POST",
      body: JSON.stringify({ id, title, price }),
      headers: { "Content-Type": "application/json" }
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    fetch("/property/edit", {
      method: "POST",
      body: JSON.stringify({
        id: params.id,
        title,
        area,
        city,
        price,
        purpose,
        bed,
        bath,
        size,
        type,
        status,
        description
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => history.goBack())
      .catch(err => console.log(err));
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h3 className="mb-3">Edit</h3>
        </div>
        <div className="col-md-2">
          {console.log(status)}
          {status ? (
            <p>
              <strong>Property Sold</strong>
            </p>
          ) : null}
        </div>
        <div className="col-md-2">
          <button
            disabled={status}
            onClick={onSold}
            className="btn btn-primary btn-block btn-sm"
          >
            Mark as sold
          </button>
        </div>
      </div>
      <form id="property-form" method="POST" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            onChange={e => setTitle(e.target.value)}
            type="text"
            className="form-control"
            name="title"
            value={title}
            id="title"
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="area">Area</label>
            <input
              onChange={e => setArea(e.target.value)}
              type="text"
              className="form-control"
              name="area"
              value={area}
              id="area"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="city">City</label>
            <input
              onChange={e => setCity(e.target.value)}
              name="city"
              value={city}
              type="text"
              className="form-control"
              id="city"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="price">Price</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">PKR</span>
              </div>
              <input
                onChange={e => setPrice(e.target.value)}
                name="price"
                value={price}
                type="text"
                className="form-control"
                id="price"
              />
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="purpose">Purpose</label>
            <div className="input-group mb-3">
              <select
                onChange={e => setPurpose(e.target.value)}
                name="purpose"
                value={purpose}
                className="custom-select"
              >
                <option defaultValue>Choose...</option>
                <option value="1">Sale</option>
                <option value="2">Rent</option>
              </select>
            </div>
          </div>
          <div className="form-group col-3">
            <label htmlFor="bed">Bed</label>
            <input
              onChange={e => setBed(e.target.value)}
              name="bed"
              value={bed}
              type="text"
              className="form-control"
              id="bed"
            />
          </div>
          <div className="form-group col-3">
            <label htmlFor="bath">Bath</label>
            <input
              onChange={e => setBath(e.target.value)}
              name="bath"
              value={bath}
              type="text"
              className="form-control"
              id="bath"
            />
          </div>
          <div className="form-group col-3">
            <label htmlFor="size">Size</label>
            <div className="input-group">
              <input
                onChange={e => setSize(e.target.value)}
                name="size"
                value={size}
                type="text"
                className="form-control"
                id="size"
              />
              <div className="input-group-append">
                <span className="input-group-text">yards</span>
              </div>
            </div>
          </div>
          <div className="form-group col-3">
            <label htmlFor="type">Type</label>
            <div className="input-group mb-3">
              <select
                onChange={e => setType(e.target.value)}
                name="type"
                value={type}
                className="custom-select"
              >
                <option defaultValue>Choose...</option>
                <option value="1">House</option>
                <option value="2">Portion</option>
                <option value="3">Apartment</option>
                <option value="3">Plot</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="descriptionription">description</label>
          <textarea
            onChange={e => setDescription(e.target.value)}
            name="description"
            value={description}
            type="text"
            rows="4"
            className="form-control"
            id="description"
          />
        </div>
        <button type="submit" form="property-form" className="btn btn-primary">
          Save changes
        </button>
      </form>
    </div>
  );
}
