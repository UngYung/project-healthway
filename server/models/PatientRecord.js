const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: Date,
  emergencyContact: String,
});

module.exports = mongoose.model("PatientRecord", patientSchema);
