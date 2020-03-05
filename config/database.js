const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    min: 3,
    max: 25
  },
  last_name: {
    type: String,
    required: true,
    min: 3,
    max: 25
  },
  email: {
    type: String,
    required: true,
    max: 250
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  cnic: {
    type: Number,
    max: 9999999999999,
    min: 1000000000000,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 25
  },
  email: {
    type: String,
    required: true,
    max: 250
  },
  cnic: {
    type: Number,
    max: 9999999999999,
    min: 1000000000000,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

const propertyTypeSchema = new mongoose.Schema({
  name: String
});

const purposeSchema = new mongoose.Schema({
  name: String
});

const propertySchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  area: {
    type: String,
    required: true,
    maxlength: 255
  },
  city: {
    type: String,
    required: true,
    maxlength: 255
  },
  price: {
    type: Number,
    required: true
  },
  purpose: purposeSchema,
  bed: {
    type: Number,
    required: true
  },
  bath: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  type: propertyTypeSchema,
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 25
  },
  email: {
    type: String,
    required: true,
    max: 250
  },
  phone: {
    type: String,
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  }
});

const financeScheme = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  },
  price: {
    type: Number,
    required: true
  },
  commission: {
    type: Number,
    required: true
  }
});

propertySchema.index({ "$**": "text" });

module.exports.Employee = mongoose.model("Employee", employeeSchema);
module.exports.Property = mongoose.model("Property", propertySchema);
module.exports.Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports.Finance = mongoose.model("Finance", financeScheme);
module.exports.Customer = mongoose.model("Customer", customerSchema);
module.exports.PropertyType = mongoose.model(
  "PropertyType",
  propertyTypeSchema
);
module.exports.Purpose = mongoose.model("Purpose", purposeSchema);
