const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentID: String,
  patientID: String,
  doctorID: String,
  appointmentDate: Date,
  time: String,
  purpose: String,
  notes: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
