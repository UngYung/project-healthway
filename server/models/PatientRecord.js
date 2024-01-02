const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patientID: String,
  name: String,
  dateOfBirth: Date,
  medicalHistory: Array,
  currentMedications: Array,
  emergencyContact: String,
});

module.exports = mongoose.model("PatientRecord", patientSchema);
