const { Appointment, Employee } = require("../config/database");
const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
  const { name, email, phone } = req.body;
  Employee.aggregate([{ $sample: { size: 1 } }], (err, res) => {
    const appointment = new Appointment({
      name,
      email,
      phone,
      agent: res[0]._id
    });
    appointment.save().catch(err => console.log(err));
  });
});

router.get("/all", async (req, res) => {
  const appointments = await Appointment.find().populate(
    "agent",
    "first_name last_name -_id"
  );
  res.status(200).json(appointments);
});

module.exports = router;
