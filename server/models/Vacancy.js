const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema({
  title: { type: String, required: true },
  roleType: { type: String, default: "Temporary" }, // Temporary, Permanent, Contract
  location: { type: String, default: "Southeast England" },
  description: { type: String, required: true },
  closingDate: { type: Date },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Vacancy", vacancySchema);
