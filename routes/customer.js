const { Customer } = require("../config/database");
const express = require("express");
const router = express.Router();

router.post("/new", async (req, res) => {
  const { name, email, cnic, phone } = req.body;
  const customer = new Customer({
    name,
    email,
    cnic,
    phone
  });
  await customer.save();
  res.json({ success: true });
});

module.exports = router;
