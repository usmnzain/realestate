const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//Cors
app.use(cors());

//Mongoose
mongoose
  .connect(
    "mongodb+srv://admin:electronicdevices6th@cluster0-mtjma.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

//Body parser
app.use(express.json());

//Routes
app.use("/user", require("./routes/user.js"));
app.use("/property", require("./routes/property"));
app.use("/appointment", require("./routes/appointment"));
app.use("/finance", require("./routes/finance"));
app.use("/customer", require("./routes/customer"));
app.use("/search", require("./routes/search"));

//Server
app.listen(4000, () => {
  console.log("Listening on port 4000");
});
