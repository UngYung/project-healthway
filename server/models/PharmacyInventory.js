const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

module.exports = mongoose.model("PharmacyItem", pharmacySchema);
