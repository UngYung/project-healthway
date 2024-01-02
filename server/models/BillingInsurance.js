const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: PatientRecord,
  },
  date: Date,
  itemizedCosts: [
    {
      description: String,
      amount: Number,
    },
  ],
  totalCost: Number,
  insuranceDetails: {
    provider: String,
    policyNumber: String,
  },
  paymentStatus: String,
});

module.exports = mongoose.model("Billing", billingSchema);
