const { Property } = require("../config/database");
const express = require("express");
const router = express.Router();

router.get("/term/:query", async (req, res) => {
  const { query } = req.params;
  const result = await Property.find({ $text: { $search: query } });
  res.status(200).json(result);
});

module.exports = router;
