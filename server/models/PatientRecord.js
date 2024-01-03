const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: String,
  emergencyContact: String,
});

module.exports = mongoose.model("PatientRecord", patientSchema);
