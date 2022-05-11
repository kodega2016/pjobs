const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  slogan: String,
  description: String,
  logo: String,
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String,
  youtube: String,
  contact: String,
  size: {
    type: String,
    enum: ["0-10", "10-100", "100-1000", "1000+"],
    default: "0-10",
  },
  type: {
    type: String,
    enum: ["Startup", "Company", "Consultancy", "Other"],
    default: "Startup",
  },
});

module.exports =
  mongoose.models.Company || mongoose.model("Company", companySchema);
