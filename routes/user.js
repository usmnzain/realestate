const { Employee } = require("../config/database");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../config/validation");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  const validation = loginValidation(req.body);
  if (validation.error) return res.json(validation.error.details[0].message);

  const user = await Employee.findOne({ email: req.body.email });
  if (!user) return res.json("Email or password is incorrect");
  const pass = await bcrypt.compare(req.body.password, user.password);
  if (!pass) return res.json("Email or password is incorrect");

  const token = jwt.sign({ user }, "secret");
  res.json({ token });
});

router.post("/register", async (req, res) => {
  const validation = registerValidation(req.body);
  const { fname, lname, email, cnic, password1 } = req.body;

  if (validation.error) return res.json(validation.error.details[0].message);
  if (await Employee.findOne({ email }))
    return res.json("Email already exists.");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password1, salt, (err, hash) => {
      const user = new Employee({
        first_name: fname,
        last_name: lname,
        email: email,
        cnic,
        password: hash
      });
      user.save((err, out) => {
        console.log(err);
      });
    });
  });
});

module.exports = router;
