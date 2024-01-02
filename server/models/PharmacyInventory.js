const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema({
  itemID: String,
  name: String,
  quantity: Number,
  supplierDetails: {
    name: String,
    contact: String,
  },
  expirationDate: Date,
});

module.exports = mongoose.model("PharmacyItem", pharmacySchema);
