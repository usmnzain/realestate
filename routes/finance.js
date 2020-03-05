const { Finance, Employee, Property } = require("../config/database");
const express = require("express");
const router = express.Router();

router.post("/sold", async (req, res) => {
  const { id, agent, price } = req.body;
  //const emp = await Employee.aggregate([{ $sample: { size: 1 } }]);
  const sold_property = new Finance({
    property: id,
    agent,
    price,
    commission: price * 0.01
  });
  await sold_property.save();
});

router.get("/all", async (req, res) => {
  const finance = await Finance.find()
    .populate("agent", "first_name last_name -_id")
    .populate("property", "title");
  console.log(finance);
  res.status(200).json(finance);
});

module.exports = router;
