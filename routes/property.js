const {
  Property,
  Customer,
  PropertyType,
  Purpose
} = require("../config/database");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  const {
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
  } = req.body;
  const customer = await Customer.aggregate([{ $sample: { size: 1 } }]);
  const property = new Property({
    customer: customer[0]._id,
    title,
    area,
    city,
    price,
    purpose: new Purpose({ name: purpose }),
    bed,
    bath,
    size,
    type: new PropertyType({ name: type }),
    description
  });
  property.save().catch(err => console.log(err));
});

router.get("/ads", (req, res) => {
  Property.find((err, out) => {
    if (err) return res.json(err);
    res.status(200).json(out);
  });
});

router.get("/landingads", (req, res) => {
  Property.find({ status: false }, (err, out) => {
    if (err) return res.json(err);
    res.status(200).json(out);
  });
});

router.get("/info/:id", async (req, res) => {
  const data = await Property.findOne({ _id: req.params.id });
  res.status(200).json(data);
});

router.post("/markassold/:id", async (req, res) => {
  await Property.updateOne({ _id: req.params.id }, { $set: { status: true } });
  res.status(200).json({ success: "true" });
});

// router.get("/delete/ad/:id", async (req, res) => {
//   await Property.deleteOne({ _id: req.params.id });
//   res.status(200).json({ success: true });
// });

// router.post("/edit", (req, res) => {
//   const {
//     id,
//     status,
//     title,
//     area,
//     city,
//     price,
//     purpose,
//     bed,
//     bath,
//     size,
//     type,
//     description
//   } = req.body;
//   Property.updateOne(
//     { _id: id },
//     {
//       $set: {
//         status,
//         title,
//         area,
//         city,
//         price,
//         purpose,
//         bed,
//         bath,
//         size,
//         type,
//         description
//       }
//     },
//     (err, res) => {
//       if (err) console.log(err);
//     }
//   );
// });

module.exports = router;
