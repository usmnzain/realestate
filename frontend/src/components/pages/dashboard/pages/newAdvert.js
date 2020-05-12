import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function NewAdvert() {
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
  const history = useHistory();

  const onSubmit = e => {
    e.preventDefault();
    fetch("/property/add", {
      method: "POST",
      body: JSON.stringify({
        title,
        area,
        city,
        price,
        purpose,
        bed,
        bath,
        size,
        type,
        description
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => history.push("/dashboard/advertisements"))
      .catch(err => console.log(err));
  };
  return (
    <div className="container">
      <form id="property-form">
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
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
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
                <option value="house">House</option>
                <option value="portion">Portion</option>
                <option value="apartment">Apartment</option>
                <option value="plot">Plot</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="descriptionription">Description</label>
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
      </form>

      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Save
      </button>

      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                New Advertisement
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Are you sure? You won't be able to make changes.
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button onClick={onSubmit} type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
