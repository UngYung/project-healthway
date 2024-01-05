const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  emergencyContact: {
    type: String,
  },
});

module.exports = mongoose.model("PatientRecord", PatientSchema);
