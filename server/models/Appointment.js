const mongoose = require("mongoose");
const PatientRecord = require("./PatientRecord");

const appointmentSchema = new mongoose.Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: PatientRecord,
  },
  doctorID: String,
  appointmentDate: Date,
  time: String,
  purpose: String,
  notes: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
