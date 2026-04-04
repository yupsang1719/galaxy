const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: "" },
  message: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const whyUsItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

const contentSchema = new mongoose.Schema({
  hero: {
    headline: { type: String, default: "Trusted Healthcare Staffing Across Southeast England" },
    subtext: { type: String, default: "Providing experienced health and social care professionals when you need them most." },
  },
  about: {
    body: { type: String, default: "" },
    directorMessage: { type: String, default: "" },
    directorName: { type: String, default: "Director" },
  },
  contact: {
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  testimonials: [testimonialSchema],
  whyUs: [whyUsItemSchema],
}, { timestamps: true });

module.exports = mongoose.model("Content", contentSchema);
