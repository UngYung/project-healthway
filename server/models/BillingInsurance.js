const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  billingID: String,
  patientID: String,
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
