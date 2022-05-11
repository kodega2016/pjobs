const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  salary: {
    type: String,
    trim: true,
    enum: ["0-10000", "10000-50000", "50000-10000", "100000+"],
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Freelance"],
    default: "Full-time",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deadLine: {
    type: Date,
    required: true,
  },
  application: [
    {
      user: mongoose.Types.ObjectId,
      name: String,
      email: String,
      phone: String,
      resume: String,
      coverLetter: String,
      status: String,
      createdAt: Date,
      updatedAt: Date,
    },
  ],
});

module.exports = mongoose.models.Job || mongoose.model("Job", jobSchema);
