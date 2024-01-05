const mongoose = require("mongoose");
const PatientRecord = require("./PatientRecord");

const AppointmentSchema = new mongoose.Schema({
  appointmentDate: {
    type: String,
  },
  time: {
    type: String,
  },
  purpose: {
    type: String,
    enum: ["Routine exam", "Emergency", "Follow up"],
  },
  notes: {
    type: String,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: PatientRecord,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
